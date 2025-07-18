// ===== FUNCIONALIDAD MODERNA Y INTERACTIVA =====

// Loading Screen
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    if (loading) {
        setTimeout(() => {
            loading.classList.add('hidden');
            setTimeout(() => loading.remove(), 500);
        }, 1000);
    }
});

// Header Scroll Effect
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (header) {
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    lastScroll = currentScroll;
});

// Mobile Navigation
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

// Función para cerrar el menú móvil
const closeMobileMenu = () => {
    if (navLinks) navLinks.classList.remove('active');
    if (menuToggle) menuToggle.classList.remove('active');
    document.body.style.overflow = '';
};

// Función para abrir el menú móvil
const openMobileMenu = () => {
    if (navLinks) navLinks.classList.add('active');
    if (menuToggle) menuToggle.classList.add('active');
    document.body.style.overflow = 'hidden';
};

// Toggle del menú móvil
menuToggle?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (navLinks && navLinks.classList.contains('active')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
});

// Cerrar menú cuando se hace click en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});

// Cerrar menú cuando se hace click fuera de él
document.addEventListener('click', (e) => {
    if (navLinks && navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !menuToggle.contains(e.target)) {
        closeMobileMenu();
    }
});

// Cerrar menú con escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Prevenir scroll en background cuando el menú está abierto
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Active Navigation Highlight
const setActiveNav = () => {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a[href^="#"]');
    
    if (sections.length === 0) return;

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
};

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = header ? header.offsetHeight : 80;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Counter Animation for Stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-item h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace('+', ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current) + (counter.textContent.includes('+') ? '+' : '');
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
            }
        };
        
        updateCounter();
    });
};

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    });
    
    statsObserver.observe(statsSection);
}

// Card Hover Effects
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Typing Effect for Hero Title
const typeText = (element, text, speed = 100) => {
    element.textContent = '';
    let i = 0;
    
    const typeInterval = setInterval(() => {
        element.textContent += text[i];
        i++;
        
        if (i >= text.length) {
            clearInterval(typeInterval);
        }
    }, speed);
};

// Initialize typing effect after loading (solo en homepage)
if (document.querySelector('.hero')) {
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            typeText(heroTitle, originalText, 80);
        }
    }, 1500);
}

// Parallax Effect for Hero (solo en homepage)
if (document.querySelector('.hero')) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero && scrolled < hero.offsetHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Gallery Lightbox Effect
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        // Aquí se puede implementar un lightbox en el futuro
        console.log('Foto clickeada:', this);
    });
});

// Form Interactions
const handleFormSubmit = (event) => {
    event.preventDefault();
    alert('¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.');
};

// Keyboard Navigation Support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (navLinks) navLinks.classList.remove('active');
        if (menuToggle) menuToggle.classList.remove('active');
    }
});

// Print Styles Support
window.addEventListener('beforeprint', () => {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});

// Accessibility Improvements
document.querySelectorAll('a, button').forEach(element => {
    if (!element.getAttribute('aria-label') && !element.textContent.trim()) {
        element.setAttribute('aria-label', 'Enlace o botón');
    }
});

// Dynamic Year Update
const currentYear = new Date().getFullYear();
document.querySelectorAll('.current-year').forEach(el => {
    el.textContent = currentYear;
});

// Set Current Page Active in Navigation
const setCurrentPageActive = () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === 'index.html' && linkPage === './')) {
            link.classList.add('active');
        }
    });
};

// Easter Egg - Console Message
console.log(`
🎓 Comunidad Educativa Juana Manso
═══════════════════════════════════

¡Gracias por visitar nuestro sitio!

📅 Celebrando nuestro primer aniversario
📍 Pabellón 16B - Unidad 9  
🎯 Educación para la resocialización

Sitio desarrollado con ❤️ 
Cargado: ${new Date().toLocaleString('es-AR')}
`);

// Performance Monitoring
window.addEventListener('load', () => {
    if (performance.timing) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`⚡ Sitio cargado en ${loadTime}ms`);
    }
});

// Initialize all interactive features
document.addEventListener('DOMContentLoaded', () => {
    setActiveNav();
    setCurrentPageActive();
    console.log('🚀 Comunidad Educativa Juana Manso - Sitio cargado correctamente');
});

// ===== FUNCIONALIDADES ADICIONALES PARA PÁGINAS ESPECÍFICAS =====

