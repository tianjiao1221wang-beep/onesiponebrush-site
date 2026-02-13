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
  PORT
} = process.env;

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

    const frontendUrl = origin || FRONTEND_URL;
    if (!frontendUrl) {
      return res.status(400).json({ message: 'Missing frontend URL.' });
    }

    const sessionConfig = {
      mode: 'payment',
      line_items: lineItems,
      customer_email: customer?.email || undefined,
      metadata: {
        customerName: customer?.name || '',
        customerPhone: customer?.phone || '',
        customerNotes: customer?.notes || ''
      }
    };

    if (req.body?.embedded) {
      sessionConfig.ui_mode = 'embedded';
      sessionConfig.return_url = `${frontendUrl}/#/checkout-success?session_id={CHECKOUT_SESSION_ID}`;
    } else {
      sessionConfig.success_url = `${frontendUrl}/#/checkout-success?session_id={CHECKOUT_SESSION_ID}`;
      sessionConfig.cancel_url = `${frontendUrl}/#/cart?canceled=true`;
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
