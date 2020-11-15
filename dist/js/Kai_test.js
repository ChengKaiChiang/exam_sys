function gCookies() {
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