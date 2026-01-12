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
          <a href="/" class="brand-logo" data-link>
            <img src="/logo.png" alt="Efex Luxury Wear Logo" class="logo-image" />
            <div class="brand-text">
              <span class="brand-name">Efex Luxury Wear</span>
              <span class="brand-tagline">Authentic Fashion</span>
            </div>
          </a>
          
          <div class="nav-links">
            <a href="/" data-link>Home</a>
            <a href="/shop" data-link>Shop</a>
            ${state.user 
              ? `<a href="/dashboard" data-link>My Account</a>` 
              : `<a href="/auth" data-link>Login</a>`
            }
            <button id="cart-btn" class="cart-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span class="cart-count">${cartCount}</span>
            </button>
             ${state.user ? `<button id="logout-btn" class="logout-button">Logout</button>` : ''}
          </div>
        </nav>
      </div>
    `;
    header.innerHTML = navHtml;

    // Cart Click -> Checkout Modal
    const cartBtn = header.querySelector('#cart-btn');
    cartBtn.addEventListener('click', () => {
        if (state.cart.length === 0) {
            alert("Your cart is empty."); // Still simple alert for empty cart
        } else {
            if (!state.user) {
                if(confirm("Please login to checkout.")) navigate('/auth');
                return;
            }
            // Trigger Modal
            CheckoutModal();
        }
    });

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
        // Simple re-render logic. In React we'd diff, here we just replace innerHTML + rebind
        // BUT replacing innerHTML kills listeners bound to elements INSIDE.
        // We need to re-bind listeners. Since the header is simple, calling updateContent works if we re-bind.
        updateContent();
    }
  });

  return header;
};
