//紀錄移動到的tr的索引值
var now_id = 0;
var index_yellow = true;
var index_name = null, last_name = null, old_length = 0;
var result_length = 0;
var subject = null;
//讀取資料庫資料並顯示
$(function () {
  var base64_uname = Cookies.get('uname');
  var uname = atob(base64_uname);

  //讀取資料庫的值且顯示至表格中
  $.ajax({
    type: "GET",
    url: "../dist/php/public/index.php/api/subject",
    cache: false,
    async: false,
    dataType: "json",
    success: function (result) {
      if (result[0]["sta"] == "1") {
        subject = result;
        result_length = result["0"].data.length;
        old_length = result_length;

        for (let i = 0; i < result_length; i++) {
          $('#select_subject').append("<option value=" + result[0].data[i].subject_id + ">" + result[0].data[i].subject_name + "</option>");
        }
      } else if (result[0]["sta"] == "0") {
        alert('尚未新增科目\r\n請聯絡管理員!!');
      }
    },
    error: function (xhr, status, msg) {
      console.error(xhr);
      console.error(status);
      console.error(msg);
    }
  });

  //讀取資料庫的值且顯示至表格中
  $.ajax({
    type: "POST",
    url: "../dist/php/public/index.php/api/exam_paper/getPaper",
    cache: false,
    data: {
      user_id: uname,
    },
    async: false,
    dataType: "json",
    success: function (result) {
      if (result[0]["sta"] == "1") {
        result_length = result["0"].data.length;
        $('#update_paper')["0"].style.display = "inline";
        for (let i = 0; i < result_length; i++) {
          var s_subject = $('#select_subject')[0][result[0].data[i].subject_id].text;
          var s_semester = $('#semester')[0][result[0].data[i].semester].text;
          var s_exam_type = $('#exam_type')[0][result[0].data[i].exam_type].text;

          $('#paper').append("<option value=" + result[0].data[i].id + ">"
            + s_subject + "_" + result[0].data[i].school_year + "" + s_semester + "學期_" + s_exam_type + "</option>");
        }
      }
    },
    error: function (xhr, status, msg) {
      console.error(xhr);
      console.error(status);
      console.error(msg);
    }
  });
});

function append_table(table_length) {
  for (let select_index = 0; select_index < table_length; select_index++) {
    $('#tbd').append(
      '<tr id="read_pic_id' + select_index + '" data-toggle="tooltip" data-placement="top">' +
      '<td style="width: 3%;"><button type="button" class="btn btn-outline-success btn-circle"  id="btn_add' + select_index + '" onclick="add_question(this)"><i class="fas fa-plus"></i></button></td>' +
      '<td id="qnumber' + select_index + '" style="width: 5%;"></td>' +
      '<td style="width: 30%;"><input id="content' + select_index + '" class="form-control" type="text" data-toggle="tooltip" data-placement="top"></td>' +
      '<td style="width: 8%;"><input id="answer' + select_index + '" class="form-control" type="text" data-toggle="tooltip" data-placement="top"></td>' +
      '</tr>'
    );
  }

}

function clear_table() {
  var clear_length = $('#tbd')[0].childNodes.length;
  console.log($('#tbd')[0].childNodes.length);

  for (let i = 0; i < clear_length; i++) {
    $('#read_pic_id' + i).remove();
  }

}

