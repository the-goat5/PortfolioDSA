// Loader and sound effect
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader-wrapper');
    const sound = document.getElementById('startup-sound');
    
    // Play sound
    sound.volume = 0.3;
    sound.play();
    
    // Hide loader after everything is loaded
    setTimeout(() => {
        loader.classList.add('hide');
        // Stop sound when loader is hidden
        sound.pause();
        sound.currentTime = 0;
        // Initialize particles after loader is hidden
        initParticles();
        
        // Remove loader from DOM after animation completes
        setTimeout(() => {
            loader.remove();
        }, 1000);
    }, 3000); // Adjust timing to match sound duration
});

document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeSwitch = document.getElementById('theme-switch');
    const themeOptions = document.querySelectorAll('.theme-option');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme') || 'default';

    // Apply saved theme
    if (savedTheme && savedTheme !== 'default') {
        body.setAttribute('data-theme', savedTheme);
        themeSwitch.checked = savedTheme === 'dark';
    } else {
        body.removeAttribute('data-theme');
        themeSwitch.checked = false;
    }

    // Theme switch event (only toggles dark mode)
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'default');
        }
        // Reinitialize particles with new theme
        destroyParticles && destroyParticles();
        initParticles();
    });

    // Theme options event (for all themes)
    themeOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            const selectedTheme = this.getAttribute('data-theme');
            if (selectedTheme === 'default') {
                body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'default');
                themeSwitch.checked = false;
            } else {
                body.setAttribute('data-theme', selectedTheme);
                localStorage.setItem('theme', selectedTheme);
                themeSwitch.checked = selectedTheme === 'dark';
            }
            destroyParticles && destroyParticles();
            initParticles();
        });
    });
    
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateX(0) translateY(0)';
            }
        });
    };
    
    // Initialize scroll animations
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
    
    // Animate skill bars on scroll
    const animateSkillBars = function() {
        const skillBars = document.querySelectorAll('.skill-bar-fill');
        const skillsSection = document.getElementById('skills');
        const sectionPosition = skillsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (sectionPosition < screenPosition) {
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            });
        }
    };
    
    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars(); // Run once on page load
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Indicateur de section active dans la navbar
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = Array.from(navLinks)
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    function updateActiveNavLink() {
        let index = sections.length - 1;
        for (let i = 0; i < sections.length; i++) {
            if (window.scrollY + 100 < sections[i].offsetTop) {
                index = i - 1;
                break;
            }
        }
        navLinks.forEach((link, i) => {
            if (i === index && index >= 0) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.innerHTML = '<span>Envoi en cours...</span>';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '<span>Message envoyé!</span>';
                
                // Reset form after 2 seconds
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = '<span>Envoyer</span><svg width="34" height="34" viewBox="0 0 74 74" fill="none"><circle cx="37" cy="37" r="35.5" stroke="currentColor" stroke-width="3"></circle><path d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z" fill="currentColor"></path></svg>';
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }
    
    // 3D cube interaction (drag/touch) + rotation automatique JS
    const cube = document.querySelector('.cube');
    if (cube) {
        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };
        let cubeRotation = { x: -20, y: 20 };
        let autoRotate = true;
        let autoRotateInterval = null;

        function setCubeRotation() {
            cube.style.animation = 'none';
            cube.style.transform = `rotateX(${cubeRotation.x}deg) rotateY(${cubeRotation.y}deg)`;
        }

        function startAutoRotate() {
            if (autoRotateInterval) clearInterval(autoRotateInterval);
            autoRotate = true;
            autoRotateInterval = setInterval(() => {
                if (!autoRotate) return;
                cubeRotation.x += 0.4;
                cubeRotation.y += 0.7;
                cube.style.transform = `rotateX(${cubeRotation.x}deg) rotateY(${cubeRotation.y}deg)`;
            }, 30);
        }

        function stopAutoRotate() {
            autoRotate = false;
            if (autoRotateInterval) clearInterval(autoRotateInterval);
        }

        cube.addEventListener('mousedown', (e) => {
            isDragging = true;
            previousMousePosition = { x: e.clientX, y: e.clientY };
            stopAutoRotate();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const deltaMove = {
                x: e.clientX - previousMousePosition.x,
                y: e.clientY - previousMousePosition.y
            };
            cubeRotation.y += deltaMove.x * 0.5;
            cubeRotation.x -= deltaMove.y * 0.5;
            cubeRotation.x = Math.max(-60, Math.min(60, cubeRotation.x));
            setCubeRotation();
            previousMousePosition = { x: e.clientX, y: e.clientY };
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                setTimeout(() => {
                    startAutoRotate();
                }, 2000);
            }
        });

        cube.addEventListener('touchstart', (e) => {
            isDragging = true;
            previousMousePosition = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            };
            stopAutoRotate();
            e.preventDefault();
        });

        document.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const deltaMove = {
                x: e.touches[0].clientX - previousMousePosition.x,
                y: e.touches[0].clientY - previousMousePosition.y
            };
            cubeRotation.y += deltaMove.x * 0.5;
            cubeRotation.x -= deltaMove.y * 0.5;
            cubeRotation.x = Math.max(-60, Math.min(60, cubeRotation.x));
            setCubeRotation();
            previousMousePosition = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            };
            e.preventDefault();
        });

        document.addEventListener('touchend', () => {
            if (isDragging) {
                isDragging = false;
                setTimeout(() => {
                    startAutoRotate();
                }, 2000);
            }
        });

        // Initial rotation
        cube.style.animation = 'none';
        cube.style.transform = `rotateX(${cubeRotation.x}deg) rotateY(${cubeRotation.y}deg)`;
        startAutoRotate();
    }
    
    // Project cards - additional interaction
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const x = e.offsetX;
            const y = e.offsetY;
            const centerX = card.offsetWidth / 2;
            const centerY = card.offsetHeight / 2;
            const angleX = (y - centerY) / 10;
            const angleY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
    
    // Particles.js functions
   function initParticles() {
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#00d4ff" },
            "shape": { "type": "circle" },
            "opacity": {
                "value": 0.7,
                "random": true,
                "anim": { "enable": true, "speed": 1, "opacity_min": 0.3, "sync": false }
            },
            "size": {
                "value": 4,
                "random": true,
                "anim": { "enable": true, "speed": 2, "size_min": 0.3, "sync": false }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#00d4ff",
                "opacity": 0.6,
                "width": 1.5
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": { "enable": true, "rotateX": 600, "rotateY": 1200 }
            }
        },
        "interactivity": {
            "detect_on": "window",
            "events": {
                "onhover": { "enable": true, "mode": "repulse" },
                "onclick": { "enable": true, "mode": "push" },
                "resize": true
            },
            "modes": {
                "repulse": { "distance": 100, "duration": 0.4 },
                "push": { "particles_nb": 4 }
            }
        },
        "retina_detect": true
    });
}

    // Initialize particles
    initParticles();
});

// Modal Design Gallery
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('design-modal');
    const btn = document.querySelector('.show-gallery');
    const span = document.querySelector('.close-modal');

    if (btn && modal && span) {
        btn.onclick = function() {
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
        };

        span.onclick = function() {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        };

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        };
    }
});
window.onload = function() {
    initParticles();
};

// Scroll to top button & Spotify player visibility
document.addEventListener('DOMContentLoaded', function() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const spotifyPlayer = document.getElementById('spotifyPlayer');
    const homeSection = document.getElementById('home');

    function toggleFloatingElements() {
        const scrollY = window.scrollY || window.pageYOffset;
        const homeHeight = homeSection ? homeSection.offsetHeight : 400;
        if (scrollY > homeHeight - 80) {
            scrollTopBtn.classList.add('visible');
            spotifyPlayer.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
            spotifyPlayer.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', toggleFloatingElements);
    toggleFloatingElements();

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});