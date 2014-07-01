document.addEventListener( "DOMContentLoaded", ready, false );

function ready() {
    var tableContent = document.getElementById('table-content'), //tbody
            ageAsc = true,   //возростание/убывание
            nameAsc = true;
            
    document.getElementById('age').addEventListener('click', sorting, false);
    document.getElementById('name').addEventListener('click', sorting, false);
    
    function sorting(e) {
        var target = e.target || window.event.srcElement;
        
        //получение массива tr тегов (строк)
        var arrRows = [];
        for(var i = 0; i < tableContent.children.length; i++) {
            arrRows.push(tableContent.children[i]);
        }
        
        //определяем вид ф-ции для сортировки
        var compare; 
//        console.dir(target);
        if(target.id === 'age' && ageAsc) {
            compare = function(rowA, rowB) {
                return rowA.cells[target.cellIndex].innerHTML - rowB.cells[target.cellIndex].innerHTML;
            };
            ageAsc = false;            
        } else if(target.id === 'age') {
            compare = function(rowA, rowB) {
                return  rowB.cells[target.cellIndex].innerHTML - rowA.cells[target.cellIndex].innerHTML;
            };
            ageAsc = true;
        }
        
        if(target.id === 'name' && nameAsc) {
            compare = function(rowA, rowB) {
              return rowA.cells[target.cellIndex].innerHTML > rowB.cells[target.cellIndex].innerHTML ? 1 : -1;
            };
            nameAsc = false;
        } else if(target.id === 'name') {
            compare = function(rowA, rowB) {
              return rowB.cells[target.cellIndex].innerHTML > rowA.cells[target.cellIndex].innerHTML ? 1 : -1;
            };
            nameAsc = true;
        }
                
        target.innerHTML = addSymbol(target.innerHTML); //пририсовать стрелку к заголовку
        arrRows.sort(compare);
        
        //удаление всего содержимого
        while (tableContent.firstChild) {
            tableContent.removeChild(tableContent.firstChild);
        }

        //добавление отсортированноего
        for (var i = 0; i < arrRows.length; i++) {
            tableContent.appendChild(arrRows[i]);
        }
    }
    
}


function addSymbol(str) {
    var symbols = '↓↑',
        last = str[str.length-1];
    if (str) {
        if(last === symbols[0]) {
            str = str.substring(0, str.length - 1);
            str += symbols[1];
        } else if(last === symbols[1]) {
            str = str.substring(0, str.length - 1);
            str += symbols[0];
        } else {
            str += symbols[0];
        }
    } else {
        console.warn('Params error!');
    }
    return str;
}