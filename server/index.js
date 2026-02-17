import dotenv from 'dotenv';
import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import { Resend } from 'resend';

dotenv.config();

const {
  STRIPE_SECRET_KEY,
  STRIPE_PUBLISHABLE_KEY,
  VITE_STRIPE_PUBLISHABLE_KEY,
  STRIPE_WEBHOOK_SECRET,
  FRONTEND_URL,
  RESEND_API_KEY,
  RESEND_FROM,
  SHOP_OWNER_EMAIL,
  MAILCHIMP_API_KEY,
  MAILCHIMP_LIST_ID,
  PORT,
  SHIPPING_STANDARD,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_UPGRADE_ADD
} = process.env;

const shippingStandard = Number(SHIPPING_STANDARD) || 5.99;
const freeShippingThreshold = Number(FREE_SHIPPING_THRESHOLD) || 79;
const shippingUpgradeAdd = Number(SHIPPING_UPGRADE_ADD) || 7;

if (!STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY.');
}

const stripe = new Stripe(STRIPE_SECRET_KEY);
const app = express();

app.use(cors({ origin: true }));

app.use('/api/stripe-webhook', express.raw({ type: 'application/json' }));
app.use(express.json());

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

const canSendEmail = () => Boolean(resend && RESEND_FROM && SHOP_OWNER_EMAIL);

const formatCurrency = amountInCents => `$${(amountInCents / 100).toFixed(2)}`;

app.get('/', (_req, res) => {
  res.json({ status: 'ok', service: 'payment-api' });
});

app.get('/api/config', (_req, res) => {
  const publishableKey = STRIPE_PUBLISHABLE_KEY || VITE_STRIPE_PUBLISHABLE_KEY || '';
  res.json({ publishableKey });
});

// Resend 连接测试
app.get('/api/smtp-test', async (_req, res) => {
  if (!canSendEmail()) {
    return res.json({
      ok: false,
      error: 'Resend 未配置。请设置 RESEND_API_KEY, RESEND_FROM, SHOP_OWNER_EMAIL。'
    });
  }
  try {
    const { data, error } = await resend.emails.send({
      from: RESEND_FROM,
      to: SHOP_OWNER_EMAIL,
      subject: 'Resend 测试邮件',
      text: '这是一封测试邮件，说明 Resend 已配置成功。'
    });
    if (error) {
      return res.json({ ok: false, error: error.message || JSON.stringify(error) });
    }
    return res.json({ ok: true, message: 'Resend 发送成功', id: data?.id });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
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

    const lineItems = items.map(item => {
      const desc = item.variantName ? `${item.chineseName} · ${item.variantChineseName || item.variantName}` : item.chineseName;
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            description: desc
          },
          unit_amount: Math.round(Number(item.price) * 100)
        },
        quantity: item.quantity
      };
    });

    const subtotal = items.reduce((sum, item) => sum + Number(item.price) * (item.quantity || 1), 0);
    const shippingMethod = req.body?.shippingMethod || 'standard';
    const standardFee = subtotal >= freeShippingThreshold ? 0 : shippingStandard;
    const shippingFee = shippingMethod === 'upgrade'
      ? standardFee + shippingUpgradeAdd
      : standardFee;

    if (shippingFee > 0) {
      const shippingName = shippingMethod === 'upgrade'
        ? 'Express Shipping (7 days) / 加急配送 (7 天)'
        : 'Standard Shipping (14 days) / 标准配送 (14 天)';
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: shippingName,
            description: shippingMethod === 'upgrade' ? 'Express 7 days' : 'Standard 14 days'
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
      shipping_address_collection: { allowed_countries: ['US', 'CA', 'GB', 'AU', 'CN', 'JP', 'KR', 'TW', 'HK', 'SG', 'FR', 'DE', 'IT', 'ES', 'NL', 'BE', 'AT', 'CH', 'PL', 'SE', 'NO', 'DK', 'FI', 'IE', 'NZ', 'MX', 'BR', 'IN', 'TH', 'MY', 'VN', 'PH', 'ID'] },
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

// Contact form – send email to shop owner (Resend)
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
    if (!canSendEmail()) {
      return res.status(503).json({ message: 'Contact form is not configured. Please set Resend (RESEND_API_KEY, RESEND_FROM, SHOP_OWNER_EMAIL).' });
    }
    const subjectLabels = { general: 'General Inquiry', tutorial: 'DIY Kit Tutorial Help', order: 'Order Question', partnership: 'Collaboration' };
    const subjectText = subjectLabels[s] || s;
    const text = [`From: ${n} <${e}>`, `Subject: ${subjectText}`, '', m].join('\n');
    const { error } = await resend.emails.send({
      from: RESEND_FROM,
      to: SHOP_OWNER_EMAIL,
      replyTo: e,
      subject: `[One Sip One Brush] ${subjectText} – ${n}`,
      text
    });
    if (error) {
      console.error('Contact Resend error:', error);
      return res.status(500).json({ message: error.message || 'Failed to send message.' });
    }
    return res.json({ success: true });
  } catch (error) {
    console.error('Contact error:', error);
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

      if (canSendEmail()) {
        const lineItems = checkoutSession.line_items?.data ?? [];
        const itemLines = lineItems.map(item => {
          const name = item.description || item.price?.product?.name || 'Item';
          return `${item.quantity || 1} x ${name} (${formatCurrency(item.amount_total || 0)})`;
        });
        const addr = checkoutSession.customer_details?.address;
        const addressLines = addr
          ? [
              `${addr.line1 || ''}${addr.line2 ? ', ' + addr.line2 : ''}`.trim(),
              [addr.city, addr.state, addr.postal_code].filter(Boolean).join(', '),
              addr.country || ''
            ].filter(Boolean)
          : ['N/A'];
        const text = [
          `Name: ${checkoutSession.customer_details?.name || 'N/A'}`,
          `Email: ${checkoutSession.customer_details?.email || 'N/A'}`,
          `Phone: ${checkoutSession.metadata?.customerPhone || 'N/A'}`,
          '',
          'Shipping Address / 收货地址:',
          ...addressLines,
          '',
          `Shipping Method: ${checkoutSession.metadata?.shippingMethod === 'upgrade' ? 'Express 7 days' : 'Standard 14 days'}`,
          `Notes: ${checkoutSession.metadata?.customerNotes || 'None'}`,
          '',
          'Items:',
          ...itemLines,
          '',
          `Total: ${formatCurrency(checkoutSession.amount_total || 0)}`,
          `Session: ${checkoutSession.id}`
        ].join('\n');
        const { error } = await resend.emails.send({
          from: RESEND_FROM,
          to: SHOP_OWNER_EMAIL,
          subject: `New Order: ${checkoutSession.customer_details?.name || 'Customer'}`,
          text
        });
        if (error) console.error('Order email error:', error);
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
