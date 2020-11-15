<?php
require_once "DBHelp.php";

define("_HASH_COST", 12);

class Account extends DBHelp
{
    public function __construct()
    {
        parent::__construct();
    }

    protected function querySQL($sql)
    {
        return parent::querySQL($sql);
    }

    public function createAccount($acc, $pwd, $name, $tel, $mail)
    {
        if ($this->readnewAccount($acc) || $this->readAccount($acc)) {
            return false;
        } else {
            $hashAlgorithm = PASSWORD_DEFAULT;
            $hashArray = ['cost' => _HASH_COST];
            $rehash = password_needs_rehash($pwd, $hashAlgorithm, $hashArray);
            if ($rehash) {
                $newHash = password_hash($pwd, $hashAlgorithm, $hashArray);
                $sql = "INSERT INTO new_user (id, pwd, name, tel, mail) VALUES (:id, :pwd, :name, :tel, :mail)";
                $res = $this->querySQL($sql);
                $res->bindParam(':id', $acc);
                $res->bindParam(':pwd', $newHash);
                $res->bindParam(':name', $name);
                $res->bindParam(':tel', $tel);
                $res->bindParam(':mail', $mail);
                $res->execute();
            }

            return true;
        }
    }

    public function readnewAccount($acc_id)
    {
        $sql = "SELECT * From new_user WHERE id =:id";;
        $res = $this->querySQL($sql);
        $res->bindParam(':id', $acc_id, PDO::PARAM_STR);
        $res->execute();

        if ($res->rowCount() > 0) {
            return $res->fetchAll(PDO::FETCH_ASSOC);
        } else {
            return false;
        }
    }

    public function readAccount($acc_id)
    {
        $sql = "SELECT * From user WHERE id =:id";
        $res = $this->querySQL($sql);
        $res->bindParam(':id', $acc_id, PDO::PARAM_STR);
        $res->execute();

        if ($res->rowCount() > 0) {
            return $res->fetchAll(PDO::FETCH_ASSOC);
        } else {
            return false;
        }
    }

    public function updateAccountPwd($acc, $pwd)
    {
        $account = $this->readAccount($acc);
        if ($account) {
            $hashAlgorithm = PASSWORD_DEFAULT;
            $hashArray = ['cost' => _HASH_COST];
            $rehash = password_needs_rehash($pwd, $hashAlgorithm, $hashArray);
            if ($rehash) {
                $newHash = password_hash($pwd, $hashAlgorithm, $hashArray);
                $sql = "UPDATE user SET pwd=:PWD WHERE id=:AID";
                $res = $this->querySQL($sql);
                $res->bindParam(':AID', $acc, PDO::PARAM_STR);
                $res->bindParam(':PWD', $newHash, PDO::PARAM_STR);
                $res->execute();
            }
            return true;
        } else {
            return 'No such account';
        }
    }

    public function delAccount($acc)
    {
        if ($this->readAccount($acc)) {
            $sql = "DELETE FROM Users WHERE ID = :AID";
            $res = $this->querySQL($sql);
            $res->bindParam(':AID', $acc, PDO::PARAM_STR);
            $res->execute();

            return true;
        } else {
            return 'No such account';
        }
    }

    private function updateAccountToken($acc)
    {
        $sql = "UPDATE user SET Token=:TOKEN WHERE id=:AID";
        $res = $this->querySQL($sql);
        $res->bindParam(':AID', $acc, PDO::PARAM_STR);
        $res->bindParam(':TOKEN', $_COOKIE['PHPSESSID'], PDO::PARAM_STR);
        $res->execute();
    }

    public function loginAccount($acc, $pwd)
    {
        $account = $this->readAccount($acc);
        if ($account) {
            foreach ($account as $v) {
                if (password_verify($pwd, $v['pwd'])) {
                    $this->updateAccountToken($acc);
                    $this->updateAccountPwd($acc, $pwd);

                    $_SESSION['_uid'] = $acc;
                    setcookie('uname', base64_encode($acc), 0, '/');
                    setcookie('permission', $v['permission'], 0, '/');
                    return '登入成功';
                } else {
                    return 'account or password incorrect';
                }
            }
        } else {
            return 'No such account';
        }
    }
}
