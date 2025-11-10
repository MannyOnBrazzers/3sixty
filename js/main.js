
'use strict';

// ==========================================================================
// Core Application
// ==========================================================================

class ThreeSixtyApp {
  constructor() {
    this.init();
  }

  init() {
    this.bindEvents();
    this.initializeComponents();
    this.setupAccessibility();
    this.setupAnimations();
  }

  bindEvents() {
    document.addEventListener('DOMContentLoaded', () => {
      this.onDOMReady();
    });

    window.addEventListener('load', () => {
      this.onWindowLoad();
    });

    window.addEventListener('resize', this.debounce(() => {
      this.onResize();
    }, 250));
  }

  onDOMReady() {
    this.navigation = new Navigation();
    this.themeToggle = new ThemeToggle();
    this.beforeAfterSlider = new BeforeAfterSlider();
    this.formValidation = new FormValidation();
    this.gallery = new Gallery();
    this.scrollAnimations = new ScrollAnimations();

    this.setupLazyLoading();
    this.preloadResources();
  }

  onWindowLoad() {
    this.optimizeImages();
    this.setupServiceWorker();
  }

  onResize() {
    if (this.beforeAfterSlider) {
      this.beforeAfterSlider.handleResize();
    }
    if (this.gallery) {
      this.gallery.handleResize();
    }
  }

  initializeComponents() {
    // Component initialization will happen in onDOMReady
  }

  setupAccessibility() {
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(skipLink.getAttribute('href'));
        if (target) {
          target.focus();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    this.setupKeyboardNavigation();
  }

  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal && this.gallery) {
          this.gallery.closeModal();
        }
      }
    });
  }

  setupAnimations() {
    if ('IntersectionObserver' in window) {
      this.scrollAnimations = new ScrollAnimations();
    }
  }

  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const lazyImages = document.querySelectorAll('img[loading="lazy"]');
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      });

      lazyImages.forEach(img => imageObserver.observe(img));
    }
  }

  preloadResources() {
    const criticalRoutes = ['/html/services.html', '/html/estimates.html', '/html/contact.html'];

    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        criticalRoutes.forEach(route => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = route;
          document.head.appendChild(link);
        });
      });
    }
  }

  optimizeImages() {
    if (this.supportsWebP()) {
      const images = document.querySelectorAll('img[data-webp]');
      images.forEach(img => {
        img.src = img.dataset.webp;
      });
    }
  }

  supportsWebP() {
    return new Promise(resolve => {
      const webP = new Image();
      webP.onload = webP.onerror = () => resolve(webP.height === 2);
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  }

  setupServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered successfully');
        })
        .catch(error => {
          console.log('SW registration failed');
        });
    }
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// ==========================================================================
// Navigation Component
// ==========================================================================

class Navigation {
  constructor() {
    this.nav = document.querySelector('.nav');
    this.toggle = document.querySelector('.nav-toggle');
    this.menu = document.querySelector('.nav-menu');
    this.links = document.querySelectorAll('.nav-link');
    this.isOpen = false;

    this.init();
  }

  init() {
    if (!this.nav || !this.toggle || !this.menu) return;

    this.bindEvents();
    this.setupActiveLink();
  }

  bindEvents() {
    this.toggle.addEventListener('click', () => this.toggleMenu());

    document.addEventListener('click', (e) => {
      if (!this.nav.contains(e.target) && this.isOpen) {
        this.closeMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeMenu();
      }
    });

    this.links.forEach(link => {
      link.addEventListener('click', () => {
        if (this.isOpen) {
          this.closeMenu();
        }
      });
    });

    window.addEventListener('scroll', this.throttle(() => {
      this.handleScroll();
    }, 16));
  }

  toggleMenu() {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.isOpen = true;
    this.menu.classList.add('active');
    this.toggle.setAttribute('aria-expanded', 'true');

    const hamburger = this.toggle.querySelector('.hamburger');
    if (hamburger) {
      hamburger.style.backgroundColor = 'transparent';
      hamburger.style.transform = 'rotate(45deg)';
    }

    document.body.style.overflow = 'hidden';

    const firstLink = this.menu.querySelector('.nav-link');
    if (firstLink) {
      setTimeout(() => firstLink.focus(), 100);
    }
  }

