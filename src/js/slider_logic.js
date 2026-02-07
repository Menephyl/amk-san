
// Carousel Configuration
const setupCarousel = () => {
    const slider = document.querySelector('.slider');
    if (!slider) return;

    const track = slider.querySelector('.slider-track');
    const slides = Array.from(track.children);
    const nextBtn = slider.querySelector('.next');
    const prevBtn = slider.querySelector('.prev');
    const dotsNav = slider.querySelector('.dots');

    let currentIndex = 0;
    const slideCount = slides.length;

    // Generate dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.setAttribute('aria-selected', 'true');
        dot.addEventListener('click', () => goToSlide(index));
        dotsNav.appendChild(dot);
    });

    const dots = Array.from(dotsNav.children);

    const updateDots = (index) => {
        dots.forEach(dot => dot.setAttribute('aria-selected', 'false'));
        dots[index].setAttribute('aria-selected', 'true');
    };

    const goToSlide = (index) => {
        if (index < 0) index = slideCount - 1;
        if (index >= slideCount) index = 0;

        track.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;
        updateDots(index);
    };

    nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
        resetAutoPlay();
    });

    prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
        resetAutoPlay();
    });

    // Auto Play
    let autoPlayInterval;
    const startAutoPlay = () => {
        autoPlayInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    };

    const resetAutoPlay = () => {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    };

    startAutoPlay();
};

// Initialize Carousel when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupCarousel);
} else {
    setupCarousel();
}
