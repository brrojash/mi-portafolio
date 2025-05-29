// Función para activar animaciones de entrada al hacer scroll (sin efectos blanquecinos)
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.skill-card, .experience-item, .education-card, .timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Función para eliminar cualquier efecto blanquecino residual MANTENIENDO el fondo del hero
function removeWhitishEffects() {
    // Eliminar cualquier overlay o capa adicional (EXCEPTO en hero)
    const overlays = document.querySelectorAll('[class*="overlay"]:not(.hero *), [class*="backdrop"]:not(.hero *), [class*="filter"]:not(.hero *)');
    overlays.forEach(overlay => overlay.remove());
    
    // Forzar estilos en elementos principales (EXCEPTO hero)
    const mainElements = document.querySelectorAll('section:not(.hero), .container:not(.hero .container)');
    mainElements.forEach(element => {
        element.style.opacity = '1';
        element.style.visibility = 'visible';
        if (!element.classList.contains('hero')) {
            element.style.background = 'transparent';
        }
        element.style.backdropFilter = 'none';
        element.style.webkitBackdropFilter = 'none';
    });
    
    // ASEGURAR que el hero mantenga su fondo azul
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        hero.style.opacity = '1';
        hero.style.visibility = 'visible';
    }
}

// Ejecutar limpieza al cargar la página
window.addEventListener('load', function() {
    removeWhitishEffects();
    console.log('Efectos blanquecinos eliminados completamente');
});

// Ejecutar limpieza también al hacer scroll (por si acaso)
let scrollTimeout;
window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(removeWhitishEffects, 100);
});
// DROPDOWN DE CONTACTO Y DESCARGA CV
// ============================================

function initContactDropdown() {
    const contactBtn = document.getElementById('contactBtn');
    const dropdown = document.getElementById('contactDropdown');
    const contactDropdownContainer = document.querySelector('.contact-dropdown');
    
    if (contactBtn && dropdown) {
        contactBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleDropdown();
        });
        
        // Cerrar dropdown al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!contactDropdownContainer.contains(e.target)) {
                closeDropdown();
            }
        });
        
        // Animación de entrada para cada item del dropdown
        const dropdownItems = dropdown.querySelectorAll('.dropdown-item');
        dropdownItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(-10px)';
            item.style.transition = `all 0.3s ease ${index * 0.1}s`;
        });
    }
    
    function toggleDropdown() {
        const isOpen = dropdown.classList.contains('show');
        
        if (isOpen) {
            closeDropdown();
        } else {
            openDropdown();
        }
    }
    
    function openDropdown() {
        dropdown.classList.add('show');
        contactDropdownContainer.classList.add('active');
        
        // Animar items
        const dropdownItems = dropdown.querySelectorAll('.dropdown-item');
        dropdownItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }
    
    function closeDropdown() {
        dropdown.classList.remove('show');
        contactDropdownContainer.classList.remove('active');
        
        // Reset animation
        const dropdownItems = dropdown.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(-10px)';
        });
    }
}

function initDownloadCV() {
    const downloadBtn = document.getElementById('downloadCV');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            generateAndDownloadCV();
        });
    }
}

function generateAndDownloadCV() {
    const downloadBtn = document.getElementById('downloadCV');
    const originalHTML = downloadBtn.innerHTML;
    
    // Cambiar estado del botón
    downloadBtn.classList.add('downloading');
    downloadBtn.innerHTML = '<i class="fas fa-spinner"></i> Descargando CV...';
    
    // Simular proceso de descarga
    setTimeout(() => {
        try {
            // Descargar PDF real
            downloadPDF();
            
            // Restaurar botón después de un momento
            setTimeout(() => {
                downloadBtn.classList.remove('downloading');
                downloadBtn.innerHTML = '<i class="fas fa-check"></i> ¡Descargado!';
                
                setTimeout(() => {
                    downloadBtn.innerHTML = originalHTML;
                }, 2000);
            }, 800);
            
        } catch (error) {
            console.error('Error al descargar CV:', error);
            
            // Mostrar error
            downloadBtn.classList.remove('downloading');
            downloadBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
            
            setTimeout(() => {
                downloadBtn.innerHTML = originalHTML;
            }, 3000);
        }
    }, 1000);
}

