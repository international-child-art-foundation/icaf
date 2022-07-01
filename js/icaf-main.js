import ICAFCarousel from './ICAFCarousel.js';

$(document).ready(function() {
    let videoElm = $('video')[0];
    videoElm.volume = 0.4;
    let $volumeDiv = $('#volumeControl');
    $('#videoContainer')
        .mouseenter(() => $volumeDiv.fadeIn(200))
        .mouseleave(() => $volumeDiv.fadeOut(200));
    let $inputs = $volumeDiv.find('img');
    $volumeDiv.click(() => {
        $inputs.toggle();
        videoElm.muted = !videoElm.muted
    });

    let carousel = new ICAFCarousel('.carousel-wrapper');
    carousel.play();
});

//DEBUG
const DEBUG_MODE = false;
$(document).ready(function() {
    if (DEBUG_MODE) $('#cfMetadata').show();
    let startTime = Date.now();
    const duration = 10;

    let updateDisplay = function() {
        $('#time').text((((Date.now() - startTime) / 1000) % duration).toFixed(1));
        //console.log( Number($('#f3').css('opacity')).toFixed(2) )
        $('#t1').text(Number($('#debug1').css('opacity')).toFixed(2));
        $('#t2').text(Number($('#debug2').css('opacity')).toFixed(2));
        $('#t3').text(Number($('#debug3').css('opacity')).toFixed(2));
        $('#t4').text(Number($('#debug4').css('opacity')).toFixed(2));
    }

    setInterval(updateDisplay, 100);
});