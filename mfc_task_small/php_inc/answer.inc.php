<?php
header('Content-type: text/html; charset=utf-8');
if(isset($_POST['name'])) {
    //echo $_POST['name'].' привет!</br>';

    /*echo 'GET: ';
    var_dump($_GET);
    echo '</br>';
    echo 'POST: ';
    var_dump($_POST).'</br>';
    echo '</br>';*/


}

echo 'GET: </br>';
foreach ($_GET as $key => $value) {
    echo "$key => $value<br />\n";
}
echo '</br>';

echo 'POST: </br>';
foreach ($_POST as $key => $value) {
    echo "$key => $value<br />\n";
}
echo '</br>';