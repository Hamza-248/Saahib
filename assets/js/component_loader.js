// This function runs once the main HTML document has been fully loaded and parsed.
document.addEventListener("DOMContentLoaded", function () {

    // --- 1. Header & Footer Injection ---

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
                    <li><a href="courses.html">Courses</a></li>
                    <li><a href="instructors.html">Instructors</a></li>
                    <li><a href="sat.html">SAT</a></li>
                    <li><a href="blogs.html">Blogs</a></li>
                </ul>
                <button class="header-btn" onclick="window.location.href='book-trial.html';">Contact Us</button>
                <a class='menu-trigger'>
                    <img src="https://img.icons8.com/?size=100&id=3096&format=png&color=ffffff" alt="Menu Trigger Icon">
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
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Courses</a></li>
                        <li><a href="#">Instructors</a></li>
                        <li><a href="#">SAT</a></li>
                        <li><a href="#">Blogs</a></li>
                    </ul>
                </div>
                <div class="col-lg-2 col-md-4 col-6">
                    <h5 class="footer-heading">Support</h5>
                    <ul class="footer-links">
                        <li><a href="#faq-section">FAQs</a></li>
                        <li><a href="https://wa.me/923266855525" target="_blank" rel="noopener">Contact Us</a></li>
                        <li><a href="#registration-section">Book a Trial</a></li>
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

    const headerContainer = document.querySelector('header.header-area');
    if (headerContainer) headerContainer.innerHTML = headerHTML;

    const footerContainer = document.querySelector('footer.rich-footer');
    if (footerContainer) footerContainer.innerHTML = footerHTML;


    // --- 2. Header Interactivity ---

    // CORRECTED: Re-added scroll listener for background color change
    window.addEventListener('scroll', () => {
        if (headerContainer && window.scrollY > 50) {
            headerContainer.classList.add('scrolled');
        } else if (headerContainer) {
            headerContainer.classList.remove('scrolled');
        }
    });

    const menuTrigger = document.querySelector('.header-area .menu-trigger');
    const nav = document.querySelector('.header-area .nav');
    if (menuTrigger && nav) {
        menuTrigger.addEventListener('click', () => {
            nav.classList.toggle('show');
        });
    }

    const hasSubItems = document.querySelectorAll('.header-area .has-sub');
    hasSubItems.forEach(item => {
        item.addEventListener('click', function (event) {
            if (event.target.closest('.region-option')) return;
            event.preventDefault();
            const subMenu = this.querySelector('.sub-menu');
            if (subMenu) {
                document.querySelectorAll('.header-area .has-sub .sub-menu.show').forEach(menu => {
                    if (menu !== subMenu) menu.classList.remove('show');
                });
                subMenu.classList.toggle('show');
            }
        });
    });

    // --- 3. Region Selection Logic ---

    const regionOptions = document.querySelectorAll('.header-area .region-option');
    const currentRegionDisplay = document.getElementById('current-region-display');
    const supportedRegions = ['sa', 'bh', 'qa', 'ae', 'om', 'kw', 'gb'];

    function updateRegionUI(code) {
        const selectedOption = document.querySelector(`.region-option[data-code="${code}"]`);
        if (!selectedOption || !currentRegionDisplay) return;

        const name = selectedOption.dataset.name;
        const flagSrc = selectedOption.querySelector('.flag-icon').src;

        currentRegionDisplay.innerHTML = `
            <img src="${flagSrc}" alt="${name} Flag" class="flag-icon">
            <span>${name}</span>
        `;

        regionOptions.forEach(opt => opt.classList.remove('active-region'));
        selectedOption.classList.add('active-region');
    }

    async function initializeRegion() {
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

                if (supportedRegions.includes(ipCountryCode)) {
                    updateRegionUI(ipCountryCode);
                    localStorage.setItem('userRegion', ipCountryCode);
                } else {
                    updateRegionUI('sa');
                }
            } catch (error) {
                console.warn("IP Geolocation failed, defaulting to 'sa'.", error);
                updateRegionUI('sa');
            }
        }
    }

    regionOptions.forEach(option => {
        option.addEventListener('click', function (event) {
            event.stopPropagation();
            const newCode = this.dataset.code;
            const currentCode = localStorage.getItem('userRegion') || 'sa';

            if (newCode !== currentCode) {
                localStorage.setItem('userRegion', newCode);
                const url = new URL(window.location.href);
                url.searchParams.set('region', newCode);
                window.location.href = url.href;
            }
        });
    });

    initializeRegion();
});
