import ICAFCarousel from './ICAFCarousel.js';

$(document).ready(function () {
    $('.video-container').each((_, container) => {
        let $container = $(container);
        let videoElm = $container.find('video')[0];
        videoElm.volume = 0.4;
        videoElm.currentTime = +videoElm.getAttribute('data-start');
        let $volumeDiv = $container.find('.volume-control');
        $volumeDiv.click(() => {
            $volumeDiv.find('img').toggleClass('hidden');
            videoElm.muted = !videoElm.muted
        });
        let $playControl = $container.find('.play-control');
        $playControl.click(() => {
            $playControl.find('> div').toggleClass('hidden');
            videoElm.paused ? videoElm.play() : videoElm.pause();
        });
    });

    let carousel = new ICAFCarousel('.carousel-wrapper');
    carousel.play();
});