// Filtros de Galería
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remover clase active de todos los botones
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Agregar clase active al botón clickeado
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Cerrar todos los items
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                });
                
                // Si no estaba activo, abrirlo
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // Animación de números para estadísticas
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateNumbers = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = target.textContent;
                const hasPlus = finalNumber.includes('+');
                const number = parseInt(finalNumber.replace(/\D/g, ''));
                
                let current = 0;
                const increment = number / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        target.textContent = number + (hasPlus ? '+' : '');
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(current) + (hasPlus ? '+' : '');
                    }
                }, 30);
                
                // Dejar de observar este elemento
                numberObserver.unobserve(target);
            }
        });
    };

    if (statNumbers.length > 0) {
        const numberObserver = new IntersectionObserver(animateNumbers, observerOptions);
        statNumbers.forEach(stat => numberObserver.observe(stat));
    }

    //
    document.querySelectorAll('.card, .news-card, .timeline-item, .stat-card, .gallery-item, .video-card, .testimonial-card, .faq-item, .contact-item, .schedule-card').forEach(el => {
        observer.observe(el);
    });

    // Botón Scroll to Top
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.setAttribute('aria-label', 'Volver arriba');
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Lazy loading para placeholders de imágenes
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const placeholder = entry.target;
                    placeholder.classList.add('loaded');
                    imageObserver.unobserve(placeholder);
                }
            });
        });

        document.querySelectorAll('.gallery-placeholder, .video-placeholder').forEach(placeholder => {
            imageObserver.observe(placeholder);
        });
    }

    // Validación de formularios
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Por favor, completa todos los campos requeridos.');
            }
        });
    });

    console.log('✅ Funcionalidades adicionales cargadas correctamente');
});

// ===== ESTILOS CSS ADICIONALES =====
const additionalStyles = `
    .scroll-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
    }
    
    .scroll-top.show {
        opacity: 1;
        visibility: visible;
    }
    
    .scroll-top:hover {
        background: var(--accent-color);
        transform: translateY(-2px);
    }
    
    .error {
        border-color: #e74c3c !important;
        box-shadow: 0 0 5px rgba(231, 76, 60, 0.3);
    }
    
    .gallery-item {
        transition: all 0.3s ease;
    }
    
    .gallery-placeholder.loaded,
    .video-placeholder.loaded {
        transform: scale(1.02);
    }
    
    @media (max-width: 768px) {
        .gallery-item.large {
            grid-column: span 1;
        }
        
        .timeline::before {
            left: 20px;
        }
        
        .timeline-item,
        .timeline-item:nth-child(even) {
            flex-direction: column;
            align-items: flex-start;
            margin-left: 40px;
        }
        
        .timeline-date {
            margin: 0 0 1rem 0;
            flex: none;
            width: auto;
        }
        
        .contact-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
        }
        
        .stats-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }
`;

// Inyectar estilos adicionales
const additionalStyleSheet = document.createElement('style');
additionalStyleSheet.textContent = additionalStyles;
document.head.appendChild(additionalStyleSheet);

// ===== CARROUSEL DE IMÁGENES =====
class ImageCarousel {
    constructor() {
        console.log('🚀 Iniciando ImageCarousel...');
        
        this.track = document.getElementById('carousel-track');
        this.prevBtn = document.getElementById('carousel-prev');
        this.nextBtn = document.getElementById('carousel-next');
        this.dotsContainer = document.getElementById('carousel-dots');
        
        console.log('🔍 Elementos encontrados:', {
            track: !!this.track,
            prevBtn: !!this.prevBtn,
            nextBtn: !!this.nextBtn,
            dotsContainer: !!this.dotsContainer
        });
        
        if (!this.track) {
            console.error('❌ Carrusel: No se encontró elemento carousel-track');
            return;
        }
        
        this.slides = this.track.querySelectorAll('.carousel-slide');
        console.log(`📸 Carrusel: Encontradas ${this.slides.length} imágenes`);
        
        if (this.slides.length === 0) {
            console.error('❌ Carrusel: No se encontraron slides');
            return;
        }
        
        this.currentIndex = 0;
        this.slidesToShow = this.getSlidesToShow();
        this.maxIndex = Math.max(0, this.slides.length - this.slidesToShow);
        
        console.log(`📊 Carrusel: slidesToShow=${this.slidesToShow}, maxIndex=${this.maxIndex}`);
        
        this.init();
    }
    
    getSlidesToShow() {
        const width = window.innerWidth;
        if (width <= 480) return 1;
        if (width <= 768) return 2;
        return 4;
    }
    
    init() {
        console.log('⚙️ Inicializando carrusel...');
        
        // Configurar estilos iniciales
        this.setupStyles();
        
        // Esperar a que las imágenes se carguen
        this.waitForImages().then(() => {
            console.log('🖼️ Imágenes cargadas, configurando carrusel...');
            this.createDots();
            this.bindEvents();
            this.updateCarousel();
            this.startAutoPlay();
            console.log('✅ Carrusel inicializado correctamente');
        });
    }
    
