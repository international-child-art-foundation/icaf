$(document).ready(function() {
    let videoElm = $('video')[0];
    videoElm.volume = 0.2;
    let $volumeDiv = $('#volumeControl');
    let $inputs = $('#volumeControl').find('input').first().hide().prevObject;
    $volumeDiv.click(_ => {
        $inputs.toggle();
        videoElm.muted = !videoElm.muted
    });


    buildCarousel();
    let $carousel = $('#youngArtists').carousel({
        interval: 3000
    });
    $('#slidePrev > circle').click(_ => $carousel.carousel('prev'));
    $('#slideNext > circle').click(_ => $carousel.carousel('next'));

    // For debugging
    window.c = $carousel;

    setTimeout(_ => {
        $('body').append(`<div style="height:300px;text-align:center"><br><br> I am an unfinished &lt;div&gt;.</div>`);
        $(document).scrollTop($(document).height());
        setTimeout(_ => $carousel.carousel('pause'), 10);
    }, 50);
});

function buildCarousel() {
    let cData = [{
            artwork: 'resource/image/artwork/New Zealand (Ella Gordon-Latty, 12).png',
            locationLogo: 'resource/image/logos/New-Zealand.png',
            name: 'Ella Gordon-Latty, age 12',
            location: 'New Zealand',
            quote: '“To paraphrase Ralph Waldo Emerson, the Earth understands civilization. Well used, it brings joy. When adored, doubles the joy. But if ill-used, it will destroy.”',
        },
        {
            artwork: 'resource/image/artwork/UK (Deanna Hodgson, 12).png',
            locationLogo: 'resource/image/logos/uk2.png',
            name: 'Deanna Hodgson, age 12',
            location: 'United Kingdon',
            quote: '“To paraphrase Ralph Waldo Emerson, the Earth understands civilization. Well used, it brings joy. When adored, doubles the joy. But if ill-used, it will destroy.”',
        },
        {
            artwork: 'resource/image/artwork/Texas (April Heaney, 14).png',
            locationLogo: 'resource/image/logos/usa2.png',
            name: 'April Heaney, age 14',
            location: 'United States',
            quote: '“To paraphrase Ralph Waldo Emerson, the Earth understands civilization. Well used, it brings joy. When adored, doubles the joy. But if ill-used, it will destroy.”',
        }
    ];
    cData.forEach((data, idx) => addCarouselItem(data, idx));
}

function addCarouselItem(data, idx) {
    $('.carousel-inner').append(
        `<div class="carousel-item ${idx===0?'active':''}">
            <div class="item-wrapper">
                <div class="col-sm-6 artwork">
                    <img src="${data.artwork}" alt="Slide ${idx}">
                </div>
                <div class="col-sm-6 description">
                    <div class="name flex-align-center">
                        <div>
                            <div class="flex-align-center">
                                <img src="${data.locationLogo}">
                            </div>
                            <div>
                                <div>${data.name}</div>
                                <div class="country">${data.location}</div>
                            </div>
                        </div>
                    </div>
                    <div class="quote">
                        <div>
                            ${data.quote}
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    );
}