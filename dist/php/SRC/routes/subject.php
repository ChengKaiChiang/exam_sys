<?php
require_once "../SRC/config/connectDB.php";

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

//get all subject
$app->get('/api/subject', function (Request $request, Response $response) {
    $jdata = array();
    $data = array();
    $sta = "0";

    $sql = "SELECT * FROM `subject`";
    //get db object
    $db = new db();
    //Connect
    $db = $db->connect();

    $stmt = $db->prepare($sql);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $sta = 1;
        foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $v) {
            $data[] = $v;
        }
    } else {
        $sta = "0";
    }
    $jdata["0"] = array("sta" => $sta, "data" => $data);
    echo json_encode($jdata);
});

//get all subject
$app->get('/api/subject/getName', function (Request $request, Response $response) {
    $jdata = array();
    $data = array();
    $sta = "0";

    $sql = "SELECT `Name` FROM `subject`";
    //get db object
    $db = new db();
    //Connect
    $db = $db->connect();

    $stmt = $db->prepare($sql);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $sta = 1;
        foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $v) {
            $data[] = $v;
        }
    } else {
        $sta = "0";
    }
    $jdata["0"] = array("sta" => $sta, "data" => $data);
    echo json_encode($jdata);
});


//insert subj
$app->post('/api/subject/add', function (Request $request, Response $response, array $args) {
    $jdata = array();
    $sta = "0";

    $param = $request->getParsedBody();
    $subject_name = $param['Name'];

    try {
        //get db object
        $db = new db();
        //Connect
        $db = $db->connect();
        $sql = "SELECT * From subject WHERE subject_name =:subject_name";
        $res = $db->prepare($sql);
        $res->bindParam(':subject_name', $subject_name, PDO::PARAM_STR);
        $res->execute();


        if ($res->rowCount() <= 0) {
            $sta = "1";
            $sql = "INSERT INTO subject (subject_name) VALUES (:subject_name)";
            $res = $db->prepare($sql);
            $res->bindParam(':subject_name', $subject_name);
            $res->execute();
        }
        $jdata["0"] = array("sta" => $sta);
        echo json_encode($jdata);
    } catch (PDOException $e) {
        echo '{"error":{"text": ' . $e->getMessage() . '}';
    }
});

//del
$app->post('/api/subject/del', function (Request $request, Response $response, array $args) {
    $jdata = array();
    $sta = "0";

    $param = $request->getParsedBody();
    $id = $param['ID'];

    try {
        //get db object
        $db = new db();
        //Connect
        $db = $db->connect();
        $sql = "SELECT * FROM `exam_question` WHERE subject_id =:subject_id";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':subject_id', $id);
        $stmt->execute();
        if ($stmt->rowCount() <= 0) {
            $sql = "DELETE FROM `subject` WHERE subject_id = :subject_id";
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':subject_id', $id);
            $stmt->execute();
            $sta = "1";
        } else {
            $sta = "0";
        }

        $jdata["0"] = array("sta" => $sta);
        echo json_encode($jdata);
    } catch (PDOException $e) {
        echo '{"error":{"text": ' . $e->getMessage() . '}';
    }
});
