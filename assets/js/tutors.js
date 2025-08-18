document.addEventListener('DOMContentLoaded', function () {
    // --- DOM Element Selection ---
    const thumbnailNav = document.getElementById('tutor-thumbnail-nav');
    const desktopPreview = document.getElementById('desktop-tutor-preview');
    const overlay = document.getElementById('tutor-overlay');
    const overlayContent = document.getElementById('tutor-overlay-content');
    const closeBtn = document.getElementById('overlay-close');
    const prevBtn = document.getElementById('overlay-prev');
    const nextBtn = document.getElementById('overlay-next');

    // --- State Variables ---
    let currentTutorIndex = 0;
    let tutors = [];

    // --- Utility Functions ---
    const isDesktop = () => window.innerWidth >= 992;

    /**
     * Loads and parses the tutor data, then initializes the UI.
     */
    function loadTutors() {
        // This is the raw JSON data for the tutors.
        const tutorDataString = `[
            {
                "name": "Ali Shahbaz",
                "profile_image": "assets/images/tutors/ali_shahbaz.png",
                "subject": "Accounting",
                "badge": "LUMS Dean’s Honour list",
                "tagline": "Transforming numbers into narratives – Accounting, taught like an art.",
                "details": {
                    "Teaching Style & Toolkit": "Ali Shahbaz didn’t just study accounting — he saw beauty in its balance. He blends academic rigour with a student-first approach, using real-world examples and visual aids to make complex topics digestible.",
                    "Student Glimpse": "Ali helped me finally understand double-entry! Highly recommend."
                },
                "courseOfferings": [
                    {"title": "Pre O-levels Accounting", "level": "Beginner"},
                    {"title": "O levels Crash Course Accounting", "level": "Beginner"},
                    {"title": "As Crash Course Accounting", "level": "Intermediate"},
                    {"title": "A2 Crash Course Accounting", "level": "Advanced"}
                ],
                "achievements": [
                    {"icon": "🏆", "title": "O Level Distinction"},
                    {"icon": "📜", "title": "A Level Excellence"},
                    {"icon": "💯", "title": "SAT High Scorer"}
                ],
                "contactInfo": {
                    "responseTime": "Within 1 hour",
                    "languages": "English, Urdu",
                    "sessionTypes": "Online"
                },
                "ctaSection": {
                    "title": "Ready to Excel in Accounting?",
                    "desc": "Join hundreds of successful students with Ali's expert guidance."
                },
                "actions": {"bookDemo": "#registration-section"}
            },
            {
                "name": "Ammar Shehryar",
                "profile_image": "assets/images/tutors/ammar_shehryar.png",
                "subject": "SAT",
                "badge": "SAT 1580 (2023)",
                "tagline": "Ace everything through smart work, not hard work..",
                "details": {
                    "Teaching Style & Toolkit": "Ammar's engaging and smart methodology of teaching always makes learning easier and enjoyable.",
                    "Student Glimpse": "Khadija Javed ISL 1510 SAT, Abdur rehman Khokhar 1540 SAT"
                },
                "courseOfferings": [
                    {"title": "Pre O-levels Business Studies", "level": "Beginner"},
                    {"title": "O levels Crash Course Business Studies", "level": "Beginner"},
                    {"title": "As Crash Course Business Studies", "level": "Intermediate"},
                    {"title": "A2 Crash Course Business Studies", "level": "Advanced"},
                    {"title": "SAT ENG", "level": "All Levels"}
                ],
                "achievements": [
                    {"icon": "🏆", "title": "A Level Distinction"},
                    {"icon": "🥈", "title": "Board Topper"},
                    {"icon": "🌍", "title": "International Debater"}
                ],
                "contactInfo": {
                    "responseTime": "Within 2 hours",
                    "languages": "English",
                    "sessionTypes": "Online"
                },
                "ctaSection": {
                    "title": "Boost Your SAT Score!",
                    "desc": "Unlock your potential with Ammar's proven SAT strategies."
                },
                "actions": {"bookDemo": "#registration-section"}
            },
            {
                "name": "Wali Ahmad",
                "profile_image": "assets/images/tutors/wali_ahmad.jpg",
                "subject": "Economics",
                "badge": "LUMS BSc (2024)",
                "tagline": "Making economics engaging and practical.",
                "details": {
                    "Teaching Style & Toolkit": "Wali brings real-world case studies and interactive discussions to every session.",
                    "Student Glimpse": "Wali’s sessions made economics my favorite subject."
                },
                "courseOfferings": [
                    {"title": "Pre O-levels Economics", "level": "Beginner"},
                    {"title": "O levels Crash Course Economics", "level": "Beginner"},
                    {"title": "As Crash Course Economics", "level": "Intermediate"},
                    {"title": "A2 Crash Course Economics", "level": "Advanced"}
                ],
                "achievements": [
                    {"icon": "🏆", "title": "Olympiad Finalist"},
                    {"icon": "📜", "title": "LUMS BSc (2024)"},
                    {"icon": "💼", "title": "Society Lead"}
                ],
                "contactInfo": {
                    "responseTime": "Within 2 hours",
                    "languages": "English, Urdu",
                    "sessionTypes": "Online, In-Person"
                },
                "ctaSection": {
                    "title": "Master Economics!",
                    "desc": "Learn economics the fun and practical way with Wali."
                },
                "actions": {"bookDemo": "#registration-section"}
            },
            {
                "name": "Semal Hassan",
                "profile_image": "assets/images/tutors/semal_hassan.png",
                "subject": "Biology",
                "badge": "A* A-levels (2023)",
                "tagline": "You grow through what you go through — every challenge is a chance to learn, adapt, and excel.",
                "details": {
                    "Teaching Style & Toolkit": "I incorporate clear diagrams, flowcharts, and mind maps to help students visualize concepts.",
                    "Student Glimpse": "Semal’s demos made Biology click for me!"
                },
                "courseOfferings": [
                    {"title": "Pre O-levels Biology", "level": "Beginner"},
                    {"title": "O levels Crash Course Biology", "level": "Beginner"}
                ],
                "achievements": [
                    {"icon": "🌟", "title": "O Level Distinction"},
                    {"icon": "📖", "title": "Published Author"},
                    {"icon": "🌍", "title": "Leadership Roles"}
                ],
                "contactInfo": {
                    "responseTime": "Within 2 hours",
                    "languages": "English",
                    "sessionTypes": "Online"
                },
                "ctaSection": {
                    "title": "Ace Biology!",
                    "desc": "Make Biology your strength with Semal's fun approach."
                },
                "actions": {"bookDemo": "#registration-section"}
            },
            {
                "name": "Muhammad Awais Hussain",
                "profile_image": "assets/images/tutors/muhammad_awais_hussain.png",
                "subject": "Physics",
                "badge": "A* A-levels (2023)",
                "tagline": "I teach not just to improve grades but to build confidence, curiosity, and critical thinking.",
                "details": {
                    "Teaching Style & Toolkit": "Awais blends deep conceptual teaching with empathy and engagement, turning struggling learners into confident achievers.",
                    "Student Glimpse": "Awais’s energy made physics my favorite class!"
                },
                "courseOfferings": [
                    {"title": "Pre O-levels Physics", "level": "Beginner"},
                    {"title": "O levels Crash Course Physics & Chemistry", "level": "Beginner"},
                    {"title": "As Crash Course Math", "level": "Intermediate"},
                    {"title": "A2 Crash Course Math", "level": "Advanced"}
                ],
                "achievements": [
                    {"icon": "🥇", "title": "Gold Medalist IKMC"},
                    {"icon": "🏅", "title": "Top in Pakistan"},
                    {"icon": "🎓", "title": "Dean’s Merit List"}
                ],
                "contactInfo": {
                    "responseTime": "Within 1 hour",
                    "languages": "English, Urdu",
                    "sessionTypes": "Online"
                },
                "ctaSection": {
                    "title": "Master Physics!",
                    "desc": "Experience physics in action with Awais's hands-on approach."
                },
                "actions": {"bookDemo": "#registration-section"}
            }
        ]`;

        try {
            // CORRECTED: Parse the JSON string directly instead of using fetch.
            tutors = JSON.parse(tutorDataString);

            // Render the UI components now that the data is loaded.
            renderThumbnails();
            if (isDesktop()) {
                renderDesktopPreview(0);
            }
        } catch (error) {
            console.error("Failed to parse tutor data:", error);
        }
    }

    /**
     * Renders the circular tutor thumbnails for navigation.
     */
    function renderThumbnails() {
        if (!thumbnailNav) return;
        thumbnailNav.innerHTML = ''; // Clear existing thumbnails
        tutors.forEach((tutor, index) => {
            const thumb = document.createElement('img');
            thumb.className = 'tutor-thumb';
            thumb.src = tutor.profile_image;
            thumb.alt = tutor.name;
            thumb.setAttribute('data-index', index);
            // Fallback for broken images
            thumb.onerror = () => thumb.src = `https://placehold.co/100x100/181818/FFFFFF?text=${tutor.name.charAt(0)}`;
            thumbnailNav.appendChild(thumb);
        });
    }

    /**
     * Renders the detailed preview card for desktop view.
     * @param {number} index - The index of the tutor in the tutors array.
     */
    function renderDesktopPreview(index) {
        if (!desktopPreview) return;
        const tutor = tutors[index];
        currentTutorIndex = index;

        // Highlight the active thumbnail
        document.querySelectorAll('.tutor-thumb').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });

        desktopPreview.innerHTML = `
            <div class="preview-header">
                <img src="${tutor.profile_image}" alt="${tutor.name}" class="preview-image" onerror="this.src='https://placehold.co/100x100/181818/FFFFFF?text=${tutor.name.charAt(0)}'">
                <div>
                    <h3 class="preview-name">${tutor.name}</h3>
                    <span class="preview-badge">${tutor.badge}</span>
                </div>
            </div>
            <p class="preview-tagline">${tutor.tagline}</p>
            <p class="preview-details">${tutor.details["Teaching Style & Toolkit"]}</p>
            <button class="btn-view-full-profile" data-index="${index}">View Full Profile</button>
        `;
    }

    /**
     * Renders the full profile view inside the overlay/modal.
     * @param {number} index - The index of the tutor in the tutors array.
     */
    function renderFullProfile(index) {
        if (!overlayContent) return;
        const tutor = tutors[index];
        currentTutorIndex = index;
        overlayContent.innerHTML = `
            <div class="overlay-left-pane" style="background-image: url('${tutor.profile_image}')">
                <div class="overlay-hero-content">
                    <h2 class="overlay-name">${tutor.name}</h2>
                    <span class="overlay-badge">${tutor.badge}</span>
                </div>
            </div>
            <div class="overlay-right-pane">
                <p class="profile-tagline">${tutor.tagline}</p>
                
                <div class="quick-facts">
                    <div class="fact-item"><strong>Response Time</strong><span>${tutor.contactInfo.responseTime}</span></div>
                    <div class="fact-item"><strong>Languages</strong><span>${tutor.contactInfo.languages}</span></div>
                    <div class="fact-item"><strong>Sessions</strong><span>${tutor.contactInfo.sessionTypes}</span></div>
                </div>

                <h5 class="profile-section-title">Teaching Style</h5>
                <p>${tutor.details["Teaching Style & Toolkit"]}</p>

                <h5 class="profile-section-title">Top Achievements</h5>
                <div class="achievement-grid">
                    ${tutor.achievements.map(ach => `
                        <div class="achievement-item">
                            <span class="icon">${ach.icon}</span>
                            <span>${ach.title}</span>
                        </div>
                    `).join('')}
                </div>
                
                <h5 class="profile-section-title">Courses Offered</h5>
                <div class="accordion courses-accordion" id="coursesAccordion-${index}">
                    ${tutor.courseOfferings.map((course, i) => `
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${index}-${i}">
                                    ${course.title}
                                </button>
                            </h2>
                            <div id="collapse-${index}-${i}" class="accordion-collapse collapse" data-bs-parent="#coursesAccordion-${index}">
                                <div class="accordion-body">
                                    <strong>Level:</strong> ${course.level}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="cta-block">
                    <h4>${tutor.ctaSection.title}</h4>
                    <p>${tutor.ctaSection.desc}</p>
                    <a href="${tutor.actions.bookDemo}" class="btn-book-trial">Book a Free Trial</a>
                </div>
            </div>
        `;
    }

    /**
     * Opens the full-profile overlay.
     * @param {number} index - The index of the tutor to display.
     */
    function openOverlay(index) {
        if (!overlay) return;
        renderFullProfile(index);
        overlay.classList.add('is-active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    /**
     * Closes the full-profile overlay.
     */
    function closeOverlay() {
        if (!overlay) return;
        overlay.classList.remove('is-active');
        document.body.style.overflow = ''; // Restore background scrolling
    }

    /**
     * Handles navigation (previous/next) within the overlay.
     * @param {number} newIndex - The new tutor index to display.
     */
    function handleNavigation(newIndex) {
        if (overlay && overlay.classList.contains('is-active')) {
            renderFullProfile(newIndex);
        }
    }

    // --- Event Listeners ---

    if (thumbnailNav) {
        thumbnailNav.addEventListener('click', function (e) {
            if (e.target.classList.contains('tutor-thumb')) {
                const index = parseInt(e.target.getAttribute('data-index'));
                if (isDesktop()) {
                    renderDesktopPreview(index);
                } else {
                    openOverlay(index);
                }
            }
        });
    }

    if (desktopPreview) {
        desktopPreview.addEventListener('click', function (e) {
            if (e.target.classList.contains('btn-view-full-profile')) {
                const index = parseInt(e.target.getAttribute('data-index'));
                openOverlay(index);
            }
        });
    }

    if (overlayContent) {
        overlayContent.addEventListener('click', function (e) {
            if (e.target.classList.contains('btn-book-trial')) {
                closeOverlay();
            }
        });
    }

    if (closeBtn) closeBtn.addEventListener('click', closeOverlay);
    if (prevBtn) prevBtn.addEventListener('click', () => {
        const newIndex = (currentTutorIndex - 1 + tutors.length) % tutors.length;
        handleNavigation(newIndex);
    });
    if (nextBtn) nextBtn.addEventListener('click', () => {
        const newIndex = (currentTutorIndex + 1) % tutors.length;
        handleNavigation(newIndex);
    });

    // Keyboard navigation for accessibility
    document.addEventListener('keydown', (e) => {
        if (!overlay || !overlay.classList.contains('is-active')) return;
        
        if (e.key === 'Escape') {
            closeOverlay();
        } else if (e.key === 'ArrowLeft') {
            prevBtn.click(); // Trigger the same action as clicking the button
        } else if (e.key === 'ArrowRight') {
            nextBtn.click(); // Trigger the same action as clicking the button
        }
    });

    // --- Initial Load ---
    loadTutors();
});
