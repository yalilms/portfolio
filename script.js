/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== ACCORDION SKILLS ===============*/
const skillsContent = document.getElementsByClassName('skills__content'),
      skillsHeader = document.querySelectorAll('.skills__header')

function toggleSkills(){
    let itemClass = this.parentNode.className

    for(i = 0; i < skillsContent.length; i++){
        skillsContent[i].className = 'skills__content skills__close'
    }
    if(itemClass === 'skills__content skills__close'){
        this.parentNode.className = 'skills__content skills__open'
    }
}

skillsHeader.forEach((el) =>{
    el.addEventListener('click', toggleSkills)
})

/*=============== QUALIFICATION TABS ===============*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab =>{
    tab.addEventListener('click', () =>{
        const target = document.querySelector(tab.dataset.target)

        tabContents.forEach(tabContent =>{
            tabContent.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')

        tabs.forEach(tab =>{
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})

/*=============== PORTFOLIO SWIPER  ===============*/
// Portfolio functionality is handled with CSS Grid, no swiper needed

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SHOW SCROLL UP ===============*/
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

// Add click event to scroll up button
document.getElementById('scroll-up').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'fa-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'fa-moon' : 'fa-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'fa-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== TYPING ANIMATION ===============*/
const typingText = document.getElementById('typing-text');
const texts = [
    'Desarrollador Web',
    'Estudiante de DAM',
    'Frontend Developer',
    'Backend Developer',
    'Problem Solver',
    'Desde Granada 🌄'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeWriter() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500; // Pause before next word
    }
    
    setTimeout(typeWriter, typingSpeed);
}

/*=============== LOADING SCREEN ===============*/
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const progressBar = document.querySelector('.progress-bar');
    const loadingMessage = document.querySelector('.loading-message');
    
    const messages = [
        'Inicializando portafolio...',
        'Cargando componentes...',
        'Configurando animaciones...',
        'Optimizando experiencia...',
        'Listos para comenzar!'
    ];
    
    let messageIndex = 0;
    
    // Animate progress bar
    setTimeout(() => {
        progressBar.style.width = '100%';
    }, 500);
    
    // Change loading messages
    const messageInterval = setInterval(() => {
        if (messageIndex < messages.length - 1) {
            messageIndex++;
            loadingMessage.textContent = messages[messageIndex];
        } else {
            clearInterval(messageInterval);
        }
    }, 600);
    
    // Hide loading screen after animation
    setTimeout(() => {
        loadingScreen.classList.add('hide');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            // Start typing animation after loading
            typeWriter();
        }, 500);
    }, 3500);
});

/*=============== SMOOTH SCROLLING ===============*/
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

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
    reset: true
});

// Check if ScrollReveal is loaded
if (typeof ScrollReveal !== 'undefined') {
    sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text', {});
    sr.reveal('.home__img, .about__data, .skills__content, .portfolio__content, .contact__data', { delay: 400 });
    sr.reveal('.home__social, .portfolio__item, .contact__information', { interval: 200 });
} else {
    // Fallback animation using Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
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
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

/*=============== PORTFOLIO FILTER ===============*/
// Since we're using CSS Grid instead of swiper, we can add simple filtering if needed
const portfolioItems = document.querySelectorAll('.portfolio__item');

function showAllProjects() {
    portfolioItems.forEach(item => {
        item.style.display = 'block';
    });
}

// Initialize
showAllProjects();

/*=============== CONTACT FORM ===============*/
const contactForm = document.querySelector('.contact__form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Basic validation
        const name = document.querySelector('#name').value.trim();
        const email = document.querySelector('#email').value.trim();
        const message = document.querySelector('#message').value.trim();
        
        if (!name || !email || !message) {
            e.preventDefault();
            showMessage('Por favor, rellena todos los campos obligatorios.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            e.preventDefault();
            showMessage('Por favor, introduce un email válido.', 'error');
            return;
        }
        
        // Show loading state
        const buttonText = document.querySelector('.button-text');
        buttonText.textContent = 'Enviando...';
        contactForm.querySelector('button').disabled = true;
        
        // Let Netlify handle the form submission naturally
    });
}

function showMessage(message, type) {
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.className = `contact__message contact__message--${type}`;
    messageElement.style.cssText = `
        padding: 1rem;
        margin: 1rem 0;
        border-radius: 0.5rem;
        font-family: var(--code-font);
        text-align: center;
        ${type === 'success' 
            ? 'background: rgba(0, 255, 65, 0.1); color: var(--first-color); border: 1px solid rgba(0, 255, 65, 0.3);'
            : 'background: rgba(255, 0, 0, 0.1); color: #ff6b6b; border: 1px solid rgba(255, 0, 0, 0.3);'
        }
    `;
    
    // Insert message
    contactForm.appendChild(messageElement);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}

