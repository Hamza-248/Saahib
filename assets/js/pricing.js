// Build one card's HTML
function createCard(plan) {
    return `
      <div class="col-12 col-sm-6 col-lg-4">
        <div class="card h-100 glass-card text-light event_filter card-extras">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${plan.title}</h5>
            <div class="card-price">
              ${plan.price}
              <small class="fs-6 text-light">/month</small>
            </div>
            <p class="card-text flex-grow-1 card-desc">${plan.desc}</p>
            <ul class="list-unstyled mb-4">
              ${plan.features.map(f => `
                <li class="d-flex align-items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
  </svg>
                  <span class="card-features">${f}</span>
                </li>
              `).join('')}
            </ul>
            <button class="btn mt-auto card-btn">Enroll Now</button>
          </div>
        </div>
      </div>
    `;
}

let pricingData = {};

// Load your JSON (make sure the file is named pricing.json)
fetch('assets/data/pricing.json')
    .then(r => r.json())
    .then(data => {
        pricingData = data;
        renderCards('pre-o'); // initial render
    })
    .catch(err => console.error('Error loading pricing data:', err));

/**
 * Clears and re-renders all cards for the selected standard
 * @param {string} standard
 */
function renderCards(standard) {
    const container = document.getElementById('pricingCards');
    container.innerHTML = '';
    const plans = pricingData[standard] || [];
    plans.forEach(plan => {
        container.insertAdjacentHTML('beforeend', createCard(plan));
    });
}

// Tab click handling
document.querySelectorAll('#pricingTabs .tab-link').forEach(tab => {
    tab.addEventListener('click', e => {
        e.preventDefault();

        // remove active from all
        document.querySelectorAll('#pricingTabs .tab-link').forEach(t => {
            t.classList.remove('is_active', 'active');
        });

        // set this one active
        tab.classList.add('is_active', 'active');

        // re-render
        const standard = tab.dataset.standard;
        renderCards(standard);
    });
});