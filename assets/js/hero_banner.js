
document.addEventListener('DOMContentLoaded', function () {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
        document.querySelectorAll('.parallax-item').forEach(item => {
            item.classList.remove('parallax-item');
        });
        return;
    }

    const heroSection = document.querySelector('.hero-section');
    const parallaxItems = document.querySelectorAll('.parallax-item');

    heroSection.addEventListener('mousemove', function (e) {
        const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
        const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;

        window.requestAnimationFrame(() => {
            parallaxItems.forEach(item => {
                const speed = item.getAttribute('data-speed');
                const xOffset = -x * speed * 10;
                const yOffset = -y * speed * 10;
                item.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            });
        });
    });

    heroSection.addEventListener('mouseleave', function () {
        window.requestAnimationFrame(() => {
            parallaxItems.forEach(item => {
                item.style.transform = `translate(0px, 0px)`;
            });
        });
    });
});
