const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}))


//SLIDES with dots navigation
const track = document.querySelector('.carousel_track');
const slides = Array.from(track.children);
const dotsNav = document.querySelector('.carousel_nav');
const dots = Array.from(dotsNav.children);
const slideWidth = slides[0].getBoundingClientRect().width;


let slideIndex = 0;
let currentDisplayIndex = slideIndex;
let nextDisplayIndex = currentDisplayIndex + 1;

//arange slides next to one other
//slides[0].style.left = slideWidth * 0 + 'px';
//slides[3].style.left = slideWidth * 3 + 'px';
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
}
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current_slide');
    targetSlide.classList.add('current_slide');
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current_slide');
    targetDot.classList.add('current_slide');
}

const checkIndexesAreNotOutOfBounds = () => {
    if (nextDisplayIndex === slides.length) {
        nextDisplayIndex = 0;
    }

    if (currentDisplayIndex === slides.length) {
        currentDisplayIndex = 0;
    }
}

dotsNav.addEventListener('click', e => {
    const targetDot = e.target.closest('button');
    if (!targetDot) return;

    const clickedDotIndex = dots.findIndex(dot => dot === targetDot);

    currentDisplayIndex = clickedDotIndex;
    nextDisplayIndex = currentDisplayIndex + 1;

    checkIndexesAreNotOutOfBounds();

    const currentSlide = track.querySelector('.current_slide');
    const currentDot = dotsNav.querySelector('.current_slide');

    moveToSlide(track, currentSlide, slides[currentDisplayIndex]);
    updateDots(currentDot, dots[clickedDotIndex]);
})

const showSlides = () => {

    moveToSlide(track, slides[currentDisplayIndex], slides[nextDisplayIndex]);
    updateDots(dots[currentDisplayIndex], dots[nextDisplayIndex]);

    currentDisplayIndex++;
    nextDisplayIndex++;

    checkIndexesAreNotOutOfBounds();
};

setInterval(() => showSlides(), 5000)



let interval;

const launchSlideshow = () => {
    let interval = setInterval(() => showSlides(), 5000);
}

launchSlideshow();

const pauseButton = document.querySelector(".pauseButton");

pauseButton.onClick(clearInterval(interval));
playButton.onClick(launchSlideshow())
