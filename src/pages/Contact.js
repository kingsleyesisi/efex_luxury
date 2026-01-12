export const Contact = () => {
  const container = document.createElement('div');
  container.className = 'contact-page';

  container.innerHTML = `
    <!-- Contact Hero -->
    <section class="contact-hero">
      <div class="container">
        <div class="contact-hero-content fade-in-up">
          <h1>Get In Touch</h1>
          <p>We'd love to hear from you. Our team is here to answer your questions.</p>
        </div>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="contact-content container">
      <div class="contact-grid">
        <!-- Contact Form -->
        <div class="contact-form-section reveal">
          <h2>Send Us A Message</h2>
          <p class="form-description">Fill out the form below and we'll get back to you within 24 hours.</p>
          
          <form id="contact-form" class="contact-form">
            <div class="form-group">
              <label for="name">Full Name *</label>
              <input type="text" id="name" name="name" required placeholder="John Doe" />
            </div>

            <div class="form-group">
              <label for="email">Email Address *</label>
              <input type="email" id="email" name="email" required placeholder="john@example.com" />
            </div>

            <div class="form-group">
              <label for="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" placeholder="+234 800 000 0000" />
            </div>

            <div class="form-group">
              <label for="subject">Subject *</label>
              <select id="subject" name="subject" required>
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="order">Order Question</option>
                <option value="product">Product Information</option>
                <option value="shipping">Shipping & Delivery</option>
                <option value="returns">Returns & Exchanges</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div class="form-group">
              <label for="message">Message *</label>
              <textarea id="message" name="message" rows="6" required placeholder="Tell us how we can help you..."></textarea>
            </div>

            <button type="submit" class="btn btn-primary btn-large">
              Send Message
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>

        <!-- Contact Information -->
        <div class="contact-info-section">
          <div class="info-card glass-card reveal delay-200">
            <div class="info-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <h3>Visit Our Store</h3>
            <p>123 Fashion Street<br/>Lagos, Nigeria</p>
          </div>

          <div class="info-card glass-card reveal delay-300">
            <div class="info-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <h3>Email Us</h3>
            <p>
              <a href="mailto:support@efexluxury.com">support@efexluxury.com</a><br/>
              <a href="mailto:sales@efexluxury.com">sales@efexluxury.com</a>
            </p>
          </div>

          <div class="info-card glass-card reveal delay-400">
            <div class="info-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <h3>Call Us</h3>
            <p>
              <a href="tel:+2348000000000">+234 800 000 0000</a><br/>
              Mon-Sat: 9AM - 6PM WAT
            </p>
          </div>

          <div class="info-card glass-card reveal delay-500">
            <div class="info-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <h3>Business Hours</h3>
            <p>
              Monday - Friday: 9AM - 7PM<br/>
              Saturday: 10AM - 5PM<br/>
              Sunday: Closed
            </p>
          </div>

          <!-- Social Media -->
          <div class="social-section reveal delay-600">
            <h3>Follow Us</h3>
            <div class="social-links">
              <a href="#" class="social-link" aria-label="Instagram">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" class="social-link" aria-label="Twitter">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" class="social-link" aria-label="Facebook">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" class="social-link" aria-label="WhatsApp">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section">
      <div class="container">
        <div class="section-header reveal">
          <h2>Frequently Asked Questions</h2>
          <p>Quick answers to common questions</p>
        </div>
        
        <div class="faq-grid">
          <div class="faq-item reveal delay-100">
            <h3>What are your shipping options?</h3>
            <p>We offer standard (5-7 days) and express (2-3 days) shipping across Nigeria. International shipping is available on request.</p>
          </div>
          
          <div class="faq-item reveal delay-200">
            <h3>Do you accept returns?</h3>
            <p>Yes, we accept returns within 14 days of delivery. Items must be unworn with original tags attached.</p>
          </div>
          
          <div class="faq-item reveal delay-300">
            <h3>How can I track my order?</h3>
            <p>Once shipped, you'll receive a tracking number via email. You can also check your order status in your account dashboard.</p>
          </div>
          
          <div class="faq-item reveal delay-400">
            <h3>Are your products authentic?</h3>
            <p>Absolutely! All our products are 100% authentic and sourced directly from trusted Nigerian artisans and manufacturers.</p>
          </div>
        </div>
      </div>
    </section>
  `;

  // Form submission
  setTimeout(() => {
    const form = container.querySelector('#contact-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      // Simulate sending
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Sending...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        alert(`Thank you, ${data.name}! We've received your message and will respond within 24 hours.`);
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });

    // Scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    container.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }, 0);

  return container;
};
