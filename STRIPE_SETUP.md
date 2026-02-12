# Stripe Payment Setup Guide

This project uses Stripe for secure payment processing with embedded checkout.

## Environment Variables Setup

Create a `.env` file in your project root with the following variables:

```env
# Stripe Configuration (REQUIRED)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Frontend Configuration (REQUIRED)
FRONTEND_URL=http://localhost:3000

# Email Configuration (Optional - for order notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com
SHOP_OWNER_EMAIL=owner@example.com

# Server Configuration
PORT=4242
```

## Frontend Environment Variables

Create a `.env` file in your project root (same location as above) and add:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
VITE_CHECKOUT_API_URL=http://localhost:4242
```

## Getting Your Stripe Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navigate to **Developers** → **API Keys**
3. Copy your **Publishable key** (starts with `pk_test_`) for frontend
4. Copy your **Secret key** (starts with `sk_test_`) for backend
5. For webhook secret:
   - Go to **Developers** → **Webhooks**
   - Click **Add endpoint**
   - URL: `http://localhost:4242/api/stripe-webhook`
   - Events to listen: `checkout.session.completed`
   - Copy the webhook signing secret (starts with `whsec_`)

## How It Works

### 1. Add to Cart
Users browse products and add items to their cart. The cart state is managed in `App.tsx`.

### 2. View Cart
Users can see their cart items, quantities, and total in `/cart` page.

### 3. Checkout
When user clicks "GO TO CHECKOUT":
- Frontend navigates to `/checkout` page
- Checkout page calls backend API `/api/create-checkout-session`
- Backend creates a Stripe Checkout Session with cart items
- Stripe Embedded Checkout UI loads with payment form
- User enters credit card information securely (handled by Stripe)

### 4. Payment Processing
- Stripe processes the payment securely
- User redirected to `/checkout-success` page
- Webhook notifies backend of completed payment
- Optional: Email sent to shop owner with order details

### 5. Order Confirmation
- Success page shows order confirmation
- Cart is cleared
- Customer can start new order

## Testing Payment Flow

Use Stripe test cards:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- Use any future expiry date, any CVC, and any postal code

## Running the Application

1. Start the backend server:
```bash
npm run dev:server
```

2. In another terminal, start the frontend:
```bash
npm run dev
```

3. Open http://localhost:3000 in your browser
4. Add products to cart and test checkout!

## Security Notes

- Never commit `.env` file to Git (add to `.gitignore`)
- Use test keys during development
- Switch to live keys only in production
- Stripe handles PCI compliance - you never see card details
