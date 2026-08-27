import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';

dotenv.config();

const {
  RESEND_API_KEY,
  RESEND_FROM,
  SHOP_OWNER_EMAIL,
  MAILCHIMP_API_KEY,
  MAILCHIMP_LIST_ID,
  PORT
} = process.env;

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

const canSendEmail = () => Boolean(resend && RESEND_FROM && SHOP_OWNER_EMAIL);

const checkoutDisabledMessage = 'Online checkout is no longer available. Please contact us to buy a product or check availability.';

app.get('/', (_req, res) => {
  res.json({ status: 'ok', service: 'contact-api' });
});

app.all('/api/create-checkout-session', (_req, res) => {
  return res.status(410).json({ message: checkoutDisabledMessage });
});

app.all('/api/config', (_req, res) => {
  return res.status(410).json({ message: checkoutDisabledMessage });
});

app.all('/api/stripe-webhook', (_req, res) => {
  return res.status(410).json({ message: checkoutDisabledMessage });
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
    const subjectLabels = {
      general: 'General Inquiry',
      tutorial: 'DIY Kit Tutorial Help',
      order: 'Order Question',
      partnership: 'Collaboration',
      product: 'Product Purchase / Availability'
    };
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

const port = Number(PORT) || 4242;
app.listen(port, '0.0.0.0', () => {
  console.log(`API server running on port ${port}`);
});
