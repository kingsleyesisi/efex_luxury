import { state, actions } from '../state/store.js';
import { navigate } from '../main.js';

export const CheckoutModal = () => {
    const overlay = document.createElement('div');
    overlay.className = 'checkout-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0, 0, 0, 0.8)';
    overlay.style.backdropFilter = 'blur(5px)';
    overlay.style.zIndex = '2000';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.3s ease';

    // Animation entry
    setTimeout(() => overlay.style.opacity = '1', 10);

    const cartTotal = state.cart.reduce((a,b) => a + (b.product.price * b.qty), 0);
    
    // Steps: 'confirm' -> 'processing' -> 'success'
    let currentStep = 'confirm';

    const render = () => {
        overlay.innerHTML = '';
        const card = document.createElement('div');
        card.className = 'card';
        card.style.background = 'var(--color-black)';
        card.style.border = '1px solid var(--color-gold)';
        card.style.padding = '2rem';
        card.style.width = '90%';
        card.style.maxWidth = '500px';
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        card.style.gap = '1.5rem';
        card.style.position = 'relative';
        card.style.transform = 'scale(0.95)';
        card.style.transition = 'transform 0.3s ease';
        
        // Slight zoom in
        setTimeout(() => card.style.transform = 'scale(1)', 10);

        if (currentStep === 'confirm') {
            card.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--color-black-lighter); padding-bottom: 1rem;">
                    <h3 style="color: var(--color-white); margin: 0;">Order Summary</h3>
                    <button id="close-modal" style="background:none; border:none; color: var(--color-gray-400); font-size: 1.5rem; cursor: pointer;">&times;</button>
                </div>
                
                <div style="max-height: 200px; overflow-y: auto;">
                    ${state.cart.map(item => `
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.9rem;">
                            <span style="color: var(--color-gray-400);">${item.qty}x ${item.product.name}</span>
                            <span>₦${(item.product.price * item.qty).toLocaleString()}</span>
                        </div>
                    `).join('')}
                </div>

                <div style="display: flex; justify-content: space-between; font-size: 1.2rem; border-top: 1px solid var(--color-black-lighter); padding-top: 1rem; color: var(--color-gold);">
                    <span>Total</span>
                    <span>₦${cartTotal.toLocaleString()}</span>
                </div>

                <div style="display: flex; gap: 1rem;">
                    <button class="btn btn-primary" id="pay-btn" style="flex: 1;">Pay Now</button>
                    <button class="btn btn-outline" id="cancel-btn" style="flex: 1;">Cancel</button>
                </div>
            `;
            
            card.querySelector('#close-modal').onclick = close;
            card.querySelector('#cancel-btn').onclick = close;
            card.querySelector('#pay-btn').onclick = () => {
                currentStep = 'processing';
                render();
            };
        } else if (currentStep === 'processing') {
             card.innerHTML = `
                <div style="text-align: center; padding: 2rem 0;">
                    <div class="spinner" style="width: 50px; height: 50px; margin: 0 auto 1.5rem auto;"></div>
                    <h3 style="color: var(--color-white);">Processing Payment...</h3>
                    <p style="color: var(--color-gray-400);">Please do not close this window.</p>
                </div>
             `;
             
             // Simulate network request
             setTimeout(() => {
                 currentStep = 'success';
                 actions.checkout();
                 render();
             }, 2500);
        } else if (currentStep === 'success') {
            card.innerHTML = `
                <div style="text-align: center; padding: 2rem 0;">
                    <div style="
                        width: 60px; height: 60px; 
                        background: var(--color-success); 
                        border-radius: 50%; 
                        display: flex; align-items: center; justify-content: center; 
                        margin: 0 auto 1.5rem auto;
                        font-size: 2rem; color: black;
                        animation: bounce 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    ">✓</div>
                    <h3 style="color: var(--color-gold); margin-bottom: 0.5rem;">Payment Successful!</h3>
                    <p style="color: var(--color-gray-400); margin-bottom: 2rem;">Your order has been confirmed.</p>
                    <button class="btn btn-primary" id="finish-btn" style="width: 100%;">View Dashboard</button>
                </div>
            `;
            
            card.querySelector('#finish-btn').onclick = () => {
                close();
                navigate('/dashboard');
            };
        }

        overlay.appendChild(card);
    };

    const close = () => {
        overlay.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(overlay)) {
                document.body.removeChild(overlay);
            }
        }, 300);
    };

    render();
    document.body.appendChild(overlay);
};
