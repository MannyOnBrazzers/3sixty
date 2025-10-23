# 3Sixty Auto Collision & Paint - Under Construction Website

A modern, responsive under construction website for 3Sixty Auto Collision & Paint business. This website features a sleek design with animated backgrounds, interactive elements, and professional styling. **Now with easy configuration system!**

## Features

- **Modern Design**: Clean, professional layout with gradient backgrounds and glass-morphism effects
- **Responsive**: Fully responsive design that works on all devices
- **Interactive Elements**: Animated particles background, hover effects, and smooth scrolling
- **Contact Information**: Easy-to-find contact details with click-to-call and email functionality
- **Location Integration**: Google Maps integration for directions and location viewing
- **Services Preview**: Overview of auto collision and paint services
- **Progressive Loading**: Smooth animations and loading effects
- **🆕 Easy Configuration**: All content managed through a single configuration file

## Files Structure

```
3sixty_construction/
├── index.html          # Main HTML file
├── styles.css          # CSS styling and animations
├── script.js           # JavaScript functionality
├── config.js           # ⭐ Configuration file (edit this!)
├── README.md           # This file
├── DEPLOYMENT.md       # Deployment guide
└── .gitignore          # Git ignore file
```

## Quick Start - Customization

**🎯 All customization is now done in the `config.js` file!** No need to edit HTML or hunt through multiple files.

### 1. Open `config.js` and Edit Your Information

The configuration file is organized into clear sections:

#### **Business Information**
```javascript
business: {
    name: "3Sixty",
    fullName: "3Sixty Auto Collision & Paint",
    tagline: "Professional Auto Collision & Paint Services",
    description: "Your business description here...",
}
```

#### **Contact Details**
```javascript
contact: {
    phone: {
        display: "(555) 123-4567",
        link: "tel:+15551234567"
    },
    email: {
        display: "info@3sixtyauto.com",
        link: "mailto:info@3sixtyauto.com"
    },
    address: {
        street: "123 Auto Repair Lane",
        city: "Your City",
        state: "ST",
        zip: "12345"
    },
    hours: {
        display: "Mon-Fri: 8AM-6PM<br>Sat: 9AM-4PM"
    }
}
```

#### **Services**
```javascript
services: [
    {
        title: "Collision Repair",
        description: "Expert auto body repair and restoration",
        icon: "fas fa-hammer",
        featured: true
    },
    // Add more services here
]
```

#### **Social Media**
```javascript
social: {
    facebook: {
        url: "https://facebook.com/your-page",
        show: true
    },
    instagram: {
        url: "https://instagram.com/your-handle", 
        show: true
    },
    tiktok: {
        url: "https://tiktok.com/@your-handle",
        show: true
    },
    youtube: {
        url: "https://youtube.com/@your-channel",
        show: true
    }
    // Enable/disable any social platform
}
```

### 2. Logo Setup

**Option A: Use Icon (Default)**
```javascript
logo: {
    icon: "fas fa-car",
    text: "3Sixty",
    useCustomLogo: false
}
```

**Option B: Use Custom Logo Image**
```javascript
logo: {
    useCustomLogo: true,
    customLogoPath: "assets/logo.png"
}
```

### 3. Advanced Configuration

#### **Colors & Theme**
```javascript
settings: {
    theme: {
        primary: "#1a1a2e",
        accent: "#00d4ff"
    }
}
```

#### **Feature Toggles**
```javascript
features: {
    showProgressBar: true,
    showServicesSection: true,
    enableStreetView: true,
    showConstructionIcon: true
}
```

#### **Animation Settings**
```javascript
animations: {
    enableParticles: true,
    enableSparkles: true,
    particleCount: 50
}
```

## Google Maps Integration

1. **Get Google Maps API Key**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable "Maps Embed API" and "Street View Static API"
   - Create API key