//儲存按鈕
function save_data() {
  //總共有幾筆資料
  let num_length = 0;
  //是否有新增失敗的資料
  let no_fail_data = true;

  var base64_uname = Cookies.get('uname');
  var uname = atob(base64_uname);
  var now_time = moment().format("YYYY-MM-DD HH:mm:ss");
  var year = (moment().format("YYYY") - 1911).toString();
  var month = moment().format("MM").toString();
  var day = moment().format("DD").toString();
  var hour = moment().format("HH").toString();
  var minute = moment().format("mm").toString();
  var second = moment().format("ss").toString();

  var paper_id = year + month + day + hour + minute + second + "_" + uname;

  var tbody_length = $('#tbd_paper')[0].childNodes.length;
  var question_arr = [];
  if (tbody_length > 0) {
    if ($('#add_paper')[0].style.display == "inline" && $('#update_paper')[0].style.display == "none") {
      if ($('#school_year')[0].selectedIndex != 0 && $('#semester')[0].selectedIndex != 0 && $('#exam_type')[0].selectedIndex != 0) {
        $.ajax({
          type: "POST",
          url: "../dist/php/public/index.php/api/exam_paper/create",
          data: {
            id: paper_id,
            school_year: $('#school_year')[0].value,
            semester: $('#semester')[0].value,
            exam_type: $('#exam_type')[0].value,
            subject_id: $('#select_subject')[0].value,
            user_id: uname
          },
          cache: false,
          dataType: "json",
          async: false,
          success: function (result) {
            //1:新增成功
            if (result[0]["sta"] == "1") {
              for (let i = 0; i < tbody_length; i++) {
                question_arr[i] = $('#insert_qnumber' + i)[0].innerHTML;
              }
              $.ajax({
                type: "POST",
                url: "../dist/php/public/index.php/api/paper/add",
                data: {
                  id: paper_id,
                  question: question_arr
                },
                cache: false,
                dataType: "json",
                async: false,
                success: function (result) {
                  //1:新增成功
                  if (result[0]["sta"] == "1") {

                  }
                },
                error: function (xhr, status, msg) {
                  console.error(xhr);
                  console.error(status);
                  console.error(msg);
                }
              });
            }
          },
          error: function (xhr, status, msg) {
            console.error(xhr);
            console.error(status);
            console.error(msg);
          }
        });
      } else {
        no_fail_data = false;
      }
    } else if ($('#add_paper')[0].style.display == "none" && $('#update_paper')[0].style.display == "inline") {
      for (let i = 0; i < tbody_length; i++) {
        question_arr[i] = $('#insert_qnumber' + i)[0].innerHTML;
      }
      $.ajax({
        type: "POST",
        url: "../dist/php/public/index.php/api/exam_paper/update",
        data: {
          id: $('#paper')[0].value,
          question: question_arr
        },
        cache: false,
        dataType: "json",
        async: false,
        success: function (result) {
          //1:新增成功
          if (result[0]["sta"] == "1") {
            no_fail_data = true;
          }
        },
        error: function (xhr, status, msg) {
          console.error(xhr);
          console.error(status);
          console.error(msg);
        }
      });
    }
  } else {
    no_fail_data = false;
    swal({
      title: "請加入題目!",
      type: "warning",
      allowEnterKey: true,
      allowOutsideClick: false
    });
  }

  if (no_fail_data) {
    swal({
      title: "Successfully Saved !",
      type: "success",
      allowEnterKey: true,
      allowOutsideClick: false
    }).then(() => {
      location.reload();
    });
  }
}

