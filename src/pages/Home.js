import { state, subscribe } from '../state/store.js';
import { navigate } from '../main.js';

export const Home = () => {
  const container = document.createElement('div');
  container.className = 'home-page';

  // ===========================================
  // HERO SECTION - Modern Split Screen
  // ===========================================
  const hero = document.createElement('section');
  hero.className = 'hero-section';
  hero.innerHTML = `
    <div class="hero-background-image"></div>
    <div class="hero-split-layout container">
      <!-- Left Content -->
      <div class="hero-left fade-in-up">
        <div class="hero-badge">
          <span>New Collection 2024</span>
        </div>
        <h1 class="hero-main-title">
          Experience
          <span class="highlight-text">Authentic</span>
          Nigerian Luxury
        </h1>
        <p class="hero-tagline">
          Bold heritage. Contemporary elegance.
        </p>
        <div class="hero-cta-group">
          <button class="btn btn-primary btn-hero" id="hero-shop-btn">
            Shop Collection
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
        <div class="hero-metrics fade-in delay-400">
          <div class="metric">
            <strong>500+</strong>
            <span>Designs</span>
          </div>
          <div class="metric">
            <strong>10K+</strong>
            <span>Clients</span>
          </div>
          <div class="metric">
            <strong>100%</strong>
            <span>Authentic</span>
          </div>
        </div>
      </div>

      <!-- Right Visual Showcase -->
      <div class="hero-right fade-in delay-200">
        <div class="hero-image-stack">
          <div class="stack-image primary">
            <img src="/images/products/hero_nigerian_fashion_1768247803020.png" alt="Nigerian Agbada" />
            <div class="image-label">Agbada Collection</div>
          </div>
          <div class="stack-image secondary">
            <img src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600&auto=format&fit=crop" alt="Ankara Fashion" />
            <div class="image-label">Ankara Styles</div>
          </div>
          <div class="floating-badge">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span>Trending</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Decorative Elements -->
    <div class="hero-decoration">
      <div class="decoration-circle"></div>
      <div class="decoration-dots"></div>
    </div>
  `;

  // ===========================================
  // FEATURED CATEGORIES - Image Grid
  // ===========================================
  const categories = document.createElement('section');
  categories.className = 'categories-section container';
  categories.innerHTML = `
    <div class="section-header reveal">
      <span class="section-subtitle">Shop by Category</span>
      <h2 class="section-title">Curated Collections</h2>
      <p class="section-description">
        Discover our exclusive range of authentic Nigerian fashion for every occasion
      </p>
    </div>

    <div class="categories-grid">
      <div class="category-card large reveal delay-100" data-category="men">
        <img src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop" alt="Men's Collection" />
        <div class="category-overlay">
          <h3>Men's Collection</h3>
          <p>Agbada • Kaftan • Dashiki</p>
          <span class="category-cta">Shop Now →</span>
        </div>
      </div>

      <div class="category-card reveal delay-200" data-category="women">
        <img src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop" alt="Women's Collection" />
        <div class="category-overlay">
          <h3>Women's Collection</h3>
          <p>Ankara • Iro & Buba • Gele</p>
          <span class="category-cta">Shop Now →</span>
        </div>
      </div>

      <div class="category-card reveal delay-300" data-category="children">
        <img src="https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=800&auto=format&fit=crop" alt="Children's Collection" />
        <div class="category-overlay">
          <h3>Children's Collection</h3>
          <p>Festive Wear • Traditional Sets</p>
          <span class="category-cta">Shop Now →</span>
        </div>
      </div>

      <div class="category-card reveal delay-400" data-category="accessories">
        <img src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=800&auto=format&fit=crop" alt="Accessories" />
        <div class="category-overlay">
          <h3>Accessories</h3>
          <p>Jewelry • Shoes • Bags</p>
          <span class="category-cta">Shop Now →</span>
        </div>
      </div>
    </div>
  `;

  // ===========================================
  // BRAND STORY - Split Layout
  // ===========================================
  const story = document.createElement('section');
  story.className = 'story-section';
  story.innerHTML = `
    <div class="story-content">
      <div class="story-image reveal">
        <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200&auto=format&fit=crop" alt="Efex Luxury Story" />
      </div>
      <div class="story-text reveal delay-200">
        <span class="section-subtitle">Our Story</span>
        <h2 class="section-title">Where Tradition<br/>Meets Innovation</h2>
        <p class="story-description">
          At Efex Luxury, we celebrate the rich tapestry of Nigerian heritage through contemporary fashion. 
          Each piece is carefully curated to honor traditional craftsmanship while embracing modern aesthetics.
        </p>
        <p class="story-description">
          From the vibrant Ankara prints to the elegant Agbada styles, our collection represents 
          the bold spirit and authentic beauty of African fashion.
        </p>
        <div class="story-features">
          <div class="feature-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Premium Quality Materials</span>
          </div>
          <div class="feature-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Authentic Nigerian Designs</span>
          </div>
          <div class="feature-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Artisan Craftsmanship</span>
          </div>
        </div>
      </div>
    </div>
  `;

  // ===========================================
  // FEATURED PRODUCTS
  // ===========================================
  const featured = document.createElement('section');
  featured.className = 'featured-section container';
  featured.innerHTML = `
    <div class="section-header reveal">
      <span class="section-subtitle">Best Sellers</span>
      <h2 class="section-title">Featured Products</h2>
    </div>
    <div class="featured-grid" id="featured-products"></div>
  `;

  // ===========================================
  // NEWSLETTER CTA
  // ===========================================
  const newsletter = document.createElement('section');
  newsletter.className = 'newsletter-section';
  newsletter.innerHTML = `
    <div class="newsletter-content container reveal">
      <div class="newsletter-text">
        <h2>Join Our Exclusive Community</h2>
        <p>Be the first to know about new collections, special offers, and fashion insights.</p>
      </div>
      <form class="newsletter-form" id="newsletter-form">
        <input type="email" placeholder="Enter your email address" required />
        <button type="submit" class="btn btn-primary">Subscribe</button>
      </form>
    </div>
  `;

  // Assemble page
  container.appendChild(hero);
  container.appendChild(categories);
  container.appendChild(story);
  container.appendChild(featured);
  container.appendChild(newsletter);

  // ===========================================
  // EVENT LISTENERS
  // ===========================================
  
  // Hero CTAs
  setTimeout(() => {
    hero.querySelector('#hero-shop-btn')?.addEventListener('click', () => navigate('/shop'));

    // Category cards
    categories.querySelectorAll('.category-card').forEach(card => {
      card.addEventListener('click', () => navigate('/shop'));
    });

    // Newsletter form
    const newsletterForm = newsletter.querySelector('#newsletter-form');
    newsletterForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input').value;
      alert(`Thank you for subscribing with ${email}!`);
      newsletterForm.reset();
    });

    // Render featured products
    renderFeaturedProducts();
  }, 0);

  // Scroll animations
  const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    container.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  };

  setTimeout(observeElements, 100);

  // Render featured products from state
  function renderFeaturedProducts() {
    const grid = container.querySelector('#featured-products');
    if (!grid) return;

    const featuredProducts = state.products.slice(0, 4);
    
    grid.innerHTML = featuredProducts.map((product, index) => `
      <div class="product-card reveal delay-${(index + 1) * 100}" data-product-id="${product.id}">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" />
          <button class="quick-add-btn" data-id="${product.id}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </button>
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <p class="product-category">${product.category}</p>
          <p class="product-price">₦${product.price.toLocaleString()}</p>
        </div>
      </div>
    `).join('');

    // Add to cart from quick add
    grid.querySelectorAll('.quick-add-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.id);
        const product = state.products.find(p => p.id === id);
        if (product) {
          import('../state/store.js').then(({ actions }) => {
            actions.addToCart(product);
            btn.innerHTML = '✓ Added';
            setTimeout(() => {
              btn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              `;
            }, 2000);
          });
        }
      });
    });

    // Click product card to go to shop
    grid.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', () => navigate('/shop'));
    });

    // Re-observe for animations
    observeElements();
  }

  return container;
};
