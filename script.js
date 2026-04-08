// ==========================================
// SECURITY UTILITIES
// ==========================================

// XSS Protection: Sanitize user input
function sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
    };
    const reg = /[&<>"'/]/ig;
    return input.replace(reg, (match) => (map[match]));
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate phone format
function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Rate limiting protection
const formSubmissions = {
    catering: [],
    contact: []
};

function checkRateLimit(formType) {
    const now = Date.now();
    const submissions = formSubmissions[formType];
    
    // Remove submissions older than 10 minutes
    formSubmissions[formType] = submissions.filter(time => now - time < 600000);
    
    // Check if more than 3 submissions in 10 minutes
    if (formSubmissions[formType].length >= 3) {
        return false;
    }
    
    formSubmissions[formType].push(now);
    return true;
}

// CSRF Token generation (for additional security)
function generateCSRFToken() {
    return Array.from(crypto.getRandomValues(new Uint8Array(32)))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

// Store CSRF token
let csrfToken = null;
if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    csrfToken = generateCSRFToken();
}

// ==========================================
// EMAIL CONFIGURATION
// ==========================================
// INSTRUCTIONS:
// 1. Go to https://www.emailjs.com/ and create a FREE account
// 2. Add your Gmail in EmailJS dashboard
// 3. Get your PUBLIC KEY, SERVICE ID, and TEMPLATE ID
// 4. Replace the values below with your actual credentials
// ==========================================

const EMAIL_CONFIG = {
    PUBLIC_KEY: 'USMU4mt0Jn_7Qxevs',  // Your EmailJS public key
    SERVICE_ID: 'service_c9wp9ye',  // Your EmailJS service ID
    CATERING_TEMPLATE_ID: 'template_vys9v6j',  // Template for catering requests
    CONTACT_TEMPLATE_ID: 'template_vys9v6j',    // Template for contact form (using same template)
    RAW_MATERIALS_TEMPLATE_ID: 'template_emxogsq',  // Template for raw materials orders
    GIFT_CARD_TEMPLATE_ID: 'template_vys9v6j',  // Template for gift card inquiries (same as contact; use subject + message)
    RECIPIENT_EMAIL: 'bubbleandshakeinquiry@gmail.com'  // Your Gmail address to receive requests
};

// Initialize EmailJS
let emailjsReady = false;
(function() {
    if (EMAIL_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY_HERE') {
        if (typeof emailjs !== 'undefined') {
            emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);
            emailjsReady = true;
            console.log('EmailJS initialized with Public Key:', EMAIL_CONFIG.PUBLIC_KEY);
        } else {
            console.error('EmailJS library not loaded! Check if the script is included in HTML.');
        }
    } else {
        console.warn('EmailJS Public Key not configured. Please set EMAIL_CONFIG.PUBLIC_KEY');
    }
})();

// Ensure EmailJS is ready before sending (call before emailjs.send)
function ensureEmailJSReady() {
    if (!emailjsReady && typeof emailjs !== 'undefined' && EMAIL_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY_HERE') {
        emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);
        emailjsReady = true;
    }
    return typeof emailjs !== 'undefined' && emailjsReady;
}

