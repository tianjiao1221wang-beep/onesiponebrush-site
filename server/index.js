import dotenv from 'dotenv';
import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import nodemailer from 'nodemailer';

dotenv.config();

const {
  STRIPE_SECRET_KEY,
  STRIPE_PUBLISHABLE_KEY,
  VITE_STRIPE_PUBLISHABLE_KEY,
  STRIPE_WEBHOOK_SECRET,
  FRONTEND_URL,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  SMTP_FROM,
  SHOP_OWNER_EMAIL,
  MAILCHIMP_API_KEY,
  MAILCHIMP_LIST_ID,
  PORT,
  SHIPPING_STANDARD,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_UPGRADE_ADD
} = process.env;

const shippingStandard = Number(SHIPPING_STANDARD) || 5.99;
const freeShippingThreshold = Number(FREE_SHIPPING_THRESHOLD) || 69;
const shippingUpgradeAdd = Number(SHIPPING_UPGRADE_ADD) || 7;

if (!STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY.');
}

const stripe = new Stripe(STRIPE_SECRET_KEY);
const app = express();

app.use(cors({ origin: true }));

app.use('/api/stripe-webhook', express.raw({ type: 'application/json' }));
app.use(express.json());

const createTransporter = () => {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !SMTP_FROM || !SHOP_OWNER_EMAIL) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT ? Number(SMTP_PORT) : 587,
    secure: SMTP_PORT === '465',
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  });
};

const formatCurrency = amountInCents => `$${(amountInCents / 100).toFixed(2)}`;

app.get('/', (_req, res) => {
  res.json({ status: 'ok', service: 'payment-api' });
});

app.get('/api/config', (_req, res) => {
  const publishableKey = STRIPE_PUBLISHABLE_KEY || VITE_STRIPE_PUBLISHABLE_KEY || '';
  res.json({ publishableKey });
});

// SMTP 连接测试，用于排查 contact 表单发信失败
app.get('/api/smtp-test', async (_req, res) => {
  const transporter = createTransporter();
  if (!transporter) {
    return res.json({
      ok: false,
      error: 'SMTP 未配置完整。请确认 SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_FROM, SHOP_OWNER_EMAIL 都已设置。'
    });
  }
  try {
    await transporter.verify();
    return res.json({ ok: true, message: 'SMTP 连接成功' });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('SMTP verify error:', msg);
    return res.json({ ok: false, error: msg });
  }
});

app.all('/api/create-checkout-session', (req, res, next) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '请使用 POST 请求。此接口需从购物车页面的结账按钮发起。' });
  }
  next();
});

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { items, customer, origin } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty.' });
    }

    const lineItems = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          description: item.chineseName
        },
        unit_amount: Math.round(Number(item.price) * 100)
      },
      quantity: item.quantity
    }));

    const subtotal = items.reduce((sum, item) => sum + Number(item.price) * (item.quantity || 1), 0);
    const shippingMethod = req.body?.shippingMethod || 'standard';
    const standardFee = subtotal >= freeShippingThreshold ? 0 : shippingStandard;
    const shippingFee = shippingMethod === 'upgrade'
      ? standardFee + shippingUpgradeAdd
      : standardFee;

    if (shippingFee > 0) {
      const shippingName = shippingMethod === 'upgrade'
        ? 'Express Shipping (1-3 days) / 加急配送 (1-3 天)'
        : 'Standard Shipping (2-5 days) / 标准配送 (2-5 天)';
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: shippingName,
            description: shippingMethod === 'upgrade' ? 'Express 1-3 days' : 'Standard 2-5 days'
          },
          unit_amount: Math.round(shippingFee * 100)
        },
        quantity: 1
      });
    }

    const baseUrl = (origin || FRONTEND_URL || '').trim().replace(/\/+$/, '');
    if (!baseUrl) {
      return res.status(400).json({ message: 'Missing frontend URL.' });
    }
    const successUrl = `${baseUrl}/checkout-success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${baseUrl}/cart?canceled=true`;

    const sessionConfig = {
      mode: 'payment',
      line_items: lineItems,
      customer_email: customer?.email || undefined,
      metadata: {
        customerName: customer?.name || '',
        customerPhone: customer?.phone || '',
        customerNotes: customer?.notes || '',
        shippingMethod: shippingMethod
      }
    };

    if (req.body?.embedded) {
      sessionConfig.ui_mode = 'embedded';
      sessionConfig.return_url = successUrl;
    } else {
      sessionConfig.success_url = successUrl;
      sessionConfig.cancel_url = cancelUrl;
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    if (req.body?.embedded) {
      return res.json({ clientSecret: session.client_secret });
    }

    return res.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create checkout session.';
    return res.status(500).json({ message });
  }
});

