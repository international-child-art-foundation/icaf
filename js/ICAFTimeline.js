class ICAFTimeline {
    constructor($wrapperElement, options) {
        if ($wrapperElement.constructor.name === 'String') $wrapperElement = $($wrapperElement);
        options = Object.assign({

        }, options);
        this.$timeline = $wrapperElement.children();
        this.$rows = this.$timeline.children();
        this.activeIdx = 0;
        this.$rows.eq(0).addClass('active');

        $wrapperElement.on('wheel', e => {
            e.preventDefault();
            let delta = Math.sign(e.originalEvent.deltaY)
            // console.log(delta, this.activeIdx + delta);
            if (this.$rows[this.activeIdx + delta]) {
                this.updateActiveIdx(this.activeIdx + delta);
            }

        });
    }

    updateActiveIdx(idx) {
        // let rowGap = +(this.$timeline.css('rowGap').replace('px', ''));
        // let offset = this.$rows.get().slice(0, idx).reduce((sum, row) => sum - row.offsetHeight - rowGap, 0);
        this.$rows.removeClass('active').eq(idx).addClass('active')
        let offset = -this.$rows.get(idx).offsetTop;
        this.$timeline.css('marginTop', offset);
        this.activeIdx = idx;
    }
}