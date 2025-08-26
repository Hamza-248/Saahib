document.addEventListener('DOMContentLoaded', function () {
    const steps = document.querySelectorAll('.timeline-step-row');
    const timelineProgress = document.getElementById('timeline-progress');
    const timelineOrb = document.getElementById('timeline-orb');
    const timelineWrapper = document.querySelector('.timeline-wrapper');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.5
    });

    steps.forEach(step => {
        observer.observe(step);
    });

    function updateTimeline() {
        if (!timelineWrapper) return;

        const wrapperRect = timelineWrapper.getBoundingClientRect();
        const wrapperTop = wrapperRect.top + window.scrollY;
        const wrapperHeight = wrapperRect.height;
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;

        let scrollPercent = (scrollY + windowHeight / 2 - wrapperTop) / wrapperHeight;
        scrollPercent = Math.max(0, Math.min(1, scrollPercent));

        // This now works for all screen sizes
        if (timelineOrb) timelineOrb.style.display = 'block';
        if (timelineProgress) timelineProgress.style.height = `${scrollPercent * 100}%`;
        if (timelineOrb) timelineOrb.style.top = `${scrollPercent * 100}%`;

        // Adjust the line position for mobile
        if (window.innerWidth < 992) {
            if (timelineProgress) timelineProgress.style.left = '20px';
            if (timelineOrb) timelineOrb.style.left = '20px';
        } else {
            if (timelineProgress) timelineProgress.style.left = '50%';
            if (timelineOrb) timelineOrb.style.left = '50%';
        }
    }

    window.addEventListener('scroll', updateTimeline);
    window.addEventListener('resize', updateTimeline);
    updateTimeline();
});