const container = document.querySelector('.testimonial-container');
const leftButton = document.getElementById('left-btn');
const rightButton = document.getElementById('right-btn');

let testimonialData = [];
let currentIndex = 0;
const cardsPerPage = 3;


async function fetchTestimonials() {
    try {
        const response = await fetch('json/testimonials.json');
        if (!response.ok) {
            throw new Error('Failed to fetch testimonials');
        }
        const data = await response.json();
        testimonialData = data.testimonials;
        renderTestimonials();
    } catch (error) {
        console.error('Error loading testimonials:', error);
        return [];
    }
}

function renderTestimonials() {
    const currentTestimonials = testimonialData.slice(
        currentIndex,
        currentIndex + cardsPerPage
    );
    const testimonialHTML = currentTestimonials.map(testimonial => `
        <div class="card1 flex bg-white shadow-lg rounded-xl flex-col gap-4 p-6">
            <div class="heading-review flex gap-2 items-center justify-between">
                <p class="text-2xl">${testimonial.title}</p>
                <img src="assets/testimonials/quote.svg" alt="quote">
            </div>
            <div class="heading-content">
                "${testimonial.content}"
            </div>
            <div class="author-details flex gap-2 align-center">
                <div class="img-container">
                    <img src="${testimonial.author.image}" class="rounded-4xl" alt="">
                </div>
                <div class="auth-container flex flex-col align-center justify-center">
                    <p>${testimonial.author.name}</p>
                    <p>${testimonial.author.role}</p>
                </div>
            </div>
        </div>
    `).join('');

    container.innerHTML = testimonialHTML;
}

function navigateTestimonials(direction) {
    console.log('Navigating:', direction); // Debug log
    
    if (direction === 'next') {
        currentIndex += cardsPerPage;
        if (currentIndex >= testimonialData.length) {
            currentIndex = 0;
        }
    } else if (direction === 'prev') {
        currentIndex -= cardsPerPage;
        if (currentIndex < 0) {
            currentIndex = Math.floor((testimonialData.length - 1) / cardsPerPage) * cardsPerPage;
        }
    }
    renderTestimonials();
}

document.addEventListener('DOMContentLoaded', fetchTestimonials);

leftButton.addEventListener('click', () => {
    navigateTestimonials('prev');
});

rightButton.addEventListener('click', () => {
    navigateTestimonials('next');
});