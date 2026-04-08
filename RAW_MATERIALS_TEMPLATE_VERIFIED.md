# Raw Materials Email Template - VERIFIED ✅

## Template ID: `template_emxogsq`

This template has been verified to match exactly what the website sends.

---

## 📧 EmailJS Template Settings

**Template ID:** `template_emxogsq`

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
⚠️ **CRITICAL**: Must be `{{reply_to}}` to enable direct replies to customers!

**Subject:**
```
Raw Materials Order Request - {{customer_name}}
```

---

## 📝 Template Body (Copy & Paste This)

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

TOTAL: {{total}}

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

## ✅ Verified Variables

All template variables match exactly what the website sends:

| Template Variable | Code Variable | Status |
|------------------|---------------|--------|
| `{{to_name}}` | `to_name: 'Bubble & Shake Team'` | ✅ Match |
| `{{to_email}}` | `to_email: EMAIL_CONFIG.RECIPIENT_EMAIL` | ✅ Match |
| `{{from_name}}` | `from_name: data.client.name` | ✅ Match |
| `{{from_email}}` | `from_email: data.client.email` | ✅ Match |
| `{{reply_to}}` | `reply_to: data.client.email` | ✅ Match |
| `{{customer_name}}` | `customer_name: data.client.name` | ✅ Match |
| `{{customer_email}}` | `customer_email: data.client.email` | ✅ Match |
| `{{phone}}` | `phone: data.client.phone` | ✅ Match |
| `{{business}}` | `business: data.client.business` | ✅ Match |
| `{{materials_list}}` | `materials_list: materialsList` | ✅ Match |
| `{{total}}` | `total: K${total}` | ✅ Match |
| `{{delivery_address}}` | `delivery_address: data.delivery.address` | ✅ Match |
| `{{delivery_date}}` | `delivery_date: data.delivery.date` | ✅ Match |
| `{{delivery_notes}}` | `delivery_notes: data.delivery.notes` | ✅ Match |
| `{{notes}}` | `notes: data.notes` | ✅ Match |
| `{{submission_date}}` | `submission_date: new Date().toLocaleString()` | ✅ Match |

---

## 📋 What Gets Sent from Website

When a customer submits a raw materials order, the website sends:

**Client Information:**
- Name (required)
- Email (required)
- Phone (required)
- Business Name (optional, shows "N/A" if empty)

**Materials:**
- List of selected materials with icons, quantities, and units
- Format: `⚫ 5 kg - Tapioca Boba Pearls`

**Delivery:**
- Address (required)
- Preferred Date (optional, shows "Not specified" if empty)
- Delivery Notes (optional, shows "None" if empty)

**Additional:**
- Notes/Questions (optional, shows "None" if empty)
- Submission Date/Time

---

## 🎯 Example Email Output

When a customer orders:
- 5 × Tapioca Boba Pearls (1KG) = K2500
- 2 × Matcha Powder (300G) = K500
- 10 × Mango Syrup (250ML) = K1500

You'll receive:

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
⚫ Tapioca Boba Pearls (1KG) × 5 = K2500
🍵 Matcha Powder (300G) × 2 = K500
🥭 Mango Syrup (250ML) × 10 = K1500

TOTAL: K4500

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DELIVERY INFORMATION:

Address: 123 Main Street, City, State 12345
Preferred Date: 2025-02-15
Delivery Notes: Please deliver in the morning

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ADDITIONAL NOTES:

Do you offer bulk discounts?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted: 1/20/2025, 10:30:00 AM

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reply to this customer at: john@example.com
```

---

## 🔧 Setup Steps

1. Go to https://www.emailjs.com/
2. Log in to your account
3. Go to **Email Templates**
4. Find template: `template_emxogsq`
5. **Template Settings:**
   - To Email: `bubbleandshakeinquiry@gmail.com`
   - Reply To: `{{reply_to}}` ⚠️ **IMPORTANT**
   - Subject: `Raw Materials Order Request - {{customer_name}}`
6. **Template Body:** Copy and paste the template body above
7. Click **Save**

---

## ✅ Verification Checklist

Before testing, verify:

- [ ] Template ID in code: `template_emxogsq` (script.js line 83)
- [ ] Template ID in EmailJS dashboard: `template_emxogsq`
- [ ] Reply To field: `{{reply_to}}`
- [ ] To Email: `bubbleandshakeinquiry@gmail.com`
- [ ] All template variables match the list above
- [ ] Template body copied exactly as shown

---

## 🧪 Testing

1. Open website: `http://localhost:8000`
2. Go to **Info** → **Raw Materials** → **Place Order**
3. Fill out the form:
   - Name, Email, Phone, Business
   - Add materials (at least one)
   - Enter delivery address
   - Submit
4. Check email: `bubbleandshakeinquiry@gmail.com`
5. Verify:
   - ✅ Email received
   - ✅ All fields populated correctly
   - ✅ Materials list formatted properly
   - ✅ Reply button works (goes to customer email)

---

**Template is verified and ready! All variables match what the website sends.** ✅