// Notification Modal Functions
function showNotification(title, message, icon = '✓') {
    const modal = document.getElementById('notification-modal');
    const titleEl = document.getElementById('notification-title');
    const messageEl = document.getElementById('notification-message');
    const iconEl = document.getElementById('notification-icon');
    
    titleEl.textContent = title;
    messageEl.textContent = message;
    iconEl.textContent = icon;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeNotification() {
    const modal = document.getElementById('notification-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Extended Menu Data with full details
const menuItems = [
    // SIGNATURE MILK TEAS (K200 each) — add image for each when provided
    {
        id: 1,
        name: "Very Berry Bliss",
        price: 200,
        description: "Vanilla milk tea with strawberry puree, cream cheese, and chocolate sprinkles. Layered with berry puree and creamy milk.",
        category: "milk-tea",
        icon: "🧋",
        image: "images/signature-very-berry-bliss.png",
        tags: ["Vanilla", "Strawberry", "Cream Cheese", "Berry"],
        specs: {
            base: "Vanilla Milk Tea"
        }
    },
    {
        id: 2,
        name: "Creamy Pink Panther",
        price: 200,
        description: "Strawberry milk tea with strawberry puree, cream cheese foam, and Oreo crumbles.",
        category: "milk-tea",
        icon: "🧋",
        image: "images/signature-creamy-pink-panther.png",
        tags: ["Strawberry", "Cream Cheese Foam", "Oreo"],
        specs: {
            base: "Strawberry Milk Tea"
        }
    },
    {
        id: 3,
        name: "Vanilla Biscoff Dream",
        price: 200,
        description: "Vanilla milk tea with Biscoff spread, cream cheese foam, and Oreo crumbles.",
        category: "milk-tea",
        icon: "🧋",
        image: "images/signature-vanilla-biscoff-dream.png",
        tags: ["Vanilla", "Biscoff", "Cream Cheese Foam"],
        specs: {
            base: "Vanilla Milk Tea"
        }
    },
    {
        id: 4,
        name: "Purple Taro Reign",
        price: 200,
        description: "Taro milk tea with blueberry puree, cream cheese foam, and Oreo crumbles.",
        category: "milk-tea",
        icon: "🧋",
        image: "images/signature-purple-taro-reign.png",
        tags: ["Taro", "Blueberry", "Cream Cheese Foam"],
        specs: {
            base: "Taro Milk Tea"
        }
    },
    {
        id: 5,
        name: "Matcha Strawberry Love",
        price: 200,
        description: "Matcha milk tea with strawberry puree, cream cheese foam, and chocolate sprinkles.",
        category: "milk-tea",
        icon: "🧋",
        image: "images/signature-matcha-strawberry-love.png",
        tags: ["Matcha", "Strawberry", "Cream Cheese Foam"],
        specs: {
            base: "Matcha Milk Tea"
        }
    },
    {
        id: 6,
        name: "Thai Biscoff Dream",
        price: 200,
        description: "Thai milk tea with Biscoff spread, cream cheese foam, and Oreo crumbles.",
        category: "milk-tea",
        icon: "🧋",
        image: "images/signature-thai-biscoff-dream.png",
        tags: ["Thai", "Biscoff", "Cream Cheese Foam"],
        specs: {
            base: "Thai Milk Tea"
        }
    },
    // SIGNATURE FRUIT TEAS (K90 each) — add image for each when provided
    {
        id: 8,
        name: "Mixed Berry Fruit Tea",
        price: 90,
        description: "Signature fruit tea with blueberry popping boba.",
        category: "fruit-tea",
        icon: "🫐",
        image: "images/signature-mixed-berry-fruit-tea.png",
        tags: ["Fruity", "Iced", "Blueberry Popping boba"],
        specs: {
            base: "Fruit Tea"
        }
    },
    {
        id: 9,
        name: "Mango Iced Tea",
        price: 90,
        description: "Mango iced tea with litchi popping boba.",
        category: "fruit-tea",
        icon: "🥭",
        image: "images/signature-mango-iced-tea.png",
        tags: ["Fruity", "Iced", "Litchi Popping boba"],
        specs: {
            base: "Fruit Tea"
        }
    },
    {
        id: 10,
        name: "Cherry Iced Tea",
        price: 90,
        description: "Cherry iced tea with watermelon popping boba.",
        category: "fruit-tea",
        icon: "🍒",
        image: "images/signature-cherry-iced-tea.png",
        tags: ["Fruity", "Iced", "Watermelon Popping boba"],
        specs: {
            base: "Fruit Tea"
        }
    },
    {
        id: 11,
        name: "Strawberry Iced Tea",
        price: 90,
        description: "Strawberry iced tea with nata de coco.",
        category: "fruit-tea",
        icon: "🍓",
        image: "images/signature-strawberry-iced-tea.png",
        tags: ["Fruity", "Iced", "Nata De Coco"],
        specs: {
            base: "Fruit Tea"
        }
    },
    {
        id: 12,
        name: "Litchi Iced Tea",
        price: 90,
        description: "Litchi iced tea with green apple popping boba.",
        category: "fruit-tea",
        icon: "🍇",
        image: "images/signature-litchi-iced-tea.png",
        tags: ["Fruity", "Iced", "Green Apple Popping boba"],
        specs: {
            base: "Fruit Tea"
        }
    },
    {
        id: 13,
        name: "Peach Iced Tea",
        price: 90,
        description: "Peach iced tea with passionfruit popping boba.",
        category: "fruit-tea",
        icon: "🍑",
        image: "images/signature-peach-iced-tea.png",
        tags: ["Fruity", "Iced", "Passionfruit Popping boba"],
        specs: {
            base: "Fruit Tea"
        }
    },
    // SPARKLERS (K80 each) — 4 pumps syrup, 1 scoop popping boba
    {
        id: 14,
        name: "Blueberry Puree Sparkler",
        price: 80,
        description: "Sparkling drink with blueberry popping boba and blueberry puree. 4 pumps of syrup, one scoop of popping boba.",
        category: "pure-sparkler",
        icon: "🫐",
        image: "images/sparkler-blueberry-puree.png",
        tags: ["Sparkler", "Blueberry", "Popping boba"],
        specs: {
            base: "Syrup & Popping boba"
        }
    },
    {
        id: 15,
        name: "Watermelon Syrup Sparkler",
        price: 80,
        description: "Sparkling drink with litchi popping boba and watermelon syrup. 4 pumps of syrup, one scoop of popping boba.",
        category: "syrup-sparkler",
        icon: "🍉",
        image: "images/sparkler-watermelon-syrup.png",
        tags: ["Sparkler", "Watermelon", "Litchi Popping boba"],
        specs: {
            base: "Syrup & Popping boba"
        }
    },
    {
        id: 16,
        name: "Mango Syrup Sparkler",
        price: 80,
        description: "4 pumps of syrup, one scoop of popping boba. Mango syrup flavor.",
        category: "syrup-sparkler",
        icon: "🥭",
        image: "images/signature-mango-iced-tea.png",
        tags: ["Sparkler", "Mango", "Popping boba"],
        specs: {
            base: "Syrup & Popping boba"
        }
    },
    {
        id: 17,
        name: "Passionfruit Syrup Sparkler",
        price: 80,
        description: "Sparkling drink with passionfruit popping boba and strawberry syrup. 4 pumps of syrup, one scoop of popping boba.",
        category: "syrup-sparkler",
        icon: "🍈",
        image: "images/sparkler-passionfruit-syrup.png",
        tags: ["Sparkler", "Passionfruit", "Strawberry Syrup", "Popping boba"],
        specs: {
            base: "Syrup & Popping boba"
        }
    },
    {
        id: 18,
        name: "Strawberry Puree Sparkler",
        price: 80,
        description: "4 pumps of syrup, one scoop of popping boba. Strawberry puree flavor.",
        category: "pure-sparkler",
        icon: "🍓",
        image: "images/sparkler-strawberry-puree.png",
        tags: ["Sparkler", "Strawberry", "Popping boba"],
        specs: {
            base: "Syrup & Popping boba"
        }
    },
    {
        id: 20,
        name: "Strawberry Syrup Sparkler",
        price: 80,
        description: "4 pumps of syrup, one scoop of popping boba. Strawberry syrup flavor.",
        category: "syrup-sparkler",
        icon: "🍓",
        image: "images/signature-strawberry-iced-tea.png",
        tags: ["Sparkler", "Strawberry", "Popping boba"],
        specs: {
            base: "Syrup & Popping boba"
        }
    },
    // ADD ONS (K20 each)
    {
        id: 19,
        name: "Tapioca",
        price: 20,
        description: "Instant Tapioca — add chewy tapioca pearls to any drink. 50g portion. Product of Taiwan. Ingredients: Tapioca Starch, Water, Caramel Color, Sodium Carboxymethyl Cellulose (CMC), Potassium Sorbate, Flavor. Imported and repackaged by Bubble & Shake.",
        category: "add-ons",
        icon: "⚫",
        image: "images/addon-tapioca.png",
        tags: ["Add-On", "Chewy", "Instant", "50g"],
        specs: {
            type: "Add-On",
            texture: "Chewy"
        }
    },
    {
        id: 21,
        name: "Cream Cheese Foam",
        price: 20,
        description: "Add creamy cheese foam topping to any drink. Savory and sweet, this premium topping is velvety smooth with a thick, frothy texture.",
        category: "add-ons",
        icon: "🧀",
        image: "images/addon-cream-cheese-foam.png",
        tags: ["Add-On", "Creamy", "Premium"],
        specs: {
            type: "Add-On",
            texture: "Foam"
        }
    },
    // POPPING BOBA FLAVORS (Part of Add Ons - K20 each)
    {
        id: 22,
        name: "Apple Popping boba",
        price: 20,
        description: "Bursting Boba Apple 300g. Product of Taiwan, repackaged by Bubble & Shake. Add to any drink for an extra burst of fruity apple flavor.",
        category: "add-ons",
        icon: "🍎",
        images: ["images/addon-apple-popping-boba.png", "images/addon-apple-popping-boba-pack.png"],
        tags: ["Add-On", "Popping boba", "Fruity"],
        specs: {
            type: "Popping boba",
            flavor: "Apple"
        }
    },
    {
        id: 23,
        name: "Blueberry Popping boba",
        price: 20,
        description: "Bursting Boba Blueberry 300g. Product of Taiwan, repackaged by Bubble & Shake. Add to any drink for an extra burst of berry flavor.",
        category: "add-ons",
        icon: "🫐",
        images: ["images/addon-blueberry-popping-boba.png", "images/addon-blueberry-popping-boba-pack.png"],
        tags: ["Add-On", "Popping boba", "Berry"],
        specs: {
            type: "Popping boba",
            flavor: "Blueberry"
        }
    },
    {
        id: 24,
        name: "Cherry Popping boba",
        price: 20,
        description: "Bursting Boba Cherry 300g. Product of Taiwan, repackaged by Bubble & Shake. Add to any drink for an extra burst of cherry sweetness.",
        category: "add-ons",
        icon: "🍒",
        images: ["images/addon-strawberry-watermelon-cherry-popping-boba.png", "images/addon-cherry-popping-boba-pack.png"],
        tags: ["Add-On", "Popping boba", "Fruity"],
        specs: {
            type: "Popping boba",
            flavor: "Cherry"
        }
    },
    {
        id: 33,
        name: "Litchi Popping boba",
        price: 20,
        description: "Bursting Boba Litchi 300g. Product of Taiwan, repackaged by Bubble & Shake. Add to any drink for an extra burst of floral litchi flavor.",
        category: "add-ons",
        icon: "🍇",
        images: ["images/addon-litchi-300g-cup.png", "images/addon-peach-popping-boba-pack.png"],
        tags: ["Add-On", "Popping boba", "Fruity"],
        specs: {
            type: "Popping boba",
            flavor: "Litchi"
        }
    },
    {
        id: 31,
        name: "Mango Popping boba",
        price: 20,
        description: "Bursting Boba Mango 300g. Product of Taiwan, repackaged by Bubble & Shake. Add to any drink for an extra burst of tropical, juicy flavor.",
        category: "add-ons",
        icon: "🥭",
        images: ["images/addon-mango-passionfruit-popping-boba.png", "images/addon-mango-popping-boba-pack.png"],
        tags: ["Add-On", "Popping boba", "Tropical"],
        specs: {
            type: "Popping boba",
            flavor: "Mango"
        }
    },
    {
        id: 26,
        name: "Passion Fruit Popping boba",
        price: 20,
        description: "Bursting Boba Passionfruit 300g. Product of Taiwan, repackaged by Bubble & Shake. Add to any drink for an extra burst of tropical flavor.",
        category: "add-ons",
        icon: "🍈",
        images: ["images/addon-mango-passionfruit-popping-boba.png", "images/addon-passionfruit-popping-boba-pack.png"],
        tags: ["Add-On", "Popping boba", "Tropical"],
        specs: {
            type: "Popping boba",
            flavor: "Passion Fruit"
        }
    },
    {
        id: 27,
        name: "Peach Popping boba",
        price: 20,
        description: "Bursting Boba Peach 300g. Product of Taiwan, repackaged by Bubble & Shake. Add to any drink for an extra burst of peachy flavor.",
        category: "add-ons",
        icon: "🍑",
        images: ["images/addon-peach-popping-boba.png", "images/addon-peach-popping-boba-pack.png"],
        tags: ["Add-On", "Popping boba", "Fruity"],
        specs: {
            type: "Popping boba",
            flavor: "Peach"
        }
    },
    {
        id: 29,
        name: "Strawberry Popping boba",
        price: 20,
        description: "Bursting Boba Strawberry 300g. Product of Taiwan, repackaged by Bubble & Shake. Add to any drink for an extra burst of berry flavor.",
        category: "add-ons",
        icon: "🍓",
        images: ["images/addon-strawberry-popping-boba.png", "images/addon-strawberry-watermelon-cherry-popping-boba.png"],
        tags: ["Add-On", "Popping boba", "Berry"],
        specs: {
            type: "Popping boba",
            flavor: "Strawberry"
        }
    },
    {
        id: 30,
        name: "Watermelon Popping boba",
        price: 20,
        description: "Bursting Boba Watermelon 300g. Product of Taiwan, repackaged by Bubble & Shake. Add to any drink for an extra burst of refreshing flavor.",
        category: "add-ons",
        icon: "🍉",
        images: ["images/addon-strawberry-watermelon-cherry-popping-boba.png", "images/addon-watermelon-popping-boba-pack.png"],
        tags: ["Add-On", "Popping boba", "Refreshing"],
        specs: {
            type: "Popping boba",
            flavor: "Watermelon"
        }
    },
    {
        id: 32,
        name: "Nata De Coco",
        price: 20,
        description: "Nata De Coco Original 300g. Product of Taiwan, repackaged by Bubble & Shake. Soft, translucent coconut jelly pieces in light syrup — add to any drink for a chewy, refreshing topping.",
        category: "add-ons",
        icon: "🥥",
        images: ["images/addon-nata-de-coco.png", "images/addon-nata-de-coco-pack.png"],
        tags: ["Add-On", "Chewy", "Coconut"],
        specs: {
            type: "Add-On",
            texture: "Gelatinous"
        }
    }
];

// DIY Kits — DIY Kit page. What's included matches client flyer; no extra description blurb.
const diyKits = [
    {
        id: 2,
        name: "4 CUPS MILK TEA",
        image: "images/diy-4cup-milk-tea.png",
        price: 450,
        description: "",
        whatsIncluded: [
            "2 cups",
            "2 straws",
            "2 lids",
            "4 × 50g tapioca packets",
            "1 × 200g bag of powder (1 flavour)"
        ]
    },
    {
        id: 1,
        name: "8 CUPS MILK TEA",
        image: "images/diy-8cup-milk-tea.png",
        price: 900,
        description: "",
        whatsIncluded: [
            "4 straws",
            "4 cups",
            "4 lids",
            "8 × 50g tapioca boba packets",
            "2 × 200g bags of powder (2 flavours)"
        ]
    },
    {
        id: 4,
        name: "4 CUPS FRUIT TEA",
        image: "images/diy-4cup-fruit-tea.png",
        price: 350,
        description: "",
        whatsIncluded: [
            "2 cups",
            "2 straws",
            "2 lids",
            "1 × 250ml fruit syrup (1 flavour)",
            "1 × 300g tub of popping boba (1 flavour)"
        ]
    },
    {
        id: 3,
        name: "8 CUPS FRUIT TEA",
        image: "images/diy-8cup-fruit-tea.png",
        price: 700,
        description: "",
        whatsIncluded: [
            "4 cups",
            "4 straws",
            "4 lids",
            "2 × 250ml fruit syrup (2 flavours)",
            "2 × 300g tub of popping boba (2 flavours)"
        ]
    }
];

// Gallery: no old menu picture (deleted per client). Litchi 300g: replace image file when you have the new pic.
// Gallery: old menu picture removed per client; Litchi 300g pic replace when new image available
const galleryExtraImages = [
    { src: "images/gallery-bursting-boba-display.png", title: "Bursting boba & Nata De Coco", caption: "Our range of popping boba and nata de coco" },
    { src: "images/gallery-drinks-row.png", title: "Drink Selection", caption: "A variety of Bubble & Shake drinks" },
    { src: "images/gallery-boba-selection.png", title: "Boba Teas", caption: "Signature boba tea options" },
    { src: "images/gallery-cream-toppings.png", title: "Cream Toppings", caption: "Drinks with cream and toppings" },
    { src: "images/gallery-sparklers.png", title: "Sparklers", caption: "Refreshing sparkling boba drinks" }
];

// Raw Materials Data - Organized by Category
const rawMaterials = [
    // MILK TEA POWDERS - 300G
    { id: 1, name: "Classic Milk Tea", size: "300G", price: 250, category: "milk-tea-powder", unit: "300G", icon: "🧋" },
    { id: 2, name: "Chocolate", size: "300G", price: 250, category: "milk-tea-powder", unit: "300G", icon: "🍫" },
    { id: 3, name: "Coffee", size: "300G", price: 250, category: "milk-tea-powder", unit: "300G", icon: "☕" },
    { id: 4, name: "Matcha", size: "300G", price: 250, category: "milk-tea-powder", unit: "300G", icon: "🍵" },
    { id: 5, name: "Strawberry", size: "300G", price: 250, category: "milk-tea-powder", unit: "300G", icon: "🍓" },
    { id: 6, name: "Taro", size: "300G", price: 250, category: "milk-tea-powder", unit: "300G", icon: "💜" },
    { id: 7, name: "Thai Milk Tea", size: "300G", price: 250, category: "milk-tea-powder", unit: "300G", icon: "🧋" },
    { id: 8, name: "Vanilla", size: "300G", price: 250, category: "milk-tea-powder", unit: "300G", icon: "🍦" },
    
    // MILK TEA POWDERS - 1KG
    { id: 9, name: "Classic Milk Tea", size: "1KG", price: 830, category: "milk-tea-powder", unit: "1KG", icon: "🧋" },
    { id: 10, name: "Chocolate", size: "1KG", price: 830, category: "milk-tea-powder", unit: "1KG", icon: "🍫" },
    { id: 11, name: "Coffee", size: "1KG", price: 830, category: "milk-tea-powder", unit: "1KG", icon: "☕" },
    { id: 12, name: "Matcha", size: "1KG", price: 830, category: "milk-tea-powder", unit: "1KG", icon: "🍵" },
    { id: 13, name: "Strawberry", size: "1KG", price: 830, category: "milk-tea-powder", unit: "1KG", icon: "🍓" },
    { id: 14, name: "Taro", size: "1KG", price: 830, category: "milk-tea-powder", unit: "1KG", icon: "💜" },
    { id: 15, name: "Thai Milk Tea", size: "1KG", price: 830, category: "milk-tea-powder", unit: "1KG", icon: "🧋" },
    { id: 16, name: "Vanilla", size: "1KG", price: 830, category: "milk-tea-powder", unit: "1KG", icon: "🍦" },
    
    // FRUIT TEA SYRUPS - 250ML
    { id: 17, name: "Cherry", size: "250ML", price: 150, category: "fruit-syrup", unit: "250ML", icon: "🍒" },
    { id: 18, name: "Honey Melon", size: "250ML", price: 150, category: "fruit-syrup", unit: "250ML", icon: "🍈" },
    { id: 19, name: "Lemon", size: "250ML", price: 150, category: "fruit-syrup", unit: "250ML", icon: "🍋" },
    { id: 20, name: "Litchi", size: "250ML", price: 150, category: "fruit-syrup", unit: "250ML", icon: "🍇" },
    { id: 21, name: "Mango", size: "250ML", price: 150, category: "fruit-syrup", unit: "250ML", icon: "🥭" },
    { id: 22, name: "Mixed Berry", size: "250ML", price: 150, category: "fruit-syrup", unit: "250ML", icon: "🫐" },
    { id: 23, name: "Passion Fruit", size: "250ML", price: 150, category: "fruit-syrup", unit: "250ML", icon: "🍈" },
    { id: 24, name: "Peach", size: "250ML", price: 150, category: "fruit-syrup", unit: "250ML", icon: "🍑" },
    { id: 25, name: "Strawberry", size: "250ML", price: 150, category: "fruit-syrup", unit: "250ML", icon: "🍓" },
    { id: 26, name: "Watermelon", size: "250ML", price: 150, category: "fruit-syrup", unit: "250ML", icon: "🍉" },
    
    // TOPPINGS (POPPING BOBA) - 300G
    { id: 27, name: "Apple", size: "300G", price: 150, category: "topping", unit: "300G", icon: "🍎" },
    { id: 28, name: "Blueberry", size: "300G", price: 150, category: "topping", unit: "300G", icon: "🫐" },
    { id: 29, name: "Cherry", size: "300G", price: 150, category: "topping", unit: "300G", icon: "🍒" },
    { id: 30, name: "Litchi", size: "300G", price: 150, category: "topping", unit: "300G", icon: "🍇" },
    { id: 31, name: "Mango", size: "300G", price: 150, category: "topping", unit: "300G", icon: "🥭" },
    { id: 32, name: "Nata de Coco", size: "300G", price: 150, category: "topping", unit: "300G", icon: "🥥" },
    { id: 33, name: "Passion Fruit", size: "300G", price: 150, category: "topping", unit: "300G", icon: "🍈" },
    { id: 34, name: "Peach", size: "300G", price: 150, category: "topping", unit: "300G", icon: "🍑" },
    { id: 35, name: "Pomegranate", size: "300G", price: 150, category: "topping", unit: "300G", icon: "🔴" },
    { id: 36, name: "Strawberry", size: "300G", price: 150, category: "topping", unit: "300G", icon: "🍓" },
    { id: 37, name: "Watermelon", size: "300G", price: 150, category: "topping", unit: "300G", icon: "🍉" },
    
    // TOPPINGS (POPPING BOBA) - 3.2KG
    { id: 38, name: "Apple", size: "3.2KG", price: 1600, category: "topping", unit: "3.2KG", icon: "🍎" },
    { id: 39, name: "Blueberry", size: "3.2KG", price: 1600, category: "topping", unit: "3.2KG", icon: "🫐" },
    { id: 40, name: "Cherry", size: "3.2KG", price: 1600, category: "topping", unit: "3.2KG", icon: "🍒" },
    { id: 41, name: "Litchi", size: "3.2KG", price: 1600, category: "topping", unit: "3.2KG", icon: "🍇" },
    { id: 42, name: "Mango", size: "3.2KG", price: 1600, category: "topping", unit: "3.2KG", icon: "🥭" },
    { id: 43, name: "Nata de Coco", size: "3.2KG", price: 1600, category: "topping", unit: "3.2KG", icon: "🥥" },
    { id: 44, name: "Passion Fruit", size: "3.2KG", price: 1600, category: "topping", unit: "3.2KG", icon: "🍈" },
    { id: 45, name: "Peach", size: "3.2KG", price: 1600, category: "topping", unit: "3.2KG", icon: "🍑" },
    { id: 46, name: "Pomegranate", size: "3.2KG", price: 1600, category: "topping", unit: "3.2KG", icon: "🔴" },
    { id: 47, name: "Strawberry", size: "3.2KG", price: 1600, category: "topping", unit: "3.2KG", icon: "🍓" },
    { id: 48, name: "Watermelon", size: "3.2KG", price: 1600, category: "topping", unit: "3.2KG", icon: "🍉" },
    
    // TAPIOCA BOBA PEARLS
    { id: 49, name: "Tapioca Boba Pearls", size: "50G", price: 40, category: "tapioca", unit: "50G", icon: "⚫" },
    { id: 50, name: "Tapioca Boba Pearls", size: "300G", price: 150, category: "tapioca", unit: "300G", icon: "⚫" },
    { id: 51, name: "Tapioca Boba Pearls", size: "1KG", price: 500, category: "tapioca", unit: "1KG", icon: "⚫" },
    { id: 52, name: "Tapioca Boba Pearls", size: "3KG", price: 1500, category: "tapioca", unit: "3KG", icon: "⚫" },
    // PLASTICS (per unit)
    { id: 53, name: "Boba Straw", size: "Per straw", price: 1, category: "plastics", unit: "straw", icon: "🥤" }
];

// Display names for raw material data categories (order form + emails)
const MATERIAL_CATEGORY_LABELS = {
    'milk-tea-powder': 'Milk tea powders',
    'fruit-syrup': 'Fruit Tea syrups',
    'topping': 'Popping boba',
    'tapioca': 'Tapioca boba',
    'plastics': 'Plastics'
};

// Image path for each raw material. Popping boba: use cup pictures when available (replace *-pack.png with *-cup.png).
function getRawMaterialImage(material) {
    if (material.category === 'tapioca') return 'images/addon-tapioca.png';
    if (material.category === 'topping') {
        // Use cup pictures (not container) for popping boba
        const toppingImages = {
            'Apple': 'images/addon-apple-popping-boba.png',
            'Blueberry': 'images/addon-blueberry-popping-boba.png',
            'Cherry': 'images/addon-strawberry-watermelon-cherry-popping-boba.png',
            'Litchi': 'images/addon-litchi-300g-cup.png',
            'Mango': 'images/addon-mango-passionfruit-popping-boba.png',
            'Nata de Coco': 'images/addon-nata-de-coco.png',
            'Passion Fruit': 'images/addon-mango-passionfruit-popping-boba.png',
            'Peach': 'images/addon-peach-popping-boba.png',
            'Pomegranate': 'images/addon-strawberry-watermelon-cherry-popping-boba.png',
            'Strawberry': 'images/addon-strawberry-popping-boba.png',
            'Watermelon': 'images/addon-strawberry-watermelon-cherry-popping-boba.png'
        };
        return toppingImages[material.name] || 'images/gallery-bursting-boba-display.png';
    }
    // Milk tea powders & fruit syrups: icons only (no product photos)
    if (material.category === 'milk-tea-powder' || material.category === 'fruit-syrup') {
        return null;
    }
    // Straws: simple branded SVG (cleaner than stock drink photos)
    if (material.category === 'plastics') {
        return 'images/plastic-boba-straw.svg';
    }
    return null;
}

// Raw Materials page: browse categories (order form uses MATERIAL_CATEGORY_LABELS for line items)
const rawMaterialCategories = {
    'popping-boba': {
        name: 'Popping boba',
        icon: '💥',
        description: 'Popping boba range — one click to choose your flavor',
        image: 'images/gallery-bursting-boba-display.png',
        productCategories: ['topping']
    },
    'tapioca': {
        name: 'Tapioca boba',
        icon: '⚫',
        description: 'Premium tapioca pearls',
        image: 'images/addon-tapioca.png',
        productCategories: ['tapioca']
    },
    'milk-tea-powder': {
        name: 'Milk tea powders',
        icon: '🧋',
        description: 'Price range K20–150; texture: 1 scoop or 300g',
        image: null,
        productCategories: ['milk-tea-powder']
    },
    'fruit-syrup': {
        name: 'Fruit Tea syrups',
        icon: '🍹',
        description: 'Fruit tea syrups — 250ml',
        image: null,
        productCategories: ['fruit-syrup']
    },
    'plastics': {
        name: 'Plastics',
        icon: '🥤',
        description: 'Boba straws and disposable supplies',
        image: 'images/plastic-boba-straw.svg',
        productCategories: ['plastics']
    }
};

// DOM Elements
const menuGrid = document.getElementById('menu-grid');
const categoryTabs = document.querySelectorAll('.category-tab');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');
const drinkModal = document.getElementById('drink-modal');
const closeDrinkModal = document.getElementById('close-drink-modal');

// Build Raw Materials landing page: category cards with images (click to see products)
function renderRawMaterialsCategories() {
    const container = document.getElementById('raw-materials-categories');
    if (!container) return;
    container.innerHTML = Object.entries(rawMaterialCategories).map(([key, cat]) => {
        const imgContent = cat.image
            ? `<img src="${cat.image}" alt="${cat.name}" class="raw-mat-card-image" loading="lazy">`
            : `<div class="raw-mat-card-icon">${cat.icon}</div>`;
        return `
            <div class="raw-mat-card" role="button" tabindex="0" onclick="showRawMaterialsProducts('${key}')" onkeydown="if(event.key==='Enter')showRawMaterialsProducts('${key}')">
                <div class="raw-mat-card-image-wrap">${imgContent}</div>
                <div class="raw-mat-card-body">
                    <h4 class="raw-mat-card-title">${cat.name}</h4>
                    <p class="raw-mat-card-desc">${cat.description}</p>
                </div>
            </div>
        `;
    }).join('');
}

function updateRawMatSingleImage(material) {
    const imgEl = document.getElementById('raw-mat-single-image');
    const iconEl = document.getElementById('raw-mat-single-icon');
    if (!imgEl && !iconEl) return;
    const imgPath = material ? getRawMaterialImage(material) : null;
    if (imgPath && imgEl) {
        imgEl.src = imgPath;
        imgEl.alt = material.name;
        imgEl.style.display = 'block';
        if (iconEl) iconEl.style.display = 'none';
        imgEl.onerror = function() {
            this.style.display = 'none';
            if (iconEl) {
                iconEl.textContent = material ? material.icon : '🍹';
                iconEl.style.display = 'flex';
            }
        };
    } else {
        if (imgEl) imgEl.style.display = 'none';
        if (iconEl) {
            iconEl.textContent = material ? material.icon : '🍹';
            iconEl.style.display = 'flex';
        }
    }
}

function showRawMaterialsProducts(categoryKey) {
    const cat = rawMaterialCategories[categoryKey];
    if (!cat) return;
    const productsWrap = document.getElementById('raw-materials-products-wrap');
    const categoriesEl = document.getElementById('raw-materials-categories');
    const ctaMain = document.getElementById('raw-materials-cta-main');
    if (!productsWrap || !categoriesEl) return;
    const productCats = cat.productCategories || [categoryKey];
    const products = rawMaterials.filter(m => productCats.includes(m.category));
    document.getElementById('raw-mat-products-title').textContent = cat.name + ' — What you can order';
    const productsGrid = document.getElementById('raw-materials-products');
    productsGrid.className = 'raw-materials-products raw-mat-dropdown-layout';

    if (categoryKey === 'milk-tea-powder') {
        const milkPowders = rawMaterials.filter(m => m.category === 'milk-tea-powder');
        const first = milkPowders[0];
        productsGrid.innerHTML = `
            <div class="raw-mat-single-display">
                <div class="raw-mat-single-image-wrap" id="raw-mat-single-image-wrap">
                    <img id="raw-mat-single-image" src="" alt="" class="raw-mat-single-img" style="display:none;">
                    <div class="raw-mat-single-icon" id="raw-mat-single-icon">${first ? first.icon : '🧋'}</div>
                </div>
                <div class="raw-mat-dropdowns">
                    <div class="raw-mat-dropdown-group">
                        <label class="raw-mat-dropdown-label">Milk tea powders</label>
                        <select id="raw-mat-dropdown-milk-powder" class="raw-mat-select">
                            <option value="">— Select powder —</option>
                            ${milkPowders.map(m => `<option value="${m.id}" data-id="${m.id}">${m.name} ${m.size} — K${m.price}</option>`).join('')}
                        </select>
                    </div>
                </div>
            </div>
        `;
        if (first) updateRawMatSingleImage(first);
        document.getElementById('raw-mat-dropdown-milk-powder').addEventListener('change', function() {
            const id = this.value;
            const m = id ? rawMaterials.find(r => r.id === parseInt(id, 10)) : null;
            updateRawMatSingleImage(m);
        });
    } else if (categoryKey === 'fruit-syrup') {
        const fruitSyrups = rawMaterials.filter(m => m.category === 'fruit-syrup');
        const first = fruitSyrups[0];
        productsGrid.innerHTML = `
            <div class="raw-mat-single-display">
                <div class="raw-mat-single-image-wrap" id="raw-mat-single-image-wrap">
                    <img id="raw-mat-single-image" src="" alt="" class="raw-mat-single-img" style="display:none;">
                    <div class="raw-mat-single-icon" id="raw-mat-single-icon">${first ? first.icon : '🍹'}</div>
                </div>
                <div class="raw-mat-dropdowns">
                    <div class="raw-mat-dropdown-group">
                        <label class="raw-mat-dropdown-label">Fruit Tea syrups</label>
                        <select id="raw-mat-dropdown-fruit-syrup" class="raw-mat-select">
                            <option value="">— Select flavor —</option>
                            ${fruitSyrups.map(m => `<option value="${m.id}" data-id="${m.id}">${m.name} ${m.size} — K${m.price}</option>`).join('')}
                        </select>
                    </div>
                </div>
            </div>
        `;
        if (first) updateRawMatSingleImage(first);
        document.getElementById('raw-mat-dropdown-fruit-syrup').addEventListener('change', function() {
            const id = this.value;
            const m = id ? rawMaterials.find(r => r.id === parseInt(id, 10)) : null;
            updateRawMatSingleImage(m);
        });
    } else if (categoryKey === 'plastics') {
        const plastics = rawMaterials.filter(m => m.category === 'plastics');
        const first = plastics[0];
        productsGrid.innerHTML = `
            <div class="raw-mat-single-display">
                <div class="raw-mat-single-image-wrap" id="raw-mat-single-image-wrap">
                    <img id="raw-mat-single-image" src="" alt="" class="raw-mat-single-img" style="display:none;">
                    <div class="raw-mat-single-icon" id="raw-mat-single-icon" style="display:flex">${first ? first.icon : '🥤'}</div>
                </div>
                <div class="raw-mat-dropdowns">
                    <div class="raw-mat-dropdown-group">
                        <label class="raw-mat-dropdown-label">Plastics</label>
                        <select id="raw-mat-dropdown-plastics" class="raw-mat-select">
                            <option value="">— Select item —</option>
                            ${plastics.map(m => `<option value="${m.id}">${m.name} — K${m.price}/${m.unit}</option>`).join('')}
                        </select>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('raw-mat-dropdown-plastics').addEventListener('change', function() {
            const id = this.value;
            const m = id ? rawMaterials.find(r => r.id === parseInt(id, 10)) : null;
            updateRawMatSingleImage(m);
        });
    } else if (categoryKey === 'popping-boba') {
        const toppings = rawMaterials.filter(m => m.category === 'topping');
        const first = toppings[0];
        productsGrid.innerHTML = `
            <div class="raw-mat-single-display">
                <div class="raw-mat-single-image-wrap" id="raw-mat-single-image-wrap">
                    <img id="raw-mat-single-image" src="${first ? (getRawMaterialImage(first) || '') : ''}" alt="${first ? first.name : ''}" class="raw-mat-single-img" ${first && getRawMaterialImage(first) ? '' : 'style="display:none"'}>
                    <div class="raw-mat-single-icon" id="raw-mat-single-icon" style="display:${first && getRawMaterialImage(first) ? 'none' : 'flex'}">${first ? first.icon : '💥'}</div>
                </div>
                <div class="raw-mat-dropdowns">
                    <div class="raw-mat-dropdown-group">
                        <label class="raw-mat-dropdown-label">Popping boba flavors</label>
                        <select id="raw-mat-dropdown-topping" class="raw-mat-select">
                            <option value="">— Select flavor —</option>
                            ${toppings.map(m => `<option value="${m.id}" data-id="${m.id}">${m.name} ${m.size} — K${m.price}</option>`).join('')}
                        </select>
                    </div>
                </div>
            </div>
        `;
        if (first) updateRawMatSingleImage(first);
        document.getElementById('raw-mat-dropdown-topping').addEventListener('change', function() {
            const id = this.value;
            const m = id ? rawMaterials.find(r => r.id === parseInt(id, 10)) : null;
            updateRawMatSingleImage(m);
        });
    } else if (categoryKey === 'tapioca') {
        const tapioca = rawMaterials.filter(m => m.category === 'tapioca');
        const first = tapioca[0];
        productsGrid.innerHTML = `
            <div class="raw-mat-single-display">
                <div class="raw-mat-single-image-wrap" id="raw-mat-single-image-wrap">
                    <img id="raw-mat-single-image" src="images/addon-tapioca.png" alt="Tapioca" class="raw-mat-single-img">
                    <div class="raw-mat-single-icon" id="raw-mat-single-icon" style="display:none"></div>
                </div>
                <div class="raw-mat-dropdowns">
                    <div class="raw-mat-dropdown-group">
                        <label class="raw-mat-dropdown-label">Tapioca boba size</label>
                        <select id="raw-mat-dropdown-tapioca" class="raw-mat-select">
                            <option value="">— Select size —</option>
                            ${tapioca.map(m => `<option value="${m.id}">${m.name} ${m.size} — K${m.price}</option>`).join('')}
                        </select>
                    </div>
                </div>
            </div>
        `;
        updateRawMatSingleImage(first);
    } else {
        productsGrid.className = 'raw-materials-products';
        productsGrid.innerHTML = products.map(m => {
            const imgPath = getRawMaterialImage(m);
            const imgContent = imgPath
                ? `<img src="${imgPath}" alt="${m.name}" class="raw-mat-product-image" loading="lazy">`
                : `<div class="raw-mat-product-icon">${m.icon}</div>`;
            return `
                <div class="raw-mat-product-card">
                    <div class="raw-mat-product-image-wrap">${imgContent}</div>
                    <div class="raw-mat-product-body">
                        <h5 class="raw-mat-product-name">${m.name}</h5>
                        <p class="raw-mat-product-size">${m.size}</p>
                        <p class="raw-mat-product-price">K${m.price}</p>
                    </div>
                </div>
            `;
        }).join('');
    }
    categoriesEl.style.display = 'none';
    ctaMain.style.display = 'none';
    productsWrap.style.display = 'block';
}

function showRawMaterialsCategories() {
    const productsWrap = document.getElementById('raw-materials-products-wrap');
    const categoriesEl = document.getElementById('raw-materials-categories');
    const ctaMain = document.getElementById('raw-materials-cta-main');
    if (productsWrap) productsWrap.style.display = 'none';
    if (categoriesEl) categoriesEl.style.display = 'grid';
    if (ctaMain) ctaMain.style.display = 'block';
}

// Build gallery from galleryExtraImages only (menu + your photos; no individual drink pics)
function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    const all = galleryExtraImages;
    grid.innerHTML = all.map((entry, i) => {
        const featured = i === 0 ? ' gallery-featured' : '';
        return `
            <div class="gallery-full-item${featured}">
                <img src="${entry.src}" alt="${entry.title}" class="gallery-image" loading="lazy">
                <div class="gallery-overlay">
                    <h4>${entry.title}</h4>
                    <p>${entry.caption || ''}</p>
                </div>
            </div>
        `;
    }).join('');
}

// Render DIY Kit page from diyKits array (edit diyKits in script.js to add pictures and cost)
function renderDiyKits() {
    const grid = document.getElementById('diy-kit-grid');
    if (!grid || typeof diyKits === 'undefined') return;
    grid.innerHTML = diyKits.map(kit => {
        const priceText = kit.price > 0 ? `K${kit.price}` : 'Price on request';
        const listHtml = (kit.whatsIncluded && kit.whatsIncluded.length) ? `<ul class="diy-kit-included">${kit.whatsIncluded.map(item => `<li>${item}</li>`).join('')}</ul>` : '';
        return `
            <div class="diy-kit-card">
                <div class="diy-kit-image-wrap">
                    <img src="${kit.image}" alt="${kit.name}" class="diy-kit-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="diy-kit-image-placeholder" style="display: none;">📦</div>
                </div>
                <div class="diy-kit-info">
                    <h3 class="diy-kit-name">${kit.name}</h3>
                    <p class="diy-kit-price">${priceText}</p>
                    ${kit.description ? `<p class="diy-kit-description">${kit.description}</p>` : ''}
                    ${listHtml ? `<p class="diy-kit-included-title">What's included</p>${listHtml}` : ''}
                </div>
            </div>
        `;
    }).join('');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderMenuItems('all');
    renderGallery();
    renderRawMaterialsCategories();
    renderDiyKits();
    setupEventListeners();
    setupDateValidation();
    setupGiftCardAmountToggle();
});

// Setup date validation - set minimum date to today
function setupDateValidation() {
    const eventDateInput = document.getElementById('event-date');
    if (eventDateInput) {
        // Set minimum date to today
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const minDate = `${year}-${month}-${day}`;
        eventDateInput.setAttribute('min', minDate);
        
        // Add validation on change
        eventDateInput.addEventListener('change', function() {
            const selectedDate = new Date(this.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                alert('⚠️ Event date cannot be in the past. Please select today or a future date.');
                this.value = minDate; // Reset to today
                return;
            }
            
            // Check if date is too far in the future (max 5 years)
            const maxDate = new Date();
            maxDate.setFullYear(maxDate.getFullYear() + 5);
            if (selectedDate > maxDate) {
                alert('⚠️ Event date cannot be more than 5 years in the future. Please select a realistic date.');
                const maxDateStr = `${maxDate.getFullYear()}-${String(maxDate.getMonth() + 1).padStart(2, '0')}-${String(maxDate.getDate()).padStart(2, '0')}`;
                this.value = maxDateStr;
            }
        });
    }
}

// Update menu single image when dropdown selection changes (fruit teas: one picture)
function updateMenuSingleImage(item) {
    const imgEl = document.getElementById('menu-single-image');
    const iconEl = document.getElementById('menu-single-icon');
    if (!imgEl && !iconEl) return;
    const firstImage = item && ((item.images && item.images[0]) || item.image);
    if (firstImage && imgEl) {
        imgEl.src = firstImage;
        imgEl.alt = item.name;
        imgEl.style.display = 'block';
        if (iconEl) iconEl.style.display = 'none';
        imgEl.onerror = function() {
            this.style.display = 'none';
            if (iconEl) {
                iconEl.textContent = item ? item.icon : '🍹';
                iconEl.style.display = 'flex';
            }
        };
    } else {
        if (imgEl) imgEl.style.display = 'none';
        if (iconEl) {
            iconEl.textContent = item ? item.icon : '🍹';
            iconEl.style.display = 'flex';
        }
    }
}

// Render Menu Items — grid for most categories; Signature fruit teas: one image + dropdown
function renderMenuItems(category) {
    menuGrid.innerHTML = '';
    menuGrid.className = 'menu-grid';
    const filteredItems = category === 'all'
        ? menuItems
        : menuItems.filter(item => item.category === category);

    // Signature fruit teas: one picture + dropdown (client: delete all fruit tea pictures, keep one)
    if (category === 'fruit-tea' && filteredItems.length > 0) {
        menuGrid.classList.add('menu-dropdown-layout');
        const first = filteredItems[0];
        const firstImage = (first.images && first.images[0]) || first.image;
        menuGrid.innerHTML = `
            <div class="menu-single-display">
                <div class="menu-single-image-wrap" id="menu-single-image-wrap" role="button" tabindex="0">
                    <img id="menu-single-image" src="${firstImage || ''}" alt="${first.name}" class="menu-single-img" style="${firstImage ? '' : 'display:none'}">
                    <div class="menu-single-icon" id="menu-single-icon" style="${firstImage ? 'display:none' : 'display:flex'}">${first.icon}</div>
                </div>
                <div class="menu-single-dropdowns">
                    <div class="menu-dropdown-group">
                        <label class="menu-dropdown-label">Signature fruit teas</label>
                        <select id="menu-dropdown-fruit-tea" class="menu-select">
                            ${filteredItems.map(m => `<option value="${m.id}">${m.name} — K${m.price}</option>`).join('')}
                        </select>
                    </div>
                    <p class="menu-single-hint">Select a drink • Click image for details</p>
                </div>
            </div>
        `;
        updateMenuSingleImage(first);
        const wrap = document.getElementById('menu-single-image-wrap');
        const selectEl = document.getElementById('menu-dropdown-fruit-tea');
        selectEl.addEventListener('change', function() {
            const item = menuItems.find(i => i.id === parseInt(this.value, 10));
            updateMenuSingleImage(item);
        });
        wrap.addEventListener('click', function() {
            const id = selectEl.value ? parseInt(selectEl.value, 10) : null;
            if (id) showDrinkDetails(id);
        });
        wrap.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && selectEl.value) showDrinkDetails(parseInt(selectEl.value, 10));
        });
        return;
    }

    filteredItems.forEach(item => {
        const menuItemEl = document.createElement('div');
        menuItemEl.className = 'menu-item';
        menuItemEl.onclick = () => showDrinkDetails(item.id);
        const shortDescription = item.description.split('.')[0] + '.';
        const tagsHTML = item.tags.map(tag => `<span class="item-tag">${tag}</span>`).join('');
        const firstImage = (item.images && item.images[0]) || item.image;
        const imageContent = firstImage
            ? `<img src="${firstImage}" alt="${item.name}" class="item-image-photo" />`
            : item.icon;
        const priceDisplay = item.price > 0 ? `K${item.price}` : 'Price on request';
        menuItemEl.innerHTML = `
            <div class="item-icon-only">${item.icon}</div>
            <div class="item-image">${imageContent}</div>
            <span class="item-category">${item.category}</span>
            <div class="item-details">
                <div class="item-header">
                    <h3 class="item-name">${item.name}</h3>
                    <span class="item-price">${priceDisplay}</span>
                </div>
                <p class="item-description">${shortDescription}</p>
                <div class="item-tags-container">${tagsHTML}</div>
            </div>
        `;
        menuGrid.appendChild(menuItemEl);
    });
}

// Modal gallery: current image index for multi-image add-ons
let modalGalleryIndex = 0;
let modalGalleryImages = [];

function updateModalGalleryPhoto() {
    const photo = document.querySelector('.drink-modal-gallery .drink-modal-photo');
    const counter = document.querySelector('.drink-modal-photo-counter');
    if (!photo || !modalGalleryImages.length) return;
    modalGalleryIndex = Math.max(0, Math.min(modalGalleryIndex, modalGalleryImages.length - 1));
    photo.src = modalGalleryImages[modalGalleryIndex];
    photo.alt = document.querySelector('.drink-modal-name')?.textContent || '';
    if (counter) {
        counter.textContent = modalGalleryImages.length > 1 ? `${modalGalleryIndex + 1} of ${modalGalleryImages.length}` : '';
        counter.style.display = modalGalleryImages.length > 1 ? 'block' : 'none';
    }
    const prevBtn = document.querySelector('.drink-modal-prev');
    const nextBtn = document.querySelector('.drink-modal-next');
    if (prevBtn) prevBtn.style.display = modalGalleryImages.length > 1 ? 'flex' : 'none';
    if (nextBtn) nextBtn.style.display = modalGalleryImages.length > 1 ? 'flex' : 'none';
}

// Show Drink Details Modal
function showDrinkDetails(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;
    
    const modalIcon = document.querySelector('.drink-modal-icon');
    const modalGallery = document.querySelector('.drink-modal-gallery');
    const modalPhoto = modalGallery?.querySelector('.drink-modal-photo');
    const prevBtn = document.querySelector('.drink-modal-prev');
    const nextBtn = document.querySelector('.drink-modal-next');

    const imageList = (item.images && item.images.length) ? item.images : (item.image ? [item.image] : []);

    if (imageList.length && modalGallery && modalPhoto) {
        modalIcon.style.display = 'none';
        modalGallery.style.display = 'flex';
        modalGalleryImages = imageList;
        modalGalleryIndex = 0;
        updateModalGalleryPhoto();
    } else {
        modalIcon.textContent = item.icon;
        modalIcon.style.display = '';
        if (modalGallery) modalGallery.style.display = 'none';
        modalGalleryImages = [];
    }
    const categoryLabels = { 'milk-tea': 'Signature milk tea', 'fruit-tea': 'Signature fruit tea', 'pure-sparkler': 'Pure sparkler', 'syrup-sparkler': 'Syrup sparkler', 'add-ons': 'Add-on' };
    document.querySelector('.drink-modal-category').textContent = categoryLabels[item.category] || item.category;
    document.querySelector('.drink-modal-name').textContent = item.name;
    document.querySelector('.drink-modal-price').textContent = item.price > 0 ? `K${item.price}` : 'Price on request';
    document.querySelector('.drink-modal-description').textContent = item.description;
    
    // Populate tags
    const tagsHTML = item.tags.map(tag => `<span class="item-tag">${tag}</span>`).join('');
    document.querySelector('.drink-modal-tags').innerHTML = tagsHTML;
    
    // Populate specs - handle different item types (drinks vs add-ons). No sweetness or temperature.
    const specItems = document.querySelectorAll('.spec-item');
    const addonSpecItems = document.querySelectorAll('.spec-item-addon');
    
    // For drinks (milk-tea, fruit-tea): show only Base
    if (item.specs.base) {
        specItems[0].querySelector('.spec-label').textContent = 'Base';
        specItems[0].querySelector('.spec-value').textContent = item.specs.base;
        addonSpecItems.forEach(el => { el.style.display = 'none'; });
    }
    // For add-ons: show Type, Flavor, Texture
    else if (item.specs.type) {
        specItems[0].querySelector('.spec-label').textContent = 'Type';
        specItems[0].querySelector('.spec-value').textContent = item.specs.type;
        addonSpecItems.forEach((el, i) => {
            el.style.display = 'flex';
            el.querySelector('.spec-label').textContent = i === 0 ? 'Flavor' : 'Texture';
            el.querySelector('.spec-value').textContent = i === 0 ? (item.specs.flavor || 'N/A') : (item.specs.texture || 'N/A');
        });
    }
    
    // Show modal
    drinkModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Drink Details Modal
function closeDrinkDetailsModal() {
    drinkModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Modal Event Listeners
closeDrinkModal.addEventListener('click', closeDrinkDetailsModal);

drinkModal.querySelector('.drink-modal-overlay').addEventListener('click', closeDrinkDetailsModal);

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drinkModal.classList.contains('active')) {
        closeDrinkDetailsModal();
    }
});

// Modal gallery arrows
document.querySelector('.drink-modal-prev')?.addEventListener('click', () => {
    if (modalGalleryImages.length <= 1) return;
    modalGalleryIndex = (modalGalleryIndex - 1 + modalGalleryImages.length) % modalGalleryImages.length;
    updateModalGalleryPhoto();
});
document.querySelector('.drink-modal-next')?.addEventListener('click', () => {
    if (modalGalleryImages.length <= 1) return;
    modalGalleryIndex = (modalGalleryIndex + 1) % modalGalleryImages.length;
    updateModalGalleryPhoto();
});

// Category Filter
categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        categoryTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        // Render filtered items
        const category = tab.getAttribute('data-category');
        renderMenuItems(category);
    });
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(45deg) translateY(8px)' 
        : 'none';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(-45deg) translateY(-8px)' 
        : 'none';
});

// Close mobile menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth Scroll Function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Open Section Page
function openSection(sectionName) {
    const sectionPage = document.getElementById(`${sectionName}-page`);
    if (sectionPage) {
        sectionPage.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (sectionName === 'faqs') resetFAQs();
        if (sectionName === 'diy-kit') renderDiyKits();
    }
}

// Close Section Page
function closeSection() {
    const allSections = document.querySelectorAll('.section-page');
    allSections.forEach(section => {
        section.classList.remove('active');
    });
    document.body.style.overflow = 'auto';
}

// Close section on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeSection();
        closeCateringQuote();
    }
});

// Close section when clicking overlay
document.querySelectorAll('.section-page-overlay').forEach(overlay => {
    overlay.addEventListener('click', function() {
        closeSection();
        closeCateringQuote();
        closeRawMaterialsOrder();
    });
});

// Catering Terms & Conditions tabs (numbered sections on catering page)
const cateringTcLabels = {
    1: 'Pricing',
    2: 'Minimum Order',
    3: 'Order Notice',
    5: 'Event Setup',
    6: 'Delivery & Collection',
    7: 'Payment Terms',
    8: 'Changes & Cancellations',
    9: 'Product Quality'
};

function showCateringTcTab(num) {
    document.querySelectorAll('.catering-tc-tab').forEach(tab => {
        const n = parseInt(tab.getAttribute('data-catering-tc'), 10);
        const active = n === num;
        tab.classList.toggle('active', active);
        tab.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    document.querySelectorAll('.catering-tc-panel').forEach(panel => {
        const match = panel.id && panel.id.match(/catering-tc-panel-(\d+)/);
        const panelNum = match ? parseInt(match[1], 10) : null;
        const active = panelNum === num;
        panel.classList.toggle('active', active);
        if (active) {
            panel.removeAttribute('hidden');
        } else {
            panel.setAttribute('hidden', '');
        }
    });
    const labelEl = document.getElementById('catering-tc-tab-label');
    if (labelEl) {
        labelEl.textContent = cateringTcLabels[num] || '';
    }
}

// Catering Quote Functions
function openCateringQuote() {
    closeSection(); // Close the catering info page
    const quotePage = document.getElementById('catering-quote-page');
    if (quotePage) {
        quotePage.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Initialize with one drink selection
        if (document.querySelectorAll('.drink-selection-item').length === 0) {
            addDrinkSelection();
        }
        // Reset and set date validation when opening the form
        setupDateValidation();
    }
}

function closeCateringQuote() {
    const quotePage = document.getElementById('catering-quote-page');
    if (quotePage) {
        quotePage.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

let drinkSelectionCount = 0;

function addDrinkSelection() {
    drinkSelectionCount++;
    const container = document.getElementById('drink-selection-container');
    const drinkItem = document.createElement('div');
    drinkItem.className = 'drink-selection-item';
    drinkItem.id = `drink-selection-${drinkSelectionCount}`;
    
    // Create drink options from menuItems
    const drinkOptions = menuItems.map(item => 
        `<option value="${item.id}" data-price="${item.price}">${item.name} - K${item.price}</option>`
    ).join('');
    
    drinkItem.innerHTML = `
        <div class="drink-selection-header">
            <span class="drink-number">Drink ${drinkSelectionCount}</span>
            ${drinkSelectionCount > 1 ? `<button type="button" class="remove-drink-button" onclick="removeDrinkSelection(${drinkSelectionCount})">Remove</button>` : ''}
        </div>
        <div class="form-row">
            <div class="form-group drink-select-group">
                <label>Select Drink *</label>
                <select name="drink-${drinkSelectionCount}" class="drink-select" data-drink-id="${drinkSelectionCount}" required>
                    <option value="">Choose a drink</option>
                    ${drinkOptions}
                </select>
            </div>
            <div class="form-group quantity-group">
                <label>Quantity *</label>
                <input type="number" name="quantity-${drinkSelectionCount}" class="drink-quantity" data-drink-id="${drinkSelectionCount}" min="1" value="1" required>
            </div>
        </div>
    `;
    
    container.appendChild(drinkItem);
    
    // Add event listeners for real-time calculation
    const select = drinkItem.querySelector('.drink-select');
    const quantityInput = drinkItem.querySelector('.drink-quantity');
    
    select.addEventListener('change', calculateOrderTotal);
    quantityInput.addEventListener('input', calculateOrderTotal);
    
    // Calculate total after adding
    calculateOrderTotal();
}

function removeDrinkSelection(id) {
    const item = document.getElementById(`drink-selection-${id}`);
    if (item) {
        item.remove();
        calculateOrderTotal();
    }
}

function calculateOrderTotal() {
    const container = document.getElementById('drink-selection-container');
    const drinkItems = container.querySelectorAll('.drink-selection-item');
    
    let totalPrice = 0;
    const orderSummaryItems = [];
    
    drinkItems.forEach((item) => {
        const select = item.querySelector('.drink-select');
        const quantityInput = item.querySelector('.drink-quantity');
        
        const drinkId = select.value;
        const quantity = parseInt(quantityInput.value) || 0;
        
        if (drinkId && quantity > 0) {
            // Find the drink in menuItems
            const selectedDrink = menuItems.find(d => d.id == drinkId);
            
            if (selectedDrink) {
                const itemTotal = selectedDrink.price * quantity;
                totalPrice += itemTotal;
                
                orderSummaryItems.push({
                    name: selectedDrink.name,
                    price: selectedDrink.price,
                    quantity: quantity,
                    total: itemTotal
                });
            }
        }
    });
    
    // Update order summary display
    const summaryContainer = document.getElementById('order-summary-items');
    
    if (orderSummaryItems.length === 0) {
        summaryContainer.innerHTML = '<p class="no-drinks-message">No drinks selected yet. Add drinks above to see your total.</p>';
    } else {
        summaryContainer.innerHTML = orderSummaryItems.map(item => `
            <div class="summary-item">
                <span class="summary-item-name">${item.name} × ${item.quantity}</span>
                <span class="summary-item-price">K${item.total}</span>
            </div>
        `).join('');
    }
    
    // Update total price
    document.getElementById('order-total-price').textContent = `K${totalPrice}`;
}

// Contact form submission
document.getElementById('contact-form-page')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Rate limiting check
    if (!checkRateLimit('contact')) {
        alert('⚠️ Too many submissions. Please wait a few minutes before trying again.');
        return;
    }
    
    const formData = new FormData(e.target);
    let name = formData.get('name') || e.target.querySelector('input[type="text"]').value;
    let email = formData.get('email') || e.target.querySelector('input[type="email"]').value;
    let subject = formData.get('subject') || e.target.querySelector('input[type="text"]:nth-of-type(2)')?.value || 'General Inquiry';
    let message = formData.get('message') || e.target.querySelector('textarea').value;
    
    // Sanitize inputs
    name = sanitizeInput(name);
    email = sanitizeInput(email);
    subject = sanitizeInput(subject);
    message = sanitizeInput(message);
    
    // Validation
    if (!name || name.length < 2 || name.length > 100) {
        alert('⚠️ Please enter a valid name (2-100 characters).');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('⚠️ Please enter a valid email address.');
        return;
    }
    
    if (!message || message.length < 10 || message.length > 5000) {
        alert('⚠️ Please enter a message (10-5000 characters).');
        return;
    }
    
    // Send email via EmailJS
    if (EMAIL_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY_HERE') {
        ensureEmailJSReady();
        try {
            const emailParams = {
                to_name: 'Bubble & Shake Team',
                to_email: EMAIL_CONFIG.RECIPIENT_EMAIL,
                from_name: name,
                from_email: email,
                reply_to: email,  // This allows you to reply directly to the customer
                customer_email: email,  // Display customer email in template
                customer_name: name,  // Display customer name in template
                subject: subject || 'General Inquiry',
                message: message,
                submission_date: new Date().toLocaleString(),
                // Empty fields for catering (so template shows structure)
                phone: '',
                company: '',
                event_type: '',
                event_date: '',
                guest_count: '',
                location: '',
                drinks_list: '',
                total: '',
                notes: ''
            };
            
            console.log('Sending contact email with params:', emailParams);
            
            await emailjs.send(
                EMAIL_CONFIG.SERVICE_ID,
                EMAIL_CONFIG.CONTACT_TEMPLATE_ID,
                emailParams
            );
            
            console.log('Contact email sent successfully!');
            
            e.target.reset();
            showNotification(
                'Message Sent Successfully!',
                'Thank you for reaching out! We\'ve received your inquiry and will get back to you within 24 hours.',
                '✓'
            );
        } catch (error) {
            console.error('Email sending failed:', error);
            console.error('Error details:', {
                status: error.status,
                text: error.text,
                message: error.message
            });
            e.target.reset();
            showNotification(
                'Message Received!',
                `Thank you for your message! We'll get back to you soon. If urgent, please email us directly at ${EMAIL_CONFIG.RECIPIENT_EMAIL}`,
                '✓'
            );
        }
    } else {
        e.target.reset();
            showNotification(
                'Message Received!',
                'Thank you for your message! We\'ll get back to you within 24 hours.',
                '✓'
            );
    }
});

