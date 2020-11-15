<?php
require_once "../SRC/config/connectDB.php";

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;


//get all new user
$app->post('/api/exam_paper/getAll', function (Request $request, Response $response) {
    $jdata = array();
    $data = array();
    $sta = "0";

    $param = $request->getParsedBody();
    $id = $param['id'];

    $sql = "SELECT * FROM $id";

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

    $all_data = array();
    $sql = "SELECT * FROM `exam_paper` WHERE `id`=:id";
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':id', $id);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $sta = 1;
        foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $v) {
            $all_data[] = $v;
        }
    } else {
        $sta = "0";
    }

    $jdata["0"] = array("sta" => $sta, "data" => $data, "all_data" => $all_data);
    echo json_encode($jdata);
});

//get all new user
$app->post('/api/exam_paper/getAllPaper', function (Request $request, Response $response) {
    $jdata = array();
    $data = array();
    $sta = "0";

    $param = $request->getParsedBody();
    $subject_id = $param['subject_id'];

    //get db object
    $db = new db();
    //Connect
    $db = $db->connect();

    $sql = "SELECT * FROM `exam_paper` WHERE `subject_id`=:subject_id";
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':subject_id', $subject_id);
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

//Insert question_number
$app->post('/api/exam_paper/update', function (Request $request, Response $response, array $args) {
    $jdata = array();
    $sta = "0";

    $param = $request->getParsedBody();
    $id = $param['id'];
    $question_number = $param['question'];
    //get db object
    $db = new db();
    //Connect
    $db = $db->connect();

    $sql = "TRUNCATE TABLE $id";
    $stmt = $db->prepare($sql);
    $stmt->execute();

    for ($i = 0; $i < count($question_number); $i++) {
        $sta = "1";
        $sql = "INSERT INTO $id (question_number) VALUES (:question_number)";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':question_number', $question_number[$i]);
        $stmt->execute();
    }

    $jdata["0"] = array("sta" => $sta);
    echo json_encode($jdata);
});

//Insert question_number
$app->post('/api/exam_paper/getQuestion', function (Request $request, Response $response, array $args) {
    $jdata = array();
    $data = array();
    $show_data = array();
    $sta = "0";

    $param = $request->getParsedBody();
    $id = $param['id'];

    //get db object
    $db = new db();
    //Connect
    $db = $db->connect();

    $sql = "SELECT * FROM $id";
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

    for ($i = 0; $i < count($data); $i++) {
        $sql = "SELECT * FROM `exam_question` WHERE `question_number` = :question";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':question', $data[$i]['question_number']);
        $stmt->execute();

        foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $v) {
            $show_data[] = $v;
        }
    }

    $jdata["0"] = array("sta" => $sta, "data" => $show_data);
    echo json_encode($jdata);
});
