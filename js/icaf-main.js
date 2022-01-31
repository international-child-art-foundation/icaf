$(document).ready(function() {
    // window.wcf = $('video')[0];
    // wcf.pause();
    // wcf.currentTime = 185;
    /*
        currentTime
        playbackRate
     */
    let videoElm = $('video')[0];
    videoElm.volume = 0.2;
    let $volumeDiv = $('#volumeControl');
    let $inputs = $('#volumeControl').find('input').first().hide().prevObject;
    $volumeDiv.click(_ => {
        $inputs.toggle();
        videoElm.muted = !videoElm.muted 
    });


});