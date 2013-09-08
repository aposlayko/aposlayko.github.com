function Model() {
    var image_array = [];

    this.initModel = function() {    //loading images into model
        image_array = document.getElementById('pic').getElementsByTagName('img');
    };

    this.imageMix = function() {    //mixing images in model
        var buffer_image, i, rand_number;
        for (i = 0; i < image_array.length; i++) {
            rand_number = Math.floor(Math.random()*6);
            buffer_image = image_array[i];
            image_array[i] = image_array[rand_number];
            image_array[rand_number] = buffer_image;
        }
        return image_array;
    };
	return this;
}