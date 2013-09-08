function Controller() {
    var model = new Model();

    this.init = function() {
        document.getElementById('reverse').addEventListener('click', reverse, false);
        document.getElementById('img-order').addEventListener('click', imageMix, false);
        document.getElementById('hide').addEventListener('click', hideLinks, false);
        model.initModel();
    };

    function reverse() {    //first link
        var div_left, div_right, i;
        div_left = document.getElementById('left').children;
        div_right = document.getElementById('right').children;
        console.log(div_left);
        for(i = 0; i < div_right.length; i++) {
            document.getElementById('left').appendChild(div_right[i]);
        }
        for(i = 0; i < div_left.length; i++) {
            document.getElementById('right').appendChild(div_left[i]);
        }
    }

    function imageMix() {  //second link
        var mixed_images, div_target, i;
        mixed_images = model.imageMix();   //get mixed array from model
        div_target = document.getElementById('pic');
        for(i = 0; i < mixed_images.length; i++) {
            div_target.appendChild(mixed_images[i]);
        }
    }

    function hideLinks() {  //third link
        var links_array = document.getElementById('header').getElementsByTagName('a');

        function toggle() {   // show-hide
            for(var i = 0; i < links_array.length; i++) {
                links_array[i].style.display = (links_array[i].style.display == 'none') ? '' : 'none';
            }
        }

        toggle();   //hide
        setTimeout(toggle, 3000);  //show after 3 seconds
    }
	return this;
}