  closeMenu() {
    this.isOpen = false;
    this.menu.classList.remove('active');
    this.toggle.setAttribute('aria-expanded', 'false');

    const hamburger = this.toggle.querySelector('.hamburger');
    if (hamburger) {
      hamburger.style.backgroundColor = '';
      hamburger.style.transform = '';
    }

    document.body.style.overflow = '';
  }

  setupActiveLink() {
    const currentPath = window.location.pathname;
    this.links.forEach(link => {
      const linkPath = new URL(link.href).pathname;
      if (linkPath === currentPath || (currentPath === '/' && linkPath === '/index.html')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  handleScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 100) {
      this.nav.classList.add('scrolled');
    } else {
      this.nav.classList.remove('scrolled');
    }
  }

  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// ==========================================================================
// Theme Toggle Component
// ==========================================================================

class ThemeToggle {
  constructor() {
    this.toggle = document.querySelector('.nav-theme-toggle');
    this.currentTheme = localStorage.getItem('theme') || this.getSystemTheme();

    this.init();
  }

  init() {
    if (!this.toggle) return;

    this.applyTheme(this.currentTheme);
    this.bindEvents();
  }

  bindEvents() {
    this.toggle.addEventListener('click', () => this.toggleTheme());

    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
          this.applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }

  applyTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);

    const icon = this.toggle?.querySelector('i');
    if (icon) {
      if (theme === 'dark') {
        icon.className = 'fas fa-sun theme-icon';
      } else {
        icon.className = 'fas fa-moon theme-icon';
      }
    }

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.content = theme === 'dark' ? '#1a202c' : '#ffffff';
    }
  }

  getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }
}

// ==========================================================================
// Before/After Slider Component
// ==========================================================================

class BeforeAfterSlider {
  constructor() {
    this.slider = document.querySelector('.image-slider');
    this.handle = document.querySelector('.slider-handle');
    this.beforeImage = document.querySelector('.slider-before');

    this.isDragging = false;
    this.startX = 0;
    this.currentX = 50;

    if (this.slider && this.handle && this.beforeImage) {
      this.init();
    }
  }

  init() {
    if (!this.slider || !this.handle || !this.beforeImage) return;

    this.bindEvents();
    this.updateSlider(this.currentX);
  }

  bindEvents() {
    this.handle.addEventListener('mousedown', (e) => this.startDrag(e));
    document.addEventListener('mousemove', (e) => this.onDrag(e));
    document.addEventListener('mouseup', () => this.stopDrag());

    this.handle.addEventListener('touchstart', (e) => this.startDrag(e), { passive: false });
    document.addEventListener('touchmove', (e) => this.onDrag(e), { passive: false });
    document.addEventListener('touchend', () => this.stopDrag());

    this.handle.addEventListener('keydown', (e) => this.onKeydown(e));

    this.slider.addEventListener('click', (e) => this.onSliderClick(e));
  }

  startDrag(e) {
    this.isDragging = true;
    this.startX = this.getEventX(e);
    this.handle.classList.add('dragging');

    document.body.style.userSelect = 'none';

    e.preventDefault();
  }

  onDrag(e) {
    if (!this.isDragging) return;

    const rect = this.slider.getBoundingClientRect();
    const x = this.getEventX(e);
    const percentage = ((x - rect.left) / rect.width) * 100;

    this.currentX = Math.max(0, Math.min(100, percentage));
    this.updateSlider(this.currentX);

    e.preventDefault();
  }

  stopDrag() {
    if (!this.isDragging) return;

    this.isDragging = false;
    this.handle.classList.remove('dragging');
    document.body.style.userSelect = '';
  }

  onKeydown(e) {
    let newX = this.currentX;

    switch (e.key) {
      case 'ArrowLeft':
        newX = Math.max(0, this.currentX - 5);
        break;
      case 'ArrowRight':
        newX = Math.min(100, this.currentX + 5);
        break;
      case 'Home':
        newX = 0;
        break;
      case 'End':
        newX = 100;
        break;
      default:
        return;
    }

    this.currentX = newX;
    this.updateSlider(this.currentX);
    this.handle.setAttribute('aria-valuenow', Math.round(this.currentX));

    e.preventDefault();
  }

  onSliderClick(e) {
    if (e.target === this.handle) return;

    const rect = this.slider.getBoundingClientRect();
    const percentage = ((e.clientX - rect.left) / rect.width) * 100;

    this.currentX = Math.max(0, Math.min(100, percentage));
    this.updateSlider(this.currentX);
    this.handle.setAttribute('aria-valuenow', Math.round(this.currentX));
  }

