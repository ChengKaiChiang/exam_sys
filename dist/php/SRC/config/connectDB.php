<?php
date_default_timezone_set("asia/taipei");

class db
{
    private $dbhost = '127.0.0.1';
    private $dbuser = 'root';
    private $dbpass = 'admin';
    private $dbname = 'exam_system';

    public function connect()
    {
        $mysql_conn = "mysql:host=$this->dbhost;dbname=$this->dbname";
        $db = new PDO($mysql_conn, $this->dbuser, $this->dbpass);

        //set error mode
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $db;
    }
}
