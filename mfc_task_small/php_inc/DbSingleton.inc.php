<?php
header('Content-type: text/html; charset=utf-8');
define("DB_USER", "user");
define("DB_PASSWORD", "password");

class DbSingleton {
    //экземпляр класса
    private static $instance;

    //дескриптор на БД
    private static $db;

    //запрет на создание через конструктор
    private  function __construct() {
        try{
            //self::$db = new PDO('mysql:host=localhost;dbname=testbase', DBUSER, DBPASSWORD, null);
            $db = new PDO('mysql:host=localhost;', DB_USER, DB_PASSWORD);
            $sql = 'CREATE DATABASE IF NOT EXISTS `testbase`';
            $db->exec($sql);
            $sql = "CREATE TABLE IF NOT EXISTS `test_table` (id INTEGER PRIMARY KEY, name CHAR(50))";
            $db->exec($sql);
            $sql = NULL;
            self::$db = new PDO('mysql:host=localhost;dbname=testbase', DB_USER, DB_PASSWORD);
        } catch(PDOException $e) {
            echo 'Connection faild: '.$e->getMessage();
        }
    }

    //запрет на клонирование
    private function __clone() {}

    //запрет на создание через unserialize
    private function __wakeup() {}

    //возврат экземпляра класса
    public static function getInstance() {
        if(is_null(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    //запросы
    public function prepare($statement, $driver_options = array()) {
        return self::$db->prepare($statement, $driver_options);
    }

    public function query($sql) {
        return self::$db->query($sql);
    }
}

// Пример использования
$TestObject = DbSingleton::getInstance();
if(!$TestObject) {

}
//$st = $TestObject->prepare('SELECT * FROM `table`');
//$st->execute();