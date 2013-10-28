document.onreadystatechange = function() {
    if(this.readyState === "complete") {
        afterLoad();
    }
};

function afterLoad(){
    "use strict";
    var div_time = document.getElementById("time"),
        div_container = document.getElementById("container"),
        display_seconds = false,
        display_date = false;

    //запрет вызова контекстного меню
    function preventDefault(event) {

        if (event.preventDefault) { //Для всех человеческих браузеров
            event.preventDefault();
        } else { //для IE<9
            event.returnValue = false;
        }
    }

    bind(div_container, 'contextmenu', function(e) {
        preventDefault(e);
    });
//    div_container.addEventListener('contextmenu', function(e) {
//        preventDefault(e);
//    }, false);
    bind(div_time, 'click', changeTimeFormat);
    bind(div_time, 'contextmenu', toogleDate);
//    div_time.addEventListener('click', changeTimeFormat, false);
//    div_time.addEventListener('contextmenu', toogleDate, false);

    bind(div_container, 'mousedown', drag);
//    div_container.addEventListener('mousedown', drag, false);
    displayTime();
    setInterval(displayTime, 1000);



    function getTime(display_seconds, display_date) {
        var time = new Date(),
            result = '';

        if(display_seconds && display_date) {
            result = time.format("HH:MM:ss<br/>yyyy mmmm dd");
        } else if(display_seconds && !display_date) {
            result = time.format("HH:MM:ss");
        } else if(!display_seconds && display_date){
            result = time.format("HH:MM<br/>yyyy mmmm dd");
        } else {
            result = time.format("HH:MM");
        }

        return result;
    }

    function displayTime() {
        div_time.innerHTML = getTime(display_seconds, display_date);
    }

    function changeTimeFormat() {
        display_seconds = !display_seconds;
        displayTime();
    }

    function toogleDate() {
        display_date = !display_date;
        displayTime();
    }

    function bind(domNode, eventName, handler) {
        //обертка для переданной ф-ции, которая добавляет в контекст вызова ф-ции кроссбраузерное событие
        var handlerWrapper = function(event) { //
            event = fixEvent(event);
            return handler.call(domNode, event);
        };

        //кроссбраузерное навешивание события
        if (domNode.addEventListener) {
            domNode.addEventListener(eventName, handlerWrapper, false);
        } else if (domNode.attachEvent) {
            domNode.attachEvent('on' + eventName, handlerWrapper);
        }
        return handlerWrapper;
    }

    function fixEvent(e) {
        var html = document.documentElement,
            body = document.body;

        e = e || window.event;

        //добавление стандартных свойств: target, pageX/pageY, which
        if (!e.target) e.target = e.srcElement;

        if (e.pageX == null && e.clientX != null ) { // если нет pageX..


            e.pageX = e.clientX + (html.scrollLeft || body && body.scrollLeft || 0);
            e.pageX -= html.clientLeft || 0;

            e.pageY = e.clientY + (html.scrollTop || body && body.scrollTop || 0);
            e.pageY -= html.clientTop || 0;
        }

        if (!e.which && e.button) {
            e.which = e.button & 1 ? 1 : ( e.button & 2 ? 3 : ( e.button & 4 ? 2 : 0 ) )
        }

        return e;
    }

    function getCoords(elem) {
        var box = elem.getBoundingClientRect(),
            body = document.body,
            docElem = document.documentElement,
        //прокрутка страницы
            scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop,
            scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft,
        //в IE документ может быть смещен относительно левого верхнего угла
            clientTop = docElem.clientTop || body.clientTop || 0,
            clientLeft = docElem.clientLeft || body.clientLeft || 0,
        //координаты + прокрутка - смещение
            top  = box.top +  scrollTop - clientTop,
            left = box.left + scrollLeft - clientLeft;

        return { top: Math.round(top), left: Math.round(left) };
    }

    function drag(event) {
        var self = this,
        //нормализированный объект события
            e = fixEvent(event),
        //координаты элемента
            coords = getCoords(this),
        //позиционирование мышки на элементе
            shiftX = e.pageX - coords.left,
            shiftY = e.pageY - coords.top;

        opasity(this, {start: 1, end: 0.6, time: 100});
        //перерисовка элемента в абсолютных координатах
        this.style.position = 'absolute';
        document.body.appendChild(this);
        moveAt(e);

        this.style.zIndex = 1000;

        function moveAt(e) {
            self.style.left = e.pageX - shiftX + 'px';
            self.style.top = e.pageY - shiftY+ 'px';
        }

        document.onmousemove = function(e) {
            e = fixEvent(e);
            moveAt(e);
        };

        //drop
        this.onmouseup = function() {
            opasity(this, {start: 0.6, end: 1, time: 100});
            document.onmousemove = self.onmouseup = null;
        };
    }

    //отмена штатного Drag’n’Drop
    div_container.ondragstart = function() {
        return false;
    };

//    прозрачность
    function opasity(element, param_obj) {
        if(param_obj.start > 1 && param_obj.end > 1) {
            param_obj.start /= 100;
            param_obj.end /= 100;
        }
        var appear_disappear = (param_obj.end > param_obj.start),
            curent_opasity = param_obj.start,
            delta_opasity = 0.01,
            delta_time = Math.abs(Math.round(param_obj.time / ((param_obj.end - param_obj.start) / delta_opasity))),
            timer_handler;

        element.style.opacity = param_obj.start;
        element.style.filter='alpha(opacity='+param_obj.start*100+')';
        timer_handler = setInterval(function() {

            curent_opasity = appear_disappear ? curent_opasity + delta_opasity : curent_opasity - delta_opasity;
            element.style.opacity = curent_opasity;
            element.style.filter='alpha(opacity='+curent_opasity*100+')';

            if(appear_disappear) {
                if(curent_opasity >= param_obj.end) {
                    clearInterval(timer_handler);
                }
            } else {
                if(curent_opasity <= param_obj.end) {
                    clearInterval(timer_handler);
                }
            }
        }, delta_time);
    }
}