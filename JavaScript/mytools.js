'use strict';

//проверка на входное значение - массив
function isArray (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

//проверка на входное значение - объект
function isObject (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}



/*
contains содержит ли массив firstArr, элементы массива secondArr
param1: [Array]
param2: [Array]
return: [boolean]
использует функции: isArray
*/
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



/*
addClass добавляет класс className к дом-элементу node
param1: [DOM element]
param2: [string]
return: [void]
использует функции: hasClass
*/
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



/*
hasClass проверяет наличие класса или массива классов className в дом-элементе node
param1: [DOM element]
param2: [string | Array]
return: [boolean]
использует функции: isArray, contains
*/
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



/*
removeClass удаляет класс или массив классов className в дом-элементе node
param1: [DOM element]
param2: [string | Array]
return: [boolean]
использует функции: isArray
*/
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



/*
next кросбраузерная реализация перехода к следующему дом-элементу на одном уровне вложенности (братскому, сестринскому, nextSibling)
param1: [DOM element]
return: [DOM element]
использует функции: -
*/
var next = (function(){
    var TEXT_NODE_TYPE = 3;
    var COMMENT_NODE_TYPE = 8;

    return function (node) {
        var nextSibling = node;
        do {
            nextSibling = nextSibling.nextSibling;          
        } while(nextSibling && (nextSibling.nodeType === TEXT_NODE_TYPE || nextSibling.nodeType === COMMENT_NODE_TYPE))
        return nextSibling;
    }
    
}());



/*
closest ф-ция возвращает ближайший родительский элемент, удовлетворяющий
условиям ф-ции test_func вплоть до ограничивающего элемента last_parent
param1: [DOM element]
param2: [function]
param3: [DOM element]
return: [DOM element]
использует функции: -
*/
function closest (node, test_func, last_parent) {
    while (node && node !== last_parent) {
        if (test_func(node)) {
            return node
        }
        node = node.parentNode;
    }
}



/*
isLink ф-ция возвращающая DOM элемент в случае если он или его родитель
являются ссылкой
param1: [DOM element]
return: [DOM element]
использует функции: closest
*/
function isLink (node) {
    return closest(node, function(node) {
        return node.nodeName === 'A' && node.href;
    });
}


/*
mediator объект отвечающий за подписку, отписку событий и их выполнение
содержит методы:

trigger - вызов события eventName с параметрами data
param1: [string]
[param2]: [function]
return: void
использует функции: -

subscribe - подписка на событие eventName с функцией handler
param1: [string]
param2: [function]
return: void
использует функции: - 

unsubscribe - отписка от события eventName функции handlerReference
param1: [string]
param2: [function]
return: void
использует функции: - 
*/
var mediator = (function () {
    var subscribtions = { }, //hashmap
        indexHandler;
        return {
            trigger: function (eventName, data) {
                //Есть ли подписчики
                //оператор in проверяет есть ли eventName в объекетe subsritions - (eventName in subsritions) //булевкое значение
                //(альтернативный способ subsritions.hasOwnProperty(event(Name), но он не учитывает наследование
                if (subscribtions.hasOwnProperty(eventName)) {
                    for (var i = 0; i < subscribtions[eventName].length; i++) {
                        subscribtions[eventName][i].call(window, data); //window идет контектом для того чтоб через объект нельзя было достучатся до соседних событий
                    }
                }
            },
            subscribe: function (eventName, handler) {
                if (subscribtions.hasOwnProperty(eventName)) {
                    //если ключ есть - добавляем
                    subscribtions[eventName].push(handler);
                } else {
                    //если ключа нет - создаем
                    subscribtions[eventName] = [handler];
                }
            },
            unsubscribe : function (eventName, handlerReference) {
                if (subscribtions.hasOwnProperty(eventName)) {
                    if(!handlerReference) {
                        //delete all handlers
                        delete subscribtions[eventName];
                    } else {
                        indexHandler = subscribtions[eventName].indexOf(handlerReference);

                        if(indexHandler === -1) {
                            console.log("It's not same handler in this event");
                            return;
                        }

                        subscribtions[eventName].splice(indexHandler, 1);
                    }
                } else {
                    console.log("This event dostn't exist");
                }
            }
        };
}());

//bind навешивает обработчик handler на событие eventName на элемент domNode
function bind(domNode, eventName, handler) {
    //обертка для переданной ф-ции, которая добавляет в контекст вызова ф-ции кроссбраузерное событие
    var handlerWrapper = function(event) { 
        event = event || window.event;  //нормализация
        if (!event.taget && event.srcElement) {
            event.taget = event.srcElement;
        }
        return handler.call(domNode, event);
    };

    //кроссбраузерное навешивание события
    if (domNode.addEventListener) { 
        domNode.addEventListener(eventName, handlerWrapper, false);
    } else if (domNode.attachEvent) {
        domNode.attachEvent('on' + eventName, handlerWrapper);
    }
    //возвращает ссылку на обертку ф-ции, которую надо хранить
    //если хочешь потом снять обработчик
    return handlerWrapper; 
}
/*
Пример использования
clicker = bind(document.docmentNode, 'click', function (event) {
    console.log(event.taget);
});
*/



//preventDefault отменяет действия события по умолчанию, 
//например для клика по ссылке это переход на указанный ресурс
//используется сразу после получения кроссбраузерного события
function preventDefault(event) {
    
    if (event.preventDefault) { //Для всех человеческих браузеров
        event.preventDefault();
    } else { //для IE<9
        event.returnValue = false;
    }
}



//stopPropagation - остановка распространения события (всплытия/погружения)
//используется сразу после получения кроссбраузерного события
function stopPropagation(event) {   
    if (event.stopPropagation) { //Для всех человеческих браузеров
        event.stopPropagation();
    } else {
        event.cancelBubble = true; //для IE<9
    }
}







