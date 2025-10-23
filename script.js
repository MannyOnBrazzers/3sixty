
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.particleCount = 50;
        this.container = document.getElementById('particles');
        this.init();
    }

    init() {
        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle();
        }
        this.animate();
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = Math.random() * window.innerHeight + 'px';

        const duration = Math.random() * 3 + 3;
        particle.style.animationDuration = duration + 's';

        const delay = Math.random() * 2;
        particle.style.animationDelay = delay + 's';

        this.container.appendChild(particle);
        this.particles.push(particle);
    }

    animate() {
        this.particles.forEach(particle => {
            const currentLeft = parseFloat(particle.style.left);
            const currentTop = parseFloat(particle.style.top);

            particle.style.left = (currentLeft + (Math.random() - 0.5) * 0.5) + 'px';
            particle.style.top = (currentTop + (Math.random() - 0.5) * 0.5) + 'px';

            if (currentLeft > window.innerWidth) {
                particle.style.left = '-10px';
            }
            if (currentLeft < -10) {
                particle.style.left = window.innerWidth + 'px';
            }
            if (currentTop > window.innerHeight) {
                particle.style.top = '-10px';
            }
            if (currentTop < -10) {
                particle.style.top = window.innerHeight + 'px';
            }
        });

        requestAnimationFrame(() => this.animate());
    }

    resize() {
        this.particles.forEach(particle => {
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = Math.random() * window.innerHeight + 'px';
        });
    }
}

function loadStreetView() {
    const config = window.SITE_CONFIG;
    const businessAddress = config.contact.address.full;

    const streetViewUrl = `https://www.google.com/maps/embed/v1/streetview?key=${config.location.googleMapsApiKey}&location=${encodeURIComponent(businessAddress)}&heading=0&pitch=0&fov=90`;

    const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(businessAddress)}`;

    const modal = document.createElement('div');
    modal.className = 'street-view-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Visit Our Location</h3>
                <button class="close-modal" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <p>Click below to view our location on Google Maps:</p>
                <div class="map-buttons">
                    <a href="${mapsUrl}" target="_blank" class="map-btn">
                        <i class="fas fa-map-marked-alt"></i>
                        Open in Google Maps
                    </a>
                    <button class="map-btn" onclick="getDirections()">
                        <i class="fas fa-directions"></i>
                        Get Directions
                    </button>
                </div>
                <div class="address-info">
                    <h4>${config.business.fullName}</h4>
                    <p>${config.contact.address.street}<br>${config.contact.address.city}, ${config.contact.address.state} ${config.contact.address.zip}</p>
                    <p><strong>Phone:</strong> ${config.contact.phone.display}</p>
                </div>
            </div>
        </div>
        <div class="modal-overlay" onclick="closeModal()"></div>
    `;

    const modalStyles = `
        .street-view-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: modalFadeIn 0.3s ease;
        }

        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
        }

        .modal-content {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            border-radius: 20px;
            padding: 0;
            max-width: 500px;
            width: 90%;
            position: relative;
            z-index: 1001;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .modal-header {
            padding: 2rem 2rem 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .modal-header h3 {
            color: #fff;
            margin: 0;
            font-size: 1.5rem;
        }

        .close-modal {
            background: none;
            border: none;
            color: #fff;
            font-size: 2rem;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.3s ease;
        }

        .close-modal:hover {
            background: rgba(255, 255, 255, 0.1);
        }

        .modal-body {
            padding: 2rem;
        }

        .modal-body p {
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 2rem;
            text-align: center;
        }

        .map-buttons {
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }

        .map-btn {
            flex: 1;
            padding: 1rem;
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            color: #fff;
            text-decoration: none;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            transition: all 0.3s ease;
            cursor: pointer;
            font-size: 0.9rem;
        }

        .map-btn:hover {
            background: rgba(0, 0, 0, 0.4);
            transform: translateY(-2px);
        }

        .address-info {
            background: rgba(0, 0, 0, 0.2);
            padding: 1.5rem;
            border-radius: 10px;
            text-align: center;
        }

        .address-info h4 {
            color: #00d4ff;
            margin-bottom: 1rem;
            font-size: 1.2rem;
        }

        .address-info p {
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 0.5rem;
        }

        @keyframes modalFadeIn {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        @media (max-width: 480px) {
            .map-buttons {
                flex-direction: column;
            }

            .modal-content {
                margin: 1rem;
                width: calc(100% - 2rem);
            }
        }
    `;

    if (!document.getElementById('modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = modalStyles;
        document.head.appendChild(style);
    }

    document.body.appendChild(modal);
}