// Catering quote form submission
document.getElementById('catering-quote-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Rate limiting check
    if (!checkRateLimit('catering')) {
        alert('⚠️ Too many submissions. Please wait a few minutes before trying again.');
        return;
    }
    
    // Collect form data
    const formData = new FormData(e.target);
    
    // Validate and sanitize inputs
    const name = sanitizeInput(formData.get('name'));
    const email = sanitizeInput(formData.get('email'));
    const phone = sanitizeInput(formData.get('phone'));
    const company = sanitizeInput(formData.get('company'));
    
    // Validation checks
    if (!name || name.length < 2 || name.length > 100) {
        alert('⚠️ Please enter a valid name (2-100 characters).');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('⚠️ Please enter a valid email address.');
        return;
    }
    
    if (!isValidPhone(phone)) {
        alert('⚠️ Please enter a valid phone number.');
        return;
    }
    
    const data = {
        client: {
            name: name,
            email: email,
            phone: phone,
            company: company
        },
        event: {
            type: sanitizeInput(formData.get('event-type')),
            date: sanitizeInput(formData.get('event-date')),
            guests: parseInt(formData.get('guests')) || 0,
            location: sanitizeInput(formData.get('location'))
        },
        drinks: [],
        notes: sanitizeInput(formData.get('notes'))
    };
    
    // Validate event details
    if (!data.event.type || !data.event.date || !data.event.location) {
        alert('⚠️ Please fill in all required event details.');
        return;
    }
    
    // Validate event date - must be today or in the future
    const eventDate = new Date(data.event.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate comparison
    
    if (eventDate < today) {
        alert('⚠️ Event date cannot be in the past. Please select today or a future date.');
        return;
    }
    
    // Validate date is not too far in the future (max 5 years)
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 5);
    if (eventDate > maxDate) {
        alert('⚠️ Event date cannot be more than 5 years in the future. Please select a realistic date.');
        return;
    }
    
    if (data.event.guests < 1 || data.event.guests > 10000) {
        alert('⚠️ Please enter a valid number of guests (1-10000).');
        return;
    }
    
    // Collect drink selections
    const drinkItems = document.querySelectorAll('.drink-selection-item');
    drinkItems.forEach((item) => {
        // Get the drink selection number from the select element's name attribute
        const selectElement = item.querySelector('.drink-select');
        const quantityElement = item.querySelector('.drink-quantity');
        
        if (!selectElement || !quantityElement) return;
        
        const selectName = selectElement.getAttribute('name');
        const quantityName = quantityElement.getAttribute('name');
        
        const drinkId = formData.get(selectName);
        const quantity = formData.get(quantityName);
        
        if (drinkId && quantity) {
            const drink = menuItems.find(d => d.id == drinkId);
            if (drink) {
                data.drinks.push({
                    name: drink.name,
                    quantity: parseInt(quantity),
                    price: drink.price,
                    subtotal: drink.price * parseInt(quantity)
                });
            }
        }
    });
    
    // Calculate total
    const total = data.drinks.reduce((sum, drink) => sum + drink.subtotal, 0);
    
    // Prepare drink list for email
    const drinksList = data.drinks.map(d => 
        `${d.quantity}x ${d.name} - K${d.subtotal}`
    ).join('\n');
    
    // Send email via EmailJS
    if (EMAIL_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY_HERE') {
        ensureEmailJSReady();
        try {
            const emailParams = {
                to_name: 'Bubble & Shake Team',
                to_email: EMAIL_CONFIG.RECIPIENT_EMAIL,
                from_name: data.client.name,
                from_email: data.client.email,
                reply_to: data.client.email,  // This allows you to reply directly to the customer
                customer_email: data.client.email,  // Display customer email in template
                customer_name: data.client.name,  // Display customer name in template
                phone: data.client.phone,
                company: data.client.company || 'N/A',
                event_type: data.event.type,
                event_date: data.event.date,
                guest_count: data.event.guests.toString(),
                location: data.event.location,
                drinks_list: drinksList || 'No drinks selected',
                total: `K${total}`,
                notes: data.notes || 'None',
                submission_date: new Date().toLocaleString(),
                // Empty fields for contact form (so template shows structure)
                subject: '',
                message: ''
            };
            
            console.log('Sending catering email with params:', emailParams);
            
            await emailjs.send(
                EMAIL_CONFIG.SERVICE_ID,
                EMAIL_CONFIG.CATERING_TEMPLATE_ID,
                emailParams
            );
            
            console.log('Catering email sent successfully!');
            
            // Reset form and close
            e.target.reset();
            document.getElementById('drink-selection-container').innerHTML = '';
            drinkSelectionCount = 0;
            closeCateringQuote();
            showNotification(
                'Quote Request Sent!',
                `Thank you for your catering request! We've received your order for ${data.event.type} on ${data.event.date}. Estimated total: K${total}. We'll contact you within 24 hours to confirm details.`,
                '✓'
            );
        } catch (error) {
            console.error('Email sending failed:', error);
            console.error('Error details:', {
                status: error.status,
                text: error.text,
                message: error.message
            });
            // Reset form and close
            e.target.reset();
            document.getElementById('drink-selection-container').innerHTML = '';
            drinkSelectionCount = 0;
            closeCateringQuote();
            showNotification(
                'Quote Request Received!',
                `Thank you! Your catering request has been received. Estimated total: K${total}. We'll contact you within 24 hours. If urgent, please email us at ${EMAIL_CONFIG.RECIPIENT_EMAIL}`,
                '✓'
            );
        }
    } else {
        // Email not configured yet
        // Reset form and close
        e.target.reset();
        document.getElementById('drink-selection-container').innerHTML = '';
        drinkSelectionCount = 0;
        closeCateringQuote();
        showNotification(
            'Quote Request Received!',
            `Thank you for your catering request for ${data.event.type} on ${data.event.date}. Estimated total: K${total}. We'll contact you within 24 hours.`,
            '✓'
        );
    }
});

