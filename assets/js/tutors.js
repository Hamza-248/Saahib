document.addEventListener("DOMContentLoaded", function () {
  const thumbnailNav = document.getElementById("tutor-thumbnail-nav");
  const desktopPreview = document.getElementById("desktop-tutor-preview");
  const overlay = document.getElementById("tutor-overlay");
  const overlayContent = document.getElementById("tutor-overlay-content");
  const closeBtn = document.getElementById("overlay-close");
  const prevBtn = document.getElementById("overlay-prev");
  const nextBtn = document.getElementById("overlay-next");

  let currentTutorIndex = 0;
  let tutors = [];

  const isDesktop = () => window.innerWidth >= 992;

  async function loadTutors() {
    try {
      // Fetch the tutor data from the external JSON file.
      // CORRECTED: Path updated to 'tutor.js'
      const response = await fetch("./assets/data/tutors.JSON");
      if (!response.ok) {
        // If the server response is not OK (e.g., 404 Not Found), throw an error.
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Parse the JSON data from the response.
      const data = await response.json();

      // Assign the fetched data to the global tutors variable.
      tutors = data;

      // Render the tutor thumbnails on the page.
      renderThumbnails();

      // If the view is desktop, render the detailed preview for the first tutor.
      if (isDesktop()) {
        renderDesktopPreview(0);
      }
    } catch (error) {
      // Log any errors that occur during the fetch process to the console.
      console.error("Failed to load tutor data:", error);
    }
  }

  function renderThumbnails() {
    thumbnailNav.innerHTML = "";
    tutors.forEach((tutor, index) => {
      const thumb = document.createElement("img");
      thumb.className = "tutor-thumb";
      thumb.src = tutor.profile_image;
      thumb.alt = tutor.name;
      thumb.setAttribute("data-index", index);
      thumb.onerror = () =>
        (thumb.src = `https://placehold.co/100x100/181818/FFFFFF?text=${tutor.name.charAt(
          0
        )}`);
      thumbnailNav.appendChild(thumb);
    });
  }

  function renderDesktopPreview(index) {
    const tutor = tutors[index];
    currentTutorIndex = index;

    // Highlight active thumbnail
    document.querySelectorAll(".tutor-thumb").forEach((thumb, i) => {
      thumb.classList.toggle("active", i === index);
    });

    desktopPreview.innerHTML = `
                        <div class="preview-header">
                            <img src="${tutor.profile_image}" alt="${
      tutor.name
    }" class="preview-image" onerror="this.src='https://placehold.co/100x100/181818/FFFFFF?text=${tutor.name.charAt(
      0
    )}'">
                            <div>
                                <h3 class="preview-name">${tutor.name}</h3>
                                <span class="preview-badge">${
                                  tutor.badge
                                }</span>
                            </div>
                        </div>
                        <p class="preview-tagline">${tutor.tagline}</p>
                        <p class="preview-details">${
                          tutor.details["Teaching Style & Toolkit"]
                        }</p>
                        <button class="btn-view-full-profile" data-index="${index}">View Full Profile</button>
                        `;
  }

  function renderFullProfile(index) {
    const tutor = tutors[index];
    currentTutorIndex = index;
    overlayContent.innerHTML = `
                        <div class="overlay-left-pane" style="background-image: url('${
                          tutor.profile_image
                        }')">
                            <div class="overlay-hero-content">
                                <h2 class="overlay-name">${tutor.name}</h2>
                                <span class="overlay-badge">${
                                  tutor.badge
                                }</span>
                            </div>
                        </div>
                        <div class="overlay-right-pane">
                            <p class="profile-tagline">${tutor.tagline}</p>
                            
                            <div class="quick-facts">
                                <div class="fact-item"><strong>Response Time</strong><span>${
                                  tutor.contactInfo.responseTime
                                }</span></div>
                                <div class="fact-item"><strong>Languages</strong><span>${
                                  tutor.contactInfo.languages
                                }</span></div>
                                <div class="fact-item"><strong>Sessions</strong><span>${
                                  tutor.contactInfo.sessionTypes
                                }</span></div>
                            </div>

                            <h5 class="profile-section-title">Teaching Style</h5>
                            <p>${tutor.details["Teaching Style & Toolkit"]}</p>

                            <h5 class="profile-section-title">Top Achievements</h5>
                            <div class="achievement-grid">
                                ${tutor.achievements
                                  .map(
                                    (ach) => `
                                    <div class="achievement-item">
                                        <span class="icon">${ach.icon}</span>
                                        <span>${ach.title}</span>
                                    </div>
                                `
                                  )
                                  .join("")}
                            </div>
                            
                            <h5 class="profile-section-title">Courses Offered</h5>
                            <div class="accordion courses-accordion" id="coursesAccordion-${index}">
                                ${tutor.courseOfferings
                                  .map(
                                    (course, i) => `
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
                                `
                                  )
                                  .join("")}
                            </div>

                            <div class="cta-block">
                                <h4>${tutor.ctaSection.title}</h4>
                                <p>${tutor.ctaSection.desc}</p>
                                <a href="${
                                  tutor.actions.bookDemo
                                }" class="btn-book-trial">Book a Free Trial</a>
                            </div>
                        </div>
                        `;
  }

  function openOverlay(index) {
    renderFullProfile(index);
    overlay.classList.add("is-active");
  }

  function closeOverlay() {
    overlay.classList.remove("is-active");
  }

  thumbnailNav.addEventListener("click", function (e) {
    if (e.target.classList.contains("tutor-thumb")) {
      const index = parseInt(e.target.getAttribute("data-index"));
      if (isDesktop()) {
        renderDesktopPreview(index);
      } else {
        openOverlay(index);
      }
    }
  });

  desktopPreview.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-view-full-profile")) {
      const index = parseInt(e.target.getAttribute("data-index"));
      openOverlay(index);
    }
  });

  // ADDED: New event listener for the overlay content
  overlayContent.addEventListener("click", function (e) {
    // If the "Book a Free Trial" button is clicked, close the overlay.
    if (e.target.classList.contains("btn-book-trial")) {
      closeOverlay();
      // The browser will automatically handle the navigation via the href attribute.
    }
  });

  closeBtn.addEventListener("click", closeOverlay);

  prevBtn.addEventListener("click", () => {
    const newIndex = (currentTutorIndex - 1 + tutors.length) % tutors.length;
    handleNavigation(newIndex);
  });

  nextBtn.addEventListener("click", () => {
    const newIndex = (currentTutorIndex + 1) % tutors.length;
    handleNavigation(newIndex);
  });

  function handleNavigation(newIndex) {
    if (overlay.classList.contains("is-active")) {
      renderFullProfile(newIndex);
    }
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("is-active")) {
      closeOverlay();
    } else if (overlay.classList.contains("is-active")) {
      if (e.key === "ArrowLeft") {
        const newIndex =
          (currentTutorIndex - 1 + tutors.length) % tutors.length;
        handleNavigation(newIndex);
      } else if (e.key === "ArrowRight") {
        const newIndex = (currentTutorIndex + 1) % tutors.length;
        handleNavigation(newIndex);
      }
    }
  });

  loadTutors();
});
