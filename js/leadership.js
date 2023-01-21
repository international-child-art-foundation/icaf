
$(document).ready(function () {
    /*
    // Alternative way
    Promise.all([$.get("/js/leadershipData.json"), $.get("/snippets/leadership-card.html")])
        // when JSON data and snippetHTML ready
        .then(([jsonData, sHtml]) => {
            jsonData.forEach((el, idx) => {
                el.buttonId = `button${idx}`;
                // append each card using info from JSON
                appendCard($(`#card-container-${el.container}`), el, sHtml);
            });
        })
    */
    // get JSON data    
    $.get("/js/leadershipData.json").then(jsonData => {
        // when JSON data ready, get snippet HTML
        console.log(jsonData);
        $.get("/snippets/leadership-card.html").then(
            sHtml => {
                // when snippet HTML ready, append card
                jsonData.forEach((cardInfo, idx) => {
                    cardInfo.buttonId = `button${idx}`;
                    // append each card using info from JSON
                    appendCard(cardInfo, sHtml);
                });
            }
        )
    })
});

const appendCard = function (cardInfo, sHtml) {
    const { title, position, img1, img2, buttonId, shortCont, longCont, linkedin, container } = cardInfo;

    let $newCard = $(sHtml);
    // update attrs
    $newCard.find('h4').text(title);
    $newCard.find('h5').text(position);
    $newCard.find('.avt1').attr("src", img1);
    $newCard.find('.avt2').attr("src", img2);
    $newCard.find('.cont-tab').attr("id", buttonId);
    $newCard.find('label').attr("for", buttonId);
    $newCard.find('.short-cont').text(shortCont);
    $newCard.find('.long-cont').text(longCont);
    $newCard.find('.linkedin a').attr("href", linkedin);

    $(`#card-container-${container}`).append($newCard);
};
