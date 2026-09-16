// ========================================
// VIDEO INTRO
// ========================================
const videoIntro = document.getElementById('videoIntro');
const introSkip = document.getElementById('introSkip');
const introCounter = document.getElementById('introCounter');
const introLoaderBar = document.querySelector('.intro-loader-bar');
let introProgress = 0;
let introInterval;
let introSkipped = false;
let introStarted = false;

function startIntro() {
    if (introStarted) return;
    introStarted = true;
    document.body.style.overflow = 'hidden';
    introProgress = 0;
    introInterval = setInterval(() => {
        introProgress += 1;
        if (introCounter) introCounter.textContent = introProgress;
        if (introLoaderBar) introLoaderBar.style.width = introProgress + '%';
        if (introProgress >= 100) {
            clearInterval(introInterval);
            endIntro();
        }
    }, 30);
}

function endIntro() {
    if (introSkipped) return;
    introSkipped = true;
    clearInterval(introInterval);
    videoIntro.classList.add('hidden');
    document.body.style.overflow = '';
    document.body.classList.add('loaded');
    setTimeout(() => {
        videoIntro.style.display = 'none';
        showNavbar();
        initAfterIntro();
    }, 800);
}

if (introSkip) {
    introSkip.addEventListener('click', () => {
        if (introSkipped) return;
        introSkipped = true;
        clearInterval(introInterval);
        videoIntro.classList.add('hidden');
        document.body.style.overflow = '';
        document.body.classList.add('loaded');
        setTimeout(() => {
            videoIntro.style.display = 'none';
            showNavbar();
            initAfterIntro();
        }, 800);
    });
}

function showNavbar() {
    const navbar = document.getElementById('mainNav');
    if (navbar) {
        setTimeout(() => navbar.classList.add('nav-visible'), 100);
    }
}

// Start intro on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    startIntro();
});

// Also start on load as fallback
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.remove();
    }
    if (!introSkipped) {
        startIntro();
    }
});

// ========================================
// CURSOR FOLLOWER (Enhanced)
// ========================================
const cursor = document.querySelector('.cursor-follower');
const cursorDot = document.querySelector('.cursor-dot');
const cursorTrail = document.querySelector('.cursor-trail');
const cursorParticlesContainer = document.getElementById('cursorParticles');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let trailX = 0, trailY = 0;
let lastParticleTime = 0;

if (window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (cursorDot) {
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        }

        // Spawn cursor particles
        const now = Date.now();
        if (now - lastParticleTime > 50 && cursorParticlesContainer) {
            lastParticleTime = now;
            spawnCursorParticle(mouseX, mouseY);
        }
    });

    const animateCursor = () => {
        cursorX += (mouseX - cursorX) * 0.12;
        cursorY += (mouseY - cursorY) * 0.12;
        trailX += (mouseX - trailX) * 0.06;
        trailY += (mouseY - trailY) * 0.06;

        if (cursor) {
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
        }
        if (cursorTrail) {
            cursorTrail.style.left = trailX + 'px';
            cursorTrail.style.top = trailY + 'px';
        }
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Magnetic elements
    document.querySelectorAll('.magnetic-element').forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    });

    // Cursor hover effects
    document.querySelectorAll('a, button, .work-link, .social-link, .service-card, .filter-pill').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorTrail.style.opacity = '0.5';
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorTrail.style.opacity = '0';
        });
    });

    // Cursor click effect
    document.addEventListener('mousedown', () => {
        cursor.classList.add('click');
        if (cursorDot) cursorDot.style.transform = 'translate(-50%, -50%) scale(0.7)';
    });
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('click');
        if (cursorDot) cursorDot.style.transform = '';
    });
}

