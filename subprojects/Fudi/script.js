$(function() {
  var w1 = new Waypoint({
	  element: document.getElementById('s-1'),
	  offset: '90%',
	  handler: function(direction) {
	  	var target = $(this.element).find('.center-wrap');
	    if (direction === 'down') {
	    	console.log('s-1 down');
	    	
	    	target.addClass('animated bounceInUp');

	    	target.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {	    		
                target.removeClass('animated bounceInUp');
            });
	    } else {

	    }	    
	  }
	});

  var w1u = new Waypoint({
	  element: document.getElementById('s-1'),
	  offset: '-90%',
	  handler: function(direction) {
	    if (direction === 'up') {
	    	console.log('s-1 up');
	    } else {

	    }   
	  }
	});

  var w2 = new Waypoint({
	  element: document.getElementById('s-2'),
	  offset: '80%',
	  handler: function(direction) {
	    if (direction === 'down') {
	    	console.log('s-2 down');
	    } else {

	    } 
	  }
	});

  var w2u = new Waypoint({
	  element: document.getElementById('s-2'),
	  offset: '-50%',
	  handler: function(direction) {
	    if (direction === 'up') {
	    	console.log('s-2 up');
	    } else {

	    } 
	  }
	});

  var w3 = new Waypoint({
	  element: document.getElementById('s-3'),
	  offset: '70%',
	  handler: function(direction) {
	    if (direction === 'down') {
	    	console.log('s-3 down');
	    } else {

	    } 
	  }
	});

  var w3u = new Waypoint({
	  element: document.getElementById('s-3'),
	  offset: '-120%',
	  handler: function(direction) {
	    if (direction === 'up') {
	    	console.log('s-3 up');
	    } else {

	    }
	  }
	});

  var w4 = new Waypoint({
	  element: document.getElementById('s-4'),
	  offset: '80%',
	  handler: function(direction) {
	    if (direction === 'down') {
	    	console.log('s-4 down');
	    } else {

	    } 
	  }
	});

  var w4u = new Waypoint({
	  element: document.getElementById('s-4'),
	  offset: '-50%',
	  handler: function(direction) {
	    if (direction === 'up') {
	    	console.log('s-4 up');
	    } else {

	    } 
	  }
	});

  var w5 = new Waypoint({
	  element: document.getElementById('s-5'),
	  offset: '90%',
	  handler: function(direction) {
	    if (direction === 'down') {
	    	console.log('s-5 down');
	    } else {
	    	console.log('s-5 up');
	    } 
	  }
	});

  var w6 = new Waypoint({
	  element: document.getElementById('s-6'),
	  offset: '95%',
	  handler: function(direction) {
	    if (direction === 'down') {
	    	console.log('s-6 down');
	    } else {
	    	console.log('s-6 up');
	    } 
	  }
	});

});