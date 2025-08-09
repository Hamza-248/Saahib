
document.addEventListener('DOMContentLoaded', function () {
    const featuresContainer = document.getElementById('features-container');

    const featureGroups = {
        foundation: {
            title: 'The Foundation',
            features: [
                { title: 'Relatable & Accomplished Mentors', description: 'Learn from relatable mentors who have recently excelled in the same exams.', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>' },
                { title: 'Top 1% Tutors', description: 'Our instructors are sourced from the top percentile of academic achievers, ensuring unparalleled quality.', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>' },
                { title: 'Trained in Teaching Methodology', description: 'Our instructors are trained in modern teaching techniques to explain complex ideas with clarity.', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>' },
                { title: 'Feedback Driven Approach', description: 'Our teaching methods are constantly refined based on student feedback to ensure the best learning outcomes.', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-15c-.621 0-1.125-.504-1.125-1.125v-9.75c0-.621.504-1.125 1.125-1.125H6.75" /></svg>' }
            ]
        },
        experience: {
            title: 'The Experience',
            features: [
                { title: 'Live Interactive Classes', description: 'Engage in real-time discussions, ask questions, and collaborate with peers in our dynamic virtual classrooms.', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" /></svg>' },
                { title: 'Class Recordings', description: 'Never miss a lesson. All classes are recorded and available 24/7 for you to review at your own pace.', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" /></svg>' },
                { title: 'Quizzes & Assignments', description: 'Reinforce your learning and track your progress with regular, targeted assessments.', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" /></svg>' },
                { title: 'Transparent Progress Tracking', description: 'Stay informed with detailed monthly reports on your child’s attendance, performance, and progress.', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 100 15 7.5 7.5 0 000-15zM21 21l-5.197-5.197" /></svg>' },
            ]
        },
        support: {
            title: 'The Support',
            features: [
                { title: 'Holistic Mentorship & Guidance', description: 'Go beyond academics with guidance on study habits, university applications, and career paths.', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.483" /></svg>' },
                { title: 'Curated Revision Resources', description: 'Access concise, expertly-crafted notes and summaries for every topic to make revision efficient.', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>' },
                { title: 'Past-Paper Workshops', description: 'Master exam technique with intensive workshops focused on solving and understanding past papers.', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>' },
                { title: 'Strategy Workshops', description: 'Learn proven strategies for time management, problem-solving, and acing your exams.', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" /></svg>' },
            ]
        }
    };

    function setupLayout() {
        const isMobile = window.innerWidth < 992;
        if (isMobile) {
            renderAccordion();
        } else {
            renderGrid();
        }
    }

    function createFeatureItemHTML(feature, isDesktop) {
        const tooltipHTML = isDesktop
            ? `<div class="feature-tooltip">${feature.description}</div>`
            : '';

        return `
                    <div class="feature-item" data-description="${feature.description}">
                        <div class="feature-icon">${feature.icon}</div>
                        <p class="feature-title">${feature.title}</p>
                        ${tooltipHTML}
                    </div>
                `;
    }

    function renderGrid() {
        let allFeaturesHTML = '';
        for (const key in featureGroups) {
            featureGroups[key].features.forEach(feature => {
                allFeaturesHTML += createFeatureItemHTML(feature, true);
            });
        }
        featuresContainer.innerHTML = `<div class="feature-grid d-none d-lg-grid">${allFeaturesHTML}</div>`;
    }

    function renderAccordion() {
        let accordionHTML = '<div class="features-accordion d-lg-none">';
        for (const key in featureGroups) {
            const group = featureGroups[key];
            accordionHTML += `
                        <div class="features-accordion-item">
                            <div class="features-accordion-header">
                                <h4>${group.title}</h4>
                                <svg class="accordion-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                            </div>
                            <div class="features-accordion-body">
                                <div class="feature-grid">
                                    ${group.features.map(feature => createFeatureItemHTML(feature, false)).join('')}
                                </div>
                            </div>
                        </div>
                    `;
        }
        accordionHTML += '</div>';
        featuresContainer.innerHTML = accordionHTML;

        const accordionItems = featuresContainer.querySelectorAll('.features-accordion-item');
        accordionItems.forEach(item => {
            const header = item.querySelector('.features-accordion-header');
            header.addEventListener('click', () => {
                const body = item.querySelector('.features-accordion-body');
                const isActive = item.classList.contains('active');

                accordionItems.forEach(i => {
                    i.classList.remove('active');
                    i.querySelector('.features-accordion-body').style.maxHeight = null;
                });

                if (!isActive) {
                    item.classList.add('active');
                    body.style.maxHeight = body.scrollHeight + "px";
                }
            });
        });

        const featureItems = featuresContainer.querySelectorAll('.feature-item');
        featureItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                handleFeatureTap(item);
            });
        });
    }

    function handleFeatureTap(tappedItem) {
        const accordionBody = tappedItem.closest('.features-accordion-body');
        const wasExpanded = tappedItem.classList.contains('expanded');

        accordionBody.querySelectorAll('.feature-item').forEach(item => {
            if (item.classList.contains('expanded')) {
                const desc = item.querySelector('.feature-description-mobile');
                if (desc) desc.remove();
                item.classList.remove('expanded');
            }
        });

        if (!wasExpanded) {
            tappedItem.classList.add('expanded');
            const descriptionText = tappedItem.dataset.description;
            const descriptionEl = document.createElement('div');
            descriptionEl.className = 'feature-description-mobile';
            tappedItem.appendChild(descriptionEl);

            descriptionEl.textContent = descriptionText;
            accordionBody.style.maxHeight = accordionBody.scrollHeight + "px";

            setTimeout(() => {
                descriptionEl.classList.add('visible');
            }, 10);
        } else {
            accordionBody.style.maxHeight = accordionBody.scrollHeight + "px";
        }
    }

    // Initial setup
    setupLayout();

    // Re-run setup on window resize
    window.addEventListener('resize', setupLayout);
});
