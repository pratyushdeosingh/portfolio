# Pratyush Deo Singh - Portfolio

A modern, dark-themed personal portfolio website featuring glassmorphism design, interactive particle animations, and smooth scroll animations. Built with pure HTML, CSS, and JavaScript.

![Portfolio Preview](https://via.placeholder.com/800x400/0f172a/06b6d4?text=Portfolio+Preview)

## Features

- **Glassmorphism Design** - Modern frosted glass effects with backdrop filters
- **Interactive Particle System** - Canvas-based animated particles with mouse interaction in the hero section
- **Smooth Scroll Animations** - Elements fade in as you scroll using Intersection Observer API
- **Responsive Design** - Fully responsive layout that works on mobile, tablet, and desktop
- **Mobile Navigation** - Hamburger menu with smooth slide-in drawer
- **Accessibility First** - WCAG 2.1 AA compliant with keyboard navigation, focus indicators, and screen reader support
- **Print Optimized** - Dedicated print stylesheet for resume printing
- **Reduced Motion Support** - Respects `prefers-reduced-motion` user preference
- **High Contrast Mode** - Supports Windows High Contrast Mode

## Demo

Visit the live site: [https://pratyushdeosingh.netlify.app](https://pratyushdeosingh.netlify.app) *(placeholder - update with actual URL)*

## Setup Instructions

### Option 1: Open Directly in Browser
1. Download or clone this repository
2. Open `index.html` in your web browser
3. No build process or dependencies required!

### Option 2: Use Live Server (Recommended for Development)
1. Install VS Code
2. Install the "Live Server" extension
3. Right-click on `index.html` and select "Open with Live Server"
4. The site will open at `http://127.0.0.1:5500` (or similar)

### Option 3: Using Python
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Then visit `http://localhost:8000`

## Deployment Guide

### Deploy to Netlify

#### Method 1: Drag & Drop
1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Drag and drop your project folder
3. Your site is live instantly!

#### Method 2: Git Push
1. Push your code to GitHub
2. Log in to [Netlify](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Select your GitHub repository
5. Build command: *(leave empty)*
6. Publish directory: `/` (root)
7. Click "Deploy site"

The included `netlify.toml` file handles all configuration automatically.

## File Structure

```
portfolio/
├── index.html          # Main HTML file with all sections
├── styles.css          # Complete stylesheet with design system
├── main.js             # JavaScript for particles, animations, navigation
├── netlify.toml        # Netlify deployment configuration
├── README.md           # This file
└── .sisyphus/          # Development tracking (internal)
    └── evidence/       # QA verification files
```

## Customization Guide

### Edit Content

All content is in `index.html`. Look for these sections:

- **Hero Section** (lines 54-78): Name, title, tagline, CTA buttons
- **About Section** (lines 81-95): Bio text, photo placeholder
- **Skills Section** (lines 98-143): Skill categories and tags
- **Experience Section** (lines 146-163): Education timeline
- **Contact Section** (lines 166-184): Email, social links

### Change Colors

Edit CSS custom properties in `styles.css` (lines 14-113):

```css
:root {
  --accent-cyan: #06b6d4;      /* Primary accent */
  --accent-blue: #3b82f6;      /* Secondary accent */
  --accent-purple: #8b5cf6;    /* Tertiary accent */
  --bg-primary: #020617;       /* Dark background */
  --text-primary: #f8fafc;     /* Main text color */
}
```

### Add/Remove Sections

1. Copy an existing section as a template
2. Update the `id` attribute (used for navigation)
3. Add a corresponding nav link in the header
4. Update the `data-section` attribute on the nav link

### Add Your Photo

Replace the photo placeholder in the About section:

```html
<!-- Replace this: -->
<div class="photo-placeholder">
  <span class="placeholder-text">Photo</span>
</div>

<!-- With this: -->
<img src="your-photo.jpg" alt="Your Name" class="profile-photo">
```

Then add CSS for the profile photo:

```css
.profile-photo {
  width: 280px;
  height: 280px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--glass-border-accent);
}
```

### Update Social Links

Find all social links in:
- Hero section (lines 66-76)
- Contact section (lines 172-181)
- Footer (lines 192-196)

Update the `href` attributes with your actual URLs.

### Add Favicon

1. Create a favicon (use [favicon.io](https://favicon.io) or similar)
2. Place files in project root
3. Uncomment the favicon line in `index.html` head section

## Technologies Used

- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Custom properties, Grid, Flexbox, animations, backdrop-filter
- **JavaScript (ES6+)** - Classes, Intersection Observer, Canvas API
- **Google Fonts** - Poppins font family
- **No Frameworks** - Pure vanilla code for maximum performance

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13.1+
- Edge 80+

*Note: Glassmorphism effects (backdrop-filter) gracefully degrade in older browsers.*

## Performance

- No external dependencies (except Google Fonts)
- Optimized particle system (50-100 particles based on device)
- Intersection Observer for efficient scroll animations
- Passive event listeners for smooth scrolling
- `will-change` CSS property for GPU acceleration

## Accessibility Features

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators on all interactive elements
- Skip to content link
- Screen reader optimized
- Color contrast WCAG 2.1 AA compliant
- Reduced motion support

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

- **Email**: workforpratyush@gmail.com
- **GitHub**: [pratyushdeosingh](https://github.com/pratyushdeosingh)
- **LinkedIn**: [pratyushdeosingh](https://www.linkedin.com/in/pratyushdeosingh/)

---

Built with passion by Pratyush Deo Singh
