import { actions } from '../state/store.js';
import { navigate } from '../main.js';

export const Auth = () => {
  // Use a full-screen split layout
  const container = document.createElement('div');
  container.className = 'auth-page';
  container.style.height = 'calc(100vh - 80px)'; // Full height minus header
  container.style.display = 'flex';
  container.style.background = 'var(--color-black)';
  container.style.overflow = 'hidden';

  // Left Side: Visuals
  const visualSide = document.createElement('div');
  visualSide.className = 'auth-visuals';
  visualSide.style.flex = '1';
  visualSide.style.position = 'relative';
  visualSide.style.display = 'none'; // Hidden on mobile
  // Responsive check handled via simple logic or assume desktop first then media query in CSS (doing inline style for speed)
  if (window.innerWidth > 768) visualSide.style.display = 'block';

  visualSide.innerHTML = `
    <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1974&auto=format&fit=crop" 
         style="width: 100%; height: 100%; object-fit: cover; filter: brightness(0.6);" />
    <div style="position: absolute; bottom: 4rem; left: 4rem; max-width: 400px;">
        <h2 style="font-size: 3rem; color: var(--color-gold); margin-bottom: 1rem;">Efex Luxury</h2>
        <p style="font-size: 1.2rem; color: white;">Where authentic style meets uncompromising quality.</p>
    </div>
  `;

  // Right Side: Form
  const formSide = document.createElement('div');
  formSide.className = 'auth-form-container';
  formSide.style.flex = '1';
  formSide.style.display = 'flex';
  formSide.style.alignItems = 'center';
  formSide.style.justifyContent = 'center';
  formSide.style.padding = '2rem';
  formSide.style.position = 'relative';

  // Toggle State
  let isLogin = true;

  const renderContent = () => {
    // Styling constants
    const inputStyle = `
        width: 100%; 
        padding: 1rem; 
        background: transparent; 
        border: none; 
        border-bottom: 1px solid var(--color-black-lighter); 
        color: white; 
        outline: none; 
        transition: border-color 0.3s;
        font-size: 1rem;
    `;
    
    const labelStyle = `
        display: block; 
        margin-bottom: 0.5rem; 
        font-size: 0.8rem; 
        text-transform: uppercase; 
        letter-spacing: 0.1em; 
        color: var(--color-gray-400);
        margin-top: 1.5rem;
    `;

    formSide.innerHTML = `
      <div style="width: 100%; max-width: 400px; animation: fadeIn 0.5s ease;">
        <h2 style="font-size: 2rem; margin-bottom: 0.5rem; color: var(--color-white);">
            ${isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p style="color: var(--color-gray-400); margin-bottom: 2rem;">
            ${isLogin ? 'Please enter your details to sign in.' : 'Join our exclusive community.'}
        </p>

        <form id="auth-form">
          ${!isLogin ? `
              <!-- Signup Extra Fields -->
               <div>
                <label style="${labelStyle}">Phone Number</label>
                <input type="tel" name="phone" placeholder="+234 ..." required style="${inputStyle}" />
              </div>

               <div>
                <label style="${labelStyle}">Location / Address</label>
                <input type="text" name="location" placeholder="e.g. Lekki Phase 1, Lagos" required style="${inputStyle}" />
              </div>
          ` : ''}

          <div>
            <label style="${labelStyle}">Email Address</label>
            <input type="email" name="email" placeholder="client@example.com" required style="${inputStyle}" />
          </div>

          <div>
            <label style="${labelStyle}">Password</label>
            <input type="password" name="password" placeholder="••••••••" required style="${inputStyle}" />
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 3rem; padding: 1rem;">
            ${isLogin ? 'Sign In' : 'Register'} &rarr;
          </button>
        </form>

        <div style="margin-top: 2rem; text-align: center; border-top: 1px solid var(--color-black-lighter); padding-top: 2rem;">
            <p style="color: var(--color-gray-400); font-size: 0.9rem;">
                ${isLogin ? "Don't have an account?" : "Already have an account?"}
                <button id="toggle-btn" style="background: none; border: none; color: var(--color-gold); font-weight: bold; margin-left: 0.5rem; cursor: pointer;">
                    ${isLogin ? 'Sign up for free' : 'Sign in'}
                </button>
            </p>
        </div>
        
        <div id="error-msg" style="color: #ef4444; font-size: 0.8rem; text-align: center; margin-top: 1rem; display: none;"></div>
      </div>
    `;

    // Re-attach listeners
    const form = formSide.querySelector('#auth-form');
    const toggleBtn = formSide.querySelector('#toggle-btn');
    const errorMsg = formSide.querySelector('#error-msg');
    const btn = form.querySelector('button');

    // Input Focus Effects
    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('focus', () => input.style.borderBottomColor = 'var(--color-gold)');
        input.addEventListener('blur', () => input.style.borderBottomColor = 'var(--color-black-lighter)');
    });

    toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        isLogin = !isLogin;
        renderContent();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[name="email"]').value;
        const password = form.querySelector('input[name="password"]').value;
        
        let phone, location;
        if (!isLogin) {
            phone = form.querySelector('input[name="phone"]').value;
            location = form.querySelector('input[name="location"]').value;
        }

        // Loading State
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Processing...';
        btn.disabled = true;
        errorMsg.style.display = 'none';

        setTimeout(() => {
            try {
                if (isLogin) {
                    actions.login(email, password);
                } else {
                    actions.register(email, password, phone, location);
                }
                navigate('/dashboard');
            } catch (err) {
                errorMsg.innerText = err.message;
                errorMsg.style.display = 'block';
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        }, 1500);
    });
  };

  renderContent();

  container.appendChild(visualSide);
  container.appendChild(formSide);

  // Quick resize handler for split view
  window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
          visualSide.style.display = 'block';
      } else {
          visualSide.style.display = 'none';
      }
  });

  return container;
};
