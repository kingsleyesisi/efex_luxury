import { state, subscribe } from '../state/store.js';
import { navigate } from '../main.js';

export const Home = () => {
  const container = document.createElement('div');
  container.className = 'home-page';

  // Hero Section with Background Image
  const hero = document.createElement('section');
  hero.className = 'hero';
  hero.style.height = '90vh';
  hero.style.display = 'flex';
  hero.style.flexDirection = 'column';
  hero.style.justifyContent = 'center';
  hero.style.alignItems = 'center';
  hero.style.textAlign = 'center';
  hero.style.position = 'relative';
  hero.style.overflow = 'hidden';

  // Background
  const bg = document.createElement('div');
  bg.style.position = 'absolute';
  bg.style.top = '0';
  bg.style.left = '0';
  bg.style.width = '100%';
  bg.style.height = '100%';
  bg.style.backgroundImage = 'url("https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1974&auto=format&fit=crop")';
  bg.style.backgroundSize = 'cover';
  bg.style.backgroundPosition = 'center';
  bg.style.filter = 'brightness(0.3)';
  bg.style.zIndex = '-1';
  hero.appendChild(bg);

  const renderHero = () => {
    // Inner Content
    const content = document.createElement('div');
    content.style.zIndex = '1';
    content.style.padding = '1rem';
    content.innerHTML = `
      <h1 style="font-size: 3.5rem; margin-bottom: 1rem; color: var(--color-white); max-width: 800px; text-shadow: 0 4px 6px rgba(0,0,0,0.5);">
        ${state.cms.heroText}
      </h1>
      <p style="font-size: 1.2rem; color: var(--color-gold); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 3rem;">
        ${state.cms.heroSubText || "EST. 2024"}
      </p>
      <button id="hero-cta" class="btn btn-primary" style="font-size: 1.1rem; padding: 1rem 3rem;">Discover the Collection</button>
    `;
    
    // Clear previous content if re-rendering (simple replace)
    const existing = hero.querySelector('div:not(:first-child)');
    if (existing) hero.removeChild(existing);
    
    hero.appendChild(content);

    hero.querySelector('#hero-cta').addEventListener('click', () => navigate('/shop'));
  };

  renderHero();

  subscribe(() => {
    if (document.body.contains(hero)) {
      renderHero();
    }
  });

  // Featured Categories
  const featured = document.createElement('section');
  featured.className = 'container';
  featured.style.paddingTop = 'var(--spacing-lg)';
  featured.style.paddingBottom = 'var(--spacing-lg)';

  featured.innerHTML = `
    <h2 class="text-center" style="margin-bottom: 4rem; color: var(--color-gold); font-size: 2.5rem;">Curated Excellence</h2>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
      
      <!-- Category 1 -->
      <div class="category-card" style="position: relative; height: 500px; cursor: pointer;">
        <img src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop" 
             style="width: 100%; height: 100%; object-fit: cover; filter: brightness(0.7);" />
        <div style="position: absolute; bottom: 2rem; left: 2rem;">
            <h3 style="color: white; font-size: 2rem; margin-bottom: 0.5rem;">Suits</h3>
            <span class="text-gold" style="font-size: 1rem; text-transform: uppercase; letter-spacing: 0.1em;">Explore &rarr;</span>
        </div>
      </div>

       <!-- Category 2 -->
      <div class="category-card" style="position: relative; height: 500px; cursor: pointer;">
        <img src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop" 
             style="width: 100%; height: 100%; object-fit: cover; filter: brightness(0.7);" />
        <div style="position: absolute; bottom: 2rem; left: 2rem;">
            <h3 style="color: white; font-size: 2rem; margin-bottom: 0.5rem;">Gowns</h3>
            <span class="text-gold" style="font-size: 1rem; text-transform: uppercase; letter-spacing: 0.1em;">Explore &rarr;</span>
        </div>
      </div>

      <!-- Category 3 -->
      <div class="category-card" style="position: relative; height: 500px; cursor: pointer;">
        <img src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=800&auto=format&fit=crop" 
             style="width: 100%; height: 100%; object-fit: cover; filter: brightness(0.7);" />
        <div style="position: absolute; bottom: 2rem; left: 2rem;">
            <h3 style="color: white; font-size: 2rem; margin-bottom: 0.5rem;">Accessories</h3>
            <span class="text-gold" style="font-size: 1rem; text-transform: uppercase; letter-spacing: 0.1em;">Explore &rarr;</span>
        </div>
      </div>

    </div>
  `;

  // Navigate to shop on click
  featured.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => navigate('/shop'));
  });

  container.appendChild(hero);
  container.appendChild(featured);

  return container;
};
