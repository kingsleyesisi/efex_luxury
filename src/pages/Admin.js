import { state, actions, subscribe } from '../state/store.js';

export const Admin = () => {
  const container = document.createElement('div');
  container.className = 'container';
  container.style.paddingTop = '2rem';
  container.style.paddingBottom = '4rem';

  const render = () => {
    container.innerHTML = `
      <h2 style="border-bottom: 1px solid var(--color-black-lighter); padding-bottom: 1rem; margin-bottom: 2rem;">Admin Console</h2>
      
      <div style="display: grid; grid-template-columns: 1fr; gap: 3rem;">
        
        <!-- Product Management Section (NEW) -->
        <section>
          <h3 style="color: var(--color-gold); margin-bottom: 1.5rem;">Product Management</h3>
          <div class="card">
            <h4 style="margin-bottom: 1rem;">Add New Product</h4>
            <form id="add-product-form" style="display: grid; gap: 1rem;">
                <!-- Product Name -->
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; font-size: 0.9rem; color: var(--color-gray-400);">Product Name</label>
                    <input type="text" name="name" required placeholder="e.g. Velvet Tuxedo" 
                        style="width: 100%; padding: 0.8rem; background: var(--color-black); border: 1px solid var(--color-black-lighter); color: white; outline: none;" />
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <!-- Price -->
                    <div>
                        <label style="display: block; margin-bottom: 0.5rem; font-size: 0.9rem; color: var(--color-gray-400);">Price (₦)</label>
                        <input type="number" name="price" required placeholder="150000" 
                            style="width: 100%; padding: 0.8rem; background: var(--color-black); border: 1px solid var(--color-black-lighter); color: white; outline: none;" />
                    </div>
                    <!-- Category -->
                    <div>
                        <label style="display: block; margin-bottom: 0.5rem; font-size: 0.9rem; color: var(--color-gray-400);">Category</label>
                        <select name="category" style="width: 100%; padding: 0.8rem; background: var(--color-black); border: 1px solid var(--color-black-lighter); color: white; outline: none;">
                            <option value="Cloths">Cloths</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Shoes">Shoes</option>
                            <option value="Suits">Suits</option>
                        </select>
                    </div>
                </div>

                <!-- Image Upload -->
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; font-size: 0.9rem; color: var(--color-gray-400);">Product Image</label>
                    <div style="border: 2px dashed var(--color-black-lighter); padding: 2rem; text-align: center; cursor: pointer; transition: border-color 0.3s;" id="drop-zone">
                        <p style="color: var(--color-gray-400);" id="file-label">Click or Drag Image Here</p>
                        <input type="file" id="file-input" accept="image/*" style="display: none;" />
                    </div>
                    <input type="hidden" name="image" id="image-data" required />
                </div>

                <button type="submit" class="btn btn-primary" style="justify-self: start;">Add Product</button>
            </form>
          </div>
        </section>

        <!-- Operations Section -->
        <section>
          <h3 style="color: var(--color-gold); margin-bottom: 1.5rem;">Recent Orders</h3>
          <div class="card" style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; text-align: left;">
              <thead>
                <tr style="border-bottom: 1px solid var(--color-black-lighter);">
                  <th style="padding: 1rem; color: var(--color-gray-400);">Order ID</th>
                  <th style="padding: 1rem; color: var(--color-gray-400);">Total</th>
                  <th style="padding: 1rem; color: var(--color-gray-400);">Status</th>
                  <th style="padding: 1rem; color: var(--color-gray-400);">Action</th>
                </tr>
              </thead>
              <tbody id="orders-table-body">
                ${state.orders.map(order => `
                  <tr style="border-bottom: 1px solid var(--color-black-lighter);">
                    <td style="padding: 1rem;">${order.id}</td>
                    <td style="padding: 1rem;">${order.total}</td>
                    <td style="padding: 1rem;">
                      <span style="color: ${order.status === 'Paid' ? 'var(--color-success)' : order.status === 'Shipped' ? '#3B82F6' : 'var(--color-warning)'}">
                        ${order.status}
                      </span>
                    </td>
                    <td style="padding: 1rem;">
                      ${order.status !== 'Shipped' ? `
                        <button class="btn btn-outline toggle-status" data-id="${order.id}" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;">
                          ${order.status === 'Pending' ? 'Mark Paid' : 'Mark Pending'}
                        </button>
                      ` : '-'}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    `;

    // Logic Binding
    bindEvents();
  };

  const bindEvents = () => {
    const form = container.querySelector('#add-product-form');
    const dropZone = container.querySelector('#drop-zone');
    const fileInput = container.querySelector('#file-input');
    const fileLabel = container.querySelector('#file-label');
    const imageDataInput = container.querySelector('#image-data');
    const orderTable = container.querySelector('#orders-table-body');

    // File Upload Interaction
    dropZone.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) handleFile(file);
    });

    const handleFile = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            imageDataInput.value = e.target.result;
            fileLabel.innerText = `Selected: ${file.name}`;
            dropZone.style.borderColor = 'var(--color-gold)';
            dropZone.style.backgroundImage = `url(${e.target.result})`;
            dropZone.style.backgroundSize = 'cover';
            dropZone.style.backgroundPosition = 'center';
            // Darken background to keep text visible
            fileLabel.style.background = 'rgba(0,0,0,0.7)';
            fileLabel.style.padding = '0.5rem';
        };
        reader.readAsDataURL(file);
    };

    // Form Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic Validation
        if (!imageDataInput.value) {
            alert("Please upload a product image.");
            return;
        }

        const formData = new FormData(form);
        const product = {
            name: formData.get('name'),
            price: Number(formData.get('price')),
            category: formData.get('category'),
            image: imageDataInput.value
        };

        const btn = form.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = "Uploading...";
        btn.disabled = true;

        setTimeout(() => {
            actions.addProduct(product);
            alert("Product Added Successfully!");
            // Reset Form (Simpler to just re-render or reload, but let's clear inputs)
            form.reset();
            fileLabel.innerText = "Click or Drag Image Here";
            dropZone.style.backgroundImage = 'none';
            dropZone.style.borderColor = 'var(--color-black-lighter)';
            btn.innerText = originalText;
            btn.disabled = false;
        }, 1000);
    });

    // Order Toggle
    orderTable.addEventListener('click', (e) => {
        if (e.target.classList.contains('toggle-status')) {
            const id = e.target.getAttribute('data-id');
            actions.toggleOrderStatus(id);
        }
    });
  };

  render();

  // Re-render on state change (mainly for orders table updates)
  subscribe(() => {
    if (document.body.contains(container)) {
      render();
    }
  });

  return container;
};
