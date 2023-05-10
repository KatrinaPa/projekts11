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

const track = document.querySelector('.carousel_track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel_btn-right');
const prevButton = document.querySelector('.carousel_btn-left');
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

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    if (targetIndex === 0) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    } else if (targetIndex === slides.length - 1) {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    } else {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}

//when click left, move slides to L
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current_slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current_slide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);

    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    hideShowArrows(slides, prevButton, nextButton, prevIndex);
})

//when click right, move slides to R
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current_slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current_slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(slides, prevButton, nextButton, nextIndex);
})

// remove click event from arrows
// create a 5 second interval
// in the interval callback, call next slide
// if last slide, show first slide

dotsNav.addEventListener('click', e => {
    const targetDot = e.target.closest('button');
    if (!targetDot) return;

    const currentSlide = track.querySelector('.current_slide');
    const currentDot = dotsNav.querySelector('.current_slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(slides, prevButton, nextButton, targetIndex);
})






////////////  section id="wrapperSlider"
const slider = document.querySelector('.container_slider');
firstImg = slider.querySelectorAll('img')[0];
arrowIcons = document.querySelectorAll('.section_slider i');

let isDragStart = false, prevPageX, prevScrollLeft;

const showHideIcons = () => {
    //showing & hiding prev/next icon according to slider scroll left value
    let scrollWidth = slider.scrollWidth - slider.clientWidth;   //max scrollable width

    //arrowIcons[0].style.display = slider.scrollLeft == 0 ? "none" : "block";   //the same formula:
    if (slider.scrollLeft == 0) {
        arrowIcons[0].style.display = "none";
    } else {
        arrowIcons[0].style.display = "block";
    };
    if (slider.scrollLeft == scrollWidth) {
        arrowIcons[1].style.display = "none";
    } else {
        arrowIcons[1].style.display = "block";
    };
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 22;  //getting first img width & adding 2rem margin value

        //if clicked icon is left, reduce width value from slider scroll left else add to it
        //slider.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;   //the same formula:
        if (icon.id == "left") {
            slider.scrollLeft -= firstImgWidth;
        } else {
            slider.scrollLeft += firstImgWidth;
        }
        setTimeout(() => showHideIcons(), 60); // show after 60ms
    })
})

const dragStart = (e) => {
    //update global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX;
    prevScrollLeft = slider.scrollLeft;
}

const dragging = (e) => {
    // scrolling images to left according to mouse pointer
    if (!isDragStart) return;
    e.preventDefault();
    slider.classList.add('dragging');
    let positionDiff = e.pageX - prevPageX;
    slider.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    slider.classList.remove('dragging');
}

slider.addEventListener('mousedown', dragStart);
slider.addEventListener('mousemove', dragging);
slider.addEventListener('mouseup', dragStop);
slider.addEventListener('mouseleave', dragStop);