    setupStyles() {
        // Asegurarse de que el track tenga los estilos correctos
        if (this.track) {
            this.track.style.display = 'flex';
            this.track.style.transition = 'transform 0.5s ease-in-out';
            this.track.style.height = '100%';
        }
        
        // Configurar slides
        this.slides.forEach(slide => {
            slide.style.minWidth = '25%';
            slide.style.height = '100%';
            slide.style.position = 'relative';
            slide.style.padding = '0 5px';
            slide.style.boxSizing = 'border-box';
        });
    }
    
    waitForImages() {
        const images = this.track.querySelectorAll('img');
        const promises = Array.from(images).map(img => {
            if (img.complete) {
                return Promise.resolve();
            }
            return new Promise((resolve) => {
                img.onload = resolve;
                img.onerror = resolve; // También resolver si hay error
            });
        });
        return Promise.all(promises);
    }
    
    createDots() {
        if (!this.dotsContainer) return;
        
        const dotsNeeded = Math.ceil(this.slides.length / this.slidesToShow);
        this.dotsContainer.innerHTML = '';
        
        for (let i = 0; i < dotsNeeded; i++) {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
    }
    
    bindEvents() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Responsive handling
        window.addEventListener('resize', () => {
            this.slidesToShow = this.getSlidesToShow();
            this.maxIndex = Math.max(0, this.slides.length - this.slidesToShow);
            this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
            this.createDots();
            this.updateCarousel();
        });
        
        // Touch/swipe support
        let startX = 0;
        let startY = 0;
        let isTracking = false;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isTracking = true;
            this.pauseAutoPlay();
        });
        
        this.track.addEventListener('touchmove', (e) => {
            if (!isTracking) return;
            e.preventDefault();
        });
        
        this.track.addEventListener('touchend', (e) => {
            if (!isTracking) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Check if horizontal swipe is more significant than vertical
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
            
            isTracking = false;
            this.startAutoPlay();
        });
    }
    
    updateCarousel() {
        const slideWidth = 100 / this.slidesToShow;
        const translateX = -(this.currentIndex * slideWidth);
        
        console.log(`🔄 updateCarousel: currentIndex=${this.currentIndex}, slideWidth=${slideWidth}, translateX=${translateX}%`);
        
        // Actualizar el ancho de cada slide
        this.slides.forEach(slide => {
            slide.style.minWidth = `${slideWidth}%`;
        });
        
        this.track.style.transform = `translateX(${translateX}%)`;
        this.updateDots();
    }
    
    updateDots() {
        if (!this.dotsContainer) return;
        
        const dots = this.dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === Math.floor(this.currentIndex / this.slidesToShow));
        });
    }
    
    nextSlide() {
        this.currentIndex = this.currentIndex >= this.maxIndex ? 0 : this.currentIndex + 1;
        this.updateCarousel();
    }
    
    prevSlide() {
        this.currentIndex = this.currentIndex <= 0 ? this.maxIndex : this.currentIndex - 1;
        this.updateCarousel();
    }
    
    goToSlide(index) {
        this.currentIndex = Math.min(index * this.slidesToShow, this.maxIndex);
        this.updateCarousel();
    }
    
    startAutoPlay() {
        this.pauseAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 4000);
    }
    
    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
    
    resumeAutoPlay() {
        this.startAutoPlay();
    }
}

// Inicializar carrousel cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM cargado, inicializando carrusel...');
    
    // Verificar que existe el elemento del carrusel
    const carouselElement = document.querySelector('.image-carousel');
    if (carouselElement) {
        console.log('✅ Elemento carrusel encontrado, creando instancia...');
        
        // Crear instancia y almacenar en window
        window.carouselInstance = new ImageCarousel();
        
        // Pausar autoplay cuando se hace hover sobre el carrousel
        carouselElement.addEventListener('mouseenter', () => {
            if (window.carouselInstance && window.carouselInstance.pauseAutoPlay) {
                window.carouselInstance.pauseAutoPlay();
            }
        });
        
        carouselElement.addEventListener('mouseleave', () => {
            if (window.carouselInstance && window.carouselInstance.startAutoPlay) {
                window.carouselInstance.startAutoPlay();
            }
        });
    } else {
        console.error('❌ No se encontró elemento .image-carousel en el DOM');
    }
});

// ===== GALERÍA CON LIGHTBOX =====
class LightboxGallery {
    constructor(gallerySelector) {
        this.gallery = document.querySelector(gallerySelector);
        if (!this.gallery) return;
        
        this.images = this.gallery.querySelectorAll('.gallery-image');
        this.currentIndex = 0;
        this.isVisible = false;
        
        this.init();
    }
    
    init() {
        this.createModal();
        this.bindEvents();
        this.initCarousel();
    }
    
