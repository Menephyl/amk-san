// Slider
const track = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.slider-track img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dots = Array.from(document.querySelectorAll('.dot'));

let index = 0;
let autoplayId = null;
const AUTOPLAY_MS = 4000;

function updateSlider() {
  track.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((d, i) => d.setAttribute('aria-selected', i === index ? 'true' : 'false'));
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  updateSlider();
}

function nextSlide() {
  index = (index + 1) % slides.length;
  updateSlider();
}

function goToSlide(i) {
  index = i;
  updateSlider();
}

function startAutoplay() {
  stopAutoplay();
  autoplayId = setInterval(nextSlide, AUTOPLAY_MS);
}

function stopAutoplay() {
  if (autoplayId) clearInterval(autoplayId);
  autoplayId = null;
}

// Eventos
prevBtn.addEventListener('click', () => { prevSlide(); startAutoplay(); });
nextBtn.addEventListener('click', () => { nextSlide(); startAutoplay(); });
dots.forEach((dot, i) => dot.addEventListener('click', () => { goToSlide(i); startAutoplay(); }));

// Pausar autoplay no hover
document.querySelector('.slider').addEventListener('mouseenter', stopAutoplay);
document.querySelector('.slider').addEventListener('mouseleave', startAutoplay);

// Inicialização
updateSlider();
startAutoplay();


const slider = document.querySelector('.slider');
const sliderObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) startAutoplay();
    else stopAutoplay();
  });
}, { threshold: 0.2 });

sliderObserver.observe(slider);