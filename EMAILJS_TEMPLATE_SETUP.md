# EmailJS Template Setup - Complete Guide

## 🎯 Problem: Empty Fields in Email

Your email is arriving but showing empty fields. This is because your EmailJS template variables don't match what the code is sending.

---

## ✅ Solution: Update Your EmailJS Template

### Step 1: Access Your Template

1. Go to https://www.emailjs.com/
2. Log in to your account
3. Click **Email Templates** in the left menu
4. Open template: `template_vys9v6j`

### Step 2: Configure Email Settings

In the template editor, find these settings:

**To Email:**
```
bubbleandshakeinquiry@gmail.com
```

**Reply To:**
```
{{reply_to}}
```
⚠️ **IMPORTANT:** This makes replies go directly to the customer!

**From Name:**
```
{{from_name}}
```

**From Email:**
```
{{from_email}}
```

**Subject:**
```
New Inquiry from {{customer_name}} - {{subject}}
```
(For contact form) OR
```
Catering Request - {{event_type}} on {{event_date}}
```
(For catering form)

---

### Step 3: Update Email Template Body

Replace your entire email template body with this:

```html
Hello {{to_name}},

You received a new inquiry from your website!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CLIENT INFORMATION:

Name: {{customer_name}}
Email: {{customer_email}}
Phone: {{phone}}
Company: {{company}}

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
{{/if}}

{{#if subject}}
SUBJECT: {{subject}}

MESSAGE: {{message}}
{{/if}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted: {{submission_date}}

Reply to this customer at: {{customer_email}}
```

**OR** if your EmailJS doesn't support `{{#if}}` conditionals, use this simpler version:

**For Catering Requests (most common):**
```html
Hello {{to_name}},

You received a new catering request from your website!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CLIENT INFORMATION:

Name: {{customer_name}}
Email: {{customer_email}}
Phone: {{phone}}
Company: {{company}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EVENT DETAILS:

Type: {{event_type}}
Date: {{event_date}}
Guests: {{guest_count}}
Location: {{location}}

DRINKS ORDERED:
{{drinks_list}}

TOTAL: {{total}}

NOTES: {{notes}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted: {{submission_date}}

Reply to this customer at: {{customer_email}}
```

**For Contact Form (if you use the same template):**
The SUBJECT and MESSAGE fields will be empty for catering requests, which is fine.

---

### Step 4: Save Template Settings

**Critical Settings:**

1. **Reply To Field:**
   - Must be set to: `{{reply_to}}`
   - This allows you to click "Reply" in Gmail and it goes to the customer

2. **To Email:**
   - Set to: `bubbleandshakeinquiry@gmail.com`
   - OR use: `{{to_email}}` (if you want it dynamic)

3. **From Email:**
   - Can be: `{{from_email}}` or your service email
   - This is the sender email (usually your EmailJS service email)

---

## 🔧 Alternative: Create Separate Templates

If you want separate templates for Contact and Catering forms:

### Contact Form Template (`template_contact`):

**Settings:**
- To Email: `bubbleandshakeinquiry@gmail.com`
- Reply To: `{{reply_to}}`
- Subject: `New Contact Inquiry from {{customer_name}}`

**Body:**
```html
Hello {{to_name}},

You received a new contact inquiry:

Name: {{customer_name}}
Email: {{customer_email}}
Subject: {{subject}}
Message: {{message}}

Submitted: {{submission_date}}

Reply to: {{customer_email}}
```

### Catering Form Template (`template_catering`):

**Settings:**
- To Email: `bubbleandshakeinquiry@gmail.com`
- Reply To: `{{reply_to}}`
- Subject: `Catering Request - {{event_type}} on {{event_date}}`

**Body:**
```html
Hello {{to_name}},

You received a new catering request:

CLIENT INFORMATION:
Name: {{customer_name}}
Email: {{customer_email}}
Phone: {{phone}}
Company: {{company}}

EVENT DETAILS:
Type: {{event_type}}
Date: {{event_date}}
Guests: {{guest_count}}
Location: {{location}}

DRINKS ORDERED:
{{drinks_list}}

TOTAL: {{total}}

NOTES: {{notes}}

Submitted: {{submission_date}}

Reply to: {{customer_email}}
```

Then update `script.js`:
- Line 81: `CONTACT_TEMPLATE_ID: 'template_contact'`
- Line 82: `CATERING_TEMPLATE_ID: 'template_catering'`

---

## ✅ Testing

After updating your template:

1. **Test Contact Form:**
   - Submit a test message
   - Check email received
   - Verify all fields are populated
   - Click "Reply" - should go to customer's email

2. **Test Catering Form:**
   - Submit a test catering request
   - Check email received
   - Verify all fields are populated
   - Click "Reply" - should go to customer's email

---

## 🎯 Key Points

1. **Reply To Field:** Must be `{{reply_to}}` in EmailJS template settings
2. **Template Variables:** Must match exactly what we're sending
3. **Customer Email:** Use `{{customer_email}}` to display it in the email body
4. **Empty Fields:** Will show as empty if the variable doesn't exist (that's okay for combined template)

---

## 📋 Template Variables Reference

### Contact Form Sends:
- `to_name`, `to_email`, `from_name`, `from_email`, `reply_to`
- `customer_name`, `customer_email`
- `subject`, `message`
- `submission_date`
- `phone`, `company`, `event_type`, etc. (empty strings)

### Catering Form Sends:
- `to_name`, `to_email`, `from_name`, `from_email`, `reply_to`
- `customer_name`, `customer_email`
- `phone`, `company`
- `event_type`, `event_date`, `guest_count`, `location`
- `drinks_list`, `total`, `notes`
- `submission_date`
- `subject`, `message` (empty strings)

---

**After updating your template, test again and the emails should show all the data correctly!** 🚀

