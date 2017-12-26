(function( $ ) {

    $.showMessage = function(text, type) {
        let container = $('#messages');
        let html = '<div class="messages">';
        html += '<div class="alert alert-' + type + '">' + text + '</div>';
        html += '</div>';

        container.html('');
        container.html(html);
    };

    $.handleForm = function(formId, callback) {
        new Form(formId, callback);
    };

}( jQuery ));

