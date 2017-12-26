function messageCallback(res) {
    let formResponse = new FormResponse(res);
    let message = formResponse.getFlashResponse();

    $.showMessage(message.text, message.type);
}

$(function() {
    $.handleForm('signup', 'messageCallback');
});
