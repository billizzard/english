$(function() {
    console.log( "ready!" );
    $('body').on('click', function() {
        let res = $.handleForm('signup');
        console.log(res);
    })
});
