
const CONFIG = {
    business: {
        name: "3Sixty",
        fullName: "3Sixty Auto Collision & Paint",
        tagline: "Precision. Passion. Perfection. Every Time.",
        description: "At 3Sixty, we provide comprehensive auto body repair and painting services. Our experienced team is dedicated to restoring your vehicle to its original condition with precision and care.",
        logo: {
            icon: "fas fa-car",
            text: "3Sixty",
            useCustomLogo: true,
            customLogoPath: "assets/logo.png"
        }
    },

    contact: {
        phone: {
            display: "(407) 307-8050",
            link: "tel:+14073078050"
        },
        email: {
            display: "3sixtyautocollision@gmail.com",
            link: "mailto:3sixtyautocollision@gmail.com"
        },
        address: {
            street: "3911 Dundee Rd",
            city: "Winter Haven",
            state: "FL",
            zip: "33884",
            full: "3911 Dundee Rd, Winter Haven, FL 33884"
        },
        hours: {
            weekdays: "Mon-Fri: 9AM-5PM",
            saturday: "Sat: Appointment Only",
            sunday: "Closed",
            display: "Mon-Fri: 9AM-5PM<br>Saturday: Appointment Only<br>Sunday: Closed"
        }
    },

    services: [
        {
          title: "Auto Restoration",
          description: "We bring vehicles back to their original beauty with expert craftsmanship and attention to every detail.",
          icon: "fas fa-car-side",
          featured: true
        },
        {
          title: "Collision Repairs",
          description: "From fender benders to major damage, we restore your car’s safety, structure, and showroom look.",
          icon: "fas fa-car-crash",
          featured: true
        },
        {
          title: "Insurance Work",
          description: "Direct insurance billing and claims assistance to make your repair process quick and stress-free.",
          icon: "fas fa-file-invoice-dollar",
          featured: true
        },
        {
          title: "Color Matching",
          description: "Using advanced paint-matching tech, we blend new paint flawlessly with your car’s original finish.",
          icon: "fas fa-palette",
          featured: true
        },
        {
          title: "Custom Painting",
          description: "Transform your ride with unique colors, designs, and finishes tailored to your style.",
          icon: "fas fa-paintbrush",
          featured: true
        },
        {
          title: "Dent Removal",
          description: "We remove dents and dings quickly using paintless repair methods for a smooth, factory finish.",
          icon: "fas fa-hammer",
          featured: true
        },
        {
          title: "Frame Repair",
          description: "Our precision frame straightening restores your vehicle’s alignment and structural integrity.",
          icon: "fas fa-wrench",
          featured: true
        }
    ],

    social: {
        facebook: {
            url: "https://facebook.com/your-page",
            show: false
        },
        instagram: {
            url: "https://instagram.com/3sixtyac",
            show: true
        },
        google: {
            url: "https://g.page/your-business",
            show: false
        },
        twitter: {
            url: "https://twitter.com/your-handle",
            show: false
        },
        linkedin: {
            url: "https://linkedin.com/company/your-business",
            show: false
        },
        tiktok: {
            url: "https://tiktok.com/@3sixtyac",
            show: true
        },
        youtube: {
            url: "https://youtube.com/@3sixtyac",
            show: true
        }
    },

    location: {
        googleMapsApiKey: "YOUR_API_KEY_HERE",
        coordinates: {
            lat: 40.7128,
            lng: -74.0060
        },
        mapSettings: {
            zoom: 15,
            mapType: "roadmap"
        }
    },

    content: {
        hero: {
            title: "Website Under Construction",
            subtitle: "We're building something amazing for 3Sixty Auto Collision & Paint",
            progressText: "Coming Soon...",
            progressPercentage: 75
        },
        seo: {
            title: "3Sixty Auto Collision & Paint - Coming Soon",
            description: "Professional auto collision repair and paint services. Expert body work, insurance claims, and vehicle restoration. Coming soon!",
            keywords: "auto collision, paint, body shop, car repair, insurance, vehicle restoration"
        }
    },

    settings: {
        theme: {
            primary: "#1a1a2e",
            secondary: "#16213e",
            accent: "#00d4ff",
            accentSecondary: "#0099cc"
        },

        animations: {
            enableParticles: true,
            enableSparkles: true,
            particleCount: 50,
            sparkleInterval: 3000
        },

        features: {
            showProgressBar: true,
            showServicesSection: true,
            showSocialLinks: true,
            enableStreetView: true,
            showConstructionIcon: true
        },

        footer: {
            copyrightYear: 2025,
            copyrightText: "All rights reserved.",
            showSocialLinks: true
        }
    },

    additionalSections: {
        testimonials: {
            enabled: false,
            title: "What Our Customers Say",
            subtitle: "Real feedback from our satisfied customers",
            items: [
                {
                    text: "Excellent work! My car looks brand new after the collision repair. The paint match is perfect and you can't even tell there was damage. Professional service from start to finish.",
                    author: "Sarah Johnson",
                    rating: 5,
                    location: "Downtown Auto Owner"
                },
                {
                    text: "Fast, reliable service with great attention to detail. They worked directly with my insurance company and made the whole process stress-free. Highly recommend!",
                    author: "Mike Rodriguez",
                    rating: 5,
                    location: "Repeat Customer"
                },
                {
                    text: "Best auto body shop in town! They restored my classic car perfectly and the paint job is flawless. The team really knows their craft.",
                    author: "Robert Chen",
                    rating: 5,
                    location: "Classic Car Enthusiast"
                },
                {
                    text: "Professional, honest, and affordable. They explained everything clearly and delivered exactly what they promised. Will definitely return for future needs.",
                    author: "Jennifer Smith",
                    rating: 5,
                    location: "First-time Customer"
                }
            ]
        },

        gallery: {
            enabled: false,
            title: "Our Work",
            subtitle: "See the quality of our collision repair and paint services",
            categories: [
                {
                    name: "Before & After",
                    images: [
                        {
                            src: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=300&fit=crop",
                            alt: "Car collision repair before and after",
                            caption: "Complete front-end collision repair"
                        },
                        {
                            src: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=300&fit=crop",
                            alt: "Paint job restoration",
                            caption: "Full vehicle paint restoration"
                        },
                        {
                            src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
                            alt: "Dent removal work",
                            caption: "Professional dent removal"
                        }
                    ]
                },
                {
                    name: "Paint Work",
                    images: [
                        {
                            src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop",
                            alt: "Custom paint job",
                            caption: "Custom color matching"
                        },
                        {
                            src: "https://images.unsplash.com/photo-1574769567203-8332d64431ba?w=400&h=300&fit=crop",
                            alt: "Metallic paint finish",
                            caption: "Premium metallic finish"
                        },
                        {
                            src: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop",
                            alt: "Classic car restoration",
                            caption: "Classic car paint restoration"
                        }
                    ]
                }
            ],
            images: [
                {
                    src: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=300&fit=crop",
                    alt: "Car collision repair work",
                    caption: "Professional collision repair"
                },
                {
                    src: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=300&fit=crop",
                    alt: "Auto paint service",
                    caption: "Expert paint services"
                },
                {
                    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
                    alt: "Vehicle restoration",
                    caption: "Complete vehicle restoration"
                },
                {
                    src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop",
                    alt: "Custom automotive work",
                    caption: "Custom automotive solutions"
                },
                {
                    src: "https://images.unsplash.com/photo-1574769567203-8332d64431ba?w=400&h=300&fit=crop",
                    alt: "Premium finish work",
                    caption: "Premium quality finishes"
                },
                {
                    src: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop",
                    alt: "Auto body expertise",
                    caption: "Expert auto body work"
                }
            ]
        }
    },

    dev: {
        debugMode: false,
        showConfigInConsole: false
    }
};

window.SITE_CONFIG = CONFIG;

if (CONFIG.dev.showConfigInConsole) {
    console.log('Site Configuration:', CONFIG);
}

function validateConfig() {
    const required = [
        'business.name',
        'contact.phone.display',
        'contact.email.display',
        'contact.address.full'
    ];

    const missing = [];

    required.forEach(path => {
        const value = path.split('.').reduce((obj, key) => obj?.[key], CONFIG);
        if (!value) {
            missing.push(path);
        }
    });

    if (missing.length > 0) {
        console.warn('Missing required configuration:', missing);
    }

    return missing.length === 0;
}

validateConfig();
