import { CheckoutModal } from './CheckoutModal.js';
import { navigate } from '../main.js';
import { state, subscribe, actions } from '../state/store.js';

export const Header = (user) => {
  const header = document.createElement('header');
  
  // Dynamic re-render helper
  const updateContent = () => {
    // Calculate cart total items
    const cartCount = state.cart.reduce((sum, item) => sum + item.qty, 0);

    const navHtml = `
      <div class="container">
        <nav>
          <a href="/" class="brand-logo fade-in" data-link>
            <img src="/logo.png" alt="Efex Luxury Wear Logo" class="logo-image" />
            <div class="brand-text">
              <span class="brand-name">Efex Luxury Wear</span>
              <span class="brand-tagline">Authentic Fashion</span>
            </div>
          </a>
          
          <div class="nav-links desktop-nav">
            <a href="/" data-link class="nav-link">Home</a>
            <a href="/shop" data-link class="nav-link">Shop</a>
            ${state.user 
              ? `<a href="/dashboard" data-link class="nav-link">My Account</a>` 
              : `<a href="/auth" data-link class="nav-link">Login</a>`
            }
            <button id="cart-btn" class="cart-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span class="cart-count ${cartCount > 0 ? 'pulse' : ''}">${cartCount}</span>
            </button>
             ${state.user ? `<button id="logout-btn" class="logout-button">Logout</button>` : ''}
          </div>

          <!-- Hamburger Menu Button -->
          <button class="hamburger" id="hamburger-btn" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </div>

      <!-- Mobile Menu Overlay -->
      <div class="mobile-menu-overlay" id="mobile-overlay"></div>
      
      <!-- Mobile Menu -->
      <div class="mobile-menu" id="mobile-menu">
        <div style="margin-bottom: 3rem;">
          <h3 style="color: var(--color-gold); font-size: 1.5rem; margin-bottom: 0.5rem;">Menu</h3>
          <p style="color: var(--color-gray-400); font-size: 0.9rem;">Navigate through our collection</p>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <a href="/" data-link class="mobile-nav-link">
            <span>Home</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </a>
          <a href="/shop" data-link class="mobile-nav-link">
            <span>Shop</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </a>
          ${state.user 
            ? `<a href="/dashboard" data-link class="mobile-nav-link">
                <span>My Account</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </a>` 
            : `<a href="/auth" data-link class="mobile-nav-link">
                <span>Login</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </a>`
          }
        </div>

        ${state.user ? `
          <div style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--glass-border);">
            <button id="mobile-logout-btn" class="btn btn-outline" style="width: 100%;">Logout</button>
          </div>
        ` : ''}
      </div>
    `;
    header.innerHTML = navHtml;

    // Cart Click -> Checkout Modal
    const cartBtn = header.querySelector('#cart-btn');
    cartBtn.addEventListener('click', () => {
        if (state.cart.length === 0) {
            alert("Your cart is empty.");
        } else {
            if (!state.user) {
                if(confirm("Please login to checkout.")) navigate('/auth');
                return;
            }
            CheckoutModal();
        }
    });

    // Desktop Logout
    const logoutBtn = header.querySelector('#logout-btn');
   if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            actions.logout();
            navigate('/');
        });
    }

  };

  updateContent();

  // Links
  header.addEventListener('click', (e) => {
    const link = e.target.closest('[data-link]');
    if (link) {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (href && href !== '#') {
        navigate(href);
      }
    }
  });

  // Re-render header on state change (Cart, Login)
  subscribe(() => {
    if (document.body.contains(header)) {
        updateContent();
    }
  });

  return header;
};
