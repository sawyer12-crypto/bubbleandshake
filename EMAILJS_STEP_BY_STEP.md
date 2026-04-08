# EmailJS Setup - Step by Step Guide

## 📋 Complete Step-by-Step Instructions

Follow these steps to set up EmailJS for your website to receive contact forms, catering requests, and raw materials orders.

---

## Step 1: Create EmailJS Account

1. Go to **https://www.emailjs.com/**
2. Click **"Sign Up"** (top right)
3. Sign up with:
   - Your email address
   - Create a password
   - Or use "Sign in with Google" for faster setup
4. Verify your email address if required

---

## Step 2: Add Email Service

1. After logging in, go to **"Email Services"** in the left menu
2. Click **"Add New Service"**
3. Choose **"Gmail"** (or your preferred email provider)
4. Click **"Connect Account"**
5. Sign in with your Gmail account: `bubbleandshakeinquiry@gmail.com`
6. Authorize EmailJS to send emails on your behalf
7. **Service Name**: Keep default or name it "Bubble & Shake Service"
8. Click **"Create Service"**
9. **IMPORTANT**: Copy your **Service ID** (looks like `service_xxxxxxx`)
   - Your current Service ID: `service_c9wp9ye`
   - If different, update it in `script.js` line 80

---

## Step 3: Create Email Template

1. Go to **"Email Templates"** in the left menu
2. Click **"Create New Template"**
3. **Template Name**: "Bubble & Shake Inquiries" (or any name)
4. **Template ID**: Copy this (looks like `template_xxxxxxx`)
   - Your current Template ID: `template_vys9v6j`
   - If different, update it in `script.js` lines 81-83

---

## Step 4: Configure Template Settings

In the template editor, configure these settings:

### Basic Settings:

**To Email:**
```
bubbleandshakeinquiry@gmail.com
```
OR use dynamic: `{{to_email}}`

**To Name:**
```
{{to_name}}
```

**From Name:**
```
{{from_name}}
```

