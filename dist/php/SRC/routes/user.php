<?php
session_start();
require_once "../SRC/config/connectDB.php";
require_once "../SRC/config/Account.php";

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;


//Get All user
$app->get('/api/user', function (Request $request, Response $response) {
    $jdata = array();
    $data = array();
    $sta = "0";

    $db = new db();
    $db = $db->connect();
    $sql = "SELECT * FROM user";
    $res = $db->prepare($sql);
    $res->execute();
    if ($res->rowCount() > 0) {
        $sta = "1";
        foreach ($res->fetchAll(PDO::FETCH_ASSOC) as $v) {
            $data[] = $v;
        }
    } else {
        $sta = "0";
    }
    $jdata["0"] = array("sta" => $sta, "data" => $data);
    echo json_encode($jdata);
});

$app->post('/api/login', function (Request $request, Response $response, array $args) {
    session_unset();
    setcookie('uname', "", 0, "/");
    setcookie('permission', "", 0, "/");
    $jdata = array();

    $param = $request->getParsedBody();
    $acc = $param['acc'];
    $pwd = $param['pwd'];
    if (empty($acc) || empty($pwd)) {
        $data = 'Please enter your account number and password';
    } else {
        $login = new Account();
        $data = $login->loginAccount($acc, $pwd);
        $jdata[] = array("data" => $data);
        echo json_encode($jdata);
    }
});

$app->post('/api/check_login', function (Request $request, Response $response, array $args) {
    $jdata = array();
    $data = array();
    $sta = 0;

    $param = $request->getParsedBody();
    $acc = $param['acc'];

    if (!empty($acc) && $_SESSION['_uid'] == $acc) {
        $sql = "SELECT `name`, `token` FROM user WHERE id=:id";
        //get db object
        $db = new db();
        //Connect
        $db = $db->connect();
        $res = $db->prepare($sql);
        $res->bindParam(':id', $acc, PDO::PARAM_STR);
        $res->execute();

        if ($res->rowCount() > 0) {
            foreach ($res->fetchAll(PDO::FETCH_ASSOC) as $v) {
                if (!empty($_COOKIE['PHPSESSID']) && !empty($v['token'])) {
                    ($_COOKIE['PHPSESSID'] == $v['token']) ? $sta = 1 : $sta = 0;
                    $data[] = $v;
                } else {
                    $sta = 0;
                }
            }
        }
    }
    $jdata[] = array("sta" => $sta, "data" => $data);
    echo json_encode($jdata);
});

//add 
$app->post('/api/user/add', function (Request $request, Response $response, array $args) {
    $param = $request->getParsedBody();
    $id = $param[0]['id'];
    $pwd = $param[0]['pwd'];
    $name = $param[0]['name'];
    $tel = $param[0]['tel'];
    $mail = $param[0]['mail'];
    $permission = $param[0]['permission'];

    $sql = "INSERT INTO user (id,pwd,name,tel,email,permission) VALUES
    (:id, :pwd, :name, :tel, :mail, :permission)";

    try {
        //get db object
        $db = new db();
        //Connect
        $db = $db->connect();

        $stmt = $db->prepare($sql);

        $stmt->bindParam(':id',           $id);
        $stmt->bindParam(':pwd',          $pwd);
        $stmt->bindParam(':name',         $name);
        $stmt->bindParam(':tel',          $tel);
        $stmt->bindParam(':mail',         $mail);
        $stmt->bindParam(':permiission',  $permiission);


        $stmt->execute();

        echo '{"notice":{"text":"user added!"}';
    } catch (PDOException $e) {
        echo '{"error":{"text": ' . $e->getMessage() . '}';
    }
});

//del
$app->post('/api/user/del', function (Request $request, Response $response, array $args) {
    $jdata = array();
    $sta = "0";

    $param = $request->getParsedBody();
    $id = $param['ID'];

    $sql = "DELETE FROM `user` WHERE id = :id";
    try {
        //get db object
        $db = new db();
        //Connect
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $sta = "1";
        $jdata["0"] = array("sta" => $sta);
        echo json_encode($jdata);
    } catch (PDOException $e) {
        echo '{"error":{"text": ' . $e->getMessage() . '}';
    }
});
