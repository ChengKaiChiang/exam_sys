<?php
require_once "../SRC/config/connectDB.php";
require_once "../SRC/config/Account.php";

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

//get all new user
$app->get('/api/new_user', function (Request $request, Response $response) {
    $jdata = array();
    $data = array();
    $sta = "0";

    $db = new db();
    $db = $db->connect();
    $sql = "SELECT * FROM new_user";
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

$app->post('/api/new_user/add', function (Request $request, Response $response, array $args) {
    $jdata = array();
    $sta = "0";

    $param = $request->getParsedBody();
    $id = $param['ID'];
    $pwd = $param['Password'];
    $name = $param['Name'];
    $tel = $param['Tel'];
    $mail = $param['Mail'];

    $add = new Account();
    $data = $add->createAccount($id, $pwd, $name, $tel, $mail);
    if ($data) {
        $sta = 1;
    } else {
        $sta = 0;
    }
    $jdata["0"] = array("sta" => $sta, "data" => $data);
    echo json_encode($jdata);
});

$app->post('/api/new_user/review', function (Request $request, Response $response, array $args) {
    $jdata = array();
    $sta = "0";
    $param = $request->getParsedBody();
    $id = $param['ID'];
    $permission = $param['Permission'];

    $db = new db();
    $db = $db->connect();
    $sql = "SELECT * FROM new_user WHERE id =:id";
    $res = $db->prepare($sql);
    $res->bindParam(':id', $id);
    $res->execute();

    if ($res->rowCount() > 0) {
        foreach ($res->fetchAll(PDO::FETCH_ASSOC) as $v) {
            $pwd = $v['pwd'];
            $name = $v['name'];
            $tel = $v['tel'];
            $mail = $v['mail'];

            $sql = "INSERT INTO user (id, pwd, name, tel, mail, permission) VALUES (:id, :pwd, :name, :tel, :mail, :permission)";
            $res1 = $db->prepare($sql);
            $res1->bindParam(':id', $id);
            $res1->bindParam(':pwd', $pwd);
            $res1->bindParam(':name', $name);
            $res1->bindParam(':tel', $tel);
            $res1->bindParam(':mail', $mail);
            $res1->bindParam(':permission', $permission);
            $res1->execute();

            $sql = "DELETE FROM `new_user` WHERE id=:id";
            $res2 = $db->prepare($sql);
            $res2->bindParam(':id', $id);
            $res2->execute();
            $sta = "1";
        }
    } else {
        $sta = "0";
    }
    $jdata["0"] = array("sta" => $sta);
    echo json_encode($jdata);
});
