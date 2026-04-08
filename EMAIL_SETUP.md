# 📧 Email Setup Instructions for Bubble & Shake Website

## Overview
Your website is configured to send all form submissions (Catering Quotes, Contact Forms, etc.) to your Gmail address using **EmailJS** - a free service.

---

## Step-by-Step Setup (FREE)

### Step 1: Create EmailJS Account
1. Go to **https://www.emailjs.com/**
2. Click **"Sign Up"** (It's FREE!)
3. Create an account with your Gmail

---

### Step 2: Connect Your Gmail
1. After logging in, go to **"Email Services"** in the dashboard
2. Click **"Add New Service"**
3. Select **"Gmail"**
4. Click **"Connect Account"** and authorize EmailJS to send emails from your Gmail
5. Copy the **Service ID** (looks like: `service_abc1234`)

---

### Step 3: Create Email Templates

#### Template 1: Catering Requests
1. Go to **"Email Templates"** in dashboard
2. Click **"Create New Template"**
3. Name it: **"Catering Quote Request"**
4. Copy this template:

```
Subject: New Catering Quote Request - {{event_type}}

You have received a new catering quote request!

CLIENT INFORMATION:
Name: {{from_name}}
Email: {{from_email}}
Phone: {{from_phone}}
Company: {{company}}

EVENT DETAILS:
Type: {{event_type}}
Date: {{event_date}}
Guests: {{guest_count}}
Location: {{event_location}}

DRINKS ORDERED:
{{drinks_list}}

ESTIMATED TOTAL: {{estimated_total}}

SPECIAL NOTES:
{{special_notes}}

Submitted: {{submission_date}}

---
Reply to this email to contact the client.
```

5. Save and copy the **Template ID** (looks like: `template_abc1234`)

#### Template 2: Contact Form
1. Create another template
2. Name it: **"Contact Form Submission"**
3. Copy this template:

```
Subject: New Contact Message from {{from_name}}

You have received a new message from your website!

FROM:
Name: {{from_name}}
Email: {{from_email}}

SUBJECT:
{{subject}}

MESSAGE:
{{message}}

Submitted: {{submission_date}}

---
Reply to {{from_email}} to respond.
```

4. Save and copy the **Template ID**

---

### Step 4: Get Your Public Key
1. Go to **"Account"** → **"General"** in EmailJS dashboard
2. Find your **Public Key** (looks like: `abc123xyz456`)
3. Copy it

---

### Step 5: Update Your Website Code

Open `/Users/soham/Desktop/Boba/script.js` and find this section at the top:

```javascript
const EMAIL_CONFIG = {
    PUBLIC_KEY: 'YOUR_PUBLIC_KEY_HERE',
    SERVICE_ID: 'YOUR_SERVICE_ID_HERE',
    CATERING_TEMPLATE_ID: 'YOUR_CATERING_TEMPLATE_ID',
    CONTACT_TEMPLATE_ID: 'YOUR_CONTACT_TEMPLATE_ID',
    RECIPIENT_EMAIL: 'your-email@gmail.com'
};
```

**Replace with your actual values:**

```javascript
const EMAIL_CONFIG = {
    PUBLIC_KEY: 'abc123xyz456',              // Your Public Key from Step 4
    SERVICE_ID: 'service_abc1234',           // Your Service ID from Step 2
    CATERING_TEMPLATE_ID: 'template_abc1234', // Catering template from Step 3
    CONTACT_TEMPLATE_ID: 'template_xyz5678',  // Contact template from Step 3
    RECIPIENT_EMAIL: 'youremail@gmail.com'    // Your actual Gmail address
};
```

---

## Testing

1. Save the changes to `script.js`
2. Refresh your website at **http://localhost:8000**
3. Go to **Catering** → **Request a Quote**
4. Fill out the form and submit
5. Check your Gmail inbox - you should receive the request!

---

## What Gets Emailed?

### Catering Requests:
- Client name, email, phone, company
- Event type, date, location, guest count
- All selected drinks with quantities
- Estimated total cost
- Special requests

### Contact Form:
- Sender name and email
- Subject
- Message content
- Submission date

---

## Troubleshooting

**Not receiving emails?**
1. Check your Gmail spam folder
2. Verify all IDs are correct in `script.js`
3. Make sure you authorized Gmail in EmailJS
4. Check the browser console for error messages (F12)

**Free Tier Limits:**
- EmailJS free plan: **200 emails/month**
- Perfect for a small to medium business
- Upgrade plans available if needed

---

## Alternative: Using Your Own Server

If you prefer to use your own email server instead of EmailJS, you'll need:
1. A backend server (Node.js, PHP, etc.)
2. SMTP credentials
3. More complex setup

EmailJS is recommended because it's:
- ✅ Free
- ✅ No backend server needed
- ✅ Easy to set up
- ✅ Secure

---

## Support

- EmailJS Documentation: https://www.emailjs.com/docs/
- Need help? Contact: support@emailjs.com

---

**Once configured, all your form submissions will automatically go to your Gmail!** 📧✨

