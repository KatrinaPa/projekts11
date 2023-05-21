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

dotsNav.addEventListener('click', e => {
    const targetDot = e.target.closest('button');
    if (!targetDot) return;

    const currentSlide = track.querySelector('.current_slide');
    const currentDot = dotsNav.querySelector('.current_slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
})

// remove click event from arrows
// create a 5 second interval
// in the interval callback, call next slide
// if last slide, show first slide



let slideIndex = 0;
const showSlides = () => {
    const slidesAll = document.getElementsByClassName("carousel_slide");
    for (let i = 0; i < slidesAll.length; i++) {
        slidesAll[i].style.display = 'none';
    }
    slideIndex++;
    if (slideIndex > slidesAll.length) {
        slideIndex = 1;
    }

    slidesAll[slideIndex - 1].style.display = 'block';

    setTimeout(showSlides, 1000);
};

//showSlides();

