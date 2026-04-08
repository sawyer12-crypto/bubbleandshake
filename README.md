# 🧋 Bubble & Shake Website

A vibrant, modern showcase website for a bubble tea and shake company. Features a beautiful yellow-themed UI with interactive menu, detailed drink modals, and full product information.

## Features

- **Vibrant Yellow Design**: Eye-catching color scheme matching the shop's branding
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Menu**: Browse and filter menu items by category (Boba Tea, Shakes, Specials)
- **Detailed Drink Modals**: Click any drink to see full description, tags, and specifications
- **Full Product Information**: Each drink includes base ingredients, sweetness level, temperature, and custom tags
- **Smooth Animations**: Professional animations and transitions throughout
- **Contact Form**: Easy way for customers to get in touch
- **Mobile-Friendly Navigation**: Hamburger menu for mobile devices

## Tech Stack

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with CSS Grid, Flexbox, and animations
- **Vanilla JavaScript**: No frameworks needed - pure JS for all functionality
- **LocalStorage**: Persistent cart storage

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3 (for running the local server) OR any other web server

### Installation

1. Make sure you're in the project directory:
```bash
cd /Users/soham/Desktop/Boba
```

2. Run the development server:

**Option 1: Using Python (Recommended)**
```bash
npm start
# OR
python3 -m http.server 8000
```

**Option 2: Using Node.js (if you have it installed)**
```bash
npx serve
```

**Option 3: Using VS Code Live Server**
- Install "Live Server" extension
- Right-click on `index.html`
- Select "Open with Live Server"

3. Open your browser and navigate to:
   - `http://localhost:8000` (if using Python)
   - Or the URL provided by your chosen server

## Project Structure

```
Boba/
│
├── index.html          # Main HTML file with page structure
├── styles.css          # All styling and responsive design
├── script.js           # JavaScript functionality (cart, menu, interactions)
├── package.json        # Project metadata and scripts
└── README.md          # This file
```

## Features Breakdown

### 1. Navigation
- Sticky navigation bar with yellow accent border
- Smooth scrolling to sections
- Mobile hamburger menu
- Clean, minimalist design

### 2. Hero Section
- Vibrant yellow gradient background with pulsing animation
- Large, elegant typography
- Call-to-action button

### 3. Menu Section
- 15 different menu items with full details
- Category filtering (All, Boba Tea, Shakes, Specials)
- Grid card layout with hover effects
- Click any drink to view detailed information

### 4. Detailed Drink Modal
- Large product emoji with floating animation
- Full description and story
- Price and category badge
- Custom tags (Matcha Tea, No Sugar, Boba Included, etc.)
- Specifications (base ingredients, sweetness level, temperature)
- Smooth slide-in animation
- Close with X button, overlay click, or ESC key

### 5. About Section
- Company information
- Feature highlights with icons
- Responsive grid layout

### 6. Contact Section
- Contact information display
- Working contact form
- Form validation

### 7. Footer
- Quick links
- Social media links
- Copyright information

## Customization

### Changing Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #1a1a1a;
    --accent-color: #FFB800;
    --yellow: #FFD700;
    --yellow-light: #FFF4CC;
    --orange: #FF9500;
    /* ... */
}
```

### Adding Menu Items
Edit the `menuItems` array in `script.js`:
```javascript
{
    id: 16,
    name: "Your Drink Name",
    price: 7.50,
    description: "Your full detailed description here...",
    category: "boba", // or "shakes" or "specials"
    icon: "🍹",
    tags: ["Your", "Custom", "Tags"],
    specs: {
        base: "Base ingredients",
        sweetness: "Sweetness level",
        temperature: "Hot/Cold/Iced"
    }
}
```

### Updating Contact Information
Edit the contact section in `index.html`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

Ideas for additional features:
- High-quality product photography
- Real drink images for each item
- Nutritional information
- Allergen warnings
- Seasonal menu items
- Customer reviews and ratings
- Social media integration
- Location map and hours
- Newsletter signup
- Gift cards

## License

MIT License - feel free to use this project for your own purposes!

## Support

For questions or issues, please contact hello@bubbleandshake.com

---

Built with ❤️ for Bubble & Shake

