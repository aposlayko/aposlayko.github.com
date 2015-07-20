"use strict";

/*(function($){
    $(window).load(function(){
        $(".content").mCustomScrollbar({
        	axis: 'y',
        	theme: 'dark'
        });
    });
})(jQuery);*/
$(function () {
	$('body').mCustomScrollbar({
		theme: "rounded-dots",
		scrollInertia: 400
	});
});