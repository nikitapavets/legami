import Slider from './slider';

const sliderBox = document.querySelector('.slider');
const leftArrow = document.querySelector('.slider--arrow.left');
const rightArrow = document.querySelector('.slider--arrow.right');
var slider = new Slider(sliderBox, leftArrow, rightArrow);

// close popup
document.getElementById('handleClosePopup').addEventListener('click', () => {
    document.getElementById('popup').classList.add('hidden');
}, false);

// open popup
document.getElementById('handlePersonalizza').addEventListener('click', () => {
    document.getElementById('popup').classList.remove('hidden');
}, false);