function closeModal() {
    const modal = document.querySelector('.street-view-modal');
    if (modal) {
        modal.style.animation = 'modalFadeOut 0.3s ease forwards';
        setTimeout(() => modal.remove(), 300);
    }
}

function getDirections() {
    const config = window.SITE_CONFIG;
    const businessAddress = config.contact.address.full;
    const directionsUrl = `https://www.google.com/maps/dir//${encodeURIComponent(businessAddress)}`;
    window.open(directionsUrl, '_blank');
}

function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        observer.observe(section);
    });
}

function populateContent() {
    const config = window.SITE_CONFIG;

    document.title = config.content.seo.title;
    updateMetaTag('description', config.content.seo.description);
    updateMetaTag('keywords', config.content.seo.keywords);

    if (config.business.logo.useCustomLogo) {
        const logoContainer = document.getElementById('logo-container');
        logoContainer.innerHTML = `<img src="${config.business.logo.customLogoPath}" alt="${config.business.name}" class="custom-logo">`;
    } else {
        document.getElementById('logo-icon').className = config.business.logo.icon;
        document.getElementById('logo-text').textContent = config.business.logo.text;
    }

    document.getElementById('hero-title').textContent = config.content.hero.title;
    document.getElementById('hero-subtitle').textContent = config.content.hero.subtitle;
    document.getElementById('progress-text').textContent = config.content.hero.progressText;

    const progressFill = document.querySelector('.progress-fill');
    progressFill.style.width = config.content.hero.progressPercentage + '%';

    document.getElementById('about-title').textContent = config.business.tagline;
    document.getElementById('about-description').textContent = config.business.description;

    populateContactSection();

    populateServicesSection();

    populateAdditionalSections();

    populateFooter();

    const constructionIcon = document.querySelector('.construction-icon');
    if (!config.settings.features.showConstructionIcon) {
        constructionIcon.style.display = 'none';
    }

    const progressBar = document.querySelector('.progress-bar');
    if (!config.settings.features.showProgressBar) {
        progressBar.style.display = 'none';
    }
}

function updateMetaTag(name, content) {
    try {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.name = name;
            document.head.appendChild(meta);
        }
        meta.content = content;
    } catch (error) {
        console.warn('Error updating meta tag:', name, error);
    }
}

function populateContactSection() {
    const config = window.SITE_CONFIG;
    const contactGrid = document.getElementById('contact-grid');

    if (!contactGrid) {
        console.warn('Contact grid element not found');
        return;
    }

    const contactItems = [
        {
            icon: 'fas fa-phone',
            title: 'Phone',
            content: config.contact.phone.display,
            link: config.contact.phone.link
        },
        {
            icon: 'fas fa-envelope',
            title: 'Email',
            content: config.contact.email.display,
            link: config.contact.email.link
        },
        {
            icon: 'fas fa-clock',
            title: 'Hours',
            content: config.contact.hours.display,
            link: null
        },
        {
            icon: 'fas fa-map-marker-alt',
            title: 'Location',
            content: `${config.contact.address.street}<br>${config.contact.address.city}, ${config.contact.address.state} ${config.contact.address.zip}`,
            link: null
        }
    ];

    contactGrid.innerHTML = contactItems.map(item => `
        <div class="contact-item" ${item.link ? `onclick="window.open('${item.link}', '_self')"` : ''} style="cursor: ${item.link ? 'pointer' : 'default'}">
            <div class="contact-icon">
                <i class="${item.icon}"></i>
            </div>
            <div class="contact-info">
                <h3>${item.title}</h3>
                <p>${item.content}</p>
            </div>
        </div>
    `).join('');
}

