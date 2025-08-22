// This function runs once the main HTML document has been fully loaded and parsed.
document.addEventListener("DOMContentLoaded", function () {

    // --- SETUP AND INJECTION ---
    injectPreloader();
    injectContent(); // This function will now handle injecting HTML and then initializing scripts.

    // --- INITIALIZE OTHER LOGIC ---
    initializeRegionLogic();
    initializeGradient();
});

/**
 * Creates and injects the preloader into the DOM.
 */
function injectPreloader() {
    const preloaderHTML = `
        <div id="preloader" class="preloader">
            <img src="data:image/png;base64,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"
            alt="Loading..." class="preloader-favicon">
        </div>`;
    document.body.insertAdjacentHTML('afterbegin', preloaderHTML);
}

/**
 * Injects header and footer HTML and then initializes the necessary scripts for them.
 */
function injectContent() {
    const headerContainer = document.querySelector('header.header-area');
    const footerContainer = document.querySelector('footer.rich-footer');

    const headerHTML = `
        <div class="container">
            <nav class="main-nav">
                <a href="index.html" class="logo">
                    <img src="assets/images/logo.png" alt="Saahib"
                        onerror="this.onerror=null;this.src='https:/placehold.co/140x40/181818/F76821?text=Saahib';">
                </a>

                <ul class="nav">
                    <li><a href="index.html">Home</a></li>

                    <li class="has-sub">
                        <a href="javascript:void(0);" id="regions-menu-link">
                            <span id="current-region-display">
                                <img src="https://flagcdn.com/w20/sa.png" alt="Saudi Arabia Flag" class="flag-icon">
                                    <span>Regions</span>
                            </span>
                        </a>
                        <ul class="sub-menu">
                            <li><a href="javascript:void(0);" class="region-option" data-code="sa" data-name="Saudi Arabia"><img src="https://flagcdn.com/w20/sa.png" alt="Saudi Arabia Flag" class="flag-icon"> Saudi Arabia</a></li>
                            <li><a href="javascript:void(0);" class="region-option" data-code="bh" data-name="Bahrain"><img src="https://flagcdn.com/w20/bh.png" alt="Bahrain Flag" class="flag-icon"> Bahrain</a></li>
                            <li><a href="javascript:void(0);" class="region-option" data-code="qa" data-name="Qatar"><img src="https://flagcdn.com/w20/qa.png" alt="Qatar Flag" class="flag-icon"> Qatar</a></li>
                            <li><a href="javascript:void(0);" class="region-option" data-code="ae" data-name="UAE"><img src="https://flagcdn.com/w20/ae.png" alt="UAE Flag" class="flag-icon"> UAE</a></li>
                            <li><a href="javascript:void(0);" class="region-option" data-code="om" data-name="Oman"><img src="https://flagcdn.com/w20/om.png" alt="Oman Flag" class="flag-icon"> Oman</a></li>
                            <li><a href="javascript:void(0);" class="region-option" data-code="kw" data-name="Kuwait"><img src="https://flagcdn.com/w20/kw.png" alt="Kuwait Flag" class="flag-icon"> Kuwait</a></li>
                            <li><a href="javascript:void(0);" class="region-option" data-code="gb" data-name="UK"><img src="https://flagcdn.com/w20/gb.png" alt="UK Flag" class="flag-icon"> UK</a></li>
                        </ul>
                    </li>

                    <li><a href="index.html#instructors">Instructors</a></li>
                    <li><a href="index.html#Pricing">Pricings</a></li>
                    <li><a href="index.html#Batches">Batches</a></li>
                    <li><a href="blogs.html">Blogs</a></li>
                </ul>

                <button class="header-btn" onclick="window.open('https://wa.me/923266855525', '_blank', 'noopener')">Contact Us</button>

                <!-- Hamburger trigger (span is required for CSS animation) -->
                <a class="menu-trigger" id="mobile-menu-trigger" aria-label="Open menu" aria-expanded="false" aria-controls="primary-nav">
                    <span></span>
                </a>
            </nav>
        </div>
        `;

    const footerHTML = `
        <div class="container">
            <div class="row gy-5 gx-lg-5">
                <div class="col-lg-4 col-md-12 text-center text-lg-start">
                    <a href="#" class="footer-logo d-inline-block">
                        <img src="assets/images/logo.png" alt="Saahib"
                             onerror="this.onerror=null;this.src='https:/placehold.co/140x40/181818/F76821?text=Saahib';">
                    </a>
                    <p class="footer-tagline">Your launchpad for academic excellence and lifelong learning.</p>
                    <div class="footer-socials justify-content-center justify-content-lg-start">
                        <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
                        <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a>
                        <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                        <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
                    </div>
                </div>
                <div class="col-lg-2 col-md-4 col-6">
                    <h5 class="footer-heading">Quick Links</h5>
                    <ul class="footer-links">
                        <li><a href="index.html#">Home</a></li>
                        <li><a href="index.html#Instructors">Instructors</a></li>
                        <li><a href="index.html#Pricings">Pricings</a></li>
                        <li><a href="index.html#Batches">Batches</a></li>
                        <li><a href="/blogs.html">Blogs</a></li>
                    </ul>
                </div>
                <div class="col-lg-2 col-md-4 col-6">
                    <h5 class="footer-heading">Support</h5>
                    <ul class="footer-links">
                        <li><a href="index.html#faq-section">FAQs</a></li>
                        <li><a href="https://wa.me/923266855525" target="_blank" rel="noopener">Contact Us</a></li>
                        <li><a href="index.html#registration-section">Book a Trial</a></li>
                    </ul>
                </div>
                <div class="col-lg-4 col-md-4">
                    <h5 class="footer-heading">Stay Updated</h5>
                    <p class="footer-tagline" style="font-size: 0.85rem;">Get the latest news, course updates, and special offers directly to your inbox.</p>
                    <form class="newsletter-form">
                        <div class="input-group">
                            <input type="email" class="form-control" placeholder="Enter your email" required>
                        </div>
                        <div class="d-grid mt-2">
                            <button class="btn-subscribe" type="submit">Subscribe</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="sub-footer d-flex flex-column flex-md-row justify-content-between align-items-center">
                <p class="mb-2 mb-md-0 text-center text-md-start">&copy; 2025 Saahib. All Rights Reserved.</p>
                <div class="legal-links text-center text-md-end">
                    <a href="privacy-policy.html">Privacy Policy</a>
                    <a href="terms-of-services.html">Terms of Service</a>
                    <a href="refund-policy.html">Refund Policy</a>
                </div>
            </div>
        </div>
    `;

    if (headerContainer) {
        headerContainer.innerHTML = headerHTML;
    }
    if (footerContainer) {
        footerContainer.innerHTML = footerHTML;
    }

    // CRUCIAL: Initialize scripts that depend on the new HTML *after* it's injected.
    initializeHeaderScripts();
}

