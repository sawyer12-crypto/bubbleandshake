# EmailJS Setup & Troubleshooting Guide

## 🔧 What I Fixed in the Code

1. ✅ Added `to_email` parameter to both contact and catering forms
2. ✅ Added better error logging to help debug issues
3. ✅ Added EmailJS initialization checks
4. ✅ Fixed email address references (now uses `bubbleandshakeinquiry@gmail.com`)

---

## ⚠️ IMPORTANT: EmailJS Template Configuration

The old email address (`tiktokss1241212@gmail.com`) you're seeing is likely configured in your **EmailJS template settings**, not in the code. You need to update it in the EmailJS dashboard.

---

## 📋 Step-by-Step EmailJS Setup Checklist

### Step 1: Verify Email Service Connection

1. Go to https://www.emailjs.com/
2. Log in to your account
3. Go to **Email Services** in the left menu
4. Check your service `service_c9wp9ye`:
   - Make sure it's connected to **`bubbleandshakeinquiry@gmail.com`**
   - If it shows `tiktokss1241212@gmail.com`, click **Edit** and change it
   - Verify the email service is **Active** (green status)

### Step 2: Update Email Templates

1. Go to **Email Templates** in the left menu
2. Open template `template_vys9v6j`
3. Check the **To Email** field:
   - Should be: `bubbleandshakeinquiry@gmail.com`
   - If it shows `tiktokss1241212@gmail.com`, change it
4. Verify template variables match what we're sending:

#### For Contact Form Template:
```
To Name: {{to_name}}
To Email: bubbleandshakeinquiry@gmail.com (or use {{to_email}})
From Name: {{from_name}}
From Email: {{from_email}}
Reply To: {{reply_to}}
Subject: {{subject}}
Message: {{message}}
Submission Date: {{submission_date}}
```

#### For Catering Form Template:
```
To Name: {{to_name}}
To Email: bubbleandshakeinquiry@gmail.com (or use {{to_email}})
From Name: {{from_name}}
From Email: {{from_email}}
Reply To: {{reply_to}}
Phone: {{phone}}
Company: {{company}}
Event Type: {{event_type}}
Event Date: {{event_date}}
Guest Count: {{guest_count}}
Location: {{location}}
Drinks List: {{drinks_list}}
Total: {{total}}
Notes: {{notes}}
Submission Date: {{submission_date}}
```

### Step 3: Verify Public Key

1. Go to **Account** → **General**
2. Check your **Public Key** matches: `USMU4mt0Jn_7Qxevs`
3. If different, update it in `script.js` line 79

### Step 4: Test Email Sending

1. Open your website: `http://localhost:8000`
2. Open browser console (F12 → Console tab)
3. Submit a test form
4. Check console for:
   - "EmailJS initialized with Public Key: ..."
   - "Sending [contact/catering] email with params: ..."
   - "Email sent successfully!" or error messages

---

## 🐛 Common Issues & Solutions

### Issue 1: Emails Not Received

**Possible Causes:**
- Email service not connected to correct email
- Template "To Email" field is wrong
- EmailJS quota exceeded (free tier: 200/month)
- Emails going to spam folder

**Solutions:**
1. Check EmailJS dashboard → Email Services → verify email address
2. Check EmailJS dashboard → Email Templates → verify "To Email" field
3. Check EmailJS dashboard → Account → check quota usage
4. Check spam/junk folder in `bubbleandshakeinquiry@gmail.com`
5. Check browser console for error messages

### Issue 2: Wrong Email Address in Error Message

**Cause:** The email address is hardcoded in the EmailJS template, not in the code.

**Solution:**
1. Go to EmailJS dashboard → Email Templates
2. Edit template `template_vys9v6j`
3. Change "To Email" field to: `bubbleandshakeinquiry@gmail.com`
4. Save template

### Issue 3: "EmailJS library not loaded" Error

