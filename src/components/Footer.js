export const Footer = () => {
  const footer = document.createElement('footer');
  footer.style.padding = '4rem 0';
  footer.style.borderTop = '1px solid var(--color-black-lighter)';
  footer.style.color = 'var(--color-gray-400)';
  footer.style.textAlign = 'center';
  
  footer.innerHTML = `
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} Efex Luxury by Creators Lab. All Rights Reserved.</p>
    </div>
  `;
  
  return footer;
};