function downloadPDF() {
    // Crear enlace temporal para descarga
    const link = document.createElement('a');
    link.href = 'assets/cv/CV-Bryan-Rojas.pdf'; // Ruta a tu PDF
    link.download = 'CV-Bryan-Rojas-Hernandez.pdf'; // Nombre del archivo descargado
    link.target = '_blank'; // Abrir en nueva pestaña si no se puede descargar
    
    // Agregar al DOM temporalmente
    document.body.appendChild(link);
    
    // Simular click para iniciar descarga
    link.click();
    
    // Remover enlace temporal
    document.body.removeChild(link);
}

// ============================================
// NAVEGACIÓN Y MENÚ
// INICIALIZACIÓN Y CONFIGURACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar funcionalidades básicas sin efectos problemáticos
    initNavigation();
    initCounters();
    initProgressBars();
    initMobileMenu();
    initSmoothScrolling();
    initTypingEffect();
    initContactDropdown();
    initDownloadCV();
    initScrollAnimations(); // Nueva función de animaciones seguras
    
    console.log('CV Website cargado correctamente - Con fondo azul y animaciones mejoradas');
});

// ============================================
// NAVEGACIÓN Y MENÚ
// ============================================

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Solo mantener funcionalidad de navegación, SIN efectos de scroll en navbar
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // DESHABILITAR efectos de scroll en navbar que podrían causar efectos blanquecinos
    // window.addEventListener('scroll', function() { ... }); // COMENTADO
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && 
            window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Cerrar menú móvil al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ============================================
// CONTADORES ANIMADOS
// ============================================

function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const increment = target / 50;
    let current = 0;
    
    const updateCounter = () => {
        if (current < target) {
            current += increment;
            element.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// ============================================
// BARRAS DE PROGRESO
// ============================================

function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBar(entry.target);
                progressObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

function animateProgressBar(progressBar) {
    const targetWidth = progressBar.getAttribute('data-width');
    let currentWidth = 0;
    const increment = targetWidth / 60;
    
    const updateProgress = () => {
        if (currentWidth < targetWidth) {
            currentWidth += increment;
            progressBar.style.width = currentWidth + '%';
            requestAnimationFrame(updateProgress);
        } else {
            progressBar.style.width = targetWidth + '%';
        }
    };
    
    // Delay para que se vea más fluido
    setTimeout(updateProgress, 300);
}

// ============================================
// EFECTOS DE SCROLL Y PARALLAX
// ============================================

function initScrollEffects() {
    // COMPLETAMENTE DESHABILITADO - solo mantener navegación básica
    return;
}

function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', function() {
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax') || 0.5;
            const yPos = -(window.pageYOffset * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

function parallaxSections() {
    // Función deshabilitada para evitar efectos de opacidad
    return;
}

// ============================================
// EFECTOS DE ESCRITURA (TYPING)
// ============================================

function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    const titleLines = heroTitle.querySelectorAll('.title-line');
    
    // Efecto de escritura en el título del hero
    setTimeout(() => {
        titleLines.forEach((line, index) => {
            setTimeout(() => {
                line.classList.add('typing-effect');
                typeWriter(line, line.textContent, 100);
            }, index * 1000);
        });
    }, 1500);
}

function typeWriter(element, text, speed) {
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ============================================
// SMOOTH SCROLLING MEJORADO
// ============================================

function initSmoothScrolling() {
    // Interceptar todos los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                const startPosition = window.pageYOffset;
                const distance = offsetTop - startPosition;
                const duration = 1000;
                let startTime = null;
                
                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    
                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    }
                }
                
                function easeInOutQuad(t, b, c, d) {
                    t /= d/2;
                    if (t < 1) return c/2*t*t + b;
                    t--;
                    return -c/2 * (t*(t-2) - 1) + b;
                }
                
                requestAnimationFrame(animation);
            }
        });
    });
}

// ============================================
// EFECTOS DE HOVER Y INTERACCIÓN
// ============================================

