document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('testimonial-track');

    // Function to create a testimonial card element
    const createCard = (testimonial) => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.innerHTML = `
            <div>
                <h3 class="testimonial-title">${testimonial.title}</h3>
                <p class="testimonial-text">"${testimonial.text}"</p>
            </div>
            <div class="author-info">
                <span class="author-name">${testimonial.author} - ${testimonial.location}</span>
                <span class="author-role">${testimonial.role}</span>
            </div>
        `;
        return card;
    };

    // Function to fetch testimonials from JSON
    const fetchTestimonials = async () => {
        try {
            const response = await fetch('assets/data/testimonials.JSON');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const testimonialsData = await response.json();

            const fragment = document.createDocumentFragment();
            testimonialsData.forEach(testimonial => fragment.appendChild(createCard(testimonial)));
            testimonialsData.forEach(testimonial => fragment.appendChild(createCard(testimonial)));
            track.appendChild(fragment);
        } catch (error) {
            console.error("Could not fetch testimonials:", error);
            // Optionally, display a message to the user or a fallback
            track.innerHTML = '<p style="color: red; text-align: center; width: 100%;">Failed to load testimonials. Please try again later.</p>';
        }
    };

    fetchTestimonials(); // Call the function to fetch and render testimonials
});