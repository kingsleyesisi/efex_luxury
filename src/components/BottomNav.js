
import { navigate } from '../main.js';
import { state, subscribe } from '../state/store.js';

export const BottomNav = () => {
  const nav = document.createElement('nav');
  nav.className = 'bottom-nav';

  const updateContent = () => {
      const currentPath = window.location.pathname;

      const navHtml = `
        <a href="/" data-link class="bottom-nav-link ${currentPath === '/' ? 'active' : ''}">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>Home</span>
        </a>
        
        <a href="/shop" data-link class="bottom-nav-link ${currentPath === '/shop' ? 'active' : ''}">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <span>Shop</span>
        </a>

        <a href="${state.user ? '/dashboard' : '/auth'}" data-link class="bottom-nav-link ${currentPath === '/dashboard' || currentPath === '/auth' ? 'active' : ''}">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span>Account</span>
        </a>
        
        <a href="/contact" data-link class="bottom-nav-link ${currentPath === '/contact' ? 'active' : ''}">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>Contact</span>
        </a>
      `;

      nav.innerHTML = navHtml;
  }
  
  updateContent();

  // Handle navigation
  nav.addEventListener('click', (e) => {
    const link = e.target.closest('[data-link]');
    if (link) {
      e.preventDefault();
      const href = link.getAttribute('href');
      navigate(href);
      updateContent(); 
    }
  });

   // Subscribe to state changes (User login/logout)
   subscribe(() => {
    if (document.body.contains(nav)) {
         updateContent();
    }
  });
  
  // also need to listen to popstate or some global navigation event to update active state if not handled by re-render
  // Since main.js re-renders the whole app on navigation, this component might be re-created or at least we should rely on main.js to keep it updated.
  // BUT, main.js appends BottomNav(). If main.js clears #app and rebuilds, then BottomNav is re-created effectively.
  // The `navigate` function in main.js calls `render()`, which clears `#app`. So `updateContent` runs on init based on current path.

  return nav;
};
