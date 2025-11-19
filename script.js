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

// Load publications when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadPublications();
});

