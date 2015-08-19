$(function() {
	$('.item').hide();
	$('.phone').hide();
	$('.article').hide();
	$('.slider').hide();
	$('.food-wrap').hide();

	function disableWaypoint (waypoint) {
		setTimeout(function () { waypoint.disable(); }, 500);
	}

	var navDown = new Waypoint({
	  element: document.getElementsByClassName('nav-menu'),	  

	  handler: function(direction) {
	  	var logo = $(this.element).find('.logo');
	  	var menu = $(this.element).find('ul');
	    if (direction === 'down') {
	    	console.log('nav down');	    	
	    	logo.addClass('animated bounceInLeft');
	    	menu.addClass('animated bounceInRight');

	    	logo.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {	    		
                logo.removeClass('animated bounceInLeft');
            });

            menu.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {	    		
                menu.removeClass('animated bounceInRight');
            });

            disableWaypoint(this);
	    }    
	  }
	});	

  var w1 = new Waypoint({
	  element: document.getElementById('s-1'),	  
	  handler: function(direction) {
	  	var target = $(this.element).find('.center-wrap');
	    if (direction === 'down') {
	    	target.hide();
	    	console.log('s-1 down');
	    	setTimeout(function () {
	    		target.addClass('animated bounceInUp');
	    		target.show();
		    	target.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {	    		
	                target.removeClass('animated bounceInUp');
	            });
	    	}, 500);

	    	disableWaypoint(this);	    	
	    }    
	  }
	});  

  var w2 = new Waypoint({
	  element: document.getElementById('s-2'),
	  offset: '80%',
	  handler: function(direction) {
	  	var targets = $(this.element).find('.item'),
	  		time = 0;
	  	
	    if (direction === 'down') {
	    	targets.each(function(index, item) {
	    	time += 300;	    		
	    		setTimeout(function () {
	    			$(item).addClass('animated fadeInUp');
	    			$(item).show();
	    			$(item).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {	    		
		                $(item).removeClass('animated fadeInUp');
		            });		            
	    		}, time);	    		
	    	});
	    	disableWaypoint(this);    		
	    } 
	  }
	});  

  var w3 = new Waypoint({
	  element: document.getElementById('s-3'),
	  offset: '70%',
	  handler: function(direction) {
	  	var phone = $(this.element).find('.phone'),
	  		article = $(this.element).find('.article');

	    if (direction === 'down') {
	    	phone.addClass('animated slideInLeft');
	    	article.addClass('animated slideInRight');
	    	phone.add(article).show();	    	
	    	phone.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {	    		
		        phone.removeClass('animated slideInLeft');
		        article.removeClass('animated slideInRight');		        
		    });

		    disableWaypoint(this);
	    }	       
	  }
	});

  var w4 = new Waypoint({
	  element: document.getElementById('s-4'),
	  offset: '80%',
	  handler: function(direction) {
	  	var slider = $(this.element).find('.slider');
	    if (direction === 'down') {
	    	slider.addClass('animated lightSpeedIn');
	    	slider.show();
	    	slider.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {	    		
		        slider.removeClass('animated lightSpeedIn');
		    });

		    disableWaypoint(this);
	    }
	  }
	});

  
  var w5 = new Waypoint({
	  element: document.getElementById('s-5'),
	  offset: '90%',
	  handler: function(direction) {
	  	var food = $(this.element).find('.food-wrap'),
	  		time = 300;
	    if (direction === 'down') {
	    	food.each(function (index, item) {
	    		time += 200;
	    		setTimeout(function () {
	    			$(item).addClass('animated flipInX');
	    			$(item).show();
	    			$(item).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {	    		
				        $(item).removeClass('animated flipInX');
				    });	    			
	    		}, time);
	    	});
	    	disableWaypoint(this);
	    } 
	  }
	});

  var w6 = new Waypoint({
	  element: document.getElementById('s-6'),
	  offset: '95%',
	  handler: function(direction) {
	  	var dights = $('.dights').find('h2'),
	  		endDights = [23567, 431729, 892173, 56581, 3182],
	  		counters = [],
	  		time = 300;

	    if (direction === 'down') {
	    	console.log('s-6 down');
	    	dights.each(function (index, item) {
	    		time += 300;
	    		setTimeout(function () {
	    			counters[index] = new CountUp('dig-'+index, 0, endDights[index], 0, 2, {
	    				useEasing : true, 
						useGrouping : true, 
						separator : ',', 
						decimal : '.', 
						prefix : '', 
						suffix : '' 
	    			});

					counters[index].start();
	    		}, time);
	    	});

	    }
	  }
	});	
});