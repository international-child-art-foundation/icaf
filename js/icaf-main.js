import ICAFCarousel from './ICAFCarousel.js';

$(document).ready(function () {
    const videoStart = 10.5;
    let videoElm = $('video')[0];
    videoElm.volume = 0.4;
    videoElm.currentTime = videoStart;
    let $volumeDiv = $('#volumeControl');
    $volumeDiv.click(() => {
        $volumeDiv.find('img').toggleClass('hidden');
        videoElm.muted = !videoElm.muted
    });
    let $playControl = $('#playControl');
    $playControl.click(() => {
        $playControl.find('> div').toggleClass('hidden');
        videoElm.paused ? videoElm.play() : videoElm.pause();
    });

    let carousel = new ICAFCarousel('.carousel-wrapper');
    carousel.play();
});