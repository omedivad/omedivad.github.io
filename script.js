// Google Scholar User ID
const SCHOLAR_USER_ID = 'UJ4D3rYAAAAJ';
const PUBLICATIONS_JSON = 'publications.json';

// Fetch publications from JSON file (updated by GitHub Actions)
async function loadPublications() {
    const container = document.getElementById('publications-container');
    
    try {
        const response = await fetch(PUBLICATIONS_JSON);
        
        if (!response.ok) {
            throw new Error('Failed to load publications');
        }
        
        const publications = await response.json();
        
        if (publications.length === 0) {
            container.innerHTML = '<div class="error">No publications found. Please check back later.</div>';
            return;
        }
        
        // Sort publications by year (newest first)
        publications.sort((a, b) => {
            const yearA = parseInt(a.year) || 0;
            const yearB = parseInt(b.year) || 0;
            return yearB - yearA;
        });
        
        container.innerHTML = publications.map(pub => createPublicationHTML(pub)).join('');
        
        // Observe publication items for animations
        setTimeout(() => {
            document.querySelectorAll('.publication-item').forEach(el => {
                observer.observe(el);
            });
        }, 100);
        
        // Add event listeners for abstract toggles
        document.querySelectorAll('.toggle-abstract').forEach(button => {
            button.addEventListener('click', function() {
                const abstract = this.nextElementSibling;
                const isShowing = abstract.classList.contains('show');
                
                if (isShowing) {
                    abstract.classList.remove('show');
                    this.textContent = 'Show Abstract';
                } else {
                    abstract.classList.add('show');
                    this.textContent = 'Hide Abstract';
                }
            });
        });
        
    } catch (error) {
        console.error('Error loading publications:', error);
        container.innerHTML = `
            <div class="error">
                <p>Unable to load publications at this time.</p>
                <p>Please visit my <a href="https://scholar.google.com/citations?user=${SCHOLAR_USER_ID}" target="_blank" style="color: #2563eb;">Google Scholar profile</a>.</p>
            </div>
        `;
    }
}

