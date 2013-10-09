'use strict';
function AjaxRunner() {
    this.init = function() {
        document.getElementById('send').addEventListener('click', greatings, false);
    };

    function greatings() {
        var target_page = 'php_inc/answer.inc.php';
        asyncRequest('geT', target_page, {name: 'Ivan', surname: 'Ivanov', age: 12, async: true});
    }

    function asyncRequest(requestType, targetPage, paramObj) {
        function getXmlHttp() {
            var xmlhttp;
            try {
                xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (E) {
                    xmlhttp = false;
                }
            }
            if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
                xmlhttp = new XMLHttpRequest();
            }
            return xmlhttp;
        }

        var xmlhttp = getXmlHttp(),
            params = '';
        requestType = requestType.toUpperCase();
        for(var key in paramObj) {
            var val = paramObj[key];
            params += key + '=' + encodeURIComponent(val) + '&';
        }
        params = params.slice(0, -1);

        if(requestType === 'POST'){
            xmlhttp.open('POST', targetPage, true);
        }else if(requestType === 'GET'){
            xmlhttp.open('GET', targetPage + '?' + params, true);
        }else{
            console.log('Wrong request type!');
            return;
        }

        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {
                if(xmlhttp.status == 200) {
                    document.getElementById('answer').innerHTML = xmlhttp.responseText;
                }
            }
        };

        if(requestType === 'POST'){
            xmlhttp.send(params);
        }else{
            xmlhttp.send(null);
        }
    }
}

var ajaxObj = new AjaxRunner();

document.onreadystatechange = function() {
    if(this.readyState == "complete") {
        ajaxObj.init();
    }
};

