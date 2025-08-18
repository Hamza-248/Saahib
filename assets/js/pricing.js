
document.addEventListener('DOMContentLoaded', async function () {
  // --- ELEMENT SELECTORS ---
  const levelTabsContainer = document.getElementById('level-tabs');
  const resultContainer = document.getElementById('pricing-result-container');
  const modalBackdrop = document.getElementById('subject-modal-backdrop');
  const modalTitle = document.getElementById('subject-modal-title');
  const subjectGrid = document.getElementById('subject-grid');
  const modalDoneBtn = document.getElementById('subject-modal-done');

  // Custom Dropdown Selectors
  const levelDropdown = document.getElementById('custom-level-dropdown');
  const courseDropdown = document.getElementById('custom-course-dropdown');
  const levelToggle = levelDropdown.querySelector('.custom-dropdown-toggle');
  const levelMenu = levelDropdown.querySelector('.custom-dropdown-menu');
  const courseToggle = courseDropdown.querySelector('.custom-dropdown-toggle');
  const courseMenu = courseDropdown.querySelector('.custom-dropdown-menu');


  // --- STATE VARIABLES ---
  let currentLevel = null;
  let pricingData = null;
  const levelOrder = ['Primary_Education', 'Grade_8_9', 'IGCSE_GCSE', 'A_levels', 'SAT'];

  // --- DATA FETCHING ---
  async function loadPricingData() {
    try {
      // NOTE: Make sure this path is correct for your project structure.
      const response = "{
    "courses": {
        "Primary_Education": {
            "4_Subject_bundle": {
                "title": "4 Subject Bundle",
                "description": "A comprehensive package covering core subjects...",
                "is_popular": true,
                "weekly_sessions": "8 Sessions",
                "note": "Insert a consult / Contact Button instead of enroll now",
                "key_features": [
                    "Core Subjects Mastery (Eng, Urdu, Maths, Sci)",
                    "Interactive & Fun Learning Activities",
                    "Build Strong Academic Foundations",
                    "Flexible Schedule via Consultation"
                ],
                "fees": {
                    "SAR": "SAR 599",
                    "QAR": "QAR 599.00",
                    "KWD": "KWD 55.00",
                    "BHD": "BHD 60.00",
                    "OMR": "OMR 60.00",
                    "AED": "AED 599",
                    "GBP": "GBP 119"
                }
            },
            "3_Subject_bundle": {
                "title": "3 Subject Bundle",
                "description": "Focus on key areas of improvement...",
                "is_popular": false,
                "weekly_sessions": "6 Sessions",
                "key_features": [
                    "Essential Subjects Focus (Maths, Eng, Sci)",
                    "Targeted Support for Key Skills",
                    "Build Confidence in Core Areas",
                    "Flexible Schedule via Consultation"
                ],
                "fees": {
                    "SAR": "SAR 499",
                    "QAR": "QAR 499.00",
                    "KWD": "KWD 45.00",
                    "BHD": "BHD 50.00",
                    "OMR": "OMR 50.00",
                    "AED": "AED 499",
                    "GBP": "GBP 99"
                }
            }
        },
        "Grade_8_9": {
            "Comprehensive_Course": {
                "title": "Comprehensive Course",
                "description": "Build a strong foundation with personalized tutoring...",
                "is_popular": true,
                "plan_type": "Per Subject",
                "note": "Insert a consult / Contact Button instead of enroll now",
                "sessions_per_subject": 2,
                "available_subjects": [
                    "Economics",
                    "Business Studies",
                    "Accounting",
                    "Physics",
                    "Chemistry",
                    "Mathematics",
                    "Biology"
                ],
                "per_subject_fee": {
                    "SAR": 499,
                    "QAR": 499,
                    "KWD": 45,
                    "BHD": 50,
                    "OMR": 50,
                    "AED": 499,
                    "GBP": 99
                },
                "key_features": [
                    "Master Your Chosen Subjects",
                    "Interactive Concept-Building Classes",
                    "Track Your Progress with Regular Quizzes",
                    "Flexible Scheduling on Consultation"
                ]
            }
        },
        "IGCSE_GCSE": {
            "Comprehensive_Course": {
                "title": "Comprehensive Course",
                "description": "Ideal for a complete review of the entire syllabus...",
                "is_popular": true,
                "plan_type": "Per Subject",
                "sessions_per_subject": 2,
                "available_subjects": [
                    "Economics",
                    "Business Studies",
                    "Accounting",
                    "Physics",
                    "Chemistry",
                    "Mathematics",
                    "Biology"
                ],
                "per_subject_fee": {
                    "SAR": 699,
                    "QAR": 699,
                    "KWD": 60,
                    "BHD": 70,
                    "OMR": 70,
                    "AED": 699,
                    "GBP": 140
                },
                "key_features": [
                    "Full Syllabus Coverage for Top Grades",
                    "Strategic Past-Paper Workshops",
                    "Live Interactive & Recorded Classes",
                    "Personalized Progress Tracking"
                ]
            },
            "Accelerated_Prep_Course": {
                "title": "Accelerated Prep Course",
                "description": "An intensive, fast-paced program...",
                "is_popular": false,
                "plan_type": "Per Subject",
                "sessions_per_subject": 3,
                "payment_type": "Single Payment",
                "available_subjects": [
                    "Economics",
                    "Business Studies",
                    "Accounting",
                    "Physics",
                    "Chemistry",
                    "Mathematics",
                    "Biology"
                ],
                "per_subject_fee": {
                    "SAR": 1499,
                    "QAR": 1499,
                    "KWD": 130,
                    "BHD": 150,
                    "OMR": 150,
                    "AED": 1499,
                    "GBP": 299
                },
                "key_features": [
                    "Intensive 6-Week Exam Preparation",
                    "Daily High-Yield Past-Paper Drills",
                    "Master Time Management Strategies",
                    "Proven Score-Boosting Techniques"
                ]
            }
        },
        "A_levels": {
            "Comprehensive_Course": {
                "title": "Comprehensive Course",
                "description": "Deep dive into complex A-Level topics...",
                "is_popular": true,
                "plan_type": "Per Subject",
                "sessions_per_subject": 2,
                "available_subjects": [
                    "Economics",
                    "Business Studies",
                    "Accounting",
                    "Physics",
                    "Chemistry",
                    "Mathematics",
                    "Biology"
                ],
                "per_subject_fee": {
                    "SAR": 799,
                    "QAR": 799,
                    "KWD": 70,
                    "BHD": 80,
                    "OMR": 80,
                    "AED": 799,
                    "GBP": 159
                },
                "key_features": [
                    "In-Depth A-Level Concept Mastery",
                    "Advanced Problem-Solving Workshops",
                    "Official A-Level Mock Exams",
                    "Access to All Class Recordings"
                ]
            }
        },
        "SAT": {
            "SAT_Mastery_Course": {
                "title": "SAT Mastery Course",
                "description": "A comprehensive program covering all sections of the SAT...",
                "is_popular": true,
                "weekly_sessions": "4 Sessions",
                "key_features": [
                    "Unlock Top Scores with Proven Strategies",
                    "Official Digital SAT Practice Tests",
                    "Full-Length Proctored Mock Exams",
                    "Expert Guidance from Top Instructors"
                ],
                "fees": {
                    "SAR": "SAR 699.00",
                    "QAR": "QAR 699.00",
                    "KWD": "KWD 60.00",
                    "BHD": "BHD 70.00",
                    "OMR": "OMR 70.00",
                    "AED": "AED 699.00",
                    "GBP": "GBP 139"
                }
            },
            "SAT_Express_Prep": {
                "title": "SAT Express Prep",
                "description": "A high-intensity bootcamp for students on a tight schedule...",
                "is_popular": false,
                "weekly_sessions": "6 Sessions",
                "payment_type": "Single Payment",
                "key_features": [
                    "High-Intensity 4-Week SAT Bootcamp",
                    "Targeted Question & Answer Drills",
                    "Personalized Performance Analysis",
                    "Master Time-Saving Techniques"
                ],
                "fees": {
                    "SAR": "SAR 999.00",
                    "QAR": "QAR 999.00",
                    "KWD": "KWD 90.00",
                    "BHD": "BHD 100.00",
                    "OMR": "OMR 100.00",
                    "AED": "AED 999.00",
                    "GBP": "GBP 199"
                }
            }
        }
    }
}";
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      pricingData = await response.json();
    } catch (error) {
      console.error("Could not load pricing data:", error);
      resultContainer.innerHTML = `<p class="text-center text-danger">Could not load pricing plans. Please try again later.</p>`;
      resultContainer.classList.add('is-visible');
    }
  }

  // --- HELPER FUNCTIONS ---
  const getActiveRegionCode = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const regionFromUrl = urlParams.get('region');
    const regionToCurrency = { sa: 'SAR', qa: 'QAR', kw: 'KWD', bh: 'BHD', om: 'OMR', ae: 'AED', gb: 'GBP' };
    return regionToCurrency[regionFromUrl] || 'SAR';
  };

  function getLevelDisplayName(levelKey) {
    const activeCurrency = getActiveRegionCode();
    let levelText = levelKey.replace(/_/g, ' ');
    if (levelKey === 'IGCSE_GCSE') {
      levelText = (activeCurrency === 'GBP') ? 'GCSE' : 'IGCSE';
    }
    return levelText;
  }

  // --- UI POPULATION & RENDERING ---
  function populateLevels() {
    if (!pricingData) return;

    // Clear previous options
    levelTabsContainer.innerHTML = '';
    levelMenu.innerHTML = '';

    levelOrder.forEach(levelKey => {
      if (pricingData.courses[levelKey]) {
        const displayName = getLevelDisplayName(levelKey);

        // 1. Populate Desktop Tabs
        const tab = document.createElement('button');
        tab.className = 'level-tab';
        tab.dataset.level = levelKey;
        tab.textContent = displayName;
        tab.onclick = () => handleLevelSelection(levelKey);
        levelTabsContainer.appendChild(tab);

        // 2. Populate Mobile Custom Dropdown
        const item = document.createElement('div');
        item.className = 'custom-dropdown-item';
        item.dataset.value = levelKey;
        item.textContent = displayName;
        item.onclick = () => {
          handleLevelSelection(levelKey);
          levelToggle.querySelector('span').textContent = displayName;
          levelToggle.dataset.value = levelKey;
          levelDropdown.classList.remove('open');
        };
        levelMenu.appendChild(item);
      }
    });
  }

  function populateCourses(levelKey) {
    courseMenu.innerHTML = ''; // Clear previous items
    // Reset and disable course dropdown
    courseToggle.classList.add('disabled');
    courseToggle.querySelector('span').textContent = 'Choose a course...';
    courseToggle.dataset.value = '';

    if (levelKey && pricingData.courses[levelKey]) {
      courseToggle.classList.remove('disabled'); // Enable it

      for (const courseKey in pricingData.courses[levelKey]) {
        const course = pricingData.courses[levelKey][courseKey];
        const item = document.createElement('div');
        item.className = 'custom-dropdown-item';
        item.dataset.value = courseKey;
        item.textContent = course.title;
        item.onclick = () => {
          courseToggle.querySelector('span').textContent = course.title;
          courseToggle.dataset.value = courseKey;
          courseDropdown.classList.remove('open');
          renderSingleCard(levelKey, courseKey);
        };
        courseMenu.appendChild(item);
      }
    }
  }

  function handleLevelSelection(levelKey) {
    currentLevel = levelKey;

    // Sync Desktop Tabs
    document.querySelectorAll('.level-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.level === levelKey);
    });

    // Sync Mobile Dropdown
    levelToggle.dataset.value = levelKey;
    levelToggle.querySelector('span').textContent = getLevelDisplayName(levelKey);
    levelMenu.querySelectorAll('.custom-dropdown-item').forEach(item => {
      item.classList.toggle('selected', item.dataset.value === levelKey);
    });

    if (window.innerWidth < 1200) {
      // On mobile, populate courses and wait for user to select one
      populateCourses(levelKey);
      resultContainer.classList.remove('is-visible');
    } else {
      // On desktop, render all cards for the selected level
      renderAllCardsForLevel(levelKey);
    }
  }

  function renderCardHTML(level, courseKey, colClass = '') {
    const plan = pricingData.courses[level][courseKey];
    const activeCurrency = getActiveRegionCode();
    const isCustomizable = plan.plan_type === 'Per Subject';
    let priceValue, currencySymbol, paymentTerm, weeklySessions;

    if (isCustomizable) {
      const basePrice = plan.per_subject_fee[activeCurrency] || 0;
      priceValue = basePrice.toFixed(2);
      currencySymbol = activeCurrency;
      paymentTerm = plan.payment_type ? 'Total' : '/month per subject';
      weeklySessions = `${plan.sessions_per_subject} Sessions / week`;
    } else {
      const price = plan.fees[activeCurrency] || 'N/A';
      const priceParts = price.split(' ');
      currencySymbol = priceParts.length > 1 ? priceParts[0] : '';
      priceValue = priceParts.length > 1 ? priceParts[1] : priceParts[0];
      paymentTerm = plan.payment_type ? 'Total' : '/month';
      weeklySessions = plan.weekly_sessions;
    }
    const wrapperClass = plan.is_popular ? 'pricing-card-wrapper is-featured' : 'pricing-card-wrapper';
    const enrollLink = plan.note ? 'https://wa.me/923266855525' : '#registration-section';
    const linkTarget = plan.note ? 'target="_blank"' : '';

    return `
                    <div class="${colClass}">
                        <div class="${wrapperClass}">
                            <div class="pricing-card" data-level="${level}" data-course="${courseKey}">
                                ${plan.is_popular ? `<span class="popular-badge">Most Popular</span>` : ''}
                                <h3 class="plan-title">${plan.title}</h3>
                                <div class="plan-sessions">
                                    <i class="bi bi-calendar-week-fill"></i>
                                    <span id="sessions-${courseKey}">${weeklySessions}</span>
                                </div>
                                <p class="plan-description">${plan.description}</p>
                                <div class="plan-price" id="price-${courseKey}">
                                    <span class="price-value">${priceValue}</span>
                                    <span class="price-term">${currencySymbol} ${paymentTerm}</span>
                                </div>
                                <ul class="plan-features">
                                    ${plan.key_features.map(feature => `<li><i class="bi bi-check-circle-fill"></i>${feature}</li>`).join('')}
                                </ul>
                                ${isCustomizable ? `<button class="btn btn-customize" onclick="openSubjectModal('${level}', '${courseKey}')">Customize Subjects</button>` : ''}
                                <a href="${enrollLink}" ${linkTarget} class="btn btn-enroll">${plan.note ? 'Consult Us' : 'Enroll Now'}</a>
                            </div>
                        </div>
                    </div>
                `;
  }

  function matchCardHeights() {
    setTimeout(() => {
      const cards = resultContainer.querySelectorAll('.pricing-card');
      if (cards.length < 2) return;
      let maxHeight = 0;
      cards.forEach(card => { card.style.minHeight = 'auto'; });
      cards.forEach(card => {
        if (card.offsetHeight > maxHeight) maxHeight = card.offsetHeight;
      });
      cards.forEach(card => { card.style.minHeight = `${maxHeight}px`; });
    }, 100);
  }

  function renderAllCardsForLevel(levelKey) {
    resultContainer.innerHTML = '';
    const courses = pricingData.courses[levelKey];
    const colClass = Object.keys(courses).length > 1 ? 'col-lg-5 col-xl-6' : 'col-lg-6 col-xl-7';
    for (const courseKey in courses) {
      resultContainer.innerHTML += renderCardHTML(levelKey, courseKey, colClass);
    }
    resultContainer.classList.add('is-visible');
    matchCardHeights();
  }

  function renderSingleCard(level, courseKey) {
    const colClass = 'col-12';
    resultContainer.innerHTML = renderCardHTML(level, courseKey, colClass);
    resultContainer.classList.add('is-visible');
  }

  // --- MODAL & DYNAMIC PRICING ---
  window.openSubjectModal = (level, courseKey) => {
    const plan = pricingData.courses[level][courseKey];
    modalTitle.textContent = `Select Subjects for ${plan.title}`;
    modalDoneBtn.onclick = () => closeModal(level, courseKey);
    subjectGrid.innerHTML = '';
    plan.available_subjects.forEach((subject, index) => {
      const isChecked = index === 0;
      subjectGrid.innerHTML += `
                        <div class="subject-checkbox">
                            <input type="checkbox" id="subject-${index}" value="${subject}" ${isChecked ? 'checked' : ''} onchange="updateDynamicPricing('${level}', '${courseKey}')">
                            <label for="subject-${index}">${subject}</label>
                        </div>
                    `;
    });
    modalBackdrop.classList.add('is-visible');
    document.body.classList.add('modal-open');
    updateDynamicPricing(level, courseKey);
  }

  window.updateDynamicPricing = (level, courseKey) => {
    const plan = pricingData.courses[level][courseKey];
    const activeCurrency = getActiveRegionCode();
    const checkedSubjects = subjectGrid.querySelectorAll('input:checked');
    const subjectCount = checkedSubjects.length;

    const priceWrapper = document.getElementById(`price-${courseKey}`);
    const sessionsEl = document.getElementById(`sessions-${courseKey}`);
    if (!priceWrapper || !sessionsEl) return;


    if (subjectCount === 0) {
      priceWrapper.innerHTML = `<span class="price-value">0.00</span> <span class="price-term">${activeCurrency} /month</span>`;
      sessionsEl.textContent = '0 Sessions / week';
      return;
    }

    const totalSessions = plan.sessions_per_subject * subjectCount;
    const totalPrice = plan.per_subject_fee[activeCurrency] * subjectCount;
    const paymentTerm = plan.payment_type ? 'Total' : (subjectCount > 1 ? '/month' : '/month per subject');

    priceWrapper.innerHTML = `<span class="price-value">${totalPrice.toFixed(2)}</span> <span class="price-term">${activeCurrency} ${paymentTerm}</span>`;
    sessionsEl.textContent = `${totalSessions} Sessions / week`;
  }

  function closeModal(level, courseKey) {
    modalBackdrop.classList.remove('is-visible');
    document.body.classList.remove('modal-open');
    if (window.innerWidth < 1200) {
      renderSingleCard(level, courseKey);
    }
  }

  // --- EVENT LISTENERS ---
  // Listener to close dropdowns when clicking outside
  document.addEventListener('click', function (e) {
    if (!levelDropdown.contains(e.target)) {
      levelDropdown.classList.remove('open');
    }
    if (!courseDropdown.contains(e.target)) {
      courseDropdown.classList.remove('open');
    }
  });

  // Toggle listeners for each dropdown
  levelToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent document click listener from firing
    courseDropdown.classList.remove('open'); // Close other dropdown
    levelDropdown.classList.toggle('open');
  });

  courseToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    levelDropdown.classList.remove('open');
    courseDropdown.classList.toggle('open');
  });

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  window.addEventListener('regionChanged', function (e) {
    const selectedLevel = currentLevel;
    populateLevels();
    if (selectedLevel) {
      handleLevelSelection(selectedLevel);
    }
  });

  // --- INITIALIZATION ---
  async function init() {
    await loadPricingData();
    populateLevels();
    // Set initial state for desktop view if applicable
    if (window.innerWidth >= 1200) {
      const firstTab = document.querySelector('.level-tab');
      if (firstTab) {
        handleLevelSelection(firstTab.dataset.level);
      }
    }
  }

  init();
});


