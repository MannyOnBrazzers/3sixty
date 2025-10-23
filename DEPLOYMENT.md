# Deployment Guide for 3Sixty Auto Collision & Paint Website

This guide will walk you through deploying your under construction website to GitHub Pages, making it live on the internet.

## Prerequisites

- A GitHub account (free at [github.com](https://github.com))
- Git installed on your computer
- Your website files ready in the `3sixty_construction` folder

## Step 1: Create a GitHub Repository

1. **Go to GitHub.com** and sign in to your account
2. **Click the "+" icon** in the top right corner
3. **Select "New repository"**
4. **Repository settings**:
   - Repository name: `3sixty-website` (or your preferred name)
   - Description: "Under construction website for 3Sixty Auto Collision & Paint"
   - Make it **Public** (required for free GitHub Pages)
   - **Do NOT** initialize with README (we already have files)
5. **Click "Create repository"**

## Step 2: Upload Your Files to GitHub

### Option A: Using Git Command Line

1. **Open terminal/command prompt** in your `3sixty_construction` folder
2. **Run these commands** (replace `yourusername` with your GitHub username):

```bash
git init
git add .
git commit -m "Initial commit: 3Sixty under construction website"
git branch -M main
git remote add origin https://github.com/yourusername/3sixty-website.git
git push -u origin main
```

### Option B: Using GitHub Web Interface

1. **In your new repository**, click "uploading an existing file"
2. **Drag and drop** all files from your `3sixty_construction` folder
3. **Add commit message**: "Initial commit: 3Sixty under construction website"
4. **Click "Commit changes"**

## Step 3: Enable GitHub Pages

1. **Go to your repository** on GitHub
2. **Click "Settings"** tab (at the top of the repository)
3. **Scroll down** to "Pages" in the left sidebar
4. **Under "Source"**, select "Deploy from a branch"
5. **Choose branch**: `main`
6. **Choose folder**: `/ (root)`
7. **Click "Save"**

## Step 4: Access Your Live Website

1. **Wait 2-5 minutes** for deployment to complete
2. **Go back to "Pages" settings** - you'll see a green checkmark and URL
3. **Your website URL** will be: `https://yourusername.github.io/3sixty-website/`
4. **Click the URL** to view your live website!

## Step 5: Custom Domain Setup (Optional)

If you have your own domain (like `3sixtyauto.com`):

### A. Configure GitHub Pages for Custom Domain

1. **In Pages settings**, enter your domain in "Custom domain" field
2. **Check "Enforce HTTPS"** (recommended)
3. **Rename** `CNAME.template` to `CNAME`
4. **Edit CNAME file** to contain only your domain name:
   ```
   yourdomain.com
   ```
5. **Commit and push** the CNAME file

### B. Configure Your Domain Provider

**For root domain** (yourdomain.com):
- Add **A records** pointing to GitHub's IP addresses:
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`

**For subdomain** (www.yourdomain.com):
- Add **CNAME record** pointing to: `yourusername.github.io`

## Step 6: Making Updates

To update your website:

1. **Edit files** locally on your computer
2. **Use Git to push changes**:
   ```bash
   git add .
   git commit -m "Update contact information"
   git push
   ```
3. **Changes will appear** on your live site in 1-2 minutes

## Customization Checklist

Before going live, update these items:

### Essential Updates:
- [ ] **Phone number** in contact section
- [ ] **Email address** in contact section
- [ ] **Business address** in contact section and JavaScript
- [ ] **Business hours** in contact section
- [ ] **Social media links** in footer
- [ ] **Company logo** (replace car icon)
- [ ] **Google Maps API key** for Street View (optional)

### Recommended Updates:
- [ ] **Meta description** in HTML head
- [ ] **Page title** in browser tab
- [ ] **Favicon** (browser tab icon)
- [ ] **Services descriptions** to match your offerings
- [ ] **Brand colors** to match your business

## Troubleshooting

### Common Issues:

**Website not loading:**
- Check Pages settings are correct
- Ensure repository is public
- Wait 5-10 minutes for propagation

**CSS/JS not working:**
- Check file paths are correct
- Ensure all files are in the root directory
- Check browser console for errors

**Custom domain not working:**
- Verify DNS settings with your domain provider
- Wait 24-48 hours for DNS propagation
- Check CNAME file contains only your domain

### Getting Help:

1. **GitHub Pages Documentation**: [docs.github.com/pages](https://docs.github.com/pages)
2. **Check repository "Actions" tab** for deployment status
3. **Contact your web developer** for technical assistance

## Security & Performance

### Best Practices:
- **Enable HTTPS** (automatic with GitHub Pages)
- **Regular updates** to keep content fresh
- **Monitor performance** using browser dev tools
- **Backup your files** regularly

### Future Considerations:
- Consider upgrading to a full website when ready
- Add analytics (Google Analytics) to track visitors
- Set up contact forms for customer inquiries
- Add more interactive features as needed

## Cost Breakdown

- **GitHub Pages hosting**: Free
- **Custom domain**: $10-15/year (optional)
- **Google Maps API**: Free for low usage
- **Total cost**: $0-15/year

## Next Steps After Launch

1. **Test website** on different devices and browsers
2. **Share the URL** with customers and on business cards
3. **Add website URL** to Google My Business listing
4. **Consider SEO optimization** for better search rankings
5. **Plan for full website development** when ready

---

**Congratulations!** Your 3Sixty Auto Collision & Paint website is now live on the internet. Your customers can visit it 24/7 to get your contact information and learn about your services.