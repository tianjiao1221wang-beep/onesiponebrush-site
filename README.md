<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1FfP8IhizFJ3Fwh17xS-3RBCNC1t7o4Q-

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Configure payments:
   - Copy `.env.example` to `.env` and fill in Stripe + SMTP values.
4. Run the app:
   - Frontend: `npm run dev`
   - Payment server: `npm run dev:server`

## Payments Setup

The checkout flow uses Stripe Checkout and a webhook to send order details to the studio via SMTP. Configure the
following in `.env` before going live:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `FRONTEND_URL` (comma-separated list of allowed origins)
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
- `SMTP_FROM`
- `SHOP_OWNER_EMAIL`
