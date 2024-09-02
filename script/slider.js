let currIndex = 0;
const sliderItems = document.querySelectorAll('.materials-carousel__item');

let nextButton = document.querySelector('.materials-carousel__button--next')
let prevButton = document.querySelector('.materials-carousel__button--prev')


nextButton.onclick = function (){
    if (currIndex == sliderItems.length - 3) {
        return;
    }
    currIndex++
    document.querySelector('.materials__carousel').style.transform = `translateX(calc(-100%*${currIndex}/3 + -6px*${currIndex}))`;
}

prevButton.onclick = function (){
    if (currIndex == 0) {
        return;
    }
    currIndex--
    document.querySelector('.materials__carousel').style.transform = `translateX(calc(-100%*${currIndex}/3 + -6px*${currIndex}))`;
}
