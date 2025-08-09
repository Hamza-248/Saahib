/**
 * component-loader.js
 * * This simplified script dynamically loads reusable HTML components (like header, footer)
 * into placeholder elements on any page.
 * It ensures that any <script> tags within the loaded components are executed.
 */

document.addEventListener('DOMContentLoaded', function () {

    /**
     * Fetches HTML content from a specified file, injects it into a target element,
     * and executes any scripts found within the fetched content.
     * @param {string} componentPath - The path to the HTML snippet file (e.g., '/components/header.html').
     * @param {string} targetId - The ID of the placeholder element where the content will be injected.
     */
    const loadComponent = async (componentPath, targetId) => {
        try {
            const response = await fetch(componentPath);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${componentPath}: ${response.statusText}`);
            }
            const html = await response.text();
            const targetElement = document.getElementById(targetId);

            if (!targetElement) {
                console.warn(`Placeholder element with ID '${targetId}' not found.`);
                return;
            }

            // Step 1: Inject the HTML content.
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            // Step 2: Find all script tags in the fetched HTML.
            const scripts = tempDiv.querySelectorAll('script');

            // Step 3: Move all non-script elements to the target placeholder.
            while (tempDiv.firstChild) {
                targetElement.appendChild(tempDiv.firstChild);
            }

            // Step 4: Execute the scripts.
            scripts.forEach(oldScript => {
                const newScript = document.createElement('script');

                Array.from(oldScript.attributes).forEach(attr => {
                    newScript.setAttribute(attr.name, attr.value);
                });

                newScript.textContent = oldScript.textContent;

                document.head.appendChild(newScript);
            });

        } catch (error) {
            console.error(`Error loading component from ${componentPath}:`, error);
        }
    };

    /**
     * Main function to load all components.
     * It runs all load operations in parallel for efficiency.
     */
    const loadAllComponents = () => {
        // FIX: Using root-relative paths (starting with "/") for stability.
        // This tells the browser to always start from the web server's root directory.
        const componentsToLoad = {
            'preloader-placeholder': '/components/preloader.html',
            'header-placeholder': '/components/header.html',
            'footer-placeholder': '/components/footer.html'
        };

        const promises = Object.entries(componentsToLoad).map(([id, path]) => {
            return loadComponent(path, id);
        });

        Promise.all(promises).then(() => {
            console.log('All components loaded successfully.');
        });
    };

    // Run the main function to start the process.
    loadAllComponents();

});
