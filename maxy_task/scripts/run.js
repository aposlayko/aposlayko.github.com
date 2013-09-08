var controller = new Controller();

document.onreadystatechange = function() {
    if(this.readyState == "complete") {
        controller.init();    //runner
    }
};