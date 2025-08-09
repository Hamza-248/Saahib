
document.addEventListener('DOMContentLoaded', function () {
    const batchTabs = document.getElementById('batchTabs');
    const batchTabContent = document.getElementById('batchTabContent');

    const batchesByStandard = {
        'O-Level': [
            { name: 'Physics Crash Course', instructor: 'Mr. Ahmed', timings: 'Mon, Wed, Fri - 4 PM', startDate: new Date('2025-08-15T09:00:00'), endDate: new Date('2025-09-25T17:00:00') },
            { name: 'Chemistry Full Course', instructor: 'Ms. Fatima', timings: 'Tue, Thu - 5 PM', startDate: new Date('2025-09-01T09:00:00'), endDate: new Date('2025-11-30T17:00:00') },
            { name: 'Mathematics Revision', instructor: 'Mr. Khan', timings: 'Sat, Sun - 11 AM', startDate: new Date('2025-10-01T09:00:00'), endDate: new Date('2025-10-30T17:00:00') },
            { name: 'Biology Intensive', instructor: 'Dr. Ayesha', timings: 'Mon, Wed - 3 PM', startDate: new Date('2025-11-05T09:00:00'), endDate: new Date('2025-12-15T17:00:00') },
            { name: 'Computer Science', instructor: 'Mr. Bilal', timings: 'Tue, Thu - 4 PM', startDate: new Date('2025-11-10T09:00:00'), endDate: new Date('2026-01-10T17:00:00') },
        ],
        'A-Level': [
            { name: 'Mathematics (P1)', instructor: 'Dr. Ali', timings: 'Mon, Wed - 6 PM', startDate: new Date('2025-08-10T09:00:00'), endDate: new Date('2025-10-20T17:00:00') },
            { name: 'Business Studies', instructor: 'Ms. Sarah', timings: 'Tue, Thu - 7 PM', startDate: new Date('2025-09-10T09:00:00'), endDate: new Date('2025-12-05T17:00:00') },
        ],
        'SAT': [
            { name: 'SAT Complete Prep', instructor: 'Mr. John', timings: 'Sat, Sun - 2 PM', startDate: new Date('2025-07-20T09:00:00'), endDate: new Date('2025-08-25T17:00:00') },
            { name: 'SAT English Focus', instructor: 'Ms. Emily', timings: 'Mon, Wed - 5 PM', startDate: new Date('2025-09-05T09:00:00'), endDate: new Date('2025-10-15T17:00:00') },
            { name: 'SAT Math Booster', instructor: 'Mr. David', timings: 'Tue, Thu - 6 PM', startDate: new Date('2025-10-20T09:00:00'), endDate: new Date('2025-11-20T17:00:00') },
        ]
    };

    let isFirstTab = true;
    for (const standard in batchesByStandard) {
        const standardId = standard.toLowerCase().replace(/ /g, '-');

        const navItem = document.createElement('li');
        navItem.className = 'nav-item';
        navItem.innerHTML = `<button class="nav-link ${isFirstTab ? 'active' : ''}" data-bs-toggle="tab" data-bs-target="#${standardId}-pane">${standard}</button>`;
        batchTabs.appendChild(navItem);

        const tabPane = document.createElement('div');
        tabPane.className = `tab-pane fade ${isFirstTab ? 'show active' : ''}`;
        tabPane.id = `${standardId}-pane`;

        batchesByStandard[standard].sort((a, b) => a.startDate - b.startDate);

        batchesByStandard[standard].forEach(batch => {
            const month = batch.startDate.toLocaleString('default', { month: 'short' });
            const day = batch.startDate.getDate();

            const entry = document.createElement('div');
            entry.className = 'batch-entry';
            entry.innerHTML = `
                        <div class="date-block">
                            <span class="month">${month}</span>
                            <span class="day">${day}</span>
                        </div>
                        <div class="details-block">
                            <h3>${batch.name}</h3>
                            <p>Instructor: ${batch.instructor} | Timings: ${batch.timings}</p>
                            <div class="status-and-progress">
                                <div class="batch-status">
                                    <span class="status-dot"></span>
                                    <span class="status-text"></span>
                                </div>
                                <div class="progress-bar-container">
                                    <div class="progress-bar-fill"></div>
                                </div>
                            </div>
                        </div>
                        <div class="action-block">
                            <button class="btn-register">Register Now</button>
                        </div>
                    `;
            tabPane.appendChild(entry);
            batch.element = entry;
        });

        batchTabContent.appendChild(tabPane);

        // --- Add "View More" and "View Less" button logic ---
        const viewToggleContainer = document.createElement('div');
        viewToggleContainer.className = 'view-toggle-container';

        const viewMoreBtn = document.createElement('button');
        viewMoreBtn.className = 'btn-view-toggle view-more';
        viewMoreBtn.textContent = 'View More';

        const viewLessBtn = document.createElement('button');
        viewLessBtn.className = 'btn-view-toggle view-less';
        viewLessBtn.textContent = 'View Less';
        viewLessBtn.style.display = 'none'; // Initially hidden

        viewMoreBtn.addEventListener('click', function () {
            tabPane.classList.add('show-all');
            viewMoreBtn.style.display = 'none';
            viewLessBtn.style.display = 'inline-block';
        });

        viewLessBtn.addEventListener('click', function () {
            tabPane.classList.remove('show-all');
            viewLessBtn.style.display = 'none';
            viewMoreBtn.style.display = 'inline-block';
        });

        viewToggleContainer.appendChild(viewMoreBtn);
        viewToggleContainer.appendChild(viewLessBtn);
        tabPane.appendChild(viewToggleContainer);
        // --- End of button logic ---

        isFirstTab = false;
    }

    // --- Function to dynamically show/hide buttons based on screen size ---
    function checkButtonVisibility() {
        const screenWidth = window.innerWidth;
        let limit;

        if (screenWidth < 768) {
            limit = 2;
        } else if (screenWidth < 1200) {
            limit = 3;
        } else {
            limit = 4;
        }

        document.querySelectorAll('.tab-pane').forEach(tabPane => {
            const buttonContainer = tabPane.querySelector('.view-toggle-container');
            if (buttonContainer) {
                const batchCount = tabPane.querySelectorAll('.batch-entry').length;
                if (batchCount > limit) {
                    buttonContainer.style.display = 'block';
                } else {
                    buttonContainer.style.display = 'none';
                }
            }
        });
    }

    // Initial check and add resize listener
    checkButtonVisibility();
    window.addEventListener('resize', checkButtonVisibility);
    // --- End of new function ---


    function animateBatches() {
        const currentTime = new Date();

        for (const standard in batchesByStandard) {
            batchesByStandard[standard].forEach(batch => {
                if (!batch.element) return;

                const batchIsLive = currentTime >= batch.startDate && currentTime <= batch.endDate;
                const batchIsUpcoming = currentTime < batch.startDate;
                const batchIsFinished = currentTime > batch.endDate;

                const statusTextEl = batch.element.querySelector('.status-text');
                const statusDotEl = batch.element.querySelector('.status-dot');
                const progressBar = batch.element.querySelector('.progress-bar-fill');
                const registerBtn = batch.element.querySelector('.btn-register');

                batch.element.classList.remove('is-live', 'is-finished');
                statusDotEl.className = 'status-dot';

                if (batchIsLive) {
                    const batchDuration = batch.endDate - batch.startDate;
                    const progress = (currentTime - batch.startDate) / batchDuration;
                    progressBar.style.width = `${progress * 100}%`;
                    statusTextEl.textContent = 'In Progress';
                    statusDotEl.classList.add('live');
                    registerBtn.disabled = true;
                    registerBtn.textContent = 'In Progress';
                } else if (batchIsUpcoming) {
                    progressBar.style.width = '0%';
                    const daysLeft = Math.ceil((batch.startDate - currentTime) / (1000 * 60 * 60 * 24));
                    statusTextEl.textContent = `Starts in ${daysLeft} day(s)`;
                    statusDotEl.classList.add('upcoming');
                    registerBtn.disabled = false;
                    registerBtn.textContent = 'Register Now';
                } else if (batchIsFinished) {
                    batch.element.classList.add('is-finished');
                    progressBar.style.width = '100%';
                    statusTextEl.textContent = 'Completed';
                    statusDotEl.classList.add('finished');
                    registerBtn.disabled = true;
                    registerBtn.textContent = 'Batch Ended';
                }
            });
        }
        requestAnimationFrame(animateBatches);
    }

    animateBatches();
});
