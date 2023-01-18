
$(document).ready(function () {
    // get JSON data
    $.ajax({
        type: "GET",
        url: "../js/leadershipData.json",
        dataType: "json",
        success: function (jsonData) {
            // when JSON data ready, get snippet HTML
            console.log(jsonData);
            $.get("/snippets/leadership-card.html").then(
                sHtml => {
                    // when snippt HTML ready, append card
                    jsonData.map((el) => {
                        let containerNum = el.id <= 10 ? 1 : 2;
                        // append each card using info from JSON
                        appendCard($(`#card-container-${containerNum}`)[0], el, sHtml);
                    })
                }
            )
        }
    })
})

const appendCard = function (parent, info, sHtml) {
    const { title, position, img1, img2, buttonId, shortCont, longCont, linkedin } = info;
    // record parent info
    const parentId = parent.id;
    // append sHTML
    const tmpChild = document.createElement("div");
    parent.appendChild(tmpChild);
    $(tmpChild).replaceWith(sHtml);
    // change attr in sHTML
    const indexSelector = `#${parentId} .card:last-of-type`;
    $(`${indexSelector} h4`).text(title);
    $(`${indexSelector} h5`).text(position);
    $(`${indexSelector} #avt1`).attr("src", img1);
    $(`${indexSelector} #avt2`).attr("src", img2);
    $(`${indexSelector} .contTab`).attr("id", buttonId);
    $(`${indexSelector} label`).attr("for", buttonId);
    $(`${indexSelector} .short-cont`).text(shortCont);
    $(`${indexSelector} .long-cont`).text(longCont);
    $(`${indexSelector} .linkedin a`).attr("href", linkedin);
}
