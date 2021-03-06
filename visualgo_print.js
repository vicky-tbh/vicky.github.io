const SELECTOR_TO_BE_REMOVED = ['#electure-dropdown', '.electure-print', '.electure-end', '.electure-prev', '.electure-next'];
let _lecTitles = [];

function openPrinterFriendly() {
    let page = window.open("");
    const meta = `<style>body{width: 70%;margin: auto;}</style>`;
    page.document.write(meta);
    saveLecTitles();
    let mainLecHtml = getMainLecHtml();
    page.document.write(mainLecHtml);
}

function saveLecTitles() {
    var $ddlOptions = $('.lecture-dropdown').find('option');
    $.each($ddlOptions, function(i, value) {
        _lecTitles.push($(value).html());
    })
}

function getMainLecHtml() {
    let resultHtml = "<h2>e-Lecture Slides</h2>";
    $('.electure-dialog').each(function(i, obj) {
        let lecBody = extractLecDialog(obj).replace(new RegExp('</p>.*<br>.*<p>'), '</p><p>');
        let lecHeader = `<h3>${_lecTitles[i].replace(new RegExp('&nbsp;','g'),' ').trim()}</h3>`;
        resultHtml += lecHeader + lecBody;
    });
    return resultHtml;
}

function extractLecDialog(dialogDiv) {
    let clone = $(dialogDiv).clone();
    SELECTOR_TO_BE_REMOVED.forEach(function(value) {
        clone.find(value).remove();
    });
    return clone.html();
}