// Language Toggle
let currentLang = 'fr';

// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingProgress = document.getElementById('loadingProgress');
    const loadingPercent = document.getElementById('loadingPercent');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        loadingProgress.style.width = progress + '%';
        loadingPercent.textContent = Math.floor(progress) + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 500);
        }
    }, 100);
});

// Language Toggle
const langBtn = document.getElementById('langBtn');

langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'fr' ? 'en' : 'fr';
    langBtn.textContent = currentLang === 'fr' ? 'EN' : 'FR';
    updateLanguage();
});

function updateLanguage() {
    // Update all elements with data-fr and data-en attributes
    document.querySelectorAll('[data-fr]').forEach(element => {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = element.getAttribute(`data-placeholder-${currentLang}`);
        } else {
            const text = element.getAttribute(`data-${currentLang}`);
            if (text) {
                element.textContent = text;
            }
        }
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .menu-item, .gallery-item, .info-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Contact Form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = contactForm.querySelector('input[type="text"]').value;
    const phone = contactForm.querySelector('input[type="tel"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    const whatsappMessage = currentLang === 'fr' 
        ? `Bonjour! Je m'appelle ${name}.\n\nMa commande:\n${message}\n\nMon numéro: ${phone}`
        : `Hello! My name is ${name}.\n\nMy order:\n${message}\n\nMy number: ${phone}`;
    
    const whatsappUrl = `https://wa.me/237696071317?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');
    
    contactForm.reset();
});

// Parallax Effect on Hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-bg');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Gallery Lightbox Effect
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: rgba(0,0,0,0.95);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        `;
        
        const lightboxImg = document.createElement('img');
        lightboxImg.src = img.src;
        lightboxImg.style.cssText = `
            max-width: 90%;
            max-height: 90vh;
            object-fit: contain;
        `;
        
        lightbox.appendChild(lightboxImg);
        document.body.appendChild(lightbox);
        
        lightbox.addEventListener('click', () => {
            lightbox.remove();
        });
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0,0,0,0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'rgba(0,0,0,0.9)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Cursor Effect (Optional - for desktop)
if (window.innerWidth > 768) {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid #FF6B00;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    document.querySelectorAll('a, button, .menu-item, .gallery-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}
