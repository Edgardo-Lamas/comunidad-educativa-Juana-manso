// ===== CARRUSEL SIMPLE Y FUNCIONAL =====
class SimpleCarousel {
    constructor() {
        console.log('🎠 Inicializando carrusel simple...');
        
        this.container = document.querySelector('.image-carousel');
        this.track = document.getElementById('carousel-track');
        this.slides = document.querySelectorAll('.carousel-slide');
        this.prevBtn = document.getElementById('carousel-prev');
        this.nextBtn = document.getElementById('carousel-next');
        this.dotsContainer = document.getElementById('carousel-dots');
        
        if (!this.track || !this.slides.length) {
            console.error('❌ No se encontraron elementos del carrusel');
            return;
        }
        
        console.log(`📸 Encontradas ${this.slides.length} imágenes`);
        
        this.currentIndex = 0;
        this.totalSlides = this.slides.length;
        this.slidesToShow = 4; // Mostrar 4 slides por vez en desktop
        this.autoPlayInterval = null;
        
        this.init();
    }
    
    init() {
        console.log('⚙️ Configurando carrusel...');
        
        // Configurar estilos
        this.setupStyles();
        
        // Crear dots
        this.createDots();
        
        // Configurar eventos
        this.setupEvents();
        
        // Mostrar primer slide
        this.showSlide(0);
        
        // Iniciar autoplay
        this.startAutoPlay();
        
        console.log('✅ Carrusel configurado correctamente');
    }
    
    setupStyles() {
        // Asegurar que el track esté configurado correctamente
        this.track.style.display = 'flex';
        this.track.style.transition = 'transform 0.5s ease';
        this.track.style.width = `${this.totalSlides * 25}%`;
        
        // Configurar cada slide
        this.slides.forEach((slide, index) => {
            slide.style.width = `${100 / this.totalSlides}%`;
            slide.style.flexShrink = '0';
            slide.style.padding = '0 5px';
            slide.style.boxSizing = 'border-box';
        });
    }
    
    createDots() {
        if (!this.dotsContainer) return;
        
        this.dotsContainer.innerHTML = '';
        const dotsCount = Math.ceil(this.totalSlides / this.slidesToShow);
        
        for (let i = 0; i < dotsCount; i++) {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
    }
    
    setupEvents() {
        // Botones
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Hover para pausar autoplay
        if (this.container) {
            this.container.addEventListener('mouseenter', () => this.pauseAutoPlay());
            this.container.addEventListener('mouseleave', () => this.startAutoPlay());
        }
        
        // Responsive
        window.addEventListener('resize', () => this.handleResize());
    }
    
    showSlide(index) {
        // Calcular posición
        const translateX = -(index * 25); // 25% por slide
        this.track.style.transform = `translateX(${translateX}%)`;
        
        // Actualizar dots
        this.updateDots();
        
        console.log(`🎯 Mostrando slide ${index}, translateX: ${translateX}%`);
    }
    
    updateDots() {
        const dots = this.dotsContainer.querySelectorAll('.carousel-dot');
        const activeDot = Math.floor(this.currentIndex / this.slidesToShow);
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeDot);
        });
    }
    
    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
        this.showSlide(this.currentIndex);
    }
    
    prevSlide() {
        this.currentIndex = this.currentIndex === 0 ? this.totalSlides - 1 : this.currentIndex - 1;
        this.showSlide(this.currentIndex);
    }
    
    goToSlide(dotIndex) {
        this.currentIndex = dotIndex * this.slidesToShow;
        if (this.currentIndex >= this.totalSlides) {
            this.currentIndex = this.totalSlides - 1;
        }
        this.showSlide(this.currentIndex);
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
            this.autoPlayInterval = null;
        }
    }
    
    handleResize() {
        // Reconfigurar para responsive
        this.setupStyles();
        this.showSlide(this.currentIndex);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM listo, inicializando carrusel...');
    
    // Esperar un poco para asegurar que CSS esté cargado
    setTimeout(() => {
        window.carousel = new SimpleCarousel();
    }, 100);
});