/*=============== PARTICLES BACKGROUND ===============*/
// Simple particles effect with vanilla JS
function createParticles() {
    const particlesContainer = document.getElementById('particles-js');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--first-color);
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.2};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 3 + 2}s ease-in-out infinite alternate;
        `;
        particlesContainer.appendChild(particle);
    }
    
    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        #particles-js {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        }
        
        @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
            100% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
        }
        
        .particle {
            box-shadow: 0 0 6px var(--first-color);
        }
    `;
    document.head.appendChild(style);
}

// Initialize particles
document.addEventListener('DOMContentLoaded', createParticles);

/*=============== MATRIX RAIN EFFECT ===============*/
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -2;
        opacity: 0.1;
    `;
    
    document.body.appendChild(canvas);
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff41';
        ctx.font = fontSize + 'px "Fira Code"';
        
        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 100);
}

// Initialize matrix rain effect on larger screens
if (window.innerWidth > 768) {
    document.addEventListener('DOMContentLoaded', createMatrixRain);
}

/*=============== CODE TYPING EFFECT IN BACKGROUND ===============*/
function createCodeBackground() {
    const codeLines = [
        'const developer = new FullStackDeveloper();',
        'developer.learn(["React", "Node.js", "MongoDB"]);',
        'function createAmazingProjects() {',
        '  return passion + dedication + code;',
        '}',
        'while(learning) { keepCoding(); }',
        'export default YalilMusa;'
    ];
    
    let currentLine = 0;
    let currentChar = 0;
    let isTyping = true;
    
    const codeElement = document.createElement('div');
    codeElement.style.cssText = `
        position: fixed;
        top: 20%;
        right: 5%;
        font-family: var(--code-font);
        font-size: 0.8rem;
        color: rgba(0, 255, 65, 0.3);
        z-index: -1;
        pointer-events: none;
        white-space: pre;
        line-height: 1.5;
    `;
    
    document.body.appendChild(codeElement);
    
    function typeCode() {
        if (isTyping) {
            if (currentChar < codeLines[currentLine].length) {
                const currentText = codeElement.textContent.split('\n');
                currentText[currentLine] = codeLines[currentLine].substring(0, currentChar + 1);
                codeElement.textContent = currentText.join('\n');
                currentChar++;
            } else {
                if (currentLine < codeLines.length - 1) {
                    currentLine++;
                    currentChar = 0;
                    codeElement.textContent += '\n';
                } else {
                    isTyping = false;
                    setTimeout(() => {
                        currentLine = 0;
                        currentChar = 0;
                        isTyping = true;
                        codeElement.textContent = '';
                    }, 3000);
                }
            }
        }
        
        setTimeout(typeCode, isTyping ? 50 : 100);
    }
    
    setTimeout(typeCode, 5000); // Start after loading
}

// Initialize code background on larger screens
if (window.innerWidth > 1024) {
    document.addEventListener('DOMContentLoaded', createCodeBackground);
}

/*=============== PERFORMANCE OPTIMIZATIONS ===============*/
// Throttle scroll events for better performance
function throttle(func, wait) {
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

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(scrollActive, 100));
window.addEventListener('scroll', throttle(scrollHeader, 100));
window.addEventListener('scroll', throttle(scrollUp, 100));

/*=============== LAZY LOADING ===============*/
// Lazy load images when they come into viewport
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

/*=============== KEYBOARD NAVIGATION ===============*/
// Add keyboard support for better accessibility
document.addEventListener('keydown', function(e) {
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape') {
        navMenu.classList.remove('show-menu');
    }
    
    // Press '/' to focus search (if implemented)
    if (e.key === '/' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        // Focus search input if available
    }
});

/*=============== CONSOLE MESSAGE ===============*/
// Easter egg for developers
console.log(`
    ┌─────────────────────────────────────────┐
    │  🚀 ¡Hola, desarrollador curioso!       │
    │                                         │
    │  Este portafolio fue creado con:        │
    │  • HTML5 semántico                      │
    │  • CSS3 con Grid y Flexbox              │
    │  • JavaScript vanilla                   │
    │  • Mucho ☕ y dedicación                │
    │                                         │
    │  ¿Quieres colaborar? ¡Contáctame!       │
    │  📧 yalil.ms72@gmail.com               │
    └─────────────────────────────────────────┘
`);

console.log('💻 Portafolio desarrollado por Yalil Musa Fernández');
console.log('🌟 ¿Te gusta el código? ¡Revisemos el repositorio juntos!');
console.log('📍 Desarrollando desde Granada, España');

/*=============== INIT ===============*/
// Initialize all functions when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 Portafolio inicializado correctamente');
    
    // Set default theme to dark
    if (!localStorage.getItem('selected-theme')) {
        document.body.classList.add('dark-theme');
        localStorage.setItem('selected-theme', 'dark');
        localStorage.setItem('selected-icon', 'fa-sun');
    }
}); 