// Raw Materials Order Functions
function openRawMaterialsOrder() {
    closeSection(); // Close the raw materials info page
    const orderPage = document.getElementById('raw-materials-order-page');
    if (orderPage) {
        orderPage.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Initialize with one material selection
        if (document.querySelectorAll('.material-selection-item').length === 0) {
            addMaterialSelection();
        }
        // Setup delivery date validation
        setupRawMaterialsDateValidation();
    }
}

function closeRawMaterialsOrder() {
    const orderPage = document.getElementById('raw-materials-order-page');
    if (orderPage) {
        orderPage.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

let materialSelectionCount = 0;

function addMaterialSelection() {
    materialSelectionCount++;
    const container = document.getElementById('material-selection-container');
    const materialItem = document.createElement('div');
    materialItem.className = 'material-selection-item drink-selection-item';
    materialItem.id = `material-selection-${materialSelectionCount}`;
    
    // Create category options
    const categoryOptions = Object.keys(rawMaterialCategories).map(catKey => {
        const cat = rawMaterialCategories[catKey];
        return `<option value="${catKey}">${cat.icon} ${cat.name}</option>`;
    }).join('');
    
    materialItem.innerHTML = `
        <div class="drink-selection-header">
            <span class="drink-number">Material ${materialSelectionCount}</span>
            ${materialSelectionCount > 1 ? `<button type="button" class="remove-drink-button" onclick="removeMaterialSelection(${materialSelectionCount})">Remove</button>` : ''}
        </div>
        <div class="form-row">
            <div class="form-group drink-select-group">
                <label>Select Category *</label>
                <select name="category-${materialSelectionCount}" class="material-category-select" data-material-id="${materialSelectionCount}" required>
                    <option value="">Choose a category</option>
                    ${categoryOptions}
                </select>
            </div>
        </div>
        <div class="form-row material-details-row" style="display: none;">
            <div class="form-group drink-select-group">
                <label>Select Material *</label>
                <select name="material-${materialSelectionCount}" class="material-select drink-select" data-material-id="${materialSelectionCount}" required>
                    <option value="">Choose a material</option>
                </select>
            </div>
            <div class="form-group quantity-group">
                <label>Quantity *</label>
                <input type="number" name="quantity-${materialSelectionCount}" class="material-quantity drink-quantity" data-material-id="${materialSelectionCount}" min="1" step="0.1" value="1" required>
            </div>
        </div>
    `;
    
    container.appendChild(materialItem);
    
    // Add event listeners
    const categorySelect = materialItem.querySelector('.material-category-select');
    const materialSelect = materialItem.querySelector('.material-select');
    const quantityInput = materialItem.querySelector('.material-quantity');
    const detailsRow = materialItem.querySelector('.material-details-row');
    
    // When category is selected, populate materials (use productCategories for our 3 display categories)
    categorySelect.addEventListener('change', function() {
        const selectedCategory = this.value;
        if (selectedCategory) {
            const cat = rawMaterialCategories[selectedCategory];
            const productCats = cat && cat.productCategories ? cat.productCategories : [selectedCategory];
            const categoryMaterials = rawMaterials.filter(m => productCats.includes(m.category));
            
            // Clear and populate material select
            materialSelect.innerHTML = '<option value="">Choose a material</option>';
            categoryMaterials.forEach(material => {
                const option = document.createElement('option');
                option.value = material.id;
                option.textContent = `${material.icon} ${material.name} - ${material.size} (K${material.price})`;
                option.setAttribute('data-price', material.price);
                materialSelect.appendChild(option);
            });
            
            // Show material selection row
            detailsRow.style.display = 'grid';
        } else {
            detailsRow.style.display = 'none';
            materialSelect.innerHTML = '<option value="">Choose a material</option>';
        }
        calculateMaterialOrderSummary();
    });
    
    // When material is selected, recalculate
    materialSelect.addEventListener('change', function() {
        calculateMaterialOrderSummary();
    });
    
    // When quantity changes, recalculate
    quantityInput.addEventListener('input', calculateMaterialOrderSummary);
    
    // Calculate summary after adding
    calculateMaterialOrderSummary();
}

function removeMaterialSelection(id) {
    const item = document.getElementById(`material-selection-${id}`);
    if (item) {
        item.remove();
        calculateMaterialOrderSummary();
    }
}

function calculateMaterialOrderSummary() {
    const container = document.getElementById('material-selection-container');
    const materialItems = container.querySelectorAll('.material-selection-item');
    
    const orderSummaryItems = [];
    let totalPrice = 0;
    
    materialItems.forEach((item) => {
        const categorySelect = item.querySelector('.material-category-select');
        const materialSelect = item.querySelector('.material-select');
        const quantityInput = item.querySelector('.material-quantity');
        
        if (!categorySelect || !materialSelect || !quantityInput) return;
        
        const category = categorySelect.value;
        const materialId = materialSelect.value;
        const quantity = parseFloat(quantityInput.value) || 0;
        
        if (category && materialId && quantity > 0) {
            const selectedMaterial = rawMaterials.find(m => m.id == materialId);
            
            if (selectedMaterial) {
                const itemTotal = selectedMaterial.price * quantity;
                totalPrice += itemTotal;
                
                orderSummaryItems.push({
                    name: selectedMaterial.name,
                    size: selectedMaterial.size,
                    quantity: quantity,
                    unit: selectedMaterial.unit,
                    price: selectedMaterial.price,
                    total: itemTotal,
                    icon: selectedMaterial.icon,
                    category: MATERIAL_CATEGORY_LABELS[selectedMaterial.category] || 'Materials'
                });
            }
        }
    });
    
    // Update order summary display
    const summaryContainer = document.getElementById('material-order-summary-items');
    
    if (orderSummaryItems.length === 0) {
        summaryContainer.innerHTML = '<p class="no-drinks-message">No materials selected yet. Add materials above to see your order.</p>';
    } else {
        summaryContainer.innerHTML = orderSummaryItems.map(item => `
            <div class="summary-item">
                <div class="summary-item-info">
                    <span class="summary-item-name">${item.icon} ${item.name} (${item.size})</span>
                    <span class="summary-item-quantity">Quantity: ${item.quantity} × K${item.price}</span>
                </div>
                <span class="summary-item-price">K${item.total}</span>
            </div>
        `).join('') + `
            <div class="order-total" style="margin-top: 20px; padding-top: 20px; border-top: 2px solid rgba(44, 44, 44, 0.1);">
                <span class="order-total-label">TOTAL:</span>
                <span class="order-total-price">K${totalPrice}</span>
            </div>
        `;
    }
}

function setupRawMaterialsDateValidation() {
    const deliveryDateInput = document.getElementById('raw-materials-delivery-date');
    if (deliveryDateInput) {
        // Set minimum date to today
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const minDate = `${year}-${month}-${day}`;
        deliveryDateInput.setAttribute('min', minDate);
        
        // Add validation on change
        deliveryDateInput.addEventListener('change', function() {
            const selectedDate = new Date(this.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                alert('⚠️ Delivery date cannot be in the past. Please select today or a future date.');
                this.value = minDate;
                return;
            }
        });
    }
}

// Raw Materials Order Form Submission
document.getElementById('raw-materials-order-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Rate limiting check
    if (!checkRateLimit('catering')) {
        alert('⚠️ Too many submissions. Please wait a few minutes before trying again.');
        return;
    }
    
    // Collect form data
    const formData = new FormData(e.target);
    
    // Validate and sanitize inputs
    const name = sanitizeInput(formData.get('name'));
    const email = sanitizeInput(formData.get('email'));
    const phone = sanitizeInput(formData.get('phone'));
    const business = sanitizeInput(formData.get('business'));
    
    // Validation checks
    if (!name || name.length < 2 || name.length > 100) {
        alert('⚠️ Please enter a valid name (2-100 characters).');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('⚠️ Please enter a valid email address.');
        return;
    }
    
    if (!isValidPhone(phone)) {
        alert('⚠️ Please enter a valid phone number.');
        return;
    }
    
    const data = {
        client: {
            name: name,
            email: email,
            phone: phone,
            business: business || 'N/A'
        },
        delivery: {
            address: sanitizeInput(formData.get('delivery-address')),
            date: sanitizeInput(formData.get('delivery-date')) || 'Not specified',
            notes: sanitizeInput(formData.get('delivery-notes')) || 'None'
        },
        materials: [],
        notes: sanitizeInput(formData.get('notes')) || 'None'
    };
    
    // Validate delivery address
    if (!data.delivery.address) {
        alert('⚠️ Please enter a delivery address.');
        return;
    }
    
    // Collect material selections
    const materialItems = document.querySelectorAll('.material-selection-item');
    materialItems.forEach((item) => {
        const categorySelect = item.querySelector('.material-category-select');
        const materialSelect = item.querySelector('.material-select');
        const quantityElement = item.querySelector('.material-quantity');
        
        if (!categorySelect || !materialSelect || !quantityElement) return;
        
        const categoryName = categorySelect.getAttribute('name');
        const materialName = materialSelect.getAttribute('name');
        const quantityName = quantityElement.getAttribute('name');
        
        const category = formData.get(categoryName);
        const materialId = formData.get(materialName);
        const quantity = formData.get(quantityName);
        
        if (category && materialId && quantity) {
            const material = rawMaterials.find(m => m.id == materialId);
            if (material) {
                const itemTotal = material.price * parseFloat(quantity);
                data.materials.push({
                    name: material.name,
                    size: material.size,
                    quantity: parseFloat(quantity),
                    unit: material.unit,
                    price: material.price,
                    total: itemTotal,
                    icon: material.icon,
                    category: MATERIAL_CATEGORY_LABELS[material.category] || 'Materials'
                });
            }
        }
    });
    
    if (data.materials.length === 0) {
        alert('⚠️ Please select at least one material.');
        return;
    }
    
    // Calculate total
    const total = data.materials.reduce((sum, material) => sum + material.total, 0);
    
    // Prepare materials list for email
    const materialsList = data.materials.map(m => 
        `${m.icon} ${m.name} (${m.size}) × ${m.quantity} = K${m.total}`
    ).join('\n');
    
    // Send email via EmailJS
    if (EMAIL_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY_HERE') {
        ensureEmailJSReady();
        try {
            const emailParams = {
                to_name: 'Bubble & Shake Team',
                to_email: EMAIL_CONFIG.RECIPIENT_EMAIL,
                from_name: data.client.name,
                from_email: data.client.email,
                reply_to: data.client.email,
                customer_email: data.client.email,
                customer_name: data.client.name,
                phone: data.client.phone,
                business: data.client.business,
                delivery_address: data.delivery.address,
                delivery_date: data.delivery.date,
                delivery_notes: data.delivery.notes,
                materials_list: materialsList,
                total: `K${total}`,
                notes: data.notes,
                submission_date: new Date().toLocaleString(),
                // Empty fields for other forms
                subject: '',
                message: '',
                event_type: '',
                event_date: '',
                guest_count: '',
                location: '',
                drinks_list: '',
                company: ''
            };
            
            console.log('Sending raw materials order email with params:', emailParams);
            
            await emailjs.send(
                EMAIL_CONFIG.SERVICE_ID,
                EMAIL_CONFIG.RAW_MATERIALS_TEMPLATE_ID,
                emailParams
            );
            
            console.log('Raw materials order email sent successfully!');
            
            // Reset form and close
            e.target.reset();
            document.getElementById('material-selection-container').innerHTML = '';
            materialSelectionCount = 0;
            closeRawMaterialsOrder();
            showNotification(
                'Order Request Sent!',
                `Thank you for your raw materials order! Total: K${total}. We've received your request and will contact you within 24 hours with pricing and availability.`,
                '✓'
            );
        } catch (error) {
            console.error('Email sending failed:', error);
            console.error('Error details:', {
                status: error.status,
                text: error.text,
                message: error.message
            });
            // Reset form and close
            e.target.reset();
            document.getElementById('material-selection-container').innerHTML = '';
            materialSelectionCount = 0;
            closeRawMaterialsOrder();
            showNotification(
                'Order Request Received!',
                `Thank you! Your raw materials order has been received. Total: K${total}. We'll contact you within 24 hours. If urgent, please email us at ${EMAIL_CONFIG.RECIPIENT_EMAIL}`,
                '✓'
            );
        }
    } else {
        // Email not configured yet
        e.target.reset();
        document.getElementById('material-selection-container').innerHTML = '';
        materialSelectionCount = 0;
        closeRawMaterialsOrder();
        showNotification(
            'Order Request Received!',
            `Thank you for your raw materials order! Total: K${total}. We'll contact you within 24 hours.`,
            '✓'
        );
    }
});

// Gift card: show/hide custom amount field
function setupGiftCardAmountToggle() {
    const customRadio = document.getElementById('amount-custom');
    const customWrap = document.getElementById('gift-card-custom-amount-wrap');
    const customInput = document.getElementById('gift-card-custom-amount');
    if (!customRadio || !customWrap || !customInput) return;
    customRadio.addEventListener('change', function() {
        customWrap.style.display = this.checked ? 'block' : 'none';
        customInput.required = this.checked;
        if (!this.checked) customInput.value = '';
    });
    document.querySelectorAll('input[name="amount"]').forEach(function(radio) {
        if (radio.id !== 'amount-custom') {
            radio.addEventListener('change', function() {
                customWrap.style.display = 'none';
                customInput.required = false;
                customInput.value = '';
            });
        }
    });
}

// Gift card order form submission
document.getElementById('gift-card-order-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!checkRateLimit('catering')) {
        alert('⚠️ Too many submissions. Please wait a few minutes before trying again.');
        return;
    }
    const formData = new FormData(e.target);
    const name = sanitizeInput(formData.get('name'));
    const email = sanitizeInput(formData.get('email'));
    const phone = sanitizeInput(formData.get('phone'));
    const business = sanitizeInput(formData.get('business'));
    const amountChoice = formData.get('amount');
    const customAmount = formData.get('custom-amount');
    const notes = sanitizeInput(formData.get('notes'));
    if (!name || name.length < 2 || name.length > 100) {
        alert('⚠️ Please enter a valid name (2-100 characters).');
        return;
    }
    if (!isValidEmail(email)) {
        alert('⚠️ Please enter a valid email address.');
        return;
    }
    if (!phone || phone.length < 6) {
        alert('⚠️ Please enter a valid phone number.');
        return;
    }
    let amountDisplay = '';
    if (amountChoice === 'custom') {
        const num = parseFloat(customAmount);
        if (isNaN(num) || num < 200) {
            alert('⚠️ Custom amount must be at least K200.');
            return;
        }
        amountDisplay = 'K' + num;
    } else {
        const v = amountChoice;
        if (v === '200') amountDisplay = 'K200';
        else if (v === '500') amountDisplay = 'K500';
        else if (v === '1000') amountDisplay = 'K1,000';
        else if (v === '2000') amountDisplay = 'K2,000';
        else amountDisplay = 'K' + (v || '');
    }
    const messageBody = [
        'Gift Card Purchase Inquiry',
        '---',
        'Name: ' + name,
        'Email: ' + email,
        'Phone: ' + phone,
        (business ? 'Business: ' + business : ''),
        'Gift Card Amount: ' + amountDisplay,
        (notes ? 'Message / Notes: ' + notes : '')
    ].filter(Boolean).join('\n');
    if (EMAIL_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY_HERE') {
        ensureEmailJSReady();
        try {
            const emailParams = {
                to_name: 'Bubble & Shake Team',
                to_email: EMAIL_CONFIG.RECIPIENT_EMAIL,
                from_name: name,
                from_email: email,
                reply_to: email,
                customer_email: email,
                customer_name: name,
                phone: phone,
                subject: 'Gift Card Purchase Inquiry',
                message: messageBody,
                submission_date: new Date().toLocaleString(),
                company: business || '',
                event_type: '',
                event_date: '',
                guest_count: '',
                location: '',
                drinks_list: '',
                total: amountDisplay,
                notes: notes || ''
            };
            await emailjs.send(
                EMAIL_CONFIG.SERVICE_ID,
                EMAIL_CONFIG.GIFT_CARD_TEMPLATE_ID,
                emailParams
            );
            e.target.reset();
            document.getElementById('gift-card-custom-amount-wrap').style.display = 'none';
            document.getElementById('gift-card-custom-amount').required = false;
            closeSection();
            showNotification(
                'Gift Card Request Sent!',
                "We've received your gift card request and will contact you within 24 hours to complete the purchase.",
                '✓'
            );
        } catch (err) {
            console.error('Gift card email failed:', err);
            e.target.reset();
            document.getElementById('gift-card-custom-amount-wrap').style.display = 'none';
            closeSection();
            showNotification(
                'Request Received!',
                "Thank you! We've received your gift card request and will contact you within 24 hours. If urgent, email us at " + EMAIL_CONFIG.RECIPIENT_EMAIL,
                '✓'
            );
        }
    } else {
        e.target.reset();
        document.getElementById('gift-card-custom-amount-wrap').style.display = 'none';
        closeSection();
        showNotification(
            'Request Received!',
            "Thank you for your gift card request! We'll contact you within 24 hours.",
            '✓'
        );
    }
});