**Cause:** EmailJS script not loading from CDN

**Solution:**
1. Check internet connection
2. Check browser console for blocked scripts
3. Verify this line exists in `index.html` line 31:
   ```html
   <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
   ```

### Issue 4: "Email sending failed" Error

**Check Console for:**
- Error status code (400, 401, 403, etc.)
- Error message details

**Common Error Codes:**
- **400**: Invalid parameters - check template variables match
- **401**: Invalid Public Key - verify Public Key is correct
- **403**: Service not found - verify Service ID is correct
- **429**: Rate limit exceeded - wait a few minutes

---

## ✅ Quick Verification Checklist

Before testing, verify:

- [ ] EmailJS Public Key: `USMU4mt0Jn_7Qxevs`
- [ ] EmailJS Service ID: `service_c9wp9ye`
- [ ] EmailJS Template ID: `template_vys9v6j`
- [ ] Email Service connected to: `bubbleandshakeinquiry@gmail.com`
- [ ] Template "To Email" set to: `bubbleandshakeinquiry@gmail.com`
- [ ] Template variables match the parameters we're sending
- [ ] EmailJS quota not exceeded
- [ ] Browser console shows no errors

---

## 🧪 Testing Steps

1. **Open Browser Console** (F12)
2. **Submit Contact Form:**
   - Fill out the form
   - Submit
   - Check console for "Sending contact email..." and "Email sent successfully!"
3. **Submit Catering Form:**
   - Fill out all fields
   - Add at least one drink
   - Submit
   - Check console for "Sending catering email..." and "Email sent successfully!"
4. **Check Email Inbox:**
   - Go to `bubbleandshakeinquiry@gmail.com`
   - Check inbox and spam folder
   - Verify email received with all form data

---

## 📧 Email Parameters Being Sent

### Contact Form:
```javascript
{
  to_name: "Bubble & Shake Team",
  to_email: "bubbleandshakeinquiry@gmail.com",
  from_name: "[User's name]",
  from_email: "[User's email]",
  reply_to: "[User's email]",
  subject: "[Subject or 'General Inquiry']",
  message: "[User's message]",
  submission_date: "[Current date/time]"
}
```

### Catering Form:
```javascript
{
  to_name: "Bubble & Shake Team",
  to_email: "bubbleandshakeinquiry@gmail.com",
  from_name: "[Client name]",
  from_email: "[Client email]",
  reply_to: "[Client email]",
  phone: "[Client phone]",
  company: "[Company or 'N/A']",
  event_type: "[Event type]",
  event_date: "[Event date]",
  guest_count: "[Number of guests]",
  location: "[Event location]",
  drinks_list: "[Formatted drink list]",
  total: "K[total amount]",
  notes: "[Notes or 'None']",
  submission_date: "[Current date/time]"
}
```

---

## 🔍 Debug Mode

The code now includes console logging. When you submit a form:

1. Open browser console (F12)
2. Look for these messages:
   - ✅ "EmailJS initialized with Public Key: ..." (on page load)
   - ✅ "Sending [contact/catering] email with params: ..." (on submit)
   - ✅ "Email sent successfully!" (if successful)
   - ❌ Error details (if failed)

---

## 📞 Still Not Working?

If emails still aren't being received:

1. **Check EmailJS Dashboard:**
   - Go to https://www.emailjs.com/
   - Check "Activity" tab for sent emails
   - Verify emails are being sent from EmailJS side

2. **Check Gmail Settings:**
   - Make sure `bubbleandshakeinquiry@gmail.com` can receive emails
   - Check spam/junk folder
   - Check email filters

3. **Test EmailJS Directly:**
   - Use EmailJS dashboard → Test template
   - Send a test email to verify service works

4. **Check Browser Console:**
   - Look for specific error messages
   - Share error details for further troubleshooting

---

**The code is now fixed and ready! The issue is likely in your EmailJS template configuration.** 🚀



