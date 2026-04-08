# Raw Materials Email Template

## 📧 EmailJS Template Content for Raw Materials Orders

Copy and paste this template into your EmailJS template editor.

---

## Template Settings

**To Email:**
```
bubbleandshakeinquiry@gmail.com
```

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

**Reply To:**
```
{{reply_to}}
```
⚠️ **IMPORTANT**: This allows you to reply directly to the customer!

**Subject:**
```
Raw Materials Order Request - {{customer_name}}
```

---

## Template Body (Copy This)

```html
Hello {{to_name}},

You received a new raw materials order request from your website!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CLIENT INFORMATION:

Name: {{customer_name}}
Email: {{customer_email}}
Phone: {{phone}}
Business: {{business}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RAW MATERIALS ORDER:

Materials Requested:
{{materials_list}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DELIVERY INFORMATION:

Address: {{delivery_address}}
Preferred Date: {{delivery_date}}
Delivery Notes: {{delivery_notes}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ADDITIONAL NOTES:

{{notes}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted: {{submission_date}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reply to this customer at: {{customer_email}}
```

---

## Alternative: Combined Template (All Order Types)

If you want ONE template that handles Contact, Catering, AND Raw Materials:

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

{{#if subject}}
CONTACT INQUIRY:

SUBJECT: {{subject}}

MESSAGE: {{message}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{{/if}}

Submitted: {{submission_date}}

Reply to this customer at: {{customer_email}}
```

**OR** if your EmailJS doesn't support `{{#if}}` conditionals:

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

RAW MATERIALS ORDER (if materials order):

Materials Requested:
{{materials_list}}

DELIVERY INFORMATION:
Address: {{delivery_address}}
Preferred Date: {{delivery_date}}
Delivery Notes: {{delivery_notes}}

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

CONTACT INQUIRY (if contact form):

SUBJECT: {{subject}}

MESSAGE: {{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NOTES: {{notes}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted: {{submission_date}}

Reply to this customer at: {{customer_email}}
```

---

## 📋 Template Variables Used

For Raw Materials Orders, these variables are sent:

- `{{to_name}}` - "Bubble & Shake Team"
- `{{to_email}}` - Your email address
- `{{from_name}}` - Customer's name
- `{{from_email}}` - Customer's email
- `{{reply_to}}` - Customer's email (for replies)
- `{{customer_name}}` - Customer's name
- `{{customer_email}}` - Customer's email
- `{{phone}}` - Customer's phone number
- `{{business}}` - Business name (or "N/A")
- `{{materials_list}}` - Formatted list of materials with quantities
- `{{delivery_address}}` - Delivery address
- `{{delivery_date}}` - Preferred delivery date (or "Not specified")
- `{{delivery_notes}}` - Special delivery instructions
- `{{notes}}` - Additional notes or questions
- `{{submission_date}}` - Date and time of submission

---

## 🎯 Example Email Output

When a customer submits a raw materials order, you'll receive an email like this:

```
Hello Bubble & Shake Team,

You received a new raw materials order request from your website!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CLIENT INFORMATION:

Name: John Smith
Email: john@example.com
Phone: +1234567890
Business: Smith's Bubble Tea Shop

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RAW MATERIALS ORDER:

Materials Requested:
⚫ 5 kg - Tapioca Boba Pearls
🍵 2 kg - Matcha Powder
🍓 3 kg - Strawberry Powder
🍯 10 liter - Brown Sugar Syrup

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DELIVERY INFORMATION:

Address: 123 Main Street, City, State 12345
Preferred Date: 2025-02-15
Delivery Notes: Please deliver in the morning between 9-11 AM

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ADDITIONAL NOTES:

Do you offer bulk discounts for orders over 20kg?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted: 1/20/2025, 10:30:00 AM

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reply to this customer at: john@example.com
```

---

## ✅ Quick Setup Steps

1. Go to https://www.emailjs.com/
2. Log in to your account
3. Go to **Email Templates**
4. Open your template (or create new one)
5. Copy the template body above
6. Paste into the template editor
7. Set **Reply To** to: `{{reply_to}}`
8. Set **To Email** to: `bubbleandshakeinquiry@gmail.com`
9. Set **Subject** to: `Raw Materials Order Request - {{customer_name}}`
10. Click **Save**

---

**That's it! Your template is ready to receive raw materials orders!** 🚀



