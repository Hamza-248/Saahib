
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('trial-form');
    if (!form) return;

    const subjectsByGrade = {
        'primary-education': ['4 subjects bundle (English, Mathematics, Science, Urdu)', '3 subjects bundle (English, Mathematics, Science)'],
        'pre-o-level': ['Economics', 'Mathematics', 'Accounting', 'Business Studies', 'Biology', 'Chemistry', 'Physics'],
        'o-level': ['Economics', 'Mathematics', 'Accounting', 'Business Studies', 'Biology', 'Chemistry', 'Physics'],
        'as-level': ['Business Studies', 'Mathematics', 'Accounting', 'Economics', 'Biology', 'Chemistry', 'Physics'],
        'a2-level': ['Business Studies', 'Mathematics', 'Accounting', 'Economics', 'Biology', 'Chemistry', 'Physics'],
        'sat': ['SAT Mastery Course', 'SAT Express Prep']
    };

    const countryDataMap = {
        sa: { value: '+966', flag: 'https://flagcdn.com/w20/sa.png' },
        ae: { value: '+971', flag: 'https://flagcdn.com/w20/ae.png' },
        gb: { value: '+44', flag: 'https://flagcdn.com/w20/gb.png' },
        bh: { value: '+973', flag: 'https://flagcdn.com/w20/bh.png' },
        qa: { value: '+974', flag: 'https://flagcdn.com/w20/qa.png' },
        om: { value: '+968', flag: 'https://flagcdn.com/w20/om.png' },
        kw: { value: '+965', flag: 'https://flagcdn.com/w20/kw.png' }
    };

    function updateGradeLabel(countryCode) {
        const oLevelButton = document.querySelector('[data-dynamic-label="o-level"]');
        if (oLevelButton) {
            oLevelButton.textContent = (countryCode === '+44') ? 'GCSE' : 'IGCSE';
        }
    }

    function updateCountryCodeSelection(code, flagSrc) {
        const countryCodeBtn = document.getElementById('country-code-btn');
        document.getElementById('countryCode').value = code;
        countryCodeBtn.querySelector('img').src = flagSrc;
        countryCodeBtn.querySelector('span').textContent = code;
        updateGradeLabel(code);
    }

    function updateSubjectDropdown(gradeValue) {
        const subjectBtn = document.getElementById('subject-btn');
        const subjectMenu = document.getElementById('subject-menu');
        const subjectInput = document.getElementById('subject');
        const subjects = subjectsByGrade[gradeValue] || [];

        subjectMenu.innerHTML = '';
        subjectInput.value = '';
        subjectBtn.querySelector('span').textContent = 'Choose a subject...';

        if (subjects.length > 0) {
            subjectBtn.classList.remove('disabled');
            subjects.forEach(subject => {
                const li = document.createElement('li');
                const item = document.createElement('button');
                item.type = 'button';
                item.className = 'dropdown-item';
                item.setAttribute('data-value', subject.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, ''));
                item.textContent = subject;
                li.appendChild(item);
                subjectMenu.appendChild(li);
            });
        } else {
            subjectBtn.classList.add('disabled');
            subjectBtn.querySelector('span').textContent = 'No subjects available';
        }
    }

    function setCountryFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const region = urlParams.get('region');

        if (region && countryDataMap[region]) {
            const country = countryDataMap[region];
            updateCountryCodeSelection(country.value, country.flag);
        } else {
            const defaultCountryCode = document.getElementById('countryCode').value;
            updateGradeLabel(defaultCountryCode);
        }
    }

    // CORRECTED: Refactored event listener logic
    document.addEventListener('click', function (event) {
        const target = event.target.closest('.dropdown-item');
        if (!target) return;

        const menu = target.closest('.dropdown-menu');
        if (!menu) return;

        const btn = document.getElementById(menu.getAttribute('aria-labelledby'));
        if (!form.contains(btn)) return;

        const value = target.getAttribute('data-value');
        const text = target.textContent.trim();

        // Handle each dropdown case explicitly
        if (menu.id === 'country-code-menu') {
            const flagSrc = target.getAttribute('data-flag-src');
            updateCountryCodeSelection(value, flagSrc);
        } else if (menu.id === 'grade-menu') {
            document.getElementById('grade').value = value;
            btn.querySelector('span').textContent = text;
            updateSubjectDropdown(value);
        } else if (menu.id === 'subject-menu') {
            document.getElementById('subject').value = value;
            btn.querySelector('span').textContent = text;
        } else if (menu.id === 'howHeard-menu') {
            document.getElementById('howHeard').value = value;
            btn.querySelector('span').textContent = text;
        }

        // Common UI update for all dropdowns
        Array.from(menu.querySelectorAll('.dropdown-item')).forEach(item => item.classList.remove('active'));
        target.classList.add('active');
    });

    form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        form.classList.add('was-validated');
    }, false);

    setCountryFromURL();
});