function populateServicesSection() {
    const config = window.SITE_CONFIG;
    const servicesGrid = document.getElementById('services-grid');

    if (!servicesGrid) {
        console.warn('Services grid element not found');
        return;
    }

    if (!config.settings.features.showServicesSection) {
        document.querySelector('.services-preview').style.display = 'none';
        return;
    }

    const featuredServices = config.services.filter(service => service.featured);

    servicesGrid.innerHTML = featuredServices.map(service => `
        <div class="service-item">
            <div class="service-icon">
                <i class="${service.icon}"></i>
            </div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        </div>
    `).join('');
}

function populateFooter() {
    const config = window.SITE_CONFIG;
    const footerCopyright = document.getElementById('footer-copyright');
    const socialLinks = document.getElementById('social-links');

    if (!footerCopyright || !socialLinks) {
        console.warn('Footer elements not found');
        return;
    }

    footerCopyright.textContent = `© ${config.settings.footer.copyrightYear} ${config.business.fullName}. ${config.settings.footer.copyrightText}`;

    if (!config.settings.features.showSocialLinks || !config.settings.footer.showSocialLinks) {
        socialLinks.style.display = 'none';
        return;
    }

    const socialPlatforms = [
        { key: 'facebook', icon: 'fab fa-facebook' },
        { key: 'instagram', icon: 'fab fa-instagram' },
        { key: 'twitter', icon: 'fab fa-twitter' },
        { key: 'linkedin', icon: 'fab fa-linkedin' },
        { key: 'google', icon: 'fab fa-google' },
        { key: 'tiktok', icon: 'fab fa-tiktok' },
        { key: 'youtube', icon: 'fab fa-youtube' }
    ];

    const activeSocial = socialPlatforms.filter(platform =>
        config.social[platform.key] && config.social[platform.key].show
    );

    socialLinks.innerHTML = activeSocial.map(platform => `
        <a href="${config.social[platform.key].url}" class="social-link" target="_blank" rel="noopener noreferrer">
            <i class="${platform.icon}"></i>
        </a>
    `).join('');
}

function populateAdditionalSections() {
    const config = window.SITE_CONFIG;

    if (config.additionalSections.testimonials.enabled) {
        populateTestimonials();
    } else {
        const testimonialsSection = document.getElementById('testimonials-section');
        if (testimonialsSection) {
            testimonialsSection.style.display = 'none';
        }
    }

    if (config.additionalSections.gallery.enabled) {
        populateGallery();
    } else {
        const gallerySection = document.getElementById('gallery-section');
        if (gallerySection) {
            gallerySection.style.display = 'none';
        }
    }
}

