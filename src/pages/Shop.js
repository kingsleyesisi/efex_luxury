import { state, actions } from '../state/store.js';

export const Shop = () => {
  const container = document.createElement('div');
  container.className = 'container';
  container.style.paddingTop = '2rem';
  container.style.paddingBottom = '4rem';

  const header = document.createElement('div');
  header.style.marginBottom = '3rem';
  header.style.textAlign = 'center';
  header.innerHTML = `
    <h2 style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--color-gold);">The Collection</h2>
    <p style="color: var(--color-gray-400);">Exclusive pieces for the discerning individual.</p>
  `;
  container.appendChild(header);

  // Filters
  const filtersContainer = document.createElement('div');
  filtersContainer.style.display = 'flex';
  filtersContainer.style.justifyContent = 'center';
  filtersContainer.style.gap = '1rem';
  filtersContainer.style.marginBottom = '3rem';
  filtersContainer.innerHTML = `
    <button class="btn btn-outline active-filter" data-filter="All">All</button>
    <button class="btn btn-outline" data-filter="Men">Men</button>
    <button class="btn btn-outline" data-filter="Women">Women</button>
    <button class="btn btn-outline" data-filter="Children">Children</button>
  `;
  container.appendChild(filtersContainer);

  // CSS for active state
  if (!document.getElementById('filter-css')) {
    const style = document.createElement('style');
    style.id = 'filter-css';
    style.innerHTML = `
        .active-filter {
            background-color: var(--color-gold) !important;
            color: var(--color-black) !important;
            border-color: var(--color-gold) !important;
        }
    `;
    document.head.appendChild(style);
  }

  // Product Grid
  const grid = document.createElement('div');
  grid.className = 'shop-grid';
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
  grid.style.gap = '1.5rem';

  const renderProducts = (category = 'All') => {
    let products = state.products;
    if (category !== 'All') {
        products = products.filter(p => p.department === category);
    }

    if (products.length === 0) {
        grid.innerHTML = `<p style="text-align:center; color: var(--color-gray-400); grid-column: 1/-1;">No products found in this collection.</p>`;
        return;
    }

    grid.innerHTML = products.map(product => `
      <div class="card" style="padding: 0; overflow: hidden; display: flex; flex-direction: column;">
        <div style="height: 400px; width: 100%; position: relative; overflow: hidden;">
            <img src="${product.image}" alt="${product.name}" 
                style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;"
                onmouseover="this.style.transform='scale(1.05)'"
                onmouseout="this.style.transform='scale(1)'"
            />
        </div>
        <div style="padding: 1.5rem; display: flex; flex-direction: column; flex: 1;">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                <h3 style="font-size: 1.1rem; margin: 0;">${product.name}</h3>
                <span class="text-gold" style="font-size: 1.1rem;">₦${product.price ? product.price.toLocaleString() : 'N/A'}</span>
            </div>
            <p style="color: var(--color-gray-400); font-size: 0.9rem; margin-bottom: 1.5rem; flex: 1;">${product.department} / ${product.category}</p>
            <button class="btn btn-primary add-to-cart" data-id="${product.id}" style="width: 100%;">
                Add to Cart
            </button>
        </div>
      </div>
    `).join('');
  };

  renderProducts(); // Initial Render
  container.appendChild(grid);

  // Filter Logic
  filtersContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        // Toggle Active Class
        filtersContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('active-filter'));
        e.target.classList.add('active-filter');
        
        const filter = e.target.getAttribute('data-filter');
        renderProducts(filter);
    }
  });

  // Add to Cart Logic
  grid.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
      const id = parseInt(e.target.getAttribute('data-id'));
      const product = state.products.find(p => p.id === id);
      if (product) {
        actions.addToCart(product);
        showToast(`Added ${product.name} to cart`);
      }
    }
  });

  return container;
};

// Simple Toast Notification Helper
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.position = 'fixed';
    toast.style.bottom = '2rem';
    toast.style.right = '2rem';
    toast.style.background = 'var(--color-gold)';
    toast.style.color = 'var(--color-black)';
    toast.style.padding = '1rem 2rem';
    toast.style.borderRadius = '4px';
    toast.style.fontWeight = 'bold';
    toast.style.zIndex = '2000';
    toast.style.transform = 'translateY(100px)';
    toast.style.transition = 'transform 0.3s ease';
    document.body.appendChild(toast);
  }
  
  toast.innerText = message;
  toast.style.transform = 'translateY(0)';
  
  setTimeout(() => {
    toast.style.transform = 'translateY(100px)';
  }, 3000);
}
