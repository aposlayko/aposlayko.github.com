/*
Реализовать галерею (можно обойтись без прототипов. Но на прототипах будет удобнее). Одна галерея выглядеть должна
примерно так http://jsfiddle.net/ArcQe/. Эта домашка, как и та, что про контекстное меню - для вашего портфолию.

По требованиям:
Использовать разные изображения для превьюшек и большого изображения (в этом и заключается цимес)
Автоматически листать на следующее изображение через 5 секунд
Не листать галерею после того, как пользователь кликнул на одну из превьюшек
Количество галерей на странице может быть любым
Количество изображений в галерее может быть любым
Галерею можно листать с клавиатуры. Но только одну из всех галерей на странице. Листается та, с которой
пользователь работал в последний раз. Или над которой находится мышка в данный момент.
Должно работать в 8 ие.
*/
'use strict';
function bindReady(handler){
    var called = false;

    function ready() {
        if (called) return;
        called = true;
        handler()
    }

    function tryScroll(){
        if (called) return;
        if (!document.body) return;
        try {
            document.documentElement.doScroll("left");
            ready()
        } catch(e) {
            setTimeout(tryScroll, 0)
        }
    }

    if ( document.addEventListener ) {
        document.addEventListener( "DOMContentLoaded", function(){
            ready();
        }, false );
    } else if ( document.attachEvent ) {

        if ( document.documentElement.doScroll && window == window.top ) {

            tryScroll();
        }

        document.attachEvent("onreadystatechange", function(){

            if ( document.readyState === "complete" ) {
                ready()
            }
        });
    }

    if (window.addEventListener)
        window.addEventListener('load', ready, false);
    else if (window.attachEvent)
        window.attachEvent('onload', ready);}
bindReady(afterLoad);

function isArray (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

function contains(firstArr, secondArr) {
    var isInclude = true,
        i, j;

    if(isArray(firstArr) && isArray(secondArr)) {
        if(firstArr.length >= secondArr.length) {
            for(i = 0; i < secondArr.length; i++) {
                for(j = 0; j < firstArr.length; j++) {
                    if(firstArr[j] === secondArr[i]) {
                        break;
                    } else if(j === firstArr.length -1) {
                        isInclude = false;
                    }
                }
            }
        }
    } else {
        console.log("wrong arguments");
    }
    return isInclude;
}

function addClass(node, className) {
    if(node.nodeType ===1 && className && typeof className === "string") {
        if(hasClass(node, className)) {
            console.log('class already exist');
        } else {
            if(node.className === '') {
                node.className = className;
            } else {
                node.className += ' ' + className;
            }
        }
    } else {
        console.log('Wrong parametrs');
    }
}

function hasClass(node, className) {
    var classArray = [],
        parametrsArray,
        regExp = /\s+/,
        result;

    if(node.nodeType ===1 && className) {
        if(isArray(className)) {
            parametrsArray = className;
        } else if (typeof className === 'string') {
            parametrsArray = [className];
        } else {
            console.log('Wrong className parametr');
        }

        classArray = node.className.split(regExp);
        result = contains(classArray, parametrsArray);
    } else {
        console.log('Wrong parametrs');
    }
    return result;
}

function removeClass(node, className) {
    var classArray = [],
        parametrsArray,
        regExp = /\s+/,
        i, j;

    if(node.nodeType ===1 && className) {
        if(isArray(className)) {
            parametrsArray = className;
        } else if (typeof className === 'string') {
            parametrsArray = [className];
        } else {
            console.log('Wrong className parametr');
        }

        classArray = node.className.split(regExp);
        for(i = 0; i < parametrsArray.length; i++) {
            for(j = 0; j < classArray.length; j++) {
                if(parametrsArray[i] === classArray[j]) {
                    classArray.splice(j, 1);
                    console.log(parametrsArray[i] + ' deleted');
                }
            }
        }

        node.className = '';
        for(i = 0; i < classArray.length; i++) {
            node.className += classArray[i] + ' ';
            if(i === classArray.length - 1) {
                node.className = node.className.slice(0, -1);
            }
        }
    }
}



function afterLoad() {

    var hrefArr = ['img/fire/img1.jpg',
                   'img/fire/img2.jpg',
                   'img/fire/img3.jpg',
                   'img/fire/img4.jpg',
                   'img/fire/img5.jpg',
                   'img/fire/img6.jpg',
                   'img/fire/img7.jpg'];

    function Gallery() {
        var images = [],
            numberOfGallery,
            path = 'img/fire/';

        this.autoinit = function() {
            var i = 1,
                tempImg;

            while(true) {
                tempImg = new Img(path + 'img' + i + '.jpg');
                if(tempImg.isInit()){
                    images.push(tempImg);
                    i++;
                } else {
                    alert('somthig wrong!');
                    break;
                }
            }

            Gallery.prototype.countGaleries++;
            numberOfGallery = this.countGaleries;
        };

        this.init = function(hrefArr) {
            //сюда зафигачить обработчики событий (кроссбраузерные)
            var length = hrefArr.length, i;
            for(i = 0; i < length; i++) {
                images.push(new Img(hrefArr[i]));
            }
            Gallery.prototype.countGaleries++;
            numberOfGallery = this.countGaleries;
        };

        this.render = function(outerNode) {
            var wrap = document.createElement('div'),
                bigImgDiv, preview, ul;

            addClass(wrap, 'gall');
            wrap.id = 'gallery-'+numberOfGallery;

            if(outerNode.nodeType ===1/* && typeof indexOfGallery === "string"*/) {
                bigImgDiv = document.createElement('div');
                addClass(bigImgDiv, 'big-img');
                bigImgDiv.appendChild(images[0].get());

                preview = document.createElement('div');
                addClass(preview, 'preview');
                //тут добавить список и заложить циклом уменьшенные картинки

                wrap.appendChild(bigImgDiv);
                wrap.appendChild(preview);
            }
            return outerNode.appendChild(wrap);
        };

        function next(){}
        function prew(){}
        function show(indexImage){}

        return this;
    }

    Gallery.prototype.countGaleries = 0;

    function Img(src) {
        var imgElement = document.createElement('img'),
            resultInit = true;

        function init(src) {
            imgElement.onerror = function(){
                resultInit = false;
                //console.log(isInit());
            };
            imgElement.alt = 'img';
            imgElement.src = src;
        }
        init(src);

        //testing function
        this.isInit = function() {
            return resultInit;
        };

        Img.prototype.render = function(outerNode) {
            return outerNode.appendChild(imgElement);
        };

        // getter/setter
        Img.prototype.image = function(src) {
            if(src) {
                if(typeof src === 'string') {
                    init(src);
                    return true;
                } else {
                    return false;
                }

            } else {
                return imgElement;
            }
        };

        return this;
    }


//    var gall = new Gallery();
//    gall.autoinit();

    //Первая картинка существует
//    var img = new Img('http://d36xtkk24g8jdx.cloudfront.net/bluebar/92a81f2/images/homepage/screenshot1.jpg');
//    img.render(document.body);
//    //Вторая не существует
//    var img2 = new Img('http://d36xtkk24g8jdx.cloudfront.net/vasia.jpg');
    var gal = new Gallery();
    //gal.autoinit();



}