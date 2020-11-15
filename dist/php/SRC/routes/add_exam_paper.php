<?php
require_once "../SRC/config/connectDB.php";

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;


//get all new user
$app->post('/api/exam_paper/search', function (Request $request, Response $response) {
    $jdata = array();
    $data = array();
    $sta = "0";

    $param = $request->getParsedBody();
    $mode = $param['Mode'];
    $subject_id = $param['Subject'];
    $chapter = $param['Chapter'];
    $type = $param['Type'];
    $grade = $param['Grade'];

    if ($mode == 1)
        $sql = "SELECT * FROM exam_question WHERE `subject_id` =:subject_id AND `grade` =:grade";
    else if ($mode == 2) {
        $sql = "SELECT * FROM exam_question WHERE `subject_id` =:subject_id AND `grade` =:grade AND `chapter` =:chapter";
    } else if ($mode == 3) {
        $sql = "SELECT * FROM exam_question WHERE `subject_id` =:subject_id AND `grade` =:grade AND `chapter` =:chapter AND `type` =:type";
    }
    //get db object
    $db = new db();
    //Connect
    $db = $db->connect();

    $stmt = $db->prepare($sql);
    if ($mode == 1) {
        $stmt->bindParam(':subject_id', $subject_id);
        $stmt->bindParam(':grade', $grade);
    } else if ($mode == 2) {
        $stmt->bindParam(':subject_id', $subject_id);
        $stmt->bindParam(':grade', $grade);
        $stmt->bindParam(':chapter', $chapter);
    } else if ($mode == 3) {
        $stmt->bindParam(':subject_id', $subject_id);
        $stmt->bindParam(':grade', $grade);
        $stmt->bindParam(':chapter', $chapter);
        $stmt->bindParam(':type', $type);
    }
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

//get all new user
$app->post('/api/exam_paper/getPaper', function (Request $request, Response $response) {
    $jdata = array();
    $data = array();
    $sta = "0";

    $param = $request->getParsedBody();
    $user_id = $param['user_id'];

    //get db object
    $db = new db();
    //Connect
    $db = $db->connect();
    $sql = "SELECT * FROM `exam_paper` WHERE `user_id`=:user_id";
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':user_id', $user_id);
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

//get all new user
$app->post('/api/exam_paper/create', function (Request $request, Response $response) {
    $jdata = array();
    $sta = "1";

    $param = $request->getParsedBody();
    $id = $param['id'];
    $school_year = $param['school_year'];
    $semester = $param['semester'];
    $exam_type = $param['exam_type'];
    $subject_id = $param['subject_id'];
    $user_id = $param['user_id'];

    $db = new db();
    $db = $db->connect();

    $sql = "CREATE TABLE $id (question_number int(11))";
    $stmt = $db->prepare($sql);
    $stmt->execute();

    $sql = "INSERT INTO `exam_paper`(`id`, `subject_id`, `school_year`, `semester`, `exam_type`, `user_id`) 
    VALUES (:id, :subject_id, :school_year, :semester, :exam_type, :user_id)";
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':id', $id);
    $stmt->bindParam(':subject_id', $subject_id);
    $stmt->bindParam(':school_year', $school_year);
    $stmt->bindParam(':semester', $semester);
    $stmt->bindParam(':exam_type', $exam_type);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->execute();

    $jdata["0"] = array("sta" => $sta);
    echo json_encode($jdata);
});

//Insert question_number
$app->post('/api/paper/add', function (Request $request, Response $response, array $args) {
    $jdata = array();
    $sta = "0";

    $param = $request->getParsedBody();
    $id = $param['id'];
    $question_number = $param['question'];
    //get db object
    $db = new db();
    //Connect
    $db = $db->connect();
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
