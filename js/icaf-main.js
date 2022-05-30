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
});