function show_data(mode, subject, grade, chapter, type) {

  if (mode == 1) {
    chapter = null;
    type = null;
  } else if (mode == 2) {
    type = null;
  }
  clear_table();
  //讀取資料庫的值且顯示至表格中
  $.ajax({
    type: "POST",
    url: "../dist/php/public/index.php/api/exam_paper/search",
    cache: false,
    data: {
      Mode: mode,
      Subject: subject,
      Grade: grade,
      Chapter: chapter,
      Type: type
    },
    async: false,
    dataType: "json",
    success: function (result) {
      if (result[0]["sta"] == "1") {
        result_length = result["0"].data.length;
        append_table(result_length);

        for (let i = 0; i < result_length; i++) {
          $('#qnumber' + i)[0].innerHTML = result[0].data[i].question_number;
          $('#content' + i)[0].value = result[0].data[i].content;
          $('#content' + i)[0].title = result[0].data[i].content;
          $('#answer' + i)[0].value = result[0].data[i].answer;
          $('#answer' + i)[0].title = result[0].data[i].answer;
          $('#read_pic_id' + i)[0].title = "建立時間：" + result[0].data[i].time + "\r\n建立者：" + result[0].data[i].user_id +
            "\r\n最後修改日期：" + result[0].data[i].update_time + "\r\n最後修改者：" + result[0].data[i].update_user;
        }
      } else if (result[0]["sta"] == "0") {
        swal({
          title: "查無資料!",
          type: "warning",
          allowEnterKey: true,
          allowOutsideClick: false
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

function subject_change(obj) {
  if ($('#select_subject')[0].value != "all") {
    $('#grade')[0].removeAttribute("disabled", '');
    $('#save_paper')[0].removeAttribute("disabled", '');
  } else {
    $('#save_paper')[0].setAttribute("disabled", '');
    $('#grade')[0].setAttribute("disabled", '');
    $('#chapter')[0].setAttribute("disabled", '');
    $('#type')[0].setAttribute("disabled", '');
    $('#grade')[0].selectedIndex = 0;
    $('#chapter')[0].selectedIndex = 0;
    $('#type')[0].selectedIndex = 0;
  }
}

function grade_change(obj) {
  if ($('#grade')[0].value != "all") {
    $('#chapter')[0].removeAttribute("disabled", '');
    show_data(1, $('#select_subject')[0].value, $('#grade')[0].value, null, null);
    $('#type')[0].setAttribute("disabled", '');
    $('#chapter')[0].selectedIndex = 0;
    $('#type')[0].selectedIndex = 0;
  } else {
    $('#chapter')[0].setAttribute("disabled", '');
    $('#type')[0].setAttribute("disabled", '');
    $('#chapter')[0].selectedIndex = 0;
    $('#type')[0].selectedIndex = 0;
  }
}

function chapter_change(obj) {
  if ($('#chapter')[0].value != "all") {
    $('#type')[0].removeAttribute("disabled", '');
    show_data(2, $('#select_subject')[0].value, $('#grade')[0].value, $('#chapter')[0].value, null);
  } else {
    $('#type')[0].setAttribute("disabled", '');
    $('#type')[0].selectedIndex = 0;
  }
}

function type_change(obj) {
  if ($('#chapter')[0].value != "all") {
    show_data(3, $('#select_subject')[0].value, $('#grade')[0].value, $('#chapter')[0].value, $('#type')[0].value);
  } else {
    show_data(2, $('#select_subject')[0].value, $('#grade')[0].value, $('#chapter')[0].value, null);
  }
}

function add_paper() {
  insert_num = 0;
  $('#save_paper')["0"].style.display = "inline";
  $('#update_paper')["0"].style.display = "none";
  $('#cancel')["0"].style.display = "inline";
  $('#update1')["0"].style.display = "none";
  $('#insert1')["0"].style.display = "block";
  $('#insert2')["0"].style.display = "block";
  $('#insert3')["0"].style.display = "block";

  console.log(moment().year() - 1911);
  var now_year = moment().year() - 1912;
  for (let i = 0; i < 5; i++) {
    $('#school_year').append("<option value=" + (now_year + i) + ">" + (now_year + i) + "</option>");
  }
}

function update_paper() {
  insert_num = 0;
  $('#save_paper')["0"].style.display = "inline";
  $('#add_paper')["0"].style.display = "none";
  $('#cancel')["0"].style.display = "inline";
  $('#update1')["0"].style.display = "block";
  $('#insert1')["0"].style.display = "none";
  $('#insert2')["0"].style.display = "none";
  $('#insert3')["0"].style.display = "none";

}

function cancel() {
  insert_num = 0;
  arr.length = 0;
  $('#add_paper')["0"].style.display = "inline";
  $('#update_paper')["0"].style.display = "inline";
  $('#save_paper')["0"].style.display = "none";
  $('#cancel')["0"].style.display = "none";
  $('#update1')["0"].style.display = "none";
  $('#insert1')["0"].style.display = "none";
  $('#insert2')["0"].style.display = "none";
  $('#insert3')["0"].style.display = "none";
  $('#select_subject')[0].removeAttribute("disabled", '');
  $('#grade')[0].setAttribute("disabled", '');
  $('#chapter')[0].setAttribute("disabled", '');
  $('#type')[0].setAttribute("disabled", '');
  $('#select_subject')[0].selectedIndex = 0;
  $('#grade')[0].selectedIndex = 0;
  $('#chapter')[0].selectedIndex = 0;
  $('#type')[0].selectedIndex = 0;
  clear_table();
  var tbody_length = $('#tbd_paper')[0].childNodes.length;
  for (let i = 0; i < tbody_length; i++) {
    $('#read_id' + i).remove();
  }
}

function del_data(obj) {
  console.log(obj.id);
  var del_data = $('#' + obj.id)[0].parentNode.parentElement.textContent;
  var del_num = parseInt(($('#' + obj.id)[0].parentNode.parentElement.id.split("read_id"))[1]) + 1;
  var tbody_length = $('#tbd_paper')[0].childNodes.length;
  var question_arr = [];
  arr.splice(arr.indexOf(del_data), 1);
  if (del_num != tbody_length) {
    for (let i = del_num - 1; i < tbody_length; i++) {
      var a = i + 1;
      question_arr[i] = $('#insert_qnumber' + i)[0].innerHTML;
      $('#read_id' + i).remove();

      if (i != tbody_length - 1) {
        $('#tbd_paper').append(
          '<tr id="read_id' + i + '" data-toggle="tooltip" data-placement="top">' +
          '<td id="insert_qnumber' + i + '" style="width: 5%;">' + $('#insert_qnumber' + a)[0].innerHTML + '</td>' +
          '<td style="width: 3%;"><button type="button" class="btn btn-danger btn-circle"  id="btn_del' + i + '" onclick="del_data(this)"><i class="fas fa-trash"></i></button></td>' +
          '</tr>'
        );
      }
    }
  } else {
    $('#read_id' + (del_num - 1)).remove();
  }
  insert_num--;
}

var insert_num = 0;
var arr = [];
function add_question(obj) {
  console.log(insert_num);
  var insert_qnumber = $('#' + obj.id + '')[0].parentElement.parentElement.children[1].innerHTML;

  if ($('#add_paper')[0].style.display == "inline" && $('#update_paper')[0].style.display == "none") {
    if ($('#school_year')[0].selectedIndex != 0 && $('#semester')[0].selectedIndex != 0 && $('#exam_type')[0].selectedIndex != 0) {
      if (arr.indexOf(insert_qnumber) == -1) {
        $('#tbd_paper').append(
          '<tr id="read_id' + insert_num + '" data-toggle="tooltip" data-placement="top">' +
          '<td id="insert_qnumber' + insert_num + '" style="width: 5%;"></td>' +
          '<td style="width: 3%;"><button type="button" class="btn btn-danger btn-circle"  id="btn_del' + insert_num + '" onclick="del_data(this)"><i class="fas fa-trash"></i></button></td>' +
          '</tr>'
        );
        $('#insert_qnumber' + insert_num)[0].innerHTML = insert_qnumber;
        arr.push(insert_qnumber);
        insert_num++;
      } else {
        swal({
          title: "題目重複選擇!",
          type: "warning",
          allowEnterKey: true,
          allowOutsideClick: false
        });
      }
    } else {
      swal({
        title: "請先選擇考卷資訊!",
        type: "warning",
        allowEnterKey: true,
        allowOutsideClick: false
      });
    }
  } else if ($('#add_paper')[0].style.display == "none" && $('#update_paper')[0].style.display == "inline") {
    if (arr.indexOf(insert_qnumber) == -1) {
      $('#tbd_paper').append(
        '<tr id="read_id' + insert_num + '" data-toggle="tooltip" data-placement="top">' +
        '<td id="insert_qnumber' + insert_num + '" style="width: 5%;"></td>' +
        '<td style="width: 3%;"><button type="button" class="btn btn-danger btn-circle"  id="btn_del' + insert_num + '" onclick="del_data(this)"><i class="fas fa-trash"></i></button></td>' +
        '</tr>'
      );
      $('#insert_qnumber' + insert_num)[0].innerHTML = insert_qnumber;
      arr.push(insert_qnumber);
      insert_num++;
    } else {
      swal({
        title: "題目重複選擇!",
        type: "warning",
        allowEnterKey: true,
        allowOutsideClick: false
      });
    }

  }
}

function show_paper() {
  $('#paper')[0].value;
  clear_table();
  clear_table_papper();
  //讀取資料庫的值且顯示至表格中
  $.ajax({
    type: "POST",
    url: "../dist/php/public/index.php/api/exam_paper/getAll",
    cache: false,
    data: {
      id: $('#paper')[0].value
    },
    async: false,
    dataType: "json",
    success: function (result) {
      if (result[0]["sta"] == "1") {
        subject = result;
        result_length = result["0"].data.length;
        insert_num = result_length;

        for (let i = 0; i < result_length; i++) {
          arr.push(result["0"].data[i].question_number)
          $('#tbd_paper').append(
            '<tr id="read_id' + i + '" data-toggle="tooltip" data-placement="top">' +
            '<td id="insert_qnumber' + i + '" style="width: 5%;"></td>' +
            '<td style="width: 3%;"><button type="button" class="btn btn-danger btn-circle"  id="btn_del' + i + '" onclick="del_data(this)"><i class="fas fa-trash"></i></button></td>' +
            '</tr>'
          );
          $('#insert_qnumber' + i)[0].innerHTML = result["0"].data[i].question_number;
        }

        $('#select_subject')[0].setAttribute("disabled", '');
        $('#select_subject')[0].selectedIndex = result["0"].all_data[0].subject_id;
        $('#grade')[0].removeAttribute("disabled", '');
        $('#save_paper')["0"].removeAttribute("disabled", '');
      }
    },
    error: function (xhr, status, msg) {
      console.error(xhr);
      console.error(status);
      console.error(msg);
    }
  });

  console.log(insert_num);
}


function clear_table_papper() {
  var clear_length = $('#tbd_paper')[0].childNodes.length;
  console.log($('#tbd_paper')[0].childNodes.length);

  for (let i = 0; i < clear_length; i++) {
    $('#read_id' + i).remove();
  }

}


function test() {
  console.log($('#tbd')[0].childNodes.length);
  // clear_table();

}