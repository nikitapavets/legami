import Slider from './slider';

document.addEventListener("DOMContentLoaded", () => {
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

    document.querySelector('.interactiveInput input').addEventListener('keyup', (event) => {
        let interactiveInput = document.querySelector('.interactiveInput');
        const maxLength = +interactiveInput.getAttribute('data-maxLength');
        let interactiveCounter = interactiveInput.querySelector('.interactiveCounter');
        interactiveCounter.innerHTML = `${event.target.value.length}/${maxLength}`;
    }, false);

    document.querySelector('.interactiveCards').addEventListener('click', (event) => {
        if(event.target.getAttribute('value')) {
            let cards = document.querySelectorAll('.interactiveCards li');
            for(let i = 0; i < cards.length; i++){
                if(cards[i].querySelector('div') == event.target) {
                    cards[i].classList.add('active');
                } else {
                    cards[i].classList.remove('active');
                }
            }
            document.querySelector('.interactiveCardValue').innerHTML = event.target.getAttribute('value');
        }
    }, false);


    document.querySelector('.interactiveFontCards').addEventListener('click', (event) => {
        if(event.target.getAttribute('value')) {
            let cards = document.querySelectorAll('.interactiveFontCards li');
            for(let i = 0; i < cards.length; i++){
                if(cards[i].querySelector('div') == event.target) {
                    cards[i].classList.add('active');
                } else {
                    cards[i].classList.remove('active');
                }
            }
            document.querySelector('.interactiveFontCardValue').innerHTML = event.target.getAttribute('value');
        }
    }, false);
});