function spawnCursorParticle(x, y) {
    if (!cursorParticlesContainer) return;
    const particle = document.createElement('div');
    particle.className = 'cursor-particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    cursorParticlesContainer.appendChild(particle);

    const size = Math.random() * 4 + 2;
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 30 + 10;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    particle.style.width = size + 'px';
    particle.style.height = size + 'px';

    particle.animate([
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.4 },
        { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0)`, opacity: 0 }
    ], {
        duration: 600,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
    }).onfinish = () => particle.remove();
}

// ========================================
// HERO PARTICLES
// ========================================
function createHeroParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'hero-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particle.style.animationDelay = (Math.random() * 10) + 's';
        particle.style.width = (Math.random() * 3 + 2) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}
createHeroParticles();

// ========================================
// SCROLL PROGRESS
// ========================================
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    if (scrollProgress) {
        scrollProgress.style.width = progress + '%';
    }
});

// ========================================
// NAVIGATION
// ========================================
const navbar = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active nav link
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const pos = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: pos, behavior: 'smooth' });
        }
    });
});

// Mobile nav close
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const collapse = document.getElementById('navbarResponsive');
        if (collapse.classList.contains('show')) {
            bootstrap.Collapse.getInstance(collapse)?.hide();
        }
    });
});

// ========================================
// COUNTER ANIMATION (Bottom to Top)
// ========================================
const counters = document.querySelectorAll('.stat-num');
const statItems = document.querySelectorAll('.stat');
let counterAnimated = false;

const animateCounters = () => {
    // Stagger the slide-in for each stat
    statItems.forEach((stat, index) => {
        setTimeout(() => {
            stat.classList.add('animate-in');
        }, index * 200);
    });

    // Start counting after slide-in begins
    setTimeout(() => {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const update = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target;
                }
            };
            update();
        });
    }, 300);
};

const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counterAnimated) {
            setTimeout(animateCounters, 500);
            counterAnimated = true;
        }
    });
}, { threshold: 0.5 });

const heroSection = document.getElementById('home');
if (heroSection) heroObserver.observe(heroSection);

// ========================================
// SKILL BARS
// ========================================
const skillBars = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.getAttribute('data-width');
            setTimeout(() => {
                entry.target.style.width = width + '%';
            }, 200);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// ========================================
// EXPERIENCE RING ANIMATION
// ========================================
const expRing = document.querySelector('.exp-ring');

if (expRing) {
    const ringObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                expRing.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });

    ringObserver.observe(expRing);
}

// ========================================
// TESTIMONIALS SLIDER
// ========================================
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testDots = document.querySelectorAll('.test-dot');
const prevBtn = document.querySelector('.test-nav-btn.prev');
const nextBtn = document.querySelector('.test-nav-btn.next');
let currentSlide = 0;

function showSlide(index) {
    testimonialCards.forEach(card => card.classList.remove('active'));
    testDots.forEach(dot => dot.classList.remove('active'));

    if (index >= testimonialCards.length) index = 0;
    if (index < 0) index = testimonialCards.length - 1;

    testimonialCards[index].classList.add('active');
    testDots[index].classList.add('active');
    currentSlide = index;
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
}

testDots.forEach(dot => {
    dot.addEventListener('click', () => {
        showSlide(parseInt(dot.getAttribute('data-slide')));
    });
});

// Auto slide
setInterval(() => showSlide(currentSlide + 1), 6000);

// ========================================
// CONTACT FORM
// ========================================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin ms-2"></i>';
        btn.disabled = true;

        setTimeout(() => {
            contactForm.classList.add('d-none');
            formSuccess.classList.remove('d-none');
        }, 1500);
    });
}

// ========================================
// BACK TO TOP
// ========================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// ========================================
// SCROLL ANIMATIONS (Enhanced)
// ========================================
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-delay');
            if (delay) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(delay) * 150);
            } else {
                entry.target.classList.add('visible');
            }
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

function initScrollAnimations() {
    document.querySelectorAll('[data-animate]').forEach(el => {
        fadeObserver.observe(el);
    });
}

// ========================================
// SECTION REVEAL ON SCROLL
// ========================================
const sectionRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.05, rootMargin: '0px 0px 0px 0px' });

function initSectionReveals() {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('section-reveal');
        sectionRevealObserver.observe(section);
    });
    // Fallback: reveal all sections after 3s in case observer doesn't fire
    setTimeout(() => {
        document.querySelectorAll('.section-reveal').forEach(section => {
            section.classList.add('revealed');
        });
    }, 3000);
}

// ========================================
// PARALLAX EFFECT
// ========================================
function initParallax() {
    const heroBgGrid = document.querySelector('.hero-bg-grid');
    const heroVisual = document.querySelector('.hero-visual');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        if (heroBgGrid) {
            heroBgGrid.style.transform = `translateY(${scrollY * 0.3}px)`;
        }

        if (heroVisual) {
            const rect = heroVisual.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                heroVisual.style.transform = `translateY(${scrollY * 0.08}px)`;
            }
        }
    });
}

// ========================================
// GALLERY LIGHTBOX
// ========================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const galleryImages = document.querySelectorAll('.gallery-img img');
let currentImageIndex = 0;

function openLightbox(index) {
    currentImageIndex = index;
    lightboxImg.src = galleryImages[index].src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    currentImageIndex += direction;
    if (currentImageIndex >= galleryImages.length) currentImageIndex = 0;
    if (currentImageIndex < 0) currentImageIndex = galleryImages.length - 1;
    lightboxImg.src = galleryImages[currentImageIndex].src;
}

galleryImages.forEach((img, index) => {
    img.parentElement.addEventListener('click', () => openLightbox(index));
});

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxPrev) lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
if (lightboxNext) lightboxNext.addEventListener('click', () => navigateLightbox(1));

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}

document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
});

// ========================================
// GALLERY FILTER
// ========================================
const filterPills = document.querySelectorAll('.filter-pill');
const pillBg = document.querySelector('.pill-bg');
const galleryItems = document.querySelectorAll('.gallery-item');
const imageCountEl = document.getElementById('imageCount');

function movePillBg(pill) {
    if (!pillBg || !pill) return;
    pillBg.style.width = pill.offsetWidth + 'px';
    pillBg.style.left = pill.offsetLeft + 'px';
}

// Initialize pill background position
window.addEventListener('load', () => {
    const activePill = document.querySelector('.filter-pill.active');
    if (activePill) {
        setTimeout(() => movePillBg(activePill), 100);
    }
});

// Update count
function updateCount(count) {
    if (imageCountEl) {
        imageCountEl.textContent = count;
    }
}

// Count initial visible items
updateCount(galleryItems.length);

filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        movePillBg(pill);

        const filter = pill.getAttribute('data-filter');
        let visibleCount = 0;

        galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                visibleCount++;
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 400);
            }
        });

        setTimeout(() => updateCount(visibleCount), 400);
    });
});

// Recalculate pill position on resize
window.addEventListener('resize', () => {
    const activePill = document.querySelector('.filter-pill.active');
    if (activePill) movePillBg(activePill);
});

// ========================================
// INITIALIZE AFTER INTRO
// ========================================
function initAfterIntro() {
    initScrollAnimations();
    initSectionReveals();
    initParallax();
}

// Fallback: if no video intro, init immediately
if (!videoIntro) {
    document.body.classList.add('loaded');
    showNavbar();
    initAfterIntro();
}
