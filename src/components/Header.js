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
          <a href="/" class="logo" data-link>
            <img src="/logo.png" alt="Efex Luxury" />
          </a>
          
          <div class="nav-links">
            <a href="/" data-link>Home</a>
            <a href="/shop" data-link>Shop</a>
            ${state.user 
              ? `<a href="/dashboard" data-link>My Account</a>` 
              : `<a href="/auth" data-link>Login</a>`
            }
            <button id="cart-btn" class="btn btn-outline" style="border:none; padding: 0.5rem; position: relative;">
               Cart <span style="background: var(--color-gold); color: black; border-radius: 50%; padding: 0 6px; font-size: 0.7rem; vertical-align: top; margin-left: 4px;">${cartCount}</span>
            </button>
             ${state.user ? `<button id="logout-btn" class="text-gold" style="background:none; border:none; margin-left:1rem; font-size: 0.8rem;">Logout</button>` : ''}
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
