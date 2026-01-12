import './styles/main.css';
import './styles/home.css';
import './styles/contact.css';
import { state, subscribe } from './state/store.js';
import { Home } from './pages/Home.js';
import { Auth } from './pages/Auth.js';
import { Dashboard } from './pages/Dashboard.js';
import { Admin } from './pages/Admin.js';
import { Shop } from './pages/Shop.js';
import { Contact } from './pages/Contact.js';
import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';

const app = document.querySelector('#app');

// Simple Router
const routes = {
  '/': Home,
  '/auth': Auth,
  '/dashboard': Dashboard,
  '/admin': Admin,
  '/shop': Shop,
  '/contact': Contact
};

// Navigation function
export const navigate = (path) => {
  window.history.pushState({}, '', path);
  render();
};

// Handle browser back/forward
window.addEventListener('popstate', render);

function render() {
  const path = window.location.pathname;
  
  app.innerHTML = '';
  
  const PageComponent = routes[path] || Home;

  // Header
  // Header needs to handle its own subscriptions or we pass state.
  app.appendChild(Header(state.user));

  // Main Content
  const main = document.createElement('main');
  main.className = 'page-content';
  main.appendChild(PageComponent());
  app.appendChild(main);

  // Footer
  app.appendChild(Footer());
}

// Initial Render
render();