function initHoverEffects() {
    // Cards con efecto 3D
    const cards = document.querySelectorAll('.skill-card, .education-card, .timeline-content');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0)';
        });
        
        // Efecto de seguimiento del mouse
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });
}

// ============================================
// PARTÍCULAS ANIMADAS
// ============================================

function initParticles() {
    const heroParticles = document.querySelector('.hero-particles');
    
    // Crear partículas dinámicas
    for (let i = 0; i < 50; i++) {
        createParticle(heroParticles);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Posición y tamaño aleatorios
    const size = Math.random() * 4 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 10 + 5;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        left: ${x}%;
        top: ${y}%;
        animation: float-particle ${duration}s ease-in-out infinite;
        animation-delay: ${Math.random() * 5}s;
    `;
    
    container.appendChild(particle);
}

// ============================================
// OPTIMIZACIÓN DE RENDIMIENTO
// ============================================

// Throttle para eventos de scroll
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Debounce para resize
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Aplicar throttle a eventos de scroll
window.addEventListener('scroll', throttle(function() {
    // Aquí van los efectos que necesitan throttle
}, 16)); // ~60fps

// ============================================
// LAZY LOADING PARA IMÁGENES
// ============================================

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// EFECTOS DE CARGA DE PÁGINA
// ============================================

window.addEventListener('load', function() {
    // Ocultar loader si existe
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
    
    // Inicializar efectos que necesitan que la página esté completamente cargada
    initHoverEffects();
    initParticles();
    initLazyLoading();
    
    // Animación de entrada de la página
    document.body.classList.add('loaded');
});

// ============================================
// MANEJO DE ERRORES
// ============================================

window.addEventListener('error', function(e) {
    console.warn('Error capturado:', e.error);
    // Aquí puedes agregar logging o notificaciones de error
});

// ============================================
// INTERACCIONES TÁCTILES (MOBILE)
// ============================================

function initTouchInteractions() {
    let startY = 0;
    let endY = 0;
    
    document.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        endY = e.changedTouches[0].clientY;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startY - endY;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe up - scroll to next section
                scrollToNextSection();
            } else {
                // Swipe down - scroll to previous section
                scrollToPrevSection();
            }
        }
    }
}

function scrollToNextSection() {
    const sections = document.querySelectorAll('section');
    const currentSection = getCurrentSection();
    const currentIndex = Array.from(sections).indexOf(currentSection);
    
    if (currentIndex < sections.length - 1) {
        const nextSection = sections[currentIndex + 1];
        nextSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToPrevSection() {
    const sections = document.querySelectorAll('section');
    const currentSection = getCurrentSection();
    const currentIndex = Array.from(sections).indexOf(currentSection);
    
    if (currentIndex > 0) {
        const prevSection = sections[currentIndex - 1];
        prevSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function getCurrentSection() {
    const sections = document.querySelectorAll('section');
    let currentSection = sections[0];
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSection = section;
        }
    });
    
    return currentSection;
}

// ============================================
// TEMA OSCURO/CLARO (OPCIONAL)
// ============================================

function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            
            // Guardar preferencia
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
        
        // Cargar tema guardado
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }
}

// ============================================
// INICIALIZACIÓN FINAL
// ============================================

// Inicializar interacciones táctiles en dispositivos móviles
if ('ontouchstart' in window) {
    initTouchInteractions();
}

// Inicializar tema
initThemeToggle();

// Agregar estilos CSS adicionales para animaciones
const additionalStyles = `
    .typing-effect {
        overflow: hidden;
        border-right: 2px solid white;
        animation: blink-caret 1s step-end infinite;
    }
    
    @keyframes blink-caret {
        from, to { border-color: transparent; }
        50% { border-color: white; }
    }
    
    .particle {
        pointer-events: none;
    }
    
    @keyframes float-particle {
        0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0;
        }
        25% {
            opacity: 1;
        }
        50% { 
            transform: translateY(-20px) rotate(180deg); 
            opacity: 0.8;
        }
        75% {
            opacity: 0.4;
        }
    }
    
    .loaded {
        animation: fadeInPage 1s ease-in-out;
    }
    
    @keyframes fadeInPage {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

// Agregar estilos al documento
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);