  updateSlider(percentage) {
    if (this.handle && this.beforeImage) {
      this.handle.style.left = `${percentage}%`;
      this.beforeImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    }
  }

  getEventX(e) {
    return e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
  }

  handleResize() {
    if (this.slider && this.handle && this.beforeImage) {
      this.updateSlider(this.currentX);
    }
  }
}

// ==========================================================================
// Gallery Component
// ==========================================================================

class Gallery {
  constructor() {
    this.gallery = document.querySelector('.gallery-grid');
    this.filters = document.querySelectorAll('.gallery-filter');
    this.modal = null;
    this.currentIndex = 0;
    this.images = [];

    this.init();
  }

  init() {
    if (!this.gallery) return;

    this.bindEvents();
    this.setupFilters();
    this.collectImages();
  }

  bindEvents() {
    this.gallery.addEventListener('click', (e) => {
      const item = e.target.closest('.gallery-item');
      if (item) {
        const index = Array.from(this.gallery.children).indexOf(item);
        this.openModal(index);
      }
    });

    this.filters.forEach(filter => {
      filter.addEventListener('click', (e) => {
        e.preventDefault();
        this.setActiveFilter(filter);
        this.filterItems(filter.dataset.filter);
      });
    });
  }

  setupFilters() {
    if (this.filters.length === 0) return;

    this.setActiveFilter(this.filters[0]);
  }

  setActiveFilter(activeFilter) {
    this.filters.forEach(filter => {
      filter.classList.remove('active');
      filter.setAttribute('aria-pressed', 'false');
    });

    activeFilter.classList.add('active');
    activeFilter.setAttribute('aria-pressed', 'true');
  }

  filterItems(category) {
    const items = this.gallery.querySelectorAll('.gallery-item');

    items.forEach(item => {
      const itemCategory = item.dataset.category;

      if (category === 'all' || itemCategory === category) {
        item.style.display = 'block';
        item.classList.add('fade-in');
      } else {
        item.style.display = 'none';
        item.classList.remove('fade-in');
      }
    });

    this.collectImages();
  }

  collectImages() {
    const visibleItems = this.gallery.querySelectorAll('.gallery-item:not([style*="display: none"])');
    this.images = Array.from(visibleItems).map(item => ({
      src: item.querySelector('img').src,
      alt: item.querySelector('img').alt,
      caption: item.dataset.caption || ''
    }));
  }

  openModal(index) {
    this.currentIndex = index;
    this.createModal();
    this.showImage(index);

    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      if (this.modal) {
        this.modal.focus();
      }
    }, 100);
  }

  createModal() {
    if (this.modal) return;

    this.modal = document.createElement('div');
    this.modal.className = 'gallery-modal';
    this.modal.setAttribute('role', 'dialog');
    this.modal.setAttribute('aria-label', 'Image gallery');
    this.modal.setAttribute('tabindex', '-1');

    this.modal.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal-content">
        <button class="modal-close" aria-label="Close gallery">
          <span aria-hidden="true">&times;</span>
        </button>
        <div class="modal-image-container">
          <img class="modal-image" src="" alt="" />
          <div class="modal-caption"></div>
        </div>
        <div class="modal-navigation">
          <button class="modal-prev" aria-label="Previous image">
            <span aria-hidden="true">‹</span>
          </button>
          <div class="modal-counter">
            <span class="current">1</span> / <span class="total">${this.images.length}</span>
          </div>
          <button class="modal-next" aria-label="Next image">
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(this.modal);

    this.bindModalEvents();

    requestAnimationFrame(() => {
      this.modal.classList.add('active');
    });
  }

  bindModalEvents() {
    const closeBtn = this.modal.querySelector('.modal-close');
    const overlay = this.modal.querySelector('.modal-overlay');
    const prevBtn = this.modal.querySelector('.modal-prev');
    const nextBtn = this.modal.querySelector('.modal-next');

    closeBtn.addEventListener('click', () => this.closeModal());
    overlay.addEventListener('click', () => this.closeModal());
    prevBtn.addEventListener('click', () => this.showPrevious());
    nextBtn.addEventListener('click', () => this.showNext());

    this.modal.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'Escape':
          this.closeModal();
          break;
        case 'ArrowLeft':
          this.showPrevious();
          break;
        case 'ArrowRight':
          this.showNext();
          break;
      }
    });
  }

  showImage(index) {
    if (!this.modal || !this.images[index]) return;

    const image = this.images[index];
    const modalImage = this.modal.querySelector('.modal-image');
    const modalCaption = this.modal.querySelector('.modal-caption');
    const currentSpan = this.modal.querySelector('.current');

    modalImage.src = image.src;
    modalImage.alt = image.alt;
    modalCaption.textContent = image.caption;
    currentSpan.textContent = index + 1;

    const prevBtn = this.modal.querySelector('.modal-prev');
    const nextBtn = this.modal.querySelector('.modal-next');

    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === this.images.length - 1;
  }

  showPrevious() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.showImage(this.currentIndex);
    }
  }

  showNext() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
      this.showImage(this.currentIndex);
    }
  }

  closeModal() {
    if (!this.modal) return;

    this.modal.classList.remove('active');

    setTimeout(() => {
      if (this.modal) {
        document.body.removeChild(this.modal);
        this.modal = null;
      }
      document.body.style.overflow = '';
    }, 300);
  }

  handleResize() {
    if (this.modal) {
      // Recalculate modal sizing if needed
    }
  }
}

