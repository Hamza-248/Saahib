
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('trial-form');

    // Data for dependent dropdown
    const subjectsByGrade = {
        'pre-o-level': ['Economics', 'Mathematics', 'Accounting', 'Business Studies', 'Biology', 'Chemistry', 'Physics'],
        'o-level': ['Economics', 'Mathematics', 'Accounting', 'Business Studies', 'Biology', 'Chemistry', 'Physics'],
        'as-level': ['Business Studies', 'Mathematics', 'Accounting', 'Economics'],
        'a2-level': ['Business Studies', 'Mathematics', 'Accounting', 'Economics'],
        'sat': ['SAT-Complete', 'SAT-English', 'SAT-Mathematics']
    };

    // --- Generic Custom Dropdown Handler ---
    function initializeCustomDropdown(menuId) {
        const menu = document.getElementById(menuId);
        const btn = document.getElementById(menu.getAttribute('aria-labelledby'));
        const hiddenInput = document.getElementById(btn.id.replace('-btn', ''));

        menu.addEventListener('click', function (event) {
            const target = event.target.closest('.dropdown-item');
            if (target) {
                event.preventDefault();
                const value = target.getAttribute('data-value');
                const text = target.textContent.trim();

                // Update button text and hidden input value
                btn.querySelector('span').textContent = text;
                hiddenInput.value = value;

                // Remove active class from siblings and add to current
                Array.from(menu.querySelectorAll('.dropdown-item')).forEach(item => item.classList.remove('active'));
                target.classList.add('active');

                // --- Special logic for Grade/Subject dependency ---
                if (menuId === 'grade-menu') {
                    updateSubjectDropdown(value);
                }
            }
        });
    }

    // --- Handler for Country Code Dropdown ---
    const countryCodeMenu = document.getElementById('country-code-menu');
    countryCodeMenu.addEventListener('click', function (event) {
        const target = event.target.closest('.dropdown-item');
        if (target) {
            event.preventDefault();
            const value = target.getAttribute('data-value');
            const flagSrc = target.getAttribute('data-flag-src');
            const countryCodeBtn = document.getElementById('country-code-btn');
            const hiddenInput = document.getElementById('countryCode');

            hiddenInput.value = value;
            countryCodeBtn.querySelector('img').src = flagSrc;
            countryCodeBtn.querySelector('span').textContent = value;
        }
    });

    // --- Function to update the Subject dropdown ---
    function updateSubjectDropdown(gradeValue) {
        const subjectBtn = document.getElementById('subject-btn');
        const subjectMenu = document.getElementById('subject-menu');
        const subjectInput = document.getElementById('subject');
        const subjects = subjectsByGrade[gradeValue] || [];

        // Reset subject field
        subjectMenu.innerHTML = '';
        subjectBtn.querySelector('span').textContent = 'Choose a subject...';
        subjectInput.value = '';

        if (subjects.length > 0) {
            subjectBtn.classList.remove('disabled');
            subjects.forEach(subject => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.className = 'dropdown-item';
                a.href = '#';
                a.setAttribute('data-value', subject.toLowerCase().replace(/ /g, '-'));
                a.textContent = subject;
                li.appendChild(a);
                subjectMenu.appendChild(li);
            });
        } else {
            subjectBtn.classList.add('disabled');
            subjectBtn.querySelector('span').textContent = 'No subjects available';
        }
    }

    // Initialize all custom dropdowns
    initializeCustomDropdown('grade-menu');
    initializeCustomDropdown('subject-menu');
    initializeCustomDropdown('howHeard-menu');

    // --- Form Submission Handler ---
    form.addEventListener('submit', function (event) {
        // Manually check our hidden inputs
        form.querySelectorAll('input[type="hidden"][required]').forEach(input => {
            if (!input.value) {
                // Find the corresponding button and add an "invalid" style if needed
                const btn = document.getElementById(input.id + '-btn');
                if (btn) btn.style.borderColor = 'var(--bs-danger)'; // Example validation feedback
            } else {
                const btn = document.getElementById(input.id + '-btn');
                if (btn) btn.style.borderColor = '';
            }
        });

        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        form.classList.add('was-validated');
    }, false);
});
