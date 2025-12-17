/**
 * Layout.js - Handles the unified header, footer, and mobile menu logic.
 */

const siteConfig = {
    brandName: "EFEX",
    navLinks: [
        { name: "The Boutique", href: "./boutique.html" },
        { name: "Gallery", href: "./gallery.html" },
        { name: "Services", href: "./services.html" },
        { name: "The House", href: "./the-house.html" },
        { name: "Journal", href: "./journal.html" },
        { name: "About Us", href: "./about.html" },
        { name: "Contact", href: "./contact.html" }
    ],
    footerLinks: {
        services: [
            { name: "Bespoke Tailoring", href: "./services.html" },
            { name: "Private Styling", href: "./services.html" },
            { name: "Wedding Services", href: "./services.html" },
            { name: "Corporate Attire", href: "./services.html" }
        ],
        support: [
            { name: "Size Guide", href: "#" }, // Keeping specific useful ones or updating
            { name: "Contact Us", href: "./contact.html" }
        ]
    }
};

function renderHeader() {
    const headerContainer = document.getElementById('header-container');
    if (!headerContainer) return;

    const navLinksHTML = siteConfig.navLinks.map(link => 
        `<a class="text-xs font-bold tracking-widest uppercase hover:text-primary transition-colors py-6" href="${link.href}">${link.name}</a>`
    ).join('');

    const html = `
    <header class="glass-header fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 lg:px-12 transition-all">
        <div class="flex items-center gap-4 text-white z-50">
            <a class="flex items-center gap-3 group" href="./index.html">
                <div class="size-8 text-primary">
                    <span class="material-symbols-outlined !text-[32px]">diamond</span>
                </div>
                <h2 class="text-2xl font-display font-bold tracking-[0.2em] uppercase text-white">${siteConfig.brandName}</h2>
            </a>
        </div>
        <nav class="hidden lg:flex flex-1 justify-center gap-10 text-white/90">
            ${navLinksHTML}
        </nav>
        <div class="flex items-center gap-4 z-50 text-white">
            <button id="mobile-menu-btn" class="lg:hidden flex size-10 items-center justify-center rounded-full hover:bg-white/10 text-white">
                <span class="material-symbols-outlined text-[20px]">menu</span>
            </button>
        </div>
    </header>

    <!-- Mobile Menu Overlay -->
    <div id="mobile-menu-overlay" class="fixed inset-0 z-40 bg-black/95 bg-opacity-95 hidden flex-col items-center justify-center">
        <button id="close-mobile-menu" class="absolute top-6 right-6 text-white hover:text-primary transition-colors">
            <span class="material-symbols-outlined text-4xl">close</span>
        </button>
        <nav class="flex flex-col items-center gap-8 text-center">
            ${siteConfig.navLinks.map(link => 
                `<a class="text-xl font-display font-medium text-white hover:text-primary transition-colors" href="${link.href}">${link.name}</a>`
            ).join('')}
        </nav>
    </div>
    `;

    headerContainer.innerHTML = html;
    initMobileMenu();
}

function renderFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (!footerContainer) return;

    // Filtered out dead links requested by user ("remove some unessary footer link")
    // Keeping minimal set
    const html = `
    <footer class="bg-black border-t border-white/10 pt-20 pb-10 text-white">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                
                <!-- Brand -->
                <div class="flex flex-col gap-6">
                    <div class="flex items-center gap-3">
                        <div class="size-6 text-primary">
                            <span class="material-symbols-outlined">diamond</span>
                        </div>
                        <h2 class="text-xl font-display font-bold tracking-widest uppercase text-white">${siteConfig.brandName}</h2>
                    </div>
                    <p class="text-text-muted text-sm leading-relaxed font-light">
                        Redefining masculine elegance since 2025. We blend heritage tailoring with modern aesthetics for the visionary man.
                    </p>
                    <div class="flex gap-4">
                        <a href="#" class="size-10 rounded-full border border-gray-700 flex items-center justify-center text-text-muted hover:bg-primary hover:text-black hover:border-primary transition-all">
                            <span class="font-bold text-xs">IG</span>
                        </a>
                        <a href="#" class="size-10 rounded-full border border-gray-700 flex items-center justify-center text-text-muted hover:bg-primary hover:text-black hover:border-primary transition-all">
                            <span class="font-bold text-xs">TW</span>
                        </a>
                        <a href="#" class="size-10 rounded-full border border-gray-700 flex items-center justify-center text-text-muted hover:bg-primary hover:text-black hover:border-primary transition-all">
                            <span class="font-bold text-xs">LI</span>
                        </a>
                    </div>
                </div>

                <!-- Services -->
                <div>
                    <h4 class="font-bold text-white mb-6 uppercase tracking-wider text-xs">Services</h4>
                    <ul class="flex flex-col gap-4 text-sm text-text-muted font-light">
                        ${siteConfig.footerLinks.services.map(link => 
                            `<li><a class="hover:text-primary transition-colors" href="${link.href}">${link.name}</a></li>`
                        ).join('')}
                    </ul>
                </div>

                <!-- Support -->
                <div>
                    <h4 class="font-bold text-white mb-6 uppercase tracking-wider text-xs">Support</h4>
                    <ul class="flex flex-col gap-4 text-sm text-text-muted font-light">
                        ${siteConfig.footerLinks.support.map(link => 
                            `<li><a class="hover:text-primary transition-colors" href="${link.href}">${link.name}</a></li>`
                        ).join('')}
                    </ul>
                </div>

                <!-- Newsletter -->
                <div>
                    <h4 class="font-bold text-white mb-6 uppercase tracking-wider text-xs">The Inner Circle</h4>
                    <p class="text-text-muted text-sm mb-4 font-light">Subscribe for exclusive drops and private event invitations.</p>
                    <div class="flex items-center bg-white/5 rounded-full p-1 pl-4 border border-white/10 focus-within:border-primary transition-colors">
                        <input type="email" placeholder="Your email" class="bg-transparent border-none text-sm w-full focus:ring-0 placeholder:text-gray-500 text-white">
                        <button class="bg-primary hover:bg-primary-light text-black size-10 rounded-full flex items-center justify-center transition-colors shadow-lg shadow-primary/20">
                            <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
                        </button>
                    </div>
                </div>

            </div>

            <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-muted font-light">
                <p>&copy; 2025 Efex Luxury. All rights reserved.</p>
                <div class="flex gap-6">
                    <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>
    `;

    footerContainer.innerHTML = html;
}

function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');

    if (!menuBtn || !overlay) return;

    function openMenu() {
        overlay.classList.remove('hidden');
        overlay.classList.add('flex');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeMenu() {
        overlay.classList.add('hidden');
        overlay.classList.remove('flex');
        document.body.style.overflow = '';
    }

    menuBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    // Close when clicking links
    const links = overlay.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        renderHeader();
        renderFooter();
    } catch (e) {
        console.error("Layout initialization failed:", e);
    }
});
