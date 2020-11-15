<?php

date_default_timezone_set("asia/taipei");

class DBHelp
{
    private $_db = null;
    private $_serverHost = "127.0.0.1";

    public function __construct()
    {
        if ($this->_db === null) {
            try {
                $this->_db = new PDO("mysql:host=$this->_serverHost;dbname=exam_system", "root", "admin");
                $this->_db->exec("set names utf8");
            } catch (PDOException $e) {
                echo "Error :" . $e->getMessage();
            }
        }
    }

    protected function querySQL($sql)
    {
        if ($this->_db !== null) {
            return $this->_db->prepare($sql);
        }
        return null;
    }
}
