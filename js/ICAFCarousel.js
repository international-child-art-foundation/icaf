const defaultAutoSlideInterval = 5000;
const maxSlideTransition = 1000;

class ICAFCarousel {
    constructor($element){
        if ($element.constructor.name === 'String') $element = $($element);

        // this.$element = $element;


        this.$sliderImages = $element.find('.slide');
        $element.find('.goLeft').click(() => this.slideLeft().restartAutoSlide());
        $element.find('.goRight').click(() => this.slideRight().restartAutoSlide());        
        this.autoSlideInterval = defaultAutoSlideInterval;
        this.intervalId = null;

        // this._activeElement = null;
        this.slideIdx = 0;
        this.paused = false;
        this.sliding = false;

        this.init();
    }

    init() {        
        this.$sliderImages.hide()
            .eq(this.slideIdx).show();
    }

    restartAutoSlide() {
        return this.pause().play();
    }

    pause() {
        this.paused = true;
        this.intervalId = clearInterval(this.intervalId);
        return this;    // For Chaining
    }

    play() {
        this.paused = false;
        this.intervalId = setInterval(this.slideRight.bind(this), this.autoSlideInterval);
        return this;    // For Chaining
    }

    slideLeft() {
        if (this.sliding) return this;
        this.slideIdx = (this.slideIdx-1)%this.$sliderImages.length;
        this.$sliderImages.hide().eq(this.slideIdx).show();
        return this;
    }

    slideRight() {
        if (this.sliding) { console.log("can't slide!"); return this; }
        this.slideIdx = (this.slideIdx+1)%this.$sliderImages.length;
        this.$sliderImages.hide().eq(this.slideIdx).show();
        this.sliding = true;
        setTimeout(()=>this.sliding=false,maxSlideTransition);        
        return this;
    }

}

export default ICAFCarousel;