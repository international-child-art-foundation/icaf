import ICAFCarousel from './ICAFCarousel.js';

$(document).ready(function () {
    const videoStart = 10.5;
    let videoElm = $('video')[0];
    videoElm.volume = 0.4;
    videoElm.currentTime = videoStart;
    let $volumeDiv = $('#volumeControl');
    let $inputs = $volumeDiv.find('img');
    $volumeDiv.click(() => {
        $inputs.toggle();
        videoElm.muted = !videoElm.muted
    });
    $('#playControl').click(() => {
        videoElm.paused ? videoElm.play() : videoElm.pause();
    });

    let carousel = new ICAFCarousel('.carousel-wrapper');
    carousel.play();
});