    createModal() {
        const modal = document.createElement('div');
        modal.className = 'lightbox-modal';
        modal.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close" type="button" aria-label="Cerrar">&times;</button>
                <button class="lightbox-nav lightbox-prev" type="button" aria-label="Anterior">‹</button>
                <button class="lightbox-nav lightbox-next" type="button" aria-label="Siguiente">›</button>
                <img class="lightbox-image" src="" alt="">
                <div class="lightbox-counter">
                    <span class="lightbox-current">1</span> / <span class="lightbox-total">${this.images.length}</span>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        this.modal = modal;
        this.lightboxImage = modal.querySelector('.lightbox-image');
        this.currentSpan = modal.querySelector('.lightbox-current');
        this.closeBtn = modal.querySelector('.lightbox-close');
        this.prevBtn = modal.querySelector('.lightbox-prev');
        this.nextBtn = modal.querySelector('.lightbox-next');
    }
    
    bindEvents() {
        // Abrir lightbox al hacer clic en imagen
        this.images.forEach((img, index) => {
            img.addEventListener('click', () => this.openLightbox(index));
        });
        
        // Cerrar lightbox
        this.closeBtn.addEventListener('click', () => this.closeLightbox());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeLightbox();
        });
        
        // Navegación
        this.prevBtn.addEventListener('click', () => this.previousImage());
        this.nextBtn.addEventListener('click', () => this.nextImage());
        
        // Teclado
        document.addEventListener('keydown', (e) => {
            if (!this.isVisible) return;
            
            switch(e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    this.previousImage();
                    break;
                case 'ArrowRight':
                    this.nextImage();
                    break;
            }
        });
        
        // Touch para móvil
        this.bindTouchEvents();
    }
    
    bindTouchEvents() {
        let startX = 0;
        let startY = 0;
        
        this.modal.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        this.modal.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Solo procesar swipe horizontal si es mayor que vertical
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextImage();
                } else {
                    this.previousImage();
                }
            }
        });
    }
    
    initCarousel() {
        const carousel = this.gallery.querySelector('.gallery-carousel');
        if (!carousel) return;
        
        const track = carousel.querySelector('.gallery-carousel-track');
        const slides = carousel.querySelectorAll('.gallery-slide');
        const prevBtn = carousel.querySelector('.gallery-btn-prev');
        const nextBtn = carousel.querySelector('.gallery-btn-next');
        const dotsContainer = carousel.querySelector('.gallery-dots');
        
        if (!track || slides.length === 0) return;
        
        let currentSlide = 0;
        const slidesToShow = window.innerWidth <= 768 ? 1 : 3;
        const maxSlides = Math.max(0, slides.length - slidesToShow);
        
        // Crear dots
        if (dotsContainer) {
            const dotsCount = Math.ceil(slides.length / slidesToShow);
            for (let i = 0; i < dotsCount; i++) {
                const dot = document.createElement('button');
                dot.className = 'gallery-dot';
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    currentSlide = i * slidesToShow;
                    if (currentSlide > maxSlides) currentSlide = maxSlides;
                    updateCarousel();
                });
                dotsContainer.appendChild(dot);
            }
        }
        
        function updateCarousel() {
            const slideWidth = 100 / slidesToShow;
            track.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
            
            // Actualizar dots
            const dots = dotsContainer.querySelectorAll('.gallery-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === Math.floor(currentSlide / slidesToShow));
            });
            
            // Actualizar botones
            if (prevBtn) prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
            if (nextBtn) nextBtn.style.opacity = currentSlide >= maxSlides ? '0.5' : '1';
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentSlide > 0) {
                    currentSlide -= slidesToShow;
                    if (currentSlide < 0) currentSlide = 0;
                    updateCarousel();
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentSlide < maxSlides) {
                    currentSlide += slidesToShow;
                    if (currentSlide > maxSlides) currentSlide = maxSlides;
                    updateCarousel();
                }
            });
        }
        
        updateCarousel();
    }
    
    openLightbox(index) {
        this.currentIndex = index;
        this.isVisible = true;
        this.updateImage();
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeLightbox() {
        this.isVisible = false;
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    updateImage() {
        if (this.images[this.currentIndex]) {
            this.lightboxImage.src = this.images[this.currentIndex].src;
            this.lightboxImage.alt = this.images[this.currentIndex].alt;
            this.currentSpan.textContent = this.currentIndex + 1;
        }
    }
    
    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateImage();
    }
    
    previousImage() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateImage();
    }
}

// ===== INICIALIZACIÓN ACTUALIZADA =====
document.addEventListener('DOMContentLoaded', function() {
    // Navegación móvil
    const nav = new MobileNavigation();
    
    // Carousel de imágenes
    const carousel = new ImageCarousel();
    
    // Lightbox Gallery para cursos
    const lightboxGallery = new LightboxGallery('.lightbox-gallery');
    
    // Timeline
    initTimeline();
    
    // FAQ
    initFAQ();
    
    // Animaciones al scroll
    initScrollAnimations();
    
    // Navegación suave
    initSmoothScrolling();
});
