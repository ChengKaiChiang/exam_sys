<?php
session_start();
session_unset();
session_destroy();
setcookie('uname', "", 0, "/");
setcookie('permission', "", 0, "/");
header("Refresh: 0; url=login.php");
