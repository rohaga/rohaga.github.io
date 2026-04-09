// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scroll for anchor links (fallback for browsers without CSS scroll-behavior)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Fetch and display recent Substack posts
(function loadBlogPosts() {
    const container = document.getElementById('blog-posts');
    if (!container) return;

    const RSS_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https://rohaga.substack.com/feed';

    fetch(RSS_URL)
        .then(res => res.json())
        .then(data => {
            if (data.status !== 'ok' || !data.items || data.items.length === 0) {
                container.innerHTML = '<p>No posts yet. Stay tuned!</p>';
                return;
            }

            const posts = data.items.slice(0, 5);
            container.innerHTML = posts.map(post => {
                const date = new Date(post.pubDate).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric'
                });
                const desc = post.description || '';
                return `
                    <a href="${post.link}" target="_blank" class="blog-card">
                        <div class="blog-card-date">${date}</div>
                        <div class="blog-card-title">${post.title}</div>
                        <div class="blog-card-excerpt">${desc}</div>
                        <span class="blog-card-read">Read on Substack &rarr;</span>
                    </a>
                `;
            }).join('');
        })
        .catch(() => {
            container.innerHTML = '<p>Could not load posts. Visit <a href="https://rohaga.substack.com" target="_blank">Substack</a> directly.</p>';
        });
})();
