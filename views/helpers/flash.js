module.exports = (object) => {
    let html = '';
    if (object) {
        html += '<div class="messages">';
        html += '<div class="alert alert-' + object.type + '">' + object.text + '</div>';
        html += '</div>';
    }
    return html;
}