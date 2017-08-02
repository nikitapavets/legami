export default class Slider {
    constructor(sliderBox, leftArrow, rightArrow) {
        this.sliderBox = sliderBox;
        this.slides = sliderBox.children;
        const slideStyles = this.slides[0].currentStyle || window.getComputedStyle(this.slides[0]);
        this.slideWidth = this.slides[0].offsetWidth + parseInt(slideStyles.marginLeft) + parseInt(slideStyles.marginRight);
        this.index = 0;
        this.total = this.slides.length;
        this.interval = 2000;
        this.setArrowsEvents(leftArrow, rightArrow);   
        this.init();
    }

    init() {
        setInterval(() => { 
            this.nextSlide();
        }, this.interval);
    }

    rewind() {
        this.index = 0;
        this.sliderBox.style.left = 0; 
    }

    nextSlide() {
        this.index++;
        if(this.index == this.total - 1) {
            this.rewind();
            return;
        }
        let offset = this.sliderBox.offsetLeft - this.slideWidth;
        this.sliderBox.style.left = offset + "px"; 
    }

    setArrowsEvents(leftArrow, rightArrow) {
        if(leftArrow) {
            rightArrow.addEventListener('click', this.nextSlide.bind(this), false);
        }
        if(rightArrow) {
            rightArrow.addEventListener('click', this.nextSlide.bind(this), false);
            this.index--;
        }
    }
}