2. **Add to Configuration**:
```javascript
location: {
    googleMapsApiKey: "YOUR_API_KEY_HERE",
    coordinates: {
        lat: 40.7128, // Your business latitude
        lng: -74.0060  // Your business longitude
    }
}
```

## Setup for GitHub Pages

1. **Create GitHub Repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: 3Sixty under construction website"
   git branch -M main
   git remote add origin https://github.com/yourusername/3sixty-website.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Save

3. **Custom Domain** (optional):
   - Rename `CNAME.template` to `CNAME`
   - Edit the file to contain your domain name
   - Configure DNS settings with your domain provider

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Configuration Reference

### Complete Config Structure

```javascript
const CONFIG = {
    business: { /* Business info */ },
    contact: { /* Contact details */ },
    services: [ /* Array of services */ ],
    social: { /* Social media links */ },
    location: { /* Maps & location */ },
    content: { /* Page content */ },
    settings: {
        theme: { /* Colors */ },
        animations: { /* Animation settings */ },
        features: { /* Feature toggles */ },
        footer: { /* Footer settings */ }
    }
};
```

### Adding New Services

```javascript
services: [
    {
        title: "New Service",
        description: "Service description",
        icon: "fas fa-wrench", // Font Awesome icon
        featured: true // Show on homepage
    }
]
```

### Social Media Platforms

Supported platforms: `facebook`, `instagram`, `twitter`, `linkedin`, `google`, `tiktok`, `youtube`

```javascript
social: {
    twitter: {
        url: "https://twitter.com/yourhandle",
        show: true // Set to false to hide
    },
    tiktok: {
        url: "https://tiktok.com/@your-handle",
        show: true
    },
    youtube: {
        url: "https://youtube.com/@your-channel",
        show: true
    }
}
```

## Performance Notes

- Uses modern CSS features (backdrop-filter, CSS Grid)
- Optimized animations with `transform` and `opacity`
- Dynamic content loading from configuration
- Minimal external dependencies (Google Fonts, Font Awesome)
- Configurable animation settings for performance tuning

## Future Enhancements

Consider adding these features when the full website launches:
- Contact form with form submission handling
- Image gallery for completed work
- Customer testimonials (structure already in config)
- Online appointment booking
- Blog section for auto care tips

### Easy Expansion

The config system makes it easy to add new sections:

```javascript
additionalSections: {
    testimonials: {
        enabled: true,
        title: "What Our Customers Say",
        items: [
            {
                text: "Great service!",
                author: "John D.",
                rating: 5
            }
        ]
    }
}
```

## Technical Details

- **HTML5**: Semantic markup with proper accessibility
- **CSS3**: Modern features including Flexbox, Grid, and custom properties
- **Vanilla JavaScript**: No frameworks, pure JS for better performance
- **Configuration System**: JSON-based config for easy maintenance
- **Dynamic Content**: JavaScript populates content from config
- **Font Awesome**: For icons
- **Google Fonts**: For typography
- **Modular Design**: Easy to extend and customize

## Troubleshooting

### Common Issues

**Content not showing:**
- Check that `config.js` is loaded before other scripts
- Verify all required fields in config are filled
- Check browser console for errors

**Maps not working:**
- Verify Google Maps API key is correct
- Ensure APIs are enabled in Google Cloud Console
- Check API key restrictions

**Styling issues:**
- Clear browser cache
- Check for JavaScript errors in console
- Verify config structure matches examples

## License

This website template is created for 3Sixty Auto Collision & Paint. Feel free to modify and customize as needed for your business.

## Support

For technical support or customization help:
1. Check the configuration examples in `config.js`
2. Review this README for setup instructions
3. Check browser console for error messages
4. Contact your web developer for advanced customizations

---

**⚡ Quick Setup Checklist:**
- [ ] Edit business info in `config.js`
- [ ] Update contact details
- [ ] Add your services
- [ ] Set social media links
- [ ] Upload to GitHub
- [ ] Enable GitHub Pages
- [ ] Test your live site!