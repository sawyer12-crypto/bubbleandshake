# Raw Materials Order System - Setup Guide

## ✅ What's Been Added

1. **Raw Materials Section** - New explore card in the Info section
2. **Raw Materials Page** - Information page about raw materials
3. **Order Form** - Complete ordering system similar to catering
4. **25 Raw Materials** - Pre-loaded catalog including:
   - Tapioca Boba Pearls
   - Matcha Powder
   - Strawberry Powder
   - Taro Powder
   - Various Tea Leaves (Black, Green, Oolong, Jasmine)
   - Popping Boba
   - Jellies (Coconut, Grass, Aloe Vera)
   - Syrups (Brown Sugar, Simple)
   - Various Flavor Powders
   - Dairy Products
   - And more!

---

## 📧 EmailJS Template Setup

### Step 1: Update Your EmailJS Template

Your raw materials orders will use the same template (`template_vys9v6j`). You need to add support for raw materials orders.

### Step 2: Update Template Body

Add this section to your EmailJS template to handle raw materials orders:

**Updated Template Body (Combined for all order types):**

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
{{/if}}

{{#if subject}}
CONTACT INQUIRY:

SUBJECT: {{subject}}

MESSAGE: {{message}}
{{/if}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted: {{submission_date}}

Reply to this customer at: {{customer_email}}
```

**OR** if your EmailJS doesn't support `{{#if}}` conditionals, use this version:

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

---

## 📋 Email Parameters Being Sent

### Raw Materials Order Form Sends:
```javascript
{
  to_name: "Bubble & Shake Team",
  to_email: "bubbleandshakeinquiry@gmail.com",
  from_name: "[Client name]",
  from_email: "[Client email]",
  reply_to: "[Client email]",
  customer_email: "[Client email]",
  customer_name: "[Client name]",
  phone: "[Client phone]",
  business: "[Business name or 'N/A']",
  delivery_address: "[Delivery address]",
  delivery_date: "[Preferred delivery date or 'Not specified']",
  delivery_notes: "[Delivery notes or 'None']",
  materials_list: "[Formatted list of materials]",
  notes: "[Special requests or 'None']",
  submission_date: "[Current date/time]",
  // Empty fields for other forms
  subject: "",
  message: "",
  event_type: "",
  event_date: "",
  guest_count: "",
  location: "",
  drinks_list: "",
  total: "",
  company: ""
}
```

---

## 🧪 Testing Steps

1. **Open Website**: `http://localhost:8000`
2. **Navigate to Raw Materials**:
   - Click "Info" section
   - Click "Raw Materials" card
3. **Place Order**:
   - Click "Place Order" button
   - Fill out client information
   - Add materials (click "+ Add Another Material")
   - Select materials and quantities
   - Enter delivery address
   - Optionally set delivery date
   - Add any special notes
   - Submit form
4. **Check Email**:
   - Go to `bubbleandshakeinquiry@gmail.com`
   - Verify email received with all order details
   - Check that materials list is formatted correctly

---

## ✅ Features

- ✅ **25 Raw Materials** pre-loaded in catalog
- ✅ **Dynamic Material Selection** - Add/remove materials
- ✅ **Quantity Input** - Supports decimal values (e.g., 2.5 kg)
- ✅ **Order Summary** - Real-time summary of selected materials
- ✅ **Delivery Information** - Address and preferred date
- ✅ **Date Validation** - Delivery date cannot be in the past
- ✅ **Form Validation** - All required fields validated
- ✅ **Email Integration** - Sends order to your email
- ✅ **Rate Limiting** - Prevents spam submissions
- ✅ **Input Sanitization** - XSS protection

---

## 📝 Template Variables Reference

### For Raw Materials Orders:
- `customer_name` - Client's name
- `customer_email` - Client's email (for reply)
- `phone` - Client's phone number
- `business` - Business name (if provided)
- `delivery_address` - Delivery address
- `delivery_date` - Preferred delivery date
- `delivery_notes` - Special delivery instructions
- `materials_list` - Formatted list of materials with quantities
- `notes` - Special requests or questions
- `submission_date` - When the order was submitted

---

## 🔧 Customization

### Adding More Raw Materials

Edit `script.js` and add to the `rawMaterials` array:

```javascript
{
    id: 26,  // Next available ID
    name: "Your Material Name",
    category: "category",
    unit: "kg",  // or "liter", "can", etc.
    description: "Description of the material",
    icon: "🍵"  // Emoji icon
}
```

### Changing Material Categories

Current categories:
- `pearls` - Boba pearls and popping boba
- `powders` - Flavor powders
- `tea` - Tea leaves
- `toppings` - Jellies and toppings
- `syrups` - Syrups
- `dairy` - Dairy products

---

## 🎯 Key Points

1. **Reply To Field**: Must be `{{reply_to}}` in EmailJS template settings
2. **Template Variables**: Must match exactly what we're sending
3. **Empty Fields**: Will show as empty if not applicable (that's okay)
4. **Combined Template**: One template handles all order types (catering, raw materials, contact)

---

**After updating your EmailJS template, test the raw materials order form!** 🚀