// Mailchimp newsletter subscribe
app.post('/api/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    const e = (email || '').trim().toLowerCase();
    if (!e || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
      return res.status(400).json({ message: 'Invalid email address.' });
    }
    if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID) {
      return res.status(503).json({ message: 'Newsletter subscription is not configured.' });
    }
    const lastHyphen = MAILCHIMP_API_KEY.lastIndexOf('-');
    const dcPart = lastHyphen >= 0 ? MAILCHIMP_API_KEY.slice(lastHyphen + 1) : 'us1';
    const url = `https://${dcPart}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`;
    const auth = Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64');
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`
      },
      body: JSON.stringify({
        email_address: e,
        status: 'subscribed'
      })
    });
    const data = await resp.json().catch(() => ({}));
    if (resp.status === 200) {
      return res.json({ success: true });
    }
    if (resp.status === 400 && data?.title === 'Member Exists') {
      return res.json({ success: true });
    }
    console.error('Mailchimp error', resp.status, data);
    return res.status(resp.status >= 400 ? resp.status : 500).json({
      message: data?.detail || data?.title || 'Subscription failed.'
    });
  } catch (error) {
    console.error('Subscribe error', error);
    return res.status(500).json({ message: 'Subscription failed.' });
  }
});

// Contact form – send email to shop owner
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const n = (name || '').trim();
    const e = (email || '').trim().toLowerCase();
    const s = (subject || 'general').trim();
    const m = (message || '').trim();
    if (!n || !e || !m) {
      return res.status(400).json({ message: 'Name, email, and message are required.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
      return res.status(400).json({ message: 'Invalid email address.' });
    }
    const transporter = createTransporter();
    if (!transporter) {
      return res.status(503).json({ message: 'Contact form is not configured. Please set SMTP settings.' });
    }
    const subjectLabels = { general: 'General Inquiry', tutorial: 'DIY Kit Tutorial Help', order: 'Order Question', partnership: 'Collaboration' };
    const subjectText = subjectLabels[s] || s;
    await transporter.sendMail({
      from: SMTP_FROM,
      to: SHOP_OWNER_EMAIL,
      replyTo: e,
      subject: `[One Sip One Brush] ${subjectText} – ${n}`,
      text: [
        `From: ${n} <${e}>`,
        `Subject: ${subjectText}`,
        '',
        m
      ].join('\n')
    });
    return res.json({ success: true });
  } catch (error) {
    console.error('Contact SMTP error:', error instanceof Error ? error.message : String(error), error);
    return res.status(500).json({ message: 'Failed to send message.' });
  }
});

app.post('/api/stripe-webhook', async (req, res) => {
  if (!STRIPE_WEBHOOK_SECRET) {
    return res.status(400).send('Webhook secret is not configured.');
  }

  const signature = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, signature, STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Webhook error';
    return res.status(400).send(message);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    try {
      const checkoutSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ['line_items', 'customer_details']
      });

      const transporter = createTransporter();
      if (transporter) {
        const lineItems = checkoutSession.line_items?.data ?? [];
        const itemLines = lineItems.map(item => {
          const name = item.description || item.price?.product?.name || 'Item';
          return `${item.quantity || 1} x ${name} (${formatCurrency(item.amount_total || 0)})`;
        });

        await transporter.sendMail({
          from: SMTP_FROM,
          to: SHOP_OWNER_EMAIL,
          subject: `New Order: ${checkoutSession.customer_details?.name || 'Customer'}`,
          text: [
            `Name: ${checkoutSession.customer_details?.name || 'N/A'}`,
            `Email: ${checkoutSession.customer_details?.email || 'N/A'}`,
            `Phone: ${checkoutSession.metadata?.customerPhone || 'N/A'}`,
            `Shipping: ${checkoutSession.metadata?.shippingMethod === 'upgrade' ? 'Express 1-3 days' : 'Standard 2-5 days'}`,
            `Notes: ${checkoutSession.metadata?.customerNotes || 'None'}`,
            '',
            'Items:',
            ...itemLines,
            '',
            `Total: ${formatCurrency(checkoutSession.amount_total || 0)}`,
            `Session: ${checkoutSession.id}`
          ].join('\n')
        });
      }
    } catch (error) {
      console.error('Failed to send order email', error);
    }
  }

  res.json({ received: true });
});

const port = Number(PORT) || 4242;
app.listen(port, '0.0.0.0', () => {
  console.log(`Payment server running on port ${port}`);
});
