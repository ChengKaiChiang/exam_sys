//點擊按鈕刪除資料
function check_tel(e, number) {
  if (!/^[09]{2}[0-9]{8}$/.test(number)) {
    $(e).val(/^[09]{2}[0-9]{8}$/.exec($(e).val()));
    alert("電話號碼格式錯誤!!!!" + number);
  }
  return false;
}

function Register() {
  var check = false;
  //是否有新增失敗的資料
  let no_fail_data = false;
  var name = $('#name').val();
  var account = $('#account').val();
  var password = $('#password').val();
  var rpassword = $('#repeatpassword').val();
  var mail = $('#mail').val();
  var tel = $('#tel').val();

  if (name === '' || name === null || name === undefined) {
    $('#chk_name')["0"].style.display = "inline";
    check = true;
  }
  if (account === '' || account === null || account === undefined) {
    $('#chk_account')["0"].style.display = "inline";
    check = true;
  }
  if (mail === '' || mail === null || mail === undefined) {
    $('#chk_mail')["0"].style.display = "inline";
    check = true;
  }
  if (tel === '' || tel === null || tel === undefined) {
    $('#chk_tel')["0"].style.display = "inline";
    check = true;
  }
  if (password != rpassword) {
    alert("密碼輸入不相同!!\r\n請重新輸入");
    $('#password').val("");
    $('#repeatpassword').val("");
    check = true;
  }

  if (!check) {
    $.ajax({
      type: "POST",
      url: "../dist/php/public/index.php/api/new_user/add",
      data: {
        Name: name,
        ID: account,
        Password: password,
        Mail: mail,
        Tel: tel
      },
      cache: false,
      dataType: "json",
      async: false,
      success: function (result) {
        //1:新增成功
        if (result[0]["sta"] == "1") {
          no_fail_data = true;
          console.log(12);
        } else {
          no_fail_data = false;
        }
      },
      error: function (xhr, status, msg) {
        console.error(xhr);
        console.error(status);
        console.error(msg);
      }
    });

    if (no_fail_data) {
      swal({
        title: "Successfully Saved !",
        type: "success",
        allowEnterKey: true,
        allowOutsideClick: false
      }).then(() => {
        window.location.href = "login.php";
      });
    } else {
      swal({
        title: "This account is duplicated!",
        type: "warning",
        allowEnterKey: true,
        allowOutsideClick: false
      })
    }
  }
}