**From Email:**
```
{{from_email}}
```
(This is the customer's email - for display only)

**Reply To:**
```
{{reply_to}}
```
⚠️ **CRITICAL**: This must be `{{reply_to}}` so you can reply directly to customers!

**Subject:**
```
New Inquiry - {{customer_name}}
```
OR for more specific:
```
{{#if event_type}}Catering Request - {{event_type}}{{/if}}{{#if materials_list}}Raw Materials Order{{/if}}{{#if subject}}{{subject}}{{/if}}
```

---

## Step 5: Set Up Template Body

Copy and paste this complete template body:

```html
Hello {{to_name}},

You received a new inquiry from your website!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CLIENT INFORMATION:

Name: {{customer_name}}
Email: {{customer_email}}
Phone: {{phone}}
{{#if business}}Business: {{business}}{{/if}}
{{#if company}}Company: {{company}}{{/if}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{{#if event_type}}
EVENT DETAILS (Catering Request):

Type: {{event_type}}
Date: {{event_date}}
Guests: {{guest_count}}
Location: {{location}}

DRINKS ORDERED:
{{drinks_list}}

TOTAL: {{total}}

NOTES: {{notes}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{{/if}}

{{#if materials_list}}
RAW MATERIALS ORDER:

Materials Requested:
{{materials_list}}

DELIVERY INFORMATION:
Address: {{delivery_address}}
Preferred Date: {{delivery_date}}
Delivery Notes: {{delivery_notes}}

NOTES: {{notes}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{{/if}}

{{#if subject}}
CONTACT INQUIRY:

SUBJECT: {{subject}}

MESSAGE: {{message}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{{/if}}

Submitted: {{submission_date}}

Reply to this customer at: {{customer_email}}
```

**OR** if your EmailJS doesn't support `{{#if}}` conditionals, use this simpler version:

```html
Hello {{to_name}},

You received a new inquiry from your website!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CLIENT INFORMATION:

Name: {{customer_name}}
Email: {{customer_email}}
Phone: {{phone}}
Business: {{business}}
Company: {{company}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EVENT DETAILS (if catering):

Type: {{event_type}}
Date: {{event_date}}
Guests: {{guest_count}}
Location: {{location}}

DRINKS ORDERED:
{{drinks_list}}

TOTAL: {{total}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RAW MATERIALS ORDER (if materials order):

Materials Requested:
{{materials_list}}

DELIVERY INFORMATION:
Address: {{delivery_address}}
Preferred Date: {{delivery_date}}
Delivery Notes: {{delivery_notes}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONTACT INQUIRY (if contact form):

SUBJECT: {{subject}}

MESSAGE: {{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NOTES: {{notes}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted: {{submission_date}}

Reply to this customer at: {{customer_email}}
```

6. Click **"Save"** to save your template

---

## Step 6: Get Your Public Key

1. Go to **"Account"** → **"General"** in the left menu
2. Find **"Public Key"** section
3. Copy your Public Key (looks like `xxxxxxxxxxxxx`)
   - Your current Public Key: `USMU4mt0Jn_7Qxevs`
   - If different, update it in `script.js` line 79

---

## Step 7: Verify Your Configuration

Check that these values in `script.js` match your EmailJS dashboard:

**File**: `script.js` (lines 78-84)

```javascript
const EMAIL_CONFIG = {
    PUBLIC_KEY: 'USMU4mt0Jn_7Qxevs',  // ← Match your EmailJS Public Key
    SERVICE_ID: 'service_c9wp9ye',     // ← Match your EmailJS Service ID
    CATERING_TEMPLATE_ID: 'template_vys9v6j',  // ← Match your Template ID
    CONTACT_TEMPLATE_ID: 'template_vys9v6j',   // ← Match your Template ID
    RAW_MATERIALS_TEMPLATE_ID: 'template_vys9v6j',  // ← Match your Template ID
    RECIPIENT_EMAIL: 'bubbleandshakeinquiry@gmail.com'
};
```

**If any IDs are different:**
1. Open `script.js`
2. Find the `EMAIL_CONFIG` section (around line 78)
3. Update the values to match your EmailJS dashboard
4. Save the file

---

## Step 8: Test Your Setup

### Test 1: Contact Form
1. Open your website: `http://localhost:8000`
2. Go to **Info** → **Get In Touch**
3. Fill out and submit the contact form
4. Check your email: `bubbleandshakeinquiry@gmail.com`
5. Verify email received with all form data
6. Click **"Reply"** - should go to customer's email

### Test 2: Catering Form
1. Go to **Info** → **CATERING** → **Request a Quote**
2. Fill out the catering form
3. Add drinks and quantities
4. Submit the form
5. Check your email
6. Verify all catering details are included

### Test 3: Raw Materials Order
1. Go to **Info** → **Raw Materials** → **Place Order**
2. Fill out the order form
3. Add materials and quantities
4. Enter delivery information
5. Submit the form
6. Check your email
7. Verify all order details are included

---

## Step 9: Check Browser Console (If Issues)

1. Open your website
2. Press **F12** (or right-click → Inspect)
3. Go to **Console** tab
4. Submit a test form
5. Look for these messages:
   - ✅ "EmailJS initialized with Public Key: ..."
   - ✅ "Sending [contact/catering/materials] email with params: ..."
   - ✅ "Email sent successfully!"
   - ❌ If you see errors, note the error message

---

## 🔧 Troubleshooting

### Problem: Emails Not Received

**Check:**
1. ✅ EmailJS Service is connected to correct Gmail
2. ✅ Template "To Email" is set correctly
3. ✅ Public Key, Service ID, Template ID match in code
4. ✅ Check spam/junk folder
5. ✅ Check EmailJS dashboard → Activity tab (see if emails are being sent)
6. ✅ Check EmailJS quota (free tier: 200 emails/month)

### Problem: Reply Button Doesn't Work

**Fix:**
1. Go to EmailJS → Email Templates
2. Edit your template
3. Find **"Reply To"** field
4. Set it to: `{{reply_to}}`
5. Save template

### Problem: Empty Fields in Email

**Fix:**
1. Check template variables match exactly what code sends
2. Variables are case-sensitive: `{{customer_name}}` not `{{Customer_Name}}`
3. Make sure all variables are in the template body

### Problem: Wrong Email Address Showing

**Fix:**
1. Check EmailJS → Email Services
2. Verify service is connected to: `bubbleandshakeinquiry@gmail.com`
3. Check template "To Email" field
4. Update if needed

---

## 📊 EmailJS Dashboard Overview

### Where to Find Things:

- **Public Key**: Account → General
- **Service ID**: Email Services → Your Service
- **Template ID**: Email Templates → Your Template
- **Activity Log**: Activity (see sent emails)
- **Quota Usage**: Account → General (200/month free)

---

## ✅ Final Checklist

Before going live, verify:

- [ ] EmailJS account created and verified
- [ ] Gmail service connected (`bubbleandshakeinquiry@gmail.com`)
- [ ] Email template created and saved
- [ ] Template "Reply To" set to `{{reply_to}}`
- [ ] Template "To Email" set correctly
- [ ] Template body includes all variables
- [ ] Public Key matches in `script.js`
- [ ] Service ID matches in `script.js`
- [ ] Template ID matches in `script.js`
- [ ] Tested contact form - email received
- [ ] Tested catering form - email received
- [ ] Tested raw materials form - email received
- [ ] Reply button works - goes to customer email
- [ ] All form data appears correctly in emails

---

## 🎯 Quick Reference

**Your Current Configuration:**
- Public Key: `USMU4mt0Jn_7Qxevs`
- Service ID: `service_c9wp9ye`
- Template ID: `template_vys9v6j`
- Recipient Email: `bubbleandshakeinquiry@gmail.com`

**File to Update (if needed):**
- `script.js` - lines 78-84

**EmailJS Dashboard:**
- https://www.emailjs.com/

---

**That's it! Your EmailJS is now set up and ready to receive all form submissions!** 🚀