/**
 * Finds header elements and attaches all necessary event listeners.
 * This is now called only after the header HTML is guaranteed to be in the DOM.
 */
function initializeHeaderScripts() {
    const headerContainer = document.querySelector('header.header-area');
    const menuTrigger = document.getElementById('mobile-menu-trigger');
    const nav = headerContainer ? headerContainer.querySelector('.nav') : null;

    // Debugging
    console.log("[Header] init", { headerContainer, menuTrigger, nav });

    // Helper: media query check
    const isMobile = () => window.matchMedia('(max-width: 1024px)').matches;

    // --- Mobile Menu Toggle ---
    if (menuTrigger && nav) {
        // Give nav an id for a11y if missing
        if (!nav.id) nav.id = 'primary-nav';

        const toggleMenu = () => {
            const opened = nav.classList.toggle('active'); // CSS uses .active
            menuTrigger.classList.toggle('active', opened);
            menuTrigger.setAttribute('aria-expanded', String(opened));
            // Lock body scroll when menu open
            document.body.style.overflow = opened ? 'hidden' : '';
        };

        menuTrigger.addEventListener('click', (event) => {
            event.preventDefault();
            toggleMenu();
            console.log("[Header] menu toggled");
        });

        // Close on viewport upsize
        window.addEventListener('resize', () => {
            if (!isMobile() && nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuTrigger.classList.remove('active');
                menuTrigger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    } else {
        console.error("[Header] Could not find the menu trigger or nav element. Event listener not attached.");
    }

    // --- Desktop scrolled header effect ---
    if (headerContainer) {
        const onScroll = () => {
            if (window.scrollY > 50) headerContainer.classList.add('scrolled');
            else headerContainer.classList.remove('scrolled');
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // initialize state
    }

    // --- Sub-menu Logic ---
    const hasSubItems = headerContainer ? headerContainer.querySelectorAll('.has-sub') : [];
    hasSubItems.forEach(item => {
        item.addEventListener('click', function (event) {
            // Allow clicking an actual region option to proceed
            if (event.target.closest('.region-option')) return;

            event.preventDefault();

            if (isMobile()) {
                // MOBILE: toggle `.open` on the <li>
                this.classList.toggle('open');

                // Optional: close siblings
                headerContainer.querySelectorAll('.has-sub.open').forEach(other => {
                    if (other !== this) other.classList.remove('open');
                });
            } else {
                // DESKTOP: optional JS-controlled show; CSS already shows on :hover
                const subMenu = this.querySelector('.sub-menu');
                if (subMenu) {
                    // Close other .show menus
                    headerContainer.querySelectorAll('.has-sub .sub-menu.show').forEach(menu => {
                        if (menu !== subMenu) menu.classList.remove('show');
                    });
                    subMenu.classList.toggle('show');
                }
            }
        });
    });

    // Close desktop dropdown if clicking outside
    document.addEventListener('click', (e) => {
        if (!headerContainer) return;
        if (!headerContainer.contains(e.target)) {
            headerContainer.querySelectorAll('.has-sub .sub-menu.show').forEach(menu => {
                menu.classList.remove('show');
            });
        }
    });
}

/**
 * Sets up the region selection functionality.
 */
function initializeRegionLogic() {
    const regionOptions = document.querySelectorAll('.header-area .region-option');
    const currentRegionDisplay = document.getElementById('current-region-display');
    const supportedRegions = ['sa', 'bh', 'qa', 'ae', 'om', 'kw', 'gb'];

    async function initializeRegion() {
        // This function sets the region based on URL, local storage, or IP geolocation
        const urlParams = new URLSearchParams(window.location.search);
        const regionFromUrl = urlParams.get('region');
        const regionFromStorage = localStorage.getItem('userRegion');

        if (regionFromUrl && supportedRegions.includes(regionFromUrl)) {
            updateRegionUI(regionFromUrl);
            localStorage.setItem('userRegion', regionFromUrl);
        } else if (regionFromStorage && supportedRegions.includes(regionFromStorage)) {
            updateRegionUI(regionFromStorage);
        } else {
            try {
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();
                const ipCountryCode = data.country_code.toLowerCase();
                const finalCode = supportedRegions.includes(ipCountryCode) ? ipCountryCode : 'sa';
                updateRegionUI(finalCode);
                localStorage.setItem('userRegion', finalCode);
            } catch (error) {
                console.warn("IP Geolocation failed, defaulting to 'sa'.", error);
                updateRegionUI('sa');
            }
        }
    }

    function updateRegionUI(code) {
        const selectedOption = document.querySelector(`.region-option[data-code="${code}"]`);
        if (!selectedOption || !currentRegionDisplay) return;
        const name = selectedOption.dataset.name;
        const flagSrc = selectedOption.querySelector('.flag-icon').src;
        currentRegionDisplay.innerHTML = `<img src="${flagSrc}" alt="${name} Flag" class="flag-icon"> <span>${name}</span>`;
        regionOptions.forEach(opt => opt.classList.remove('active-region'));
        selectedOption.classList.add('active-region');
    }

    regionOptions.forEach(option => {
        option.addEventListener('click', function (event) {
            event.stopPropagation();
            const newCode = this.dataset.code;
            if (newCode !== (localStorage.getItem('userRegion') || 'sa')) {
                localStorage.setItem('userRegion', newCode);
                const url = new URL(window.location.href);
                url.searchParams.set('region', newCode);
                window.location.href = url.href;
            }
        });
    });

    initializeRegion();
}

/**
 * Initializes the gradient background if the library is present.
 */
function initializeGradient() {
    try {
        if (typeof Gradient === 'function') {
            var gradient = new Gradient();
            gradient.initGradient("#gradient-canvas");
        }
    } catch (error) {
        console.warn("Gradient.js library not found or failed to initialize.", error);
    }
}

// --- PRELOADER FADE OUT ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
        }, 500);
    }
});


