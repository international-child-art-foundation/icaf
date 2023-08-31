class ICAFTimeline {

    static buildEntry($timeline, entryData) {
        let { year, imgSrc, imgLink, aspectRatio, description } = entryData;
        let imgAlt = (imgSrc.match(/\/(\w+)?\.\w+$/) || [,''])[1];
        let imgHtml = `<img src="${imgSrc}" alt="${imgAlt}" >`;
        if (aspectRatio) imgHtml = imgHtml.replace(/>$/,` style="aspect-ratio: ${aspectRatio}">`);
        if (imgLink) imgHtml = `<a target="_blank" href="${imgLink}">${imgHtml}</a>`;

        $timeline.append(`
            <div class="entry">
                <div class="year">${year}</div>
                <div class="line"></div>
                <div class="image">${imgHtml}</div>
                <div class="text">${description}</div>
            </div>
        `);
    }

    constructor($wrapperElement, options) {
        if ($wrapperElement.constructor.name === 'String') $wrapperElement = $($wrapperElement);
        this.options = Object.assign({}, ICAFTimeline.DEFAULT_OPTIONS, options);
        this.$timeline = $wrapperElement.find(('#' + this.options.timelineId).replace(/^\#+/, '#'));

        (async () => {
            if (this.options.dataJson && this.options.buildEntry) {
                this.jsonData = await $.get(this.options.dataJson);
                this.jsonData.forEach(data => this.options.buildEntry(this.$timeline, data));
                this.options.onInit(this);
            }
            this.$rows = this.$timeline.children(this.options.timelineEntrySelector);
            this.updateActiveIdx(this.options.startIdx);
        })();

        $wrapperElement.on('wheel', e => {
            let delta = Math.sign(e.originalEvent.deltaY);
        
            if ((this.isAtStart() && delta < 0) || (this.isAtEnd() && delta > 0)) {
                // Allow the default behavior (scrolling the outer page)
                return;
            }
        
            // Otherwise, handle the timeline scrolling
            e.preventDefault();
            this.moveActiveIdx(delta);
        });
        
        // Adding touch event handlers for mobile support
        let startY;
        let cumulativeDelta = 0;
        const SWIPE_THRESHOLD = 50;

        let startTime;
        $wrapperElement.on('touchstart', e => {
            startY = e.originalEvent.touches[0].pageY;
            startTime = new Date().getTime();
            cumulativeDelta = 0; // Reset the cumulative delta on a new touch start
        });
        
        $wrapperElement.on('touchmove', e => {
            const moveEndY = e.originalEvent.changedTouches[0].pageY;
            const delta = startY - moveEndY;
            cumulativeDelta += delta; // Accumulate the delta
            if ((this.isAtStart() && delta < 0) || (this.isAtEnd() && delta > 0)) {
                // Allow the default behavior (scrolling the outer page)
                return;
            }        
            e.preventDefault();


            // Only act on the delta when it exceeds the threshold and reset the cumulative delta
            if (Math.abs(cumulativeDelta) > SWIPE_THRESHOLD) {
                // Determine swipe direction (up or down) and move active index accordingly
                if (cumulativeDelta > 0) { // Swiped up
                    this.moveActiveIdx(1);
                } else { // Swiped down
                    this.moveActiveIdx(-1);
                }
                
                cumulativeDelta = 0; // Reset after handling
            }
            
            startY = moveEndY; // Update startY for the next touchmove
        });
    }

    static DEFAULT_OPTIONS = {
        timelineId: 'timeline',
        timelineEntrySelector: '.entry',
        entryHeight: 120,
        rowGap: 47,
        startIdx: 0,
        offset: 0,
        onInit: () => { },
        onUpdate: () => { }
    };

    moveActiveIdx(delta) {
        if (!this.$rows[this.activeIdx + delta]) return;
        this.updateActiveIdx(this.activeIdx + delta);
    }

    updateActiveIdx(idx) {
        this.$rows.removeClass('active').eq(idx).addClass('active')
        let offset = this.options.offset - idx * (this.options.entryHeight + this.options.rowGap);
        this.$timeline.css('transform', `translateY(${offset}px)`)
        this.activeIdx = idx;
        
        this.options.onUpdate(this);
    }

    isAtStart() {
        return this.activeIdx === 0;
    }
    
    isAtEnd() {
        return this.activeIdx === this.$rows.length - 1;
    }
    
}