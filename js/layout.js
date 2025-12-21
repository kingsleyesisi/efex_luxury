/**
 * Layout.js - Handles the unified header, footer, and mobile menu logic.
 */

const siteConfig = {
    brandName: "EFEX",
    navLinks: [
        { name: "Shop", href: "./shop.html" },
        { name: "Private", href: "./private.html" },
        { name: "Services", href: "./services.html" },
        { name: "Heritage", href: "./heritage.html" },
        { name: "Stories", href: "./stories.html" },
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
            { name: "Heritage", href: "./heritage.html" },
            { name: "Contact Us", href: "./contact.html" }
        ]
    },
    conciergeOptions: [
        { id: 'whatsapp', label: 'Chat on WhatsApp', icon: 'chat', description: 'Immediate response from our styling desk.' },
        { id: 'showroom', label: 'Visit Showroom', icon: 'location_on', description: 'Book an exclusive tour of our Lagos atelier.' },
        { id: 'private', label: 'Private Stylist', icon: 'person_search', description: 'Personal branding & wardrobe management.' }
    ],
    whatsappNumber: "+234XXXXXXXXXX" // PLACEHOLDER: Targeted for Nigeria
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
            <button id="showroom-btn" class="hidden md:flex items-center gap-2 px-5 py-2.5 bg-primary text-black rounded-full hover:bg-white transition-all group scale-95 hover:scale-100">
                <span class="material-symbols-outlined text-sm">event_available</span>
                <span class="text-[10px] font-bold uppercase tracking-widest">Book Showroom</span>
            </button>
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
    renderConcierge();
    initMobileMenu();
    initPrivateClient();
}

function renderConcierge() {
    let conciergeContainer = document.getElementById('concierge-container');
    if (!conciergeContainer) {
        conciergeContainer = document.createElement('div');
        conciergeContainer.id = 'concierge-container';
        document.body.appendChild(conciergeContainer);
    }

    const html = `
    <!-- Floating Concierge Trigger -->
    <div id="concierge-trigger" class="fixed bottom-8 right-8 z-[100] group cursor-pointer">
        <div class="absolute inset-0 bg-primary pulse-animation rounded-full opacity-20 scale-150 group-hover:scale-175 transition-transform duration-500"></div>
        <div class="relative size-16 bg-black border border-primary text-primary rounded-full flex items-center justify-center shadow-2xl group-hover:bg-primary group-hover:text-black transition-all duration-300">
            <span class="material-symbols-outlined text-3xl font-light">support_agent</span>
        </div>
        <div class="absolute bottom-full right-0 mb-4 whitespace-nowrap bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-primary/20 text-xs font-bold uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all">
            Consult a Stylist
        </div>
    </div>

    <!-- Concierge Modal -->
    <div id="concierge-modal" class="fixed inset-0 z-[200] hidden items-center justify-center p-6">
        <div class="absolute inset-0 bg-black/90 backdrop-blur-md"></div>
        <div class="relative bg-background-dark border border-white/10 p-8 lg:p-12 rounded-2xl max-w-xl w-full shadow-[0_0_50px_rgba(212,175,55,0.1)]">
            <button id="close-concierge" class="absolute top-6 right-6 text-white hover:text-primary transition-colors">
                <span class="material-symbols-outlined">close</span>
            </button>
            <div class="text-center mb-10">
                <span class="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Personal Assistance</span>
                <h2 class="font-display text-4xl text-white mb-4">How can we assist you?</h2>
                <p class="text-text-muted text-sm font-light">Select a service to begin your premium experience.</p>
            </div>
            <div class="grid grid-cols-1 gap-4">
                ${siteConfig.conciergeOptions.map(option => `
                    <button class="concierge-item group flex items-start gap-4 p-6 bg-white/5 border border-white/5 hover:border-primary/50 hover:bg-white/10 transition-all text-left rounded-xl" data-id="${option.id}">
                        <div class="size-12 rounded-full border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                            <span class="material-symbols-outlined">${option.icon}</span>
                        </div>
                        <div>
                            <p class="text-white font-bold uppercase tracking-widest text-xs mb-1">${option.label}</p>
                            <p class="text-text-muted text-[10px] leading-relaxed">${option.description}</p>
                        </div>
                    </button>
                `).join('')}
            </div>
        </div>
    </div>
    `;

    conciergeContainer.innerHTML = html;
    initConcierge();
}

function initConcierge() {
    const trigger = document.getElementById('concierge-trigger');
    const modal = document.getElementById('concierge-modal');
    const closeBtn = document.getElementById('close-concierge');
    const items = document.querySelectorAll('.concierge-item');

    if (!trigger || !modal) return;

    trigger.addEventListener('click', () => {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    });

    const closeModal = () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    items.forEach(item => {
        item.addEventListener('click', () => {
            const id = item.getAttribute('data-id');
            if (id === 'whatsapp') {
                const text = encodeURIComponent("Hello EFEX, I'm interested in your luxury tailoring services. I'd like to consult a stylist.");
                window.open(`https://wa.me/${siteConfig.whatsappNumber.replace('+', '')}?text=${text}`, '_blank');
            } else if (id === 'showroom') {
                window.location.href = './contact.html?subject=Showroom Booking';
            } else {
                window.location.href = `./contact.html?subject=${encodeURIComponent(item.querySelector('p').innerText)}`;
            }
        });
    });
}

function initPrivateClient() {
    const btn = document.getElementById('showroom-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
        window.location.href = './contact.html?subject=Request Showroom Invitation';
    });
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
