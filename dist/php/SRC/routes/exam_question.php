<?php
require_once "../SRC/config/connectDB.php";

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;


//get all new user
$app->get('/api/exam_question', function (Request $request, Response $response) {
    $jdata = array();
    $data = array();
    $sta = "0";

    $sql = "SELECT * FROM exam_question";

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

//get all new user
$app->post('/api/exam_question/search', function (Request $request, Response $response) {
    $jdata = array();
    $data = array();
    $sta = "0";

    $param = $request->getParsedBody();
    $subject_id = $param['subject_id'];
    $sql = "SELECT * FROM exam_question WHERE subject_id =:subject_id";
    //get db object
    $db = new db();
    //Connect
    $db = $db->connect();
    $res = $db->prepare($sql);
    $res->bindParam(':subject_id', $subject_id, PDO::PARAM_STR);
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

$app->post('/api/exam_question/new_add', function (Request $request, Response $response, array $args) {
    $jdata = array();
    $sta = "0";

    $param = $request->getParsedBody();
    $subject_id = $param['subject_id'];
    $chapter = $param['chapter'];
    $content = $param['content'];
    $answer = $param['answer'];
    $type = $param['type'];
    $grade = $param['grade'];
    $time = $param['time'];
    $user_id = $param['user_id'];
    try {
        //get db object
        $db = new db();
        //Connect
        $db = $db->connect();
        $sql = "INSERT INTO exam_question (`subject_id`, `chapter`, `content`, `answer`, `type`, `grade`, `time`, `user_id`) 
            VALUES (:subject_id, :chapter, :content, :answer, :type, :grade, :time, :user_id)";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':subject_id', $subject_id);
        $stmt->bindParam(':chapter', $chapter);
        $stmt->bindParam(':content', $content);
        $stmt->bindParam(':answer', $answer);
        $stmt->bindParam(':type', $type);
        $stmt->bindParam(':grade', $grade);
        $stmt->bindParam(':time', $time);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        $sta = "1";
        $jdata["0"] = array("sta" => $sta);
        echo json_encode($jdata);
    } catch (PDOException $e) {
        echo '{"error":{"text": ' . $e->getMessage() . '}';
    }
});

$app->post('/api/exam_question/add', function (Request $request, Response $response, array $args) {
    $jdata = array();
    $sta = "0";

    $param = $request->getParsedBody();
    $question_number = $param['question_number'];
    $subject_id = $param['subject_id'];
    $chapter = $param['chapter'];
    $content = $param['content'];
    $answer = $param['answer'];
    $type = $param['type'];
    $grade = $param['grade'];
    $time = $param['time'];
    $user_id = $param['user_id'];
    try {
        //get db object
        $db = new db();
        //Connect
        $db = $db->connect();
        $sql = "SELECT * From exam_question WHERE question_number =:question_number";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':question_number', $question_number, PDO::PARAM_STR);
        $stmt->execute();

        if ($stmt->rowCount() <= 0) {
            $sta = "1";
            $sql = "INSERT INTO exam_question (`subject_id`, `chapter`, `content`, `answer`, `type`, `grade`, `time`, `user_id`) 
            VALUES (:subject_id, :chapter, :content, :answer, :type, :grade, :time, :user_id)";
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':subject_id', $subject_id);
            $stmt->bindParam(':chapter', $chapter);
            $stmt->bindParam(':content', $content);
            $stmt->bindParam(':answer', $answer);
            $stmt->bindParam(':type', $type);
            $stmt->bindParam(':grade', $grade);
            $stmt->bindParam(':time', $time);
            $stmt->bindParam(':user_id', $user_id);
            $stmt->execute();
        } else if ($stmt->rowCount() > 0) {
            $sta = "1";
            $sql = "UPDATE `exam_question` SET `subject_id`=:subject_id, `chapter`=:chapter, `content`=:content,
             `answer`=:answer, `type`=:type, `grade`=:grade, `update_time`=:update_time, `update_user`=:update_user WHERE `question_number`=:question_number";

            $stmt = $db->prepare($sql);
            $stmt->bindParam(':question_number', $question_number, PDO::PARAM_STR);
            $stmt->bindParam(':subject_id', $subject_id);
            $stmt->bindParam(':chapter', $chapter);
            $stmt->bindParam(':content', $content);
            $stmt->bindParam(':answer', $answer);
            $stmt->bindParam(':type', $type);
            $stmt->bindParam(':grade', $grade);
            $stmt->bindParam(':update_time', $time);
            $stmt->bindParam(':update_user', $user_id);
            $stmt->execute();
        } else {
            $sta = "0";
        }

        $jdata["0"] = array("sta" => $sta);
        echo json_encode($jdata);
    } catch (PDOException $e) {
        echo '{"error":{"text": ' . $e->getMessage() . '}';
    }
});


//Delete question
$app->post('/api/exam_question/del', function (Request $request, Response $response, array $args) {
    $jdata = array();
    $sta = "0";
    $param = $request->getParsedBody();
    $question_number = $param['ID'];

    $sql = "DELETE FROM exam_question WHERE question_number =:question_number";

    try {
        //get db object
        $db = new db();
        //Connect
        $db = $db->connect();

        $stmt = $db->prepare($sql);
        $stmt->bindParam(':question_number', $question_number);
        $stmt->execute();
        $db = null;
        $sta = "1";
        $jdata["0"] = array("sta" => $sta);
        echo json_encode($jdata);
    } catch (PDOException $e) {
        echo '{"error":{"text": ' . $e->getMessage() . '}';
    }
});
