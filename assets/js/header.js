
document.addEventListener('DOMContentLoaded', function () {
    // --- 1. Element Selectors ---
    const header = document.querySelector('.header-area');
    const menuTrigger = document.querySelector('.menu-trigger');
    const mainNav = document.querySelector('.main-nav .nav');
    const hasSubLinks = document.querySelectorAll('.main-nav .nav li.has-sub > a');
    const regionOptions = document.querySelectorAll('.region-option');
    const currentRegionDisplay = document.getElementById('current-region-display');

    // --- 2. Helper Functions ---

    /**
     * Gets the active region code.
     * Priority is: URL Parameter > Default ('sa').
     */
    const getActiveRegionCode = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const regionFromUrl = urlParams.get('region');
        // Return the region from the URL, or default to 'sa' (Saudi Arabia).
        return regionFromUrl || 'sa';
    };

    /**
     * Updates the header and dropdown list to show the active region.
     */
    const updateRegionUI = (activeCode) => {
        const activeOption = document.querySelector(`.region-option[data-code="${activeCode}"]`);
        if (!activeOption) {
            console.error(`Region with code "${activeCode}" not found. Defaulting to 'sa'.`);
            updateRegionUI('sa'); // Fallback to default if code is invalid
            return;
        }

        const countryName = activeOption.getAttribute('data-name');

        // Update the main region display in the header
        currentRegionDisplay.innerHTML = `
        <img src="https://flagcdn.com/w20/${activeCode}.png" alt="${countryName} Flag" class="flag-icon">
        <span>${countryName}</span>
      `;

        // Remove 'active-region' class from the previously active item
        const currentActive = document.querySelector('.region-option.active-region');
        if (currentActive) {
            currentActive.classList.remove('active-region');
        }

        // Add 'active-region' class to the new active item
        activeOption.classList.add('active-region');
    };

    // --- 3. Initialization ---

    // Determine the active region when the page loads.
    const activeRegionCode = getActiveRegionCode();

    // Update the UI to reflect the active region.
    updateRegionUI(activeRegionCode);

    // --- 4. Event Listeners ---

    // Header scroll behavior
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Mobile menu toggle
    menuTrigger.addEventListener('click', function () {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Mobile sub-menu toggle
    hasSubLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            if (window.innerWidth <= 1024) {
                e.preventDefault();
                this.parentElement.classList.toggle('open');
            }
        });
    });

    // **Region Selector Click Handler (with Page Reload)**
    regionOptions.forEach(option => {
        option.addEventListener('click', function (e) {
            e.preventDefault();
            const clickedCode = this.getAttribute('data-code');

            // Only reload if a *different* region is chosen.
            if (clickedCode !== activeRegionCode) {
                // Construct the new URL and navigate to it, causing a reload.
                window.location.href = window.location.pathname + '?region=' + clickedCode;
            }
        });
    });
});
