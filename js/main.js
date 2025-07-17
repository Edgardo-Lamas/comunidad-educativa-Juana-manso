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

menuToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks) navLinks.classList.remove('active');
        if (menuToggle) menuToggle.classList.remove('active');
    });
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

    // Observar elementos adicionales para animaciones
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
