document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeContactItems();
    animateHeroSubtitle();
});

// Animate Hero Subtitle
function animateHeroSubtitle() {
    const subtitles = [
        "Full Stack Developer",
        "Data Analyst","Deep Learning Enthusiast",
        "Coding Enthusiast"
    ];
    const subtitleElement = document.getElementById('animated-subtitle');
    if (!subtitleElement) return;

    let currentIndex = 0;
    const changeSubtitle = () => {
        currentIndex = (currentIndex + 1) % subtitles.length;
        subtitleElement.classList.add('fade-out');
        setTimeout(() => {
            subtitleElement.textContent = subtitles[currentIndex];
            subtitleElement.classList.remove('fade-out');
        }, 400);
    };
    setInterval(changeSubtitle, 3000);
}

// Navigation functionality
function initializeNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 60;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });

    const sections = document.querySelectorAll('section[id]');
    const navLinksArray = document.querySelectorAll('.nav-links .nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinksArray.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Contact items functionality
function initializeContactItems() {
    const locationItem = document.getElementById('location-item');
    
    if (locationItem) {
        locationItem.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText("Chennai, India");
                showToast('Location copied to clipboard!');
            } catch (err) {
                showToast('Failed to copy location.', 2000, true);
                console.error('Clipboard copy failed:', err);
            }
        });
    }
}

// Utility function for showing toast notifications
function showToast(message, duration = 3000, isError = false) {
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(15px);
        background: ${isError ? '#ff6b6b' : 'var(--bg-card)'};
        color: var(--text-primary);
        padding: 0.8rem 1.6rem;
        border-radius: 6px;
        border: 1px solid ${isError ? '#c53030' : 'var(--primary-color)'};
        box-shadow: var(--shadow-prominent);
        z-index: 10000;
        font-weight: 500;
        font-size: 0.9rem;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(15px)';
        setTimeout(() => {
            if (toast.parentNode) document.body.removeChild(toast);
        }, 300);
    }, duration);
}

// Console message
console.log('%cVignesh Venkatesan Portfolio', 'font-size:16px; font-weight:bold; color:#4ecdc4;');
console.log('%cData Science & Machine Learning Specialist', 'font-size:12px; color:#b0b0b0;');