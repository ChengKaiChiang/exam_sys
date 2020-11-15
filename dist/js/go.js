function login() {
    let acc = $('#acc').val(), pwd = $('#pwd').val();

    if (acc === "" || pwd === "" || acc === null || pwd === null) {
        swal({
            type: 'error',
            title: 'Oops...',
            text: 'Please enter your account number and password',
        });
    } else {
        $('#loginBtn').text('Loading...');
        $.ajax({
            type: "POST",
            url: "../dist/php/public/index.php/api/login",
            data: {
                acc: $('#acc').val(),
                pwd: $('#pwd').val()
            },
            cache: false,
            dataType: "json",
            success: function (result) {
                if (result[0]["data"] == '登入成功') {
                    var permission = Cookies.get('permission');
                    if (permission == "0")
                        document.location.replace("../pages/new_user.html");
                    else
                        document.location.replace("../pages/exam_question.html");
                } else {
                    swal("Oops!", result[0]["data"], "error")
                        .then(() => {
                            document.location.replace("login.php");
                        });
                }
            },
            error: function (xhr, status, msg) {
                console.error(xhr);
                console.error(status);
                console.error(msg);
            }
        });
    }
}

function gCookies() {
    var name = Cookies.get('uname');
    var base64_uname = Cookies.get('uname');
    console.log(123);

    if (name == null || name === undefined) {
        document.location.replace("login.php");
    } else {
        name = atob(name);
        var uname = atob(base64_uname);
        $.ajax({
            type: "POST",
            url: "../dist/php/public/index.php/api/check_login",
            data: {
                acc: name
            },
            cache: false,
            dataType: "json",
            success: function (result) {
                if (result[0]["sta"]) {
                    $("#uname")["0"].innerHTML = "你好! " + result[0].data[0].name + "<br> " + uname;

                    var permission = Cookies.get('permission');
                    if (permission == "0") {
                        $("#admin_divider")["0"].style.display = "inline";
                        $("#admin_heading")["0"].style.display = "inline";
                        $("#admin")["0"].style.display = "inline";
                    }
                } else {
                    document.location.replace("login.php");
                }
            },
            error: function (xhr, status, msg) {
                console.error(xhr);
                console.error(status);
                console.error(msg);
            }
        });
    }
}