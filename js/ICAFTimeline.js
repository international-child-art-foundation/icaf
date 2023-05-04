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
            e.preventDefault();
            let delta = Math.sign(e.originalEvent.deltaY)
            // console.log(delta, this.activeIdx + delta);
            this.moveActiveIdx(delta);
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
        // let offset = this.options.offset - this.$rows.get(idx).offsetTop;
        let offset = this.options.offset - idx * (this.options.entryHeight + this.options.rowGap);
        this.$timeline.css('transform', `translateY(${offset}px)`)
        this.activeIdx = idx;
        this.options.onUpdate(this);
    }
}