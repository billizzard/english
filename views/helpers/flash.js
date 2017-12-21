module.exports = (object) => {
    let html = '<div class="messages">';
    for (var prop in object) {
        object[prop].forEach(function (val) {
            html += '<div class="alert alert-' + prop + '">' + val + '</div>';
        })
    }
    html += '</div>';
    return html;
}