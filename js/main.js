// ========================================
// PRELOADER
// ========================================
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        preloader.classList.add('hidden');
        document.body.classList.add('loaded');
    }, 1800);
});

// ========================================
// CURSOR FOLLOWER
// ========================================
const cursor = document.querySelector('.cursor-follower');
const cursorDot = document.querySelector('.cursor-dot');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

if (window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (cursorDot) {
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        }
    });

    const animateCursor = () => {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        if (cursor) {
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
        }
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    document.querySelectorAll('a, button, .work-link, .social-link, .service-card, .filter-pill').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

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
// COUNTER ANIMATION
// ========================================
const counters = document.querySelectorAll('.stat-num');
let counterAnimated = false;

const animateCounters = () => {
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
// SCROLL ANIMATIONS
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

document.querySelectorAll('[data-animate]').forEach(el => {
    fadeObserver.observe(el);
});

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