function populateTestimonials() {
    const config = window.SITE_CONFIG;
    const testimonials = config.additionalSections.testimonials;

    document.getElementById('testimonials-title').textContent = testimonials.title;
    if (testimonials.subtitle) {
        document.getElementById('testimonials-subtitle').textContent = testimonials.subtitle;
    }

    const testimonialsGrid = document.getElementById('testimonials-grid');

    testimonialsGrid.innerHTML = testimonials.items.map(testimonial => {
        const stars = '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating);

        return `
            <div class="testimonial-item">
                <div class="testimonial-text">
                    ${testimonial.text}
                </div>
                <div class="testimonial-author">
                    <div class="author-info">
                        <h4>${testimonial.author}</h4>
                        ${testimonial.location ? `<p>${testimonial.location}</p>` : ''}
                    </div>
                    <div class="testimonial-rating">
                        ${stars.split('').map(star => `<span class="star">${star}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function populateGallery() {
    const config = window.SITE_CONFIG;
    const gallery = config.additionalSections.gallery;

    document.getElementById('gallery-title').textContent = gallery.title;
    if (gallery.subtitle) {
        document.getElementById('gallery-subtitle').textContent = gallery.subtitle;
    }

    const galleryGrid = document.getElementById('gallery-grid');

    galleryGrid.innerHTML = gallery.images.map((image, index) => `
        <div class="gallery-item" onclick="openGalleryModal(${index})">
            <img src="${image.src}" alt="${image.alt}" loading="lazy">
            <div class="gallery-overlay">
                <h4>${image.caption}</h4>
                <p>Click to view full size</p>
            </div>
        </div>
    `).join('');
}

function openGalleryModal(index) {
    const config = window.SITE_CONFIG;
    const image = config.additionalSections.gallery.images[index];

    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <div class="gallery-modal-content">
            <img src="${image.src}" alt="${image.alt}">
            <button class="gallery-modal-close" onclick="closeGalleryModal()">&times;</button>
            <div class="gallery-modal-info">
                <h4>${image.caption}</h4>
                <p>${image.alt}</p>
            </div>
        </div>
    `;

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeGalleryModal();
        }
    });

    document.addEventListener('keydown', function handleEscape(e) {
        if (e.key === 'Escape') {
            closeGalleryModal();
            document.removeEventListener('keydown', handleEscape);
        }
    });

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

function closeGalleryModal() {
    const modal = document.querySelector('.gallery-modal');
    if (modal) {
        modal.style.animation = 'modalFadeOut 0.3s ease forwards';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

function initContactForm() {
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
}

function animateProgressBar() {
    const progressBar = document.querySelector('.progress-fill');
    if (progressBar) {
        setTimeout(() => {
            progressBar.style.background = `
                linear-gradient(90deg, #ffd700, #ffed4e),
                linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)
            `;
            progressBar.style.backgroundSize = '100% 100%, 200px 100%';
        }, 1000);
    }
}

function initTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.opacity = '1';

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };

    setTimeout(typeWriter, 1500);
}

function tryInitialize() {
    const maxAttempts = 10;
    let attempts = 0;

    function attemptInit() {
        attempts++;

        if (typeof window.SITE_CONFIG === 'undefined') {
            if (attempts < maxAttempts) {
                console.log(`Config not ready, attempt ${attempts}/${maxAttempts}, retrying...`);
                setTimeout(attemptInit, 100);
                return;
            } else {
                console.error('Configuration failed to load after maximum attempts');
                return;
            }
        }

        console.log('Configuration loaded successfully, initializing...');

        try {
            populateContent();

            const config = window.SITE_CONFIG;
            let particleSystem;

            if (config.settings.animations.enableParticles) {
                particleSystem = new ParticleSystem();
                particleSystem.particleCount = config.settings.animations.particleCount;

                window.addEventListener('resize', () => {
                    particleSystem.resize();
                });
            }

            initSmoothScrolling();
            initScrollAnimations();
            initContactForm();
            animateProgressBar();
            initTypingEffect();

            setTimeout(() => {
                const serviceItems = document.querySelectorAll('.service-item');
                serviceItems.forEach(item => {
                    item.addEventListener('mouseenter', function() {
                        this.style.transform = 'translateY(-10px) scale(1.02)';
                    });

                    item.addEventListener('mouseleave', function() {
                        this.style.transform = 'translateY(0) scale(1)';
                    });
                });

                const logo = document.querySelector('.logo-placeholder');
                if (logo) {
                    logo.addEventListener('click', function() {
                        this.style.animation = 'none';
                        setTimeout(() => {
                            this.style.animation = 'bounce 0.6s ease';
                        }, 10);
                    });
                }
            }, 500);

            if (config.settings.animations.enableSparkles) {
                setInterval(() => {
                    createSparkle();
                }, config.settings.animations.sparkleInterval);
            }

            console.log('Website initialization completed successfully');

        } catch (error) {
            console.error('Error during initialization:', error);
        }
    }

    attemptInit();
}

document.addEventListener('DOMContentLoaded', tryInitialize);

window.addEventListener('load', function() {
    if (typeof window.SITE_CONFIG === 'undefined') {
        console.log('Backup initialization triggered');
        setTimeout(tryInitialize, 200);
    }
});

function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = Math.random() * window.innerWidth + 'px';
    sparkle.style.top = Math.random() * window.innerHeight + 'px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '999';
    sparkle.style.fontSize = '20px';
    sparkle.style.animation = 'sparkleFloat 3s ease-out forwards';

    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 3000);
}

const sparkleStyles = `
    @keyframes sparkleFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(0);
        }
        50% {
            opacity: 1;
            transform: translateY(-50px) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) scale(0);
        }
    }

    @keyframes modalFadeOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.8);
        }
    }
`;

const style = document.createElement('style');
style.textContent = sparkleStyles;
document.head.appendChild(style);

const scrollAnimationStyles = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const scrollStyle = document.createElement('style');
scrollStyle.textContent = scrollAnimationStyles;
document.head.appendChild(scrollStyle);
