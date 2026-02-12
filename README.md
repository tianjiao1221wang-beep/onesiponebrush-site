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

### Deployment note

When the frontend and payment server are hosted on different domains, set `VITE_CHECKOUT_API_URL` in the frontend environment so checkout requests go to the right backend.

## Payments Setup

The checkout flow uses Stripe Checkout and a webhook to send order details to the studio via SMTP. Configure the
following in `.env` before going live:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `FRONTEND_URL` (comma-separated list of allowed origins)
- `VITE_CHECKOUT_API_URL` (optional frontend variable for deployed builds; set this to your payment server origin, e.g. `https://payments.example.com`)
- `VITE_STRIPE_PUBLISHABLE_KEY` (required for embedded Stripe Checkout in frontend)
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
- `SMTP_FROM`
- `SHOP_OWNER_EMAIL`

## Stripe Checkout (embedded UI) setup

This project uses Stripe Checkout as an **embedded payment UI** (`/cart` -> `/checkout`) so customers stay on your site while Stripe handles payment fields securely.
1. Create your Stripe account and copy test keys.
2. Put keys in `.env`:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET` (after running `stripe listen`)
3. Start backend + frontend:
   - `npm run dev:server`
   - `npm run dev`
4. Set frontend env var `VITE_STRIPE_PUBLISHABLE_KEY` to your Stripe publishable key (`pk_test_...` or `pk_live_...`).
5. Open the site, add items to cart, click **GO TO CHECKOUT / 安全支付** and complete payment inside the embedded Stripe UI.
6. If checkout does not render, verify both `VITE_STRIPE_PUBLISHABLE_KEY` and backend `STRIPE_SECRET_KEY` are set for the same Stripe account and mode (test vs live).

Use Stripe test card `4242 4242 4242 4242` (future date, any CVC/ZIP) in test mode.