// Create HTML for a single publication
function createPublicationHTML(pub) {
    const year = pub.year || 'N/A';
    const title = pub.title || 'Untitled';
    const authors = pub.authors || 'Unknown authors';
    const journal = pub.journal || '';
    const abstract = pub.abstract || '';
    const url = pub.url || '';
    const pdfUrl = pub.pdf_url || '';
    const arxivId = pub.arxiv_id || '';
    
    let linksHTML = '';
    if (url) {
        linksHTML += `<a href="${url}" target="_blank" class="publication-link">📄 View on Scholar</a>`;
    }
    if (pdfUrl) {
        linksHTML += `<a href="${pdfUrl}" target="_blank" class="publication-link">📥 PDF</a>`;
    }
    if (arxivId) {
        linksHTML += `<a href="https://arxiv.org/abs/${arxivId}" target="_blank" class="publication-link">📚 arXiv</a>`;
    }
    
    const titleHTML = url 
        ? `<a href="${url}" target="_blank">${title}</a>`
        : title;
    
    return `
        <div class="publication-item">
            <span class="publication-year">${year}</span>
            <h3 class="publication-title">${titleHTML}</h3>
            <p class="publication-authors">${authors}</p>
            ${journal ? `<p class="publication-journal">${journal}</p>` : ''}
            ${linksHTML ? `<div class="publication-links">${linksHTML}</div>` : ''}
            ${abstract ? `
                <button class="toggle-abstract">Show Abstract</button>
                <p class="publication-abstract">${abstract}</p>
            ` : ''}
        </div>
    `;
}

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Update navbar on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const navbar = document.querySelector('.navbar');
    
    if (currentScroll > 50) {
        navbar.style.borderBottomColor = 'var(--border-color)';
    } else {
        navbar.style.borderBottomColor = 'var(--border-light)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // For stagger animations, add delay based on index
            if (entry.target.classList.contains('stagger-item')) {
                const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.1}s`;
            }
        }
    });
}, observerOptions);

// Observe all elements with animation classes
function initScrollAnimations() {
    // Section titles
    document.querySelectorAll('.section-title').forEach(el => {
        observer.observe(el);
    });
    
    // Skill cards
    document.querySelectorAll('.skill-card').forEach(el => {
        observer.observe(el);
    });
    
    // Project items
    document.querySelectorAll('.project-item').forEach(el => {
        observer.observe(el);
    });
    
    // Experience items
    document.querySelectorAll('.experience-item').forEach(el => {
        observer.observe(el);
    });
    
    // Publication items (will be added after loading)
    document.querySelectorAll('.publication-item').forEach(el => {
        observer.observe(el);
    });
    
    // About content - slide from right
    document.querySelectorAll('.about-content').forEach(el => {
        observer.observe(el);
    });
    
    // Experience container - slide from left
    const experienceContainer = document.querySelector('#experience .container');
    if (experienceContainer) {
        observer.observe(experienceContainer);
    }
    
    // Skills container - slide from right
    const skillsContainer = document.querySelector('#skills .container');
    if (skillsContainer) {
        observer.observe(skillsContainer);
    }
    
    // Projects container - slide from left
    const projectsContainer = document.querySelector('#projects .container');
    if (projectsContainer) {
        observer.observe(projectsContainer);
    }
    
    // Publications container - slide from right
    const publicationsContainer = document.querySelector('#publications .container');
    if (publicationsContainer) {
        observer.observe(publicationsContainer);
    }
}

// Parallax effect for hero section
function initParallax() {
    const hero = document.querySelector('.hero-content');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        hero.style.transform = `translateY(${rate}px)`;
    });
}

// Smooth reveal for hero elements
function initHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    const heroLinks = document.querySelector('.hero-links');
    const profileImg = document.querySelector('.profile-img');
    
    if (heroTitle) {
        setTimeout(() => heroTitle.style.opacity = '1', 100);
        setTimeout(() => heroTitle.style.transform = 'translateY(0)', 100);
    }
    if (heroSubtitle) {
        setTimeout(() => heroSubtitle.style.opacity = '1', 300);
        setTimeout(() => heroSubtitle.style.transform = 'translateY(0)', 300);
    }
    if (heroDescription) {
        setTimeout(() => heroDescription.style.opacity = '1', 500);
        setTimeout(() => heroDescription.style.transform = 'translateY(0)', 500);
    }
    if (heroLinks) {
        setTimeout(() => heroLinks.style.opacity = '1', 700);
        setTimeout(() => heroLinks.style.transform = 'translateY(0)', 700);
    }
    if (profileImg) {
        setTimeout(() => profileImg.style.opacity = '1', 200);
        setTimeout(() => profileImg.style.transform = 'scale(1)', 200);
    }
}

// Make section fixed when bottom touches bottom of screen (reusable function)
function handleSectionSticky(sectionId, zIndex) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    let originalTop = null;
    let originalLeft = null;
    let originalWidth = null;
    let isFixed = false;
    
    const updatePosition = () => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const navbarHeight = 60; // Navbar height
        const scrollY = window.scrollY || window.pageYOffset;
        
        // Store original positions on first run
        if (originalTop === null) {
            originalTop = section.offsetTop;
            originalLeft = rect.left;
            originalWidth = rect.width;
        }
        
        // Get the absolute position of the section bottom in the document
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionBottom = sectionTop + sectionHeight;
        
        // Calculate when the bottom of the section touches the bottom of the viewport
        // This happens when: scrollY + windowHeight >= sectionBottom
        const scrollWhenBottomTouches = sectionBottom - windowHeight;
        
        // Check if we've scrolled to the point where bottom touches bottom
        const bottomTouchesBottom = scrollY >= scrollWhenBottomTouches;
        
        // Only make fixed when:
        // 1. Bottom has touched the bottom of viewport
        // 2. Section top hasn't reached the navbar yet (so it can still scroll)
        const shouldBeFixed = bottomTouchesBottom && scrollY < sectionTop;
        
        if (shouldBeFixed && !isFixed) {
            // Section bottom has reached bottom of screen, make it fixed
            isFixed = true;
            section.style.position = 'fixed';
            section.style.top = `${navbarHeight}px`;
            section.style.left = originalLeft + 'px';
            section.style.width = originalWidth + 'px';
            section.style.zIndex = zIndex.toString();
        } else if (scrollY >= sectionTop && isFixed) {
            // Section top has reached its original position, keep it fixed (for next section to scroll over)
            section.style.position = 'fixed';
            section.style.top = `${navbarHeight}px`;
            section.style.zIndex = zIndex.toString();
        } else if (!bottomTouchesBottom && isFixed) {
            // We've scrolled back up before the bottom touched, unfix it
            isFixed = false;
            section.style.position = 'relative';
            section.style.top = 'auto';
            section.style.left = 'auto';
            section.style.width = 'auto';
            section.style.zIndex = 'auto';
        }
    };
    
    // Update on scroll
    let ticking = false;
    const scrollHandler = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updatePosition();
                ticking = false;
            });
            ticking = true;
        }
    };
    
    window.addEventListener('scroll', scrollHandler, { passive: true });
    window.addEventListener('resize', () => {
        // Recalculate original positions on resize
        if (!isFixed) {
            const rect = section.getBoundingClientRect();
            originalLeft = rect.left;
            originalWidth = rect.width;
        } else {
            section.style.left = originalLeft + 'px';
            section.style.width = originalWidth + 'px';
        }
    }, { passive: true });
    // Initial check
    updatePosition();
}

// Make experience section fixed when bottom touches bottom of screen
function handleExperienceSticky() {
    const experienceSection = document.getElementById('experience');
    if (!experienceSection) return;
    
    let originalTop = null;
    let originalLeft = null;
    let originalWidth = null;
    let isFixed = false;
    
    const updatePosition = () => {
        const rect = experienceSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const navbarHeight = 60; // Navbar height
        const scrollY = window.scrollY || window.pageYOffset;
        
        // Store original positions on first run
        if (originalTop === null) {
            originalTop = experienceSection.offsetTop;
            originalLeft = rect.left;
            originalWidth = rect.width;
        }
        
        // Get the absolute position of the section bottom in the document
        const sectionTop = experienceSection.offsetTop;
        const sectionHeight = experienceSection.offsetHeight;
        const sectionBottom = sectionTop + sectionHeight;
        
        // Calculate when the bottom of the section touches the bottom of the viewport
        // This happens when: scrollY + windowHeight >= sectionBottom
        const scrollWhenBottomTouches = sectionBottom - windowHeight;
        
        // Check if we've scrolled to the point where bottom touches bottom
        const bottomTouchesBottom = scrollY >= scrollWhenBottomTouches;
        
        // Only make fixed when:
        // 1. Bottom has touched the bottom of viewport
        // 2. Section top hasn't reached the navbar yet (so it can still scroll)
        const shouldBeFixed = bottomTouchesBottom && scrollY < sectionTop;
        
        if (shouldBeFixed && !isFixed) {
            // Section bottom has reached bottom of screen, make it fixed
            isFixed = true;
            experienceSection.style.position = 'fixed';
            experienceSection.style.top = `${navbarHeight}px`;
            experienceSection.style.left = originalLeft + 'px';
            experienceSection.style.width = originalWidth + 'px';
            experienceSection.style.zIndex = '3';
        } else if (scrollY >= sectionTop && isFixed) {
            // Section top has reached its original position, keep it fixed (for Skills to scroll over)
            experienceSection.style.position = 'fixed';
            experienceSection.style.top = `${navbarHeight}px`;
            experienceSection.style.zIndex = '3';
        } else if (!bottomTouchesBottom && isFixed) {
            // We've scrolled back up before the bottom touched, unfix it
            isFixed = false;
            experienceSection.style.position = 'relative';
            experienceSection.style.top = 'auto';
            experienceSection.style.left = 'auto';
            experienceSection.style.width = 'auto';
            experienceSection.style.zIndex = 'auto';
        }
    };
    
    // Update on scroll
    let ticking = false;
    const scrollHandler = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updatePosition();
                ticking = false;
            });
            ticking = true;
        }
    };
    
    window.addEventListener('scroll', scrollHandler, { passive: true });
    window.addEventListener('resize', () => {
        // Recalculate original positions on resize
        if (!isFixed) {
            const rect = experienceSection.getBoundingClientRect();
            originalLeft = rect.left;
            originalWidth = rect.width;
        } else {
            experienceSection.style.left = originalLeft + 'px';
            experienceSection.style.width = originalWidth + 'px';
        }
    }, { passive: true });
    // Initial check
    updatePosition();
}

// Calculate experience section height to ensure timeline can scroll
function calculateExperienceHeight() {
    const experienceSection = document.getElementById('experience');
    const experienceTitle = experienceSection?.querySelector('.section-title');
    const experienceTimeline = experienceSection?.querySelector('.experience-timeline');
    
    if (experienceSection && experienceTitle && experienceTimeline) {
        const titleHeight = experienceTitle.offsetHeight;
        const timelineHeight = experienceTimeline.scrollHeight;
        const padding = 15 * window.innerHeight / 100; // 15vh padding-top
        const bottomPadding = 12 * 16; // 12rem padding-bottom
        
        // Set minimum height to ensure all content can scroll
        const minHeight = titleHeight + timelineHeight + padding + bottomPadding + 200; // Extra buffer
        experienceSection.style.minHeight = `${minHeight}px`;
    }
}

// Add initial styles for hero animations
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    const heroLinks = document.querySelector('.hero-links');
    const profileImg = document.querySelector('.profile-img');
    
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(20px)';
        heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }
    if (heroSubtitle) {
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(20px)';
        heroSubtitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }
    if (heroDescription) {
        heroDescription.style.opacity = '0';
        heroDescription.style.transform = 'translateY(20px)';
        heroDescription.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }
    if (heroLinks) {
        heroLinks.style.opacity = '0';
        heroLinks.style.transform = 'translateY(20px)';
        heroLinks.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }
    if (profileImg) {
        profileImg.style.opacity = '0';
        profileImg.style.transform = 'scale(0.9)';
        profileImg.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }
    
    initHeroAnimations();
    initScrollAnimations();
    initParallax();
    loadPublications();
    calculateExperienceHeight();
    handleExperienceSticky();
    handleSectionSticky('projects', 5);
    handleSectionSticky('publications', 6);
    
    // Recalculate on window resize
    window.addEventListener('resize', () => {
        calculateExperienceHeight();
        handleExperienceSticky();
        handleSectionSticky('projects', 5);
        handleSectionSticky('publications', 6);
    });
    
    // Observe publications after they're loaded
    setTimeout(() => {
        document.querySelectorAll('.publication-item').forEach(el => {
            observer.observe(el);
        });
    }, 1000);
});

// Enhanced scroll effect for navbar
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const currentScroll = window.pageYOffset;
            const navbar = document.querySelector('.navbar');
            
            if (currentScroll > 50) {
                navbar.style.borderBottomColor = 'var(--border-color)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            } else {
                navbar.style.borderBottomColor = 'var(--border-light)';
                navbar.style.boxShadow = 'none';
            }
            
            ticking = false;
        });
        ticking = true;
    }
});