// ==========================================================================
// Form Validation Component
// ==========================================================================

class FormValidation {
  constructor() {
    this.forms = document.querySelectorAll('form[data-validate]:not(.estimate-form)');
    this.init();
  }

  init() {
    this.forms.forEach(form => {
      this.setupForm(form);
    });
  }

  setupForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select');

    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });

    form.addEventListener('submit', (e) => this.handleSubmit(e, form));
  }

  handleSubmit(e, form) {
    e.preventDefault();

    const isValid = this.validateForm(form);

    if (isValid) {
      this.submitForm(form);
    } else {
      const firstError = form.querySelector('.field-error');
      if (firstError) {
        const field = firstError.previousElementSibling;
        if (field) {
          field.focus();
        }
      }
    }
  }

  validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    const rules = this.getValidationRules(field);
    let isValid = true;
    let errorMessage = '';

    if (rules.required && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    }

    if (rules.email && value && !this.isValidEmail(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address';
    }

    if (rules.phone && value && !this.isValidPhone(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid phone number';
    }

    if (rules.minLength && value && value.length < rules.minLength) {
      isValid = false;
      errorMessage = `Must be at least ${rules.minLength} characters`;
    }

    if (rules.maxLength && value && value.length > rules.maxLength) {
      isValid = false;
      errorMessage = `Must be no more than ${rules.maxLength} characters`;
    }

    this.displayFieldError(field, isValid ? '' : errorMessage);
    return isValid;
  }

  getValidationRules(field) {
    const rules = {};

    if (field.hasAttribute('required')) {
      rules.required = true;
    }

    if (field.type === 'email') {
      rules.email = true;
    }

    if (field.type === 'tel' || field.dataset.validate === 'phone') {
      rules.phone = true;
    }

    if (field.hasAttribute('minlength')) {
      rules.minLength = parseInt(field.getAttribute('minlength'));
    }

    if (field.hasAttribute('maxlength')) {
      rules.maxLength = parseInt(field.getAttribute('maxlength'));
    }

    return rules;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleaned = phone.replace(/[\s\-\(\)\.]/g, '');
    return phoneRegex.test(cleaned) && cleaned.length >= 10;
  }

  displayFieldError(field, message) {
    this.clearFieldError(field);

    if (message) {
      field.classList.add('error');
      field.setAttribute('aria-invalid', 'true');

      const errorDiv = document.createElement('div');
      errorDiv.className = 'field-error';
      errorDiv.textContent = message;
      errorDiv.setAttribute('role', 'alert');

      field.parentNode.insertBefore(errorDiv, field.nextSibling);
    } else {
      field.classList.remove('error');
      field.removeAttribute('aria-invalid');
    }
  }

  clearFieldError(field) {
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
      errorDiv.remove();
    }
  }

  async submitForm(form) {
    const submitBtn = form.querySelector('[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Clear any existing messages
    const existingMessages = document.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    try {
      const formData = new FormData(form);
      const result = await this.sendEmail(formData, form);

      if (result.success) {
        this.showSuccessMessage(form);
        form.reset();
      } else {
        this.showErrorMessage(form, result.message);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      this.showErrorMessage(form, 'An unexpected error occurred. Please try again.');
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  }

  async sendEmail(formData, form) {
    try {
      // Convert FormData to regular object for EmailJS
      const templateParams = {};

      for (let [key, value] of formData.entries()) {
        templateParams[key] = value;
      }

      console.log('Sending email with params:', templateParams);

      // Initialize EmailJS if not already done
      if (typeof emailjs === 'undefined') {
        throw new Error('EmailJS not loaded');
      }

      // Send email using EmailJS
      const result = await emailjs.send(
        'service_f3qja94',        // Your EmailJS service ID
        'template_contact',       // Your EmailJS template ID
        templateParams,
        'd1oDyRp2DnFaQhbJr'      // Your EmailJS public key
      );

      console.log('Email sent successfully:', result);
      return { success: true };

    } catch (error) {
      console.error('Email submission error:', error);

      if (!navigator.onLine) {
        return {
          success: false,
          message: 'Connection error. Please check your internet connection and try again.'
        };
      }

      if (error.message.includes('EmailJS not loaded')) {
        return {
          success: false,
          message: 'Email service not available. Please try again or call us directly.'
        };
      }

      return {
        success: false,
        message: 'There was an error sending your message. Please try again or call us directly.'
      };
    }
  }

  showSuccessMessage(form) {
    const message = document.createElement('div');
    message.className = 'form-message success';
    message.innerHTML = `
      <i class="fas fa-check-circle"></i>
      <strong>Message sent successfully!</strong> We'll get back to you within 24 hours.
    `;
    message.setAttribute('role', 'alert');

    form.parentNode.insertBefore(message, form);

    // Scroll to success message
    message.scrollIntoView({ behavior: 'smooth', block: 'center' });

    setTimeout(() => {
      message.remove();
    }, 10000);
  }

  showErrorMessage(form, errorText) {
    const message = document.createElement('div');
    message.className = 'form-message error';

    // Enhanced error messages with helpful fallbacks
    let enhancedMessage = errorText;
    if (errorText.includes('Connection error')) {
      enhancedMessage = `
        <i class="fas fa-exclamation-triangle"></i>
        <strong>Connection error.</strong> Please check your internet connection and try again, or call us directly at <a href="tel:4073078050">(407) 307-8050</a>.
      `;
    } else if (errorText.includes('Form configuration error')) {
      enhancedMessage = `
        <i class="fas fa-exclamation-triangle"></i>
        <strong>Form configuration error.</strong> Please call us directly at <a href="tel:4073078050">(407) 307-8050</a> or email <a href="mailto:3sixtyautocollision@gmail.com">3sixtyautocollision@gmail.com</a>.
      `;
    } else {
      enhancedMessage = `
        <i class="fas fa-exclamation-triangle"></i>
        <strong>Error sending message.</strong> Please try again or call us directly at <a href="tel:4073078050">(407) 307-8050</a>.
      `;
    }

    message.innerHTML = enhancedMessage;
    message.setAttribute('role', 'alert');

    form.parentNode.insertBefore(message, form);

    // Scroll to error message
    message.scrollIntoView({ behavior: 'smooth', block: 'center' });

    setTimeout(() => {
      message.remove();
    }, 15000);
  }
}

// ==========================================================================
// Scroll Animations Component
// ==========================================================================

class ScrollAnimations {
  constructor() {
    this.elements = document.querySelectorAll('.animate-on-scroll');
    this.init();
  }

  init() {
    if (!('IntersectionObserver' in window)) {
      this.elements.forEach(el => el.classList.add('animated'));
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    this.elements.forEach(el => this.observer.observe(el));
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;

        setTimeout(() => {
          entry.target.classList.add('animated');
        }, delay);

        this.observer.unobserve(entry.target);
      }
    });
  }
}

// ==========================================================================
// Performance Monitoring
// ==========================================================================

class PerformanceMonitor {
  static init() {
    window.addEventListener('load', () => {
      if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
      }
    });
  }
}

// ==========================================================================
// Initialize Application
// ==========================================================================

const app = new ThreeSixtyApp();

PerformanceMonitor.init();

window.ThreeSixtyApp = {
  Navigation,
  ThemeToggle,
  BeforeAfterSlider,
  Gallery,
  FormValidation,
  ScrollAnimations
};
