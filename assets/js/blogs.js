
document.addEventListener('DOMContentLoaded', function () {
    // --- Element References ---
    const featuredContainer = document.getElementById('featured-article-container');
    const trendingContainer = document.getElementById('trending-section-container');
    const trendingGrid = document.getElementById('trending-grid');
    const blogGrid = document.getElementById('blog-grid');
    const noResultsMessage = document.getElementById('no-results-message');

    const filterWrapper = document.getElementById('filter-controls-container');
    const filterScrollContainer = document.getElementById('filter-scroll');
    const scrollLeftBtn = document.getElementById('filter-scroll-left');
    const scrollRightBtn = document.getElementById('filter-scroll-right');
    const viewMoreContainer = document.getElementById('view-more-container');
    const viewMoreBtn = document.getElementById('btn-view-more');

    // --- Configuration ---
    const metadataUrl = 'https://raw.githubusercontent.com/Hamza-248/Saahib/25d98cff2b5f4463834f5f74b3214b49bdef5007/assets/data/blogs_metadata.JSON';
    let POSTS_PER_PAGE = window.innerWidth >= 992 ? 9 : 6;
    const SLIDER_INTERVAL = 10000; // 5 seconds

    // --- State Management ---
    let allPosts = [];
    let nonFeaturedPosts = [];
    let filteredPosts = [];
    let currentPage = 1;
    let activeCategory = 'All';
    let sliderTimer; // To hold the slider's setInterval

    // --- Main Initialization ---
    async function fetchAndInitialize() {
        try {
            const response = await fetch(metadataUrl);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            allPosts = await response.json();
            nonFeaturedPosts = allPosts.filter(p => !p.isFeatured);
            initializeApp();
        } catch (error) {
            console.error("Failed to fetch blog metadata:", error);
            featuredContainer.innerHTML = `<div class="error-placeholder">Could not load articles.</div>`;
            blogGrid.innerHTML = '';
        }
    }

    function initializeApp() {
        renderFeaturedSlider(); // MODIFIED: Function name changed
        renderTrendingPosts();
        renderFilterControls();
        updateAndRenderGrid();

        viewMoreBtn.addEventListener('click', () => {
            currentPage++;
            renderBlogGrid(true); // true = append
        });

        window.addEventListener('resize', () => {
            const newPostsPerPage = window.innerWidth >= 992 ? 9 : 6;
            if (newPostsPerPage !== POSTS_PER_PAGE) {
                POSTS_PER_PAGE = newPostsPerPage;
                updateAndRenderGrid();
            }
        });

        feather.replace();
    }

    // --- MODIFIED: Rendering Function for Featured Slider ---
    function renderFeaturedSlider() {
        const featuredPosts = allPosts.filter(p => p.isFeatured);
        if (featuredPosts.length === 0) {
            featuredContainer.style.display = 'none';
            return;
        }

        featuredContainer.innerHTML = featuredPosts.map((post, index) => `
            <div class="featured-slide ${index === 0 ? 'active' : ''}" style="background-image: url('${post.heroImage}');">
                <div class="featured-content">
                    <span class="featured-category">${post.category}</span>
                    <h2 class="featured-title">${post.title}</h2>
                    <a href="post.html?slug=${post.slug}" class="btn-read-more">Read More</a>
                </div>
            </div>
        `).join('');

        if (featuredPosts.length > 1) {
            let currentSlide = 0;
            const slides = featuredContainer.querySelectorAll('.featured-slide');

            function showNextSlide() {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
            }

            clearInterval(sliderTimer); // Clear any existing timer
            sliderTimer = setInterval(showNextSlide, SLIDER_INTERVAL);
        }
    }

    function renderTrendingPosts() {
        const trendingPosts = [...nonFeaturedPosts]
            .sort((a, b) => b.view_count - a.view_count)
            .slice(0, 5);

        if (trendingPosts.length === 0) return;

        trendingGrid.innerHTML = trendingPosts.map((post, index) => createPostCard(post, 'trending-card', index)).join('');
        trendingContainer.classList.remove('d-none');
        feather.replace();
    }

    function renderFilterControls() {
        const categories = ['All', ...new Set(nonFeaturedPosts.map(p => p.category))];
        filterScrollContainer.innerHTML = categories.map(cat =>
            `<button class="filter-btn ${cat === 'All' ? 'active' : ''}" data-category="${cat}">${cat}</button>`
        ).join('');
        filterWrapper.classList.remove('d-none');

        filterScrollContainer.addEventListener('click', e => {
            if (e.target.classList.contains('filter-btn')) {
                activeCategory = e.target.dataset.category;
                filterScrollContainer.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');
                updateAndRenderGrid();
            }
        });

        setupFilterScrolling();
    }

    function updateAndRenderGrid() {
        currentPage = 1;
        filteredPosts = (activeCategory === 'All')
            ? nonFeaturedPosts
            : nonFeaturedPosts.filter(p => p.category === activeCategory);
        renderBlogGrid();
    }

    function renderBlogGrid(append = false) {
        const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
        const endIndex = startIndex + POSTS_PER_PAGE;
        const postsToRender = filteredPosts.slice(startIndex, endIndex);

        if (!append) blogGrid.innerHTML = '';

        noResultsMessage.style.display = (filteredPosts.length === 0) ? 'block' : 'none';

        blogGrid.innerHTML += postsToRender.map((post, index) =>
            createPostCard(post, 'col-lg-4 col-md-6', startIndex + index)
        ).join('');

        feather.replace();

        viewMoreContainer.classList.toggle('d-none', endIndex >= filteredPosts.length);
    }

    // --- Helper Functions ---
    function setupFilterScrolling() {
        const scrollAmount = 200;

        function updateArrowVisibility() {
            const isOverflowing = filterScrollContainer.scrollWidth > filterScrollContainer.clientWidth;
            if (!isOverflowing) {
                scrollLeftBtn.classList.add('d-none');
                scrollRightBtn.classList.add('d-none');
                return;
            }

            const atStart = filterScrollContainer.scrollLeft < 10;
            const atEnd = (filterScrollContainer.scrollLeft + filterScrollContainer.clientWidth) >= (filterScrollContainer.scrollWidth - 10);

            scrollLeftBtn.classList.toggle('d-none', atStart);
            scrollRightBtn.classList.toggle('d-none', atEnd);
        }

        scrollLeftBtn.addEventListener('click', () => {
            filterScrollContainer.scrollLeft -= scrollAmount;
        });

        scrollRightBtn.addEventListener('click', () => {
            filterScrollContainer.scrollLeft += scrollAmount;
        });

        filterScrollContainer.addEventListener('scroll', updateArrowVisibility);
        window.addEventListener('resize', updateArrowVisibility);

        setTimeout(updateArrowVisibility, 100);
    }

    // MODIFIED: Card template now includes the styled read time badge on the image
    function createPostCard(post, extraClass = '', index) {
        const animationDelay = (index % POSTS_PER_PAGE) * 100;
        return `
          <div class="${extraClass}" style="animation-delay: ${animationDelay}ms;">
            <a href="post.html?slug=${post.slug}" class="text-decoration-none">
                <div class="blog-card">
                    <div class="card-img-wrapper">
                        <img src="${post.heroImage}" class="card-img-top" alt="${post.title}" onerror="this.onerror=null;this.src='https://placehold.co/600x400/181818/FFFFFF?text=Image';">
                        <div class="read-time-badge">
                            <i data-feather="clock" class="meta-icon"></i>
                            <span>${post.read_time} min read</span>
                        </div>
                    </div>
                    <div class="card-body">
                        <p class="card-category">${post.category}</p>
                        <h5 class="card-title">${post.title}</h5>
                        <div class="card-meta">
                            <div class="d-flex align-items-center">
                                <img src="${post.authorImage}" alt="${post.author}" class="author-img-small">
                                <span class="ms-2">${post.author}</span>
                            </div>
                            <span class="read-more-arrow"><i data-feather="arrow-right"></i></span>
                        </div>
                    </div>
                </div>
            </a>
          </div>
        `;
    }

    // Start the application
    fetchAndInitialize();
});
