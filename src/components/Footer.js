export const Footer = () => {
  const footer = document.createElement('footer');
  footer.style.padding = '4rem 0 2rem';
  footer.style.borderTop = '1px solid var(--glass-border)';
  footer.style.background = 'var(--color-black)';
  footer.style.marginTop = '4rem';
  
  footer.innerHTML = `
    <div class="container">
      <div class="footer-content">
        <!-- Brand Section -->
        <div class="footer-section fade-in">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
            <img src="/logo.png" alt="Efex Luxury Logo" style="height: 50px; width: auto;" />
            <div>
              <h3 style="font-size: 1.2rem; color: var(--color-gold); margin: 0;">Efex Luxury Wear</h3>
              <p style="font-size: 0.75rem; color: var(--color-gray-400); margin: 0; letter-spacing: 0.15em; text-transform: uppercase;">Authentic Fashion</p>
            </div>
          </div>
          <p style="color: var(--color-gray-400); font-size: 0.9rem; margin: 0; line-height: 1.6;">
            Where authentic Nigerian style meets uncompromising quality. Curated for the bold.
          </p>
        </div>

        <!-- Quick Links -->
        <div class="footer-section fade-in delay-100">
          <h4 class="footer-heading">Quick Links</h4>
          <ul class="footer-links">
            <li><a href="/" class="footer-link">Home</a></li>
            <li><a href="/shop" class="footer-link">Shop Collection</a></li>
            <li><a href="/auth" class="footer-link">My Account</a></li>
            <li><a href="/dashboard" class="footer-link">Order History</a></li>
          </ul>
        </div>

        <!-- Customer Service -->
        <div class="footer-section fade-in delay-200">
          <h4 class="footer-heading">Customer Service</h4>
          <ul class="footer-links">
            <li><a href="/contact" class="footer-link">Contact Us</a></li>
            <li><a href="#" class="footer-link">Shipping Info</a></li>
            <li><a href="#" class="footer-link">Returns & Exchanges</a></li>
            <li><a href="#" class="footer-link">Size Guide</a></li>
          </ul>
        </div>

        <!-- Contact & Social -->
        <div class="footer-section fade-in delay-300">
          <h4 class="footer-heading">Connect With Us</h4>
          <div style="margin-bottom: 1.5rem;">
            <p style="color: var(--color-gray-400); font-size: 0.9rem; margin-bottom: 0.5rem;">
              <strong>Email:</strong> support@efexluxury.com
            </p>
            <p style="color: var(--color-gray-400); font-size: 0.9rem; margin: 0;">
              <strong>Phone:</strong> +234 800 000 0000
            </p>
          </div>
          <div class="social-links">
            <a href="#" class="social-link" aria-label="Instagram">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="Twitter">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="Facebook">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} Efex Luxury by Creators Lab. All Rights Reserved.</p>
        <div class="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <span>•</span>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </div>

    <style>
      .footer-content {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 3rem;
        margin-bottom: 3rem;
      }

      @media (max-width: 768px) {
        .footer-content {
          grid-template-columns: 1fr;
          gap: 2rem;
        }
      }

      .footer-section {
        opacity: 0;
        animation: fadeIn 0.6s ease-out forwards;
      }

      .footer-heading {
        color: var(--color-gold);
        font-size: 1rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        margin-bottom: 1rem;
      }

      .footer-links {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

      .footer-link {
        color: var(--color-gray-400);
        font-size: 0.9rem;
        text-decoration: none;
        transition: all var(--transition-smooth);
        display: inline-block;
      }

      .footer-link:hover {
        color: var(--color-gold);
        transform: translateX(5px);
      }

      .social-links {
        display: flex;
        gap: 1rem;
      }

      .social-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: var(--color-black-light);
        border: 1px solid var(--glass-border);
        color: var(--color-gold);
        transition: all var(--transition-smooth);
      }

      .social-link:hover {
        background: var(--color-gold);
        color: var(--color-black);
        transform: translateY(-3px);
        box-shadow: var(--shadow-gold);
      }

      .footer-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 2rem;
        border-top: 1px solid var(--glass-border);
        color: var(--color-gray-400);
        font-size: 0.85rem;
        flex-wrap: wrap;
        gap: 1rem;
      }

      @media (max-width: 640px) {
        .footer-bottom {
          flex-direction: column;
          text-align: center;
        }
      }

      .footer-bottom-links {
        display: flex;
        gap: 1rem;
        align-items: center;
      }

      .footer-bottom-links a {
        color: var(--color-gray-400);
        text-decoration: none;
        transition: color var(--transition-smooth);
      }

      .footer-bottom-links a:hover {
        color: var(--color-gold);
      }
    </style>
  `;
  
  return footer;
};
