# 📧 FINAL EMAIL SETUP - Bubble & Shake Website

**Recipient Email:** bubbleandshakeinquiry@gmail.com

---

## ✅ STEP-BY-STEP GUIDE TO MAKE EMAILS WORK

### **STEP 1: Sign Up for EmailJS**

1. Go to: **https://www.emailjs.com**
2. Click **"Sign Up"** (top right)
3. **IMPORTANT:** Use this email: **bubbleandshakeinquiry@gmail.com**
4. Create a password
5. Check the inbox of **bubbleandshakeinquiry@gmail.com** and verify your email

---

### **STEP 2: Connect Your Gmail Account**

1. After logging in, click **"Email Services"** in the left menu
2. Click **"Add New Service"**
3. Select **"Gmail"**
4. Click **"Connect Account"**
5. Sign in with: **bubbleandshakeinquiry@gmail.com**
6. Click **"Allow"** to give EmailJS permission
7. You'll see your service - **COPY THE SERVICE ID** (looks like: `service_abc123`)
   - You already have: `service_01wpd6q` (if this is from the test account, you'll get a NEW ONE)

---

### **STEP 3: Get Your Public Key**

1. Click on your **profile icon** (top right)
2. Click **"Account"**
3. Go to the **"API Keys"** section
4. You'll see **"Public Key"** - COPY IT (looks like: `aZoFM1k3Y_4itvsKX`)
   - You already have: `aZoFM1k3Y_4itvsKX` (if this is from test account, you'll get a NEW ONE)

---

### **STEP 4: Create Email Template**

1. Click **"Email Templates"** in the left menu
2. Click **"Create New Template"**
3. Give it a name: **"Inquiry Form"**

#### **Template Settings:**

**Subject Line:**
```
New Inquiry from {{from_name}}
```

**Content (Copy this EXACTLY):**
```
Hello Bubble & Shake Team,

You have received a new inquiry from your website!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 CLIENT INFORMATION:
Name: {{from_name}}
Email: {{reply_to}}
Phone: {{phone}}
Company: {{company}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 MESSAGE/INQUIRY:
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎉 EVENT DETAILS (if catering):
Event Type: {{event_type}}
Event Date: {{event_date}}
Number of Guests: {{guest_count}}
Location: {{location}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🥤 DRINKS ORDERED:
{{drinks_list}}

💰 ESTIMATED TOTAL: {{total}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 SPECIAL NOTES:
{{notes}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏰ Submitted: {{submission_date}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reply directly to this email to respond to: {{reply_to}}
```

5. **To Email:** Leave it as **{{to_name}}** or type: **bubbleandshakeinquiry@gmail.com**
6. **From Name:** {{from_name}}
7. **Reply To:** {{reply_to}}
8. Click **"Save"**
9. **COPY THE TEMPLATE ID** (looks like: `template_xyz123`)

---

### **STEP 5: Update Website Code (I'll Do This)**

Once you have:
- ✅ **New Public Key** (if different from test account)
- ✅ **New Service ID** (if different from test account)  
- ✅ **New Template ID**

Give them to me and I'll update the code immediately!

---

## 🎯 CURRENT STATUS:

**Already in your code:**
- Public Key: `aZoFM1k3Y_4itvsKX` *(from test account - may need to update)*
- Service ID: `service_01wpd6q` *(from test account - may need to update)*
- Template ID: `template_z83tci3` *(from test account - may need to update)*
- Recipient Email: `bubbleandshakeinquiry@gmail.com` ✅ **UPDATED!**

---

## 🔥 AFTER SETUP IS COMPLETE:

### **How it Works:**
1. Customer fills out contact form or catering request on your website
2. They click submit
3. **Email is sent to:** bubbleandshakeinquiry@gmail.com
4. You check that inbox and see all the details!
5. You reply directly from Gmail

---

## 📞 NEED HELP?

If you get stuck, tell me:
- Which step you're on
- What error you're seeing (if any)
- Send me screenshots if needed

---

**Ready? Start with STEP 1!** 🚀




