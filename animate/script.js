$(function() {
    var animTarget = $('#for_animate');

    $('.btn-wrap button').each(function (index, btn) {
        $(btn).on('click', function () {
            var className = btn.innerHTML;
            $(animTarget[0]).addClass('animated ' + className);

            $(animTarget).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                this.className = '';
            });
        } );
    });
});
