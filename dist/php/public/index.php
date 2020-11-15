<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';

$app = new \Slim\App;


//user Routes
require '../SRC/routes/user.php';
require '../SRC/routes/new_user.php';
require '../SRC/routes/subject.php';
require '../SRC/routes/exam_question.php';
require '../SRC/routes/add_exam_paper.php';
require '../SRC/routes/exam_paper.php';
$app->run();
