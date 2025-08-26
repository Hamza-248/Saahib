
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



const batchesByStandard = {
    'O-Level': {
        'Comprehensive': [
            { name: 'Physics Comprehensive Crash Course', instructor: 'Mr. Awais', timings: 'Mon, Wed, Fri - 4 PM', startDate: new Date('2025-07-01T09:00:00'), endDate: new Date('2025-10-01T17:00:00') },
            { name: 'Chemistry Comprehensive Crash Course', instructor: 'Mr. Awais', timings: 'Tue, Thu, Sat - 5 PM', startDate: new Date('2025-07-01T09:00:00'), endDate: new Date('2025-10-01T17:00:00') },
            { name: 'Business Studies Comp. Crash Course', instructor: 'Mr. Ammar', timings: 'Mon, Wed, Fri - 6 PM', startDate: new Date('2025-07-01T09:00:00'), endDate: new Date('2025-10-01T17:00:00') },
            { name: 'Accounting Comprehensive Crash Course', instructor: 'Mr. Ali', timings: 'Tue, Thu, Sun - 6 PM', startDate: new Date('2025-07-01T09:00:00'), endDate: new Date('2025-10-01T17:00:00') },
            { name: 'Mathematics Comp. Crash Course', instructor: 'Mr. Wali', timings: 'Tue, Thu, Sat - 4 PM', startDate: new Date('2025-07-01T09:00:00'), endDate: new Date('2025-10-01T17:00:00') },
            { name: 'Economics Comprehensive Crash Course', instructor: 'Mr. Wali', timings: 'Mon, Wed, Sat - 5 PM', startDate: new Date('2025-07-01T09:00:00'), endDate: new Date('2025-10-01T17:00:00') },
            { name: 'Biology Comprehensive Crash Course', instructor: 'Ms. Semal', timings: 'Tue, Fri, Sun - 3 PM', startDate: new Date('2025-07-01T09:00:00'), endDate: new Date('2025-10-01T17:00:00') },
        ],
        'Intensive': [
            { name: 'Physics Intensive Crash Course', instructor: 'Mr. Awais', timings: 'Mon, Tue, Wed, Thu - 5 PM', startDate: new Date('2025-08-20T09:00:00'), endDate: new Date('2025-10-01T17:00:00') },
            { name: 'Chemistry Intensive Crash Course', instructor: 'Mr. Awais', timings: 'Mon, Wed, Fri, Sat - 6 PM', startDate: new Date('2025-08-20T09:00:00'), endDate: new Date('2025-10-01T17:00:00') },
            { name: 'Business Studies Intensive Crash Course', instructor: 'Mr. Ammar', timings: 'Daily (Mon-Fri) - 4 PM', startDate: new Date('2025-08-20T09:00:00'), endDate: new Date('2025-10-01T17:00:00') },
            { name: 'Accounting Intensive Crash Course', instructor: 'Mr. Ali', timings: 'Mon, Wed, Fri, Sun - 7 PM', startDate: new Date('2025-08-20T09:00:00'), endDate: new Date('2025-10-01T17:00:00') },
            { name: 'Mathematics Intensive Crash Course', instructor: 'Mr. Wali', timings: 'Daily (Mon-Fri) - 3 PM', startDate: new Date('2025-08-20T09:00:00'), endDate: new Date('2025-10-01T17:00:00') },
            { name: 'Economics Intensive Crash Course', instructor: 'Mr. Wali', timings: 'Tue, Thu, Sat, Sun - 7 PM', startDate: new Date('2025-08-20T09:00:00'), endDate: new Date('2025-10-01T17:00:00') },
            { name: 'Biology Intensive Crash Course', instructor: 'Ms. Semal', timings: 'Mon, Wed, Fri, Sun - 4 PM', startDate: new Date('2025-08-20T09:00:00'), endDate: new Date('2025-10-01T17:00:00') },
        ]
    },
    'A-Level': {
        'AS': [
            { name: 'Physics (AS) Comp. Crash Course', instructor: 'Mr. Awais', timings: 'Mon, Fri - 7 PM', startDate: new Date('2025-07-01T09:00:00'), endDate: new Date('2025-10-01T17:00:00') },
            { name: 'Chemistry (AS) Comp. Crash Course', instructor: 'Mr. Awais', timings: 'Tue, Thu - 8 PM', startDate: new Date('2025-07-01T09:00:00'), endDate: new Date('2025-10-01T17:00:00') },
            { name: 'Biology (AS) Comp. Crash Course', instructor: 'Ms. Semal', timings: 'Wed, Sat - 6 PM', startDate: new Date('2025-07-01T09:00:00'), endDate: new Date('2025-10-01T17:00:00') },
            { name: 'Mathematics (AS) Comp. Crash Course', instructor: 'Mr. Wali', timings: 'Mon, Wed - 6 PM', startDate: new Date('2025-07-01T09:00:00'), endDate: new Date('2025-10-01T17:00:00') },
            { name: 'Business (AS) Comp. Crash Course', instructor: 'Mr. Ammar', timings: 'Tue, Thu - 7 PM', startDate: new Date('2025-07-01T09:00:00'), endDate: new Date('2025-10-01T17:00:00') },
            { name: 'Economics (AS) Comp. Crash Course', instructor: 'Mr. Wali', timings: 'Wed - 8 PM, Sat - 1 PM', startDate: new Date('2025-07-01T09:00:00'), endDate: new Date('2025-10-01T17:00:00') },
            { name: 'Accounting (AS) Comp. Crash Course', instructor: 'Mr. Ali', timings: 'Fri, Sun - 5 PM', startDate: new Date('2025-07-01T09:00:00'), endDate: new Date('2025-10-01T17:00:00') },
        ],
        'A2': [
            { name: 'Physics (A2) Comp. Crash Course', instructor: 'Mr. Awais', timings: 'Mon, Fri - 8 PM', startDate: new Date('2025-07-01T09:00:00'), endDate: new Date('2025-10-01T17:00:00') },
            { name: 'Chemistry (A2) Comp. Crash Course', instructor: 'Mr. Awais', timings: 'Tue, Thu - 9 PM', startDate: new Date('2025-07-01T09:00:00'), endDate: new Date('2025-10-01T17:00:00') },
            { name: 'Biology (A2) Comp. Crash Course', instructor: 'Ms. Semal', timings: 'Wed, Sat - 7 PM', startDate: new Date('2025-07-01T09:00:00'), endDate: new Date('2025-10-01T17:00:00') },
            { name: 'Mathematics (A2) Comp. Crash Course', instructor: 'Mr. Wali', timings: 'Mon, Wed - 7 PM', startDate: new Date('2025-07-01T09:00:00'), endDate: new Date('2025-10-01T17:00:00') },
            { name: 'Business (A2) Comp. Crash Course', instructor: 'Mr. Ammar', timings: 'Tue, Thu - 8 PM', startDate: new Date('2025-07-01T09:00:00'), endDate: new Date('2025-10-01T17:00:00') },
            { name: 'Economics (A2) Comp. Crash Course', instructor: 'Mr. Wali', timings: 'Wed - 9 PM, Sat - 2 PM', startDate: new Date('2025-07-01T09:00:00'), endDate: new Date('2025-10-01T17:00:00') },
            { name: 'Accounting (A2) Comp. Crash Course', instructor: 'Mr. Ali', timings: 'Fri, Sun - 6 PM', startDate: new Date('2025-07-01T09:00:00'), endDate: new Date('2025-10-01T17:00:00') },
        ]
    },
    'SAT': [
        { name: 'SAT MASTERY (Aug 23 Test)', instructor: 'Mr. Ammar & Mr. Wali', timings: 'Sat, Sun - 10 AM', startDate: new Date('2025-06-23T09:00:00'), endDate: new Date('2025-08-22T17:00:00') },
        { name: 'SAT Express Prep (Aug 23 Test)', instructor: 'Mr. Ammar & Mr. Wali', timings: 'Mon, Wed, Fri - 5 PM', startDate: new Date('2025-07-23T09:00:00'), endDate: new Date('2025-08-22T17:00:00') },
        { name: 'SAT MASTERY (Sept 13 Test)', instructor: 'Mr. Ammar & Mr. Wali', timings: 'Sat, Sun - 10 AM', startDate: new Date('2025-07-13T09:00:00'), endDate: new Date('2025-09-12T17:00:00') },
        { name: 'SAT Express Prep (Sept 13 Test)', instructor: 'Mr. Ammar & Mr. Wali', timings: 'Mon, Wed, Fri - 5 PM', startDate: new Date('2025-08-13T09:00:00'), endDate: new Date('2025-09-12T17:00:00') },
        { name: 'SAT MASTERY (Oct 4 Test)', instructor: 'Mr. Ammar & Mr. Wali', timings: 'Sat, Sun - 10 AM', startDate: new Date('2025-08-04T09:00:00'), endDate: new Date('2025-10-03T17:00:00') },
        { name: 'SAT Express Prep (Oct 4 Test)', instructor: 'Mr. Ammar & Mr. Wali', timings: 'Mon, Wed, Fri - 5 PM', startDate: new Date('2025-09-04T09:00:00'), endDate: new Date('2025-10-03T17:00:00') },
        { name: 'SAT MASTERY (Nov 8 Test)', instructor: 'Mr. Ammar & Mr. Wali', timings: 'Sat, Sun - 10 AM', startDate: new Date('2025-09-08T09:00:00'), endDate: new Date('2025-11-07T17:00:00') },
        { name: 'SAT Express Prep (Nov 8 Test)', instructor: 'Mr. Ammar & Mr. Wali', timings: 'Mon, Wed, Fri - 5 PM', startDate: new Date('2025-10-08T09:00:00'), endDate: new Date('2025-11-07T17:00:00') },
        { name: 'SAT MASTERY (Dec 6 Test)', instructor: 'Mr. Ammar & Mr. Wali', timings: 'Sat, Sun - 10 AM', startDate: new Date('2025-10-06T09:00:00'), endDate: new Date('2025-12-05T17:00:00') },
        { name: 'SAT Express Prep (Dec 6 Test)', instructor: 'Mr. Ammar & Mr. Wali', timings: 'Mon, Wed, Fri - 5 PM', startDate: new Date('2025-11-06T09:00:00'), endDate: new Date('2025-12-05T17:00:00') },
    ]
};