// FAQs Category Navigation
const categoryTitles = {
    'general': 'General Questions',
    'menu': 'Menus',
    'catering': 'Catering Services',
    'giftcards': 'Gift Cards',
    'locations': 'Where Can You Find Our Teas?',
    'diy': 'DIY Kits'
};

function showFAQCategory(category) {
    // Hide category selection
    document.getElementById('faq-categories').style.display = 'none';
    
    // Show questions container
    const questionsContainer = document.getElementById('faq-questions-container');
    questionsContainer.style.display = 'block';
    
    // Update title
    document.getElementById('faq-questions-title').textContent = categoryTitles[category];
    
    // Hide all categories
    document.querySelectorAll('.faq-category').forEach(cat => {
        cat.style.display = 'none';
    });
    
    // Show selected category
    const selectedCategory = document.querySelector(`.faq-category[data-category="${category}"]`);
    if (selectedCategory) {
        selectedCategory.style.display = 'block';
    }
    
    // Close all open accordions
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Smooth scroll to top of questions
    questionsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function backToCategories() {
    // Show category selection
    document.getElementById('faq-categories').style.display = 'block';
    
    // Hide questions container
    document.getElementById('faq-questions-container').style.display = 'none';
    
    // Close all accordions
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
}

// FAQs Accordion Toggle
function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const wasActive = faqItem.classList.contains('active');
    
    // Close all FAQs in the same category
    const category = faqItem.closest('.faq-category');
    category.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle current FAQ
    if (!wasActive) {
        faqItem.classList.add('active');
    }
}

// Reset FAQs when opening the page
function resetFAQs() {
    // Show categories, hide questions
    document.getElementById('faq-categories').style.display = 'block';
    document.getElementById('faq-questions-container').style.display = 'none';
    
    // Close all accordions
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
}

// Setup Event Listeners
function setupEventListeners() {
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

