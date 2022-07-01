const defaultAutoSlideInterval = 5000;
const slideInvulnerability = 100;

class ICAFCarousel {
    constructor($element){
        if ($element.constructor.name === 'String') $element = $($element);
        this.$sliderImages = $element.find('.slide');

        // Pause on hover
        $element.mouseover(() => this.pause())
                .mouseout(() => this.play());
        $element.find('.goLeft').click(() => this.slideLeft());
        $element.find('.goRight').click(() => this.slideRight());        
        this.autoSlideInterval = defaultAutoSlideInterval;
        this.intervalId = null;

        this.slideIdx = 0;
        this.paused = false;
        this.sliding = false;

        this.init();
    }

    init() {        
        this.$sliderImages.eq(this.slideIdx)
                .addClass('active dir-right');
    }

    // restartAutoSlide() {
    //     return this.pause().play();
    // }

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

    slide(dx) {
        if (this.sliding) return this;
        let classes = ['dir-left','dir-right'];
        this.slideIdx = (this.slideIdx+dx)%this.$sliderImages.length;
        this.$sliderImages.removeClass(classes.concat('active'))
            .eq(this.slideIdx).addClass(['active',classes[(dx/2)+0.5]]);
        this.sliding = true;
        setTimeout(()=>this.sliding=false,slideInvulnerability);
        return this;
    }

    slideLeft() {
        return this.slide(-1);
    }

    slideRight() {
        return this.slide(1);        
    }

}

export default ICAFCarousel;