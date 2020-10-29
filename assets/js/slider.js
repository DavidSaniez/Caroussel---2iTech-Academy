var slides = document.querySelectorAll('.slide');
const indicator = document.querySelector('.slider_indicator');
var buttn_right = document.querySelector('.bttn_right');
var buttn_left = document.querySelector('.bttn_left');
var buttn_pause = document.querySelector('.bttn_pause');

var index = 0; //slide actuelle

indicatorBtn();

// Next slide
function next_slide() {
    if (index == slides.length - 1) {
        index = 0;
    } else {
        index++;
    }
    newSlide()
}

//Previous slide
function previous_slide() {
    if (index == 0) {
        index = slides.length - 1;
    } else {
        index--;
    }
    newSlide();
}

function newSlide() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('slide_active')
    }

    slides[index].classList.add('slide_active');
}

//Indicators
function indicatorBtn() {
    for (let i = 0; i < slides.length; i++) {
        const div = document.createElement('div');
        div.innerHTML = i + 1;
        div.setAttribute('onclick', 'indicateSlide(this)');
        div.id = i;
        if (i == 0) {
            div.className = 'slide_active'
        }
        indicator.appendChild(div);
    }
}

function indicateSlide(element) {
    index = element.id;
    newSlide();
    updateIndicatorBtn();
}

function updateIndicatorBtn() {
    for (let i = 0; i < indicator.children.length; i++) {
        indicator.children[i].classList.remove('slide_active');
    }
    indicator.children[index].classList.add('slide_active')
}

//button right
buttn_right.addEventListener('click', function() {
    next_slide();
    updateIndicatorBtn()
})

//button left
buttn_left.addEventListener('click', function() {
    previous_slide();
    updateIndicatorBtn()
})

//Auto play
var idInterval;
start_autoplay();

function start_autoplay() {
    idInterval = window.setInterval(function() {
        next_slide();
        updateIndicatorBtn()
    }, 5000);
}

buttn_pause.addEventListener('click', function() {
    if (buttn_pause.classList.contains('pausing')) {
        start_autoplay();
        buttn_pause.classList.remove('pausing');
    } else {
        window.clearInterval(idInterval);
        buttn_pause.classList.add('pausing');
    }
});