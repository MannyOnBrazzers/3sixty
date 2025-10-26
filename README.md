# 3Sixty Auto Collision & Paint Website

A modern, production-ready website for 3Sixty Auto Collision & Paint - an auto body repair shop in Orlando, FL. Built with vanilla HTML, CSS, and JavaScript with a focus on performance, accessibility, and user experience.

## 🚀 Live Website

**Production URL:** [https://3sixtyac.com](https://3sixtyac.com)

## 🏗️ Tech Stack

- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Styling:** Custom CSS with modern design system
- **Icons:** Emoji-based icons for performance
- **Hosting:** GitHub Pages
- **Domain:** Custom domain (3sixtyac.com)
- **Performance:** Optimized for Lighthouse scores
- **Accessibility:** WCAG 2.1 AA compliant

## 📁 Project Structure

```
3sixty_construction/
├── index.html              # Homepage
├── services.html           # Services page
├── gallery.html            # Work gallery
├── insurance.html          # Insurance claims info
├── estimates.html          # Free estimate form
├── about.html              # About the company
├── contact.html            # Contact information
├── privacy.html            # Privacy policy
├── terms.html              # Terms of service
├── css/
│   └── main.css           # Main stylesheet
├── js/
│   ├── main.js            # Core JavaScript
│   └── estimate-form.js   # Estimate form handler
├── assets/                # Images and media
├── CNAME                  # Custom domain config
└── README.md             # This file
```

## 🎯 Features

### Core Features
- ✅ **Multi-page navigation** with active states
- ✅ **Responsive design** (mobile-first approach)
- ✅ **Dark/light theme toggle** with system preference detection
- ✅ **Before/after image slider** with keyboard navigation
- ✅ **Multi-step estimate form** with file upload
- ✅ **Form validation** with real-time feedback
- ✅ **Gallery with lightbox** and category filtering
- ✅ **Scroll animations** using Intersection Observer
- ✅ **SEO optimization** with structured data

### Business Features
- 📞 **Click-to-call** functionality
- 📧 **Contact forms** with validation
- 📸 **Photo estimates** with drag-and-drop upload
- 🏢 **Insurance integration** information
- 🗺️ **Location and directions**
- ⭐ **Customer testimonials**
- 🛠️ **Service descriptions** with detailed information

### Technical Features
- ⚡ **Performance optimized** (Lighthouse-friendly)
- ♿ **Accessibility compliant** (WCAG 2.1 AA)
- 📱 **Progressive Web App** ready
- 🔍 **SEO optimized** with JSON-LD structured data
- 🎨 **Modern CSS** with custom properties
- 📦 **No external dependencies** (except Google Fonts)

## 🚀 Quick Start

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/3sixty-website.git
   cd 3sixty-website
   ```

2. **Serve locally:**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser:**
   ```
   http://localhost:8000
   ```

### GitHub Pages Deployment

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial website deployment"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Go to repository Settings
   - Navigate to Pages section
   - Select "Deploy from a branch"
   - Choose `main` branch and `/ (root)` folder
   - Save settings

3. **Custom Domain (Optional):**
   - Update `CNAME` file with your domain
   - Configure DNS settings with your domain provider

## 🎨 Customization

### Business Information

All business-specific content can be easily updated:

**Contact Information:**
- Phone: `(407) 555-0123` - Update in all HTML files
- Address: `1234 Colonial Drive, Orlando, FL 32803`
- Email: `info@3sixtyauto.com`

**Services:**
- Update service descriptions in `services.html`
- Modify service cards on homepage
- Adjust pricing and features as needed

**Branding:**
- Update company name and tagline throughout
- Replace placeholder images in `assets/` folder
- Modify color scheme in CSS custom properties

### Content Updates

**Text Content:**
- All copy is production-ready but can be customized
- Testimonials are realistic but should be replaced with real ones
- Service descriptions can be expanded or modified

**Images:**
- Replace placeholder image URLs with actual photos
- Update before/after gallery images
- Add real company photos and work samples

### Styling

The website uses a modern CSS design system with custom properties:

```css
:root {
  --color-primary: #1a365d;
  --color-secondary: #e53e3e;
  --color-accent: #3182ce;
  /* Update these for brand colors */
}
```

## 📧 Email Integration

The estimate form includes a mock email sender. To connect to real email service:

### Option 1: EmailJS (Recommended for static sites)

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create email template
3. Update `js/estimate-form.js`:

```javascript
async submitEstimateRequest(formData) {
  const templateParams = Object.fromEntries(formData);
  return emailjs.send('service_id', 'template_id', templateParams)
    .then(() => ({ success: true }))
    .catch(error => ({ success: false, message: error.text }));
}
```

### Option 2: Custom Backend

1. Create API endpoint for form submission
2. Update form action in `js/estimate-form.js`
3. Handle file uploads on server

### Option 3: Form Services

Use services like Netlify Forms, Formspree, or Typeform for form handling.

## 🔧 Performance Optimization

### Already Implemented

- ✅ **Minified CSS** (can be further compressed)
- ✅ **Optimized images** with lazy loading
- ✅ **Efficient JavaScript** with modern ES6+
- ✅ **Critical resource preloading**
- ✅ **Responsive images** with proper sizing

### Additional Optimizations

**Image Optimization:**
```bash
# Convert images to WebP format for better compression
# Use tools like ImageOptim or online converters
```

**CSS/JS Minification:**
```bash
# Use build tools for production minification
npm install -g csso-cli terser
csso css/main.css --output css/main.min.css
terser js/main.js --compress --mangle --output js/main.min.js
```

## ♿ Accessibility Features

### Implemented Features

- ✅ **Semantic HTML** structure
- ✅ **ARIA labels** and roles
- ✅ **Keyboard navigation** support
- ✅ **Focus management** for modals and forms
- ✅ **Color contrast** compliance
- ✅ **Screen reader** friendly content
- ✅ **Skip links** for navigation
- ✅ **Form validation** with ARIA

### Testing Accessibility

```bash
# Use automated testing tools
npx @axe-core/cli http://localhost:8000
```

## 📊 SEO Optimization

### On-Page SEO

- ✅ **Meta titles** and descriptions
- ✅ **Structured data** (JSON-LD)
- ✅ **Open Graph** tags
- ✅ **Canonical URLs**
- ✅ **Semantic markup**
- ✅ **Internal linking**

### Local SEO

- ✅ **Google My Business** ready
- ✅ **Local schema markup**
- ✅ **NAP consistency** (Name, Address, Phone)
- ✅ **Service area** targeting

## 🧪 Testing

### Manual Testing Checklist

**Functionality:**
- [ ] All navigation links work
- [ ] Forms submit successfully
- [ ] Mobile responsive on all devices
- [ ] Gallery lightbox functions
- [ ] Before/after slider works
- [ ] Theme toggle functions

**Performance:**
- [ ] Lighthouse score > 90
- [ ] Page load time < 3 seconds
- [ ] Images load properly
- [ ] No console errors

**Accessibility:**
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast passes
- [ ] Form validation clear

## 🚀 Deployment

### GitHub Pages

The site is configured for GitHub Pages deployment with:

- `CNAME` file for custom domain
- Optimized for static hosting
- No build process required

### Alternative Hosting

**Netlify:**
1. Connect GitHub repository
2. Deploy automatically on push
3. Configure custom domain

**Vercel:**
1. Import GitHub project
2. Deploy with zero configuration
3. Automatic HTTPS

## 🔄 Maintenance

### Regular Updates

**Content:**
- Update testimonials with real customer reviews
- Add new gallery images of completed work
- Update service pricing and descriptions
- Refresh contact information as needed

**Technical:**
- Monitor performance with Google Analytics
- Update dependencies if any are added
- Test forms regularly
- Check for broken links

### Analytics Setup

Add Google Analytics for tracking:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 🤝 Contributing

To contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For technical support or questions:

- **Business Owner:** Update contact information
- **Developer:** Add your contact information
- **Issues:** Use GitHub Issues for bug reports

## 📄 License

This website is proprietary to 3Sixty Auto Collision & Paint. All rights reserved.

---

**Built with ❤️ for 3Sixty Auto Collision & Paint**

*Professional auto body repair and restoration in Orlando, FL*