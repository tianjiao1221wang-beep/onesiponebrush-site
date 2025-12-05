# Email Marketing Service Setup Guide

This guide shows you how to integrate Mailchimp (or similar email marketing services) with your website to collect subscribers and send marketing emails.

---

## 🎯 Recommended Services

### **Mailchimp** (Most Popular)
- **Free Tier:** 500 subscribers, 1,000 emails/month
- **Features:** Beautiful templates, automation, analytics
- **Website:** https://mailchimp.com

### **ConvertKit** (Creator-Focused)
- **Free Tier:** 1,000 subscribers
- **Features:** Landing pages, automation, tagging
- **Website:** https://convertkit.com

### **EmailOctopus** (Budget-Friendly)
- **Free Tier:** 2,500 subscribers, 10,000 emails/month
- **Features:** Simple interface, affordable paid plans
- **Website:** https://emailoctopus.com

---

## 📋 Setup Guide (Using Mailchimp)

### Step 1: Create Mailchimp Account (5 minutes)

1. Go to https://mailchimp.com
2. Click **Sign Up Free**
3. Fill in your details and verify email
4. Complete the onboarding questionnaire

### Step 2: Create an Audience (2 minutes)

1. In Mailchimp dashboard, go to **Audience → All contacts**
2. Click **Manage Audience → Settings**
3. Fill in:
   - **Audience name:** "One Sip One Brush Subscribers"
   - **Default from email:** sipbrush@gmail.com
   - **Default from name:** One Sip One Brush
4. Save settings

### Step 3: Create Embedded Form (5 minutes)

1. Go to **Audience → Signup forms**
2. Click **Embedded forms**
3. Choose **Condensed** style (simplest)
4. Customize the form fields (Email only is fine)
5. Click **Generate Code**

You'll see code like this:
```html
<!-- Begin Mailchimp Signup Form -->
<div id="mc_embed_signup">
<form action="https://yoursite.us1.list-manage.com/subscribe/post?u=XXX&id=YYY" method="post" ...>
  <input type="email" value="" name="EMAIL" placeholder="email address" required>
  <input type="submit" value="Subscribe" name="subscribe">
</form>
</div>
```

### Step 4: Get Your Form Action URL

From the generated code, copy the **action URL**. It looks like:
```
https://yoursite.us1.list-manage.com/subscribe/post?u=XXX&id=YYY
```

---

## 🔗 Option A: Use Mailchimp's Embed Code (Simplest)

### Replace Your Current Forms

Just replace your existing form HTML with Mailchimp's embed code in your components.

**Footer Form:**
- Open `App.tsx`
- Find the Footer component's form (around line 165)
- Replace with Mailchimp's embed code
- Style it to match your design

**Homepage Form:**
- Find the Newsletter section form (around line 310)
- Replace with Mailchimp's embed code
- Style it to match your design

---

## 🔗 Option B: Use API Integration (More Control)

### Step 1: Get API Key

1. In Mailchimp, go to **Account → Extras → API keys**
2. Click **Create A Key**
3. Copy your API key (starts with something like `abc123...xyz-us1`)

### Step 2: Get Audience ID

1. Go to **Audience → All contacts**
2. Click **Settings → Audience name and defaults**
3. Find **Audience ID** (looks like `a1b2c3d4e5`)

### Step 3: Create a Backend Endpoint

Since Mailchimp's API requires a server-side call (can't expose API key in frontend), you need a simple backend:

**Option B1: Use Netlify Functions** (Free & Easy)
**Option B2: Use Vercel Serverless Functions** (Free & Easy)
**Option B3: Create your own Node.js backend**

I can help you set up any of these if you'd like!

---

## 📧 Sending Marketing Emails

### Using Mailchimp Dashboard (Easiest)

1. Go to **Campaigns → Create Campaign**
2. Choose **Email**
3. Name your campaign: "New Workshop Announcement"
4. Select your audience: "One Sip One Brush Subscribers"
5. Design your email using Mailchimp's drag-and-drop editor
6. Preview and test
7. Click **Send** or **Schedule**

### Features You Get:

- ✅ **Beautiful Templates** - Professionally designed email templates
- ✅ **Drag & Drop Editor** - Easy to create emails without coding
- ✅ **Analytics** - See open rates, click rates, etc.
- ✅ **A/B Testing** - Test different subject lines
- ✅ **Automation** - Welcome emails, abandoned cart, etc.
- ✅ **Segmentation** - Target specific groups
- ✅ **Mobile Preview** - See how emails look on phones
- ✅ **Unsubscribe Management** - Automatic compliance

---

## 🎨 Option C: Simple Form with Mailchimp Popup

The easiest option - let Mailchimp handle everything:

1. In Mailchimp, go to **Audience → Signup forms → Form builder**
2. Choose **Pop-up form** or **Embedded form**
3. Customize the design to match your brand
4. Copy the code snippet
5. Add it to your `index.html` before `</body>`

This gives you a ready-made popup with zero coding!

---

## 💡 My Recommendation

**For Your Website:**

1. **Use Option A (Embed Code)** if you want the simplest setup
   - Takes 10 minutes
   - No backend needed
   - Mailchimp handles everything

2. **Use Option C (Popup)** if you want even easier
   - Takes 5 minutes
   - Just copy/paste code
   - Professional looking popup

3. **Use Option B (API)** if you want full control
   - Requires backend setup
   - Custom user experience
   - More technical

---

## 🚀 Quick Start (Recommended)

### Easiest Way to Get Started NOW:

1. **Create Mailchimp account** → https://mailchimp.com
2. **Create an Audience**
3. Go to **Audience → Signup forms → Embedded forms**
4. Copy the code
5. **Add to your website** - I can help you integrate it!

Would you like me to:
- Set up the embedded forms?
- Create a popup integration?
- Build a custom API integration with a serverless backend?

Let me know which option you prefer! 🎯

---

## 📊 Viewing Your Subscribers

Once set up, all subscriber emails automatically appear in:
- **Mailchimp Dashboard → Audience → All contacts**
- You can export to CSV anytime
- View analytics on open rates, clicks, etc.

---

## 🔒 Benefits Over Google Sheets

- ✅ Professional email templates
- ✅ Automatic unsubscribe handling
- ✅ Analytics and reporting
- ✅ No sending limits (on free tier)
- ✅ Compliance with email laws
- ✅ Mobile-optimized emails
- ✅ A/B testing
- ✅ Automation workflows

---

## 💰 Pricing

All these services have generous free tiers:

| Service | Free Tier | Best For |
|---------|-----------|----------|
| Mailchimp | 500 subscribers | Most features, popular |
| EmailOctopus | 2,500 subscribers | Budget conscious |
| ConvertKit | 1,000 subscribers | Content creators |
| Buttondown | 100 subscribers | Minimalists |

---

## 🎉 Next Steps

1. Choose your email service (I recommend Mailchimp to start)
2. Create account and audience
3. Let me know which integration method you prefer
4. I'll help you implement it!

Ready to set this up? Let me know! 😊

