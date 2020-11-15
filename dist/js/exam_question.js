//紀錄移動到的tr的索引值
var now_id = 0;
var index_yellow = true;
var index_name = null, last_name = null, old_length = 0;
var result_length = 0;
var subject = null;
//讀取資料庫資料並顯示
$(function () {
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
});

function append_table(table_length) {
  if (table_length < 6) {
    table_length = 6;
  }
  for (let select_index = 0; select_index < table_length; select_index++) {
    $('#tbd').append(
      '<tr id="read_pic_id' + select_index + '" data-toggle="tooltip" data-placement="top">' +
      '<td id="qnumber' + select_index + '" style="width: 5%;"></td>' +
      '<td style="width: 5%;" class="table_border_1">' +
      '<select id="grade' + select_index + '" class="form-control">' +
      '<option value="please choose">-grade-</option>' +
      '<option value="1">一年級</option>' +
      '<option value="2">二年級</option>' +
      '<option value="3">三年級</option>' +
      '<option value="4">四年級</option>' +
      '<option value="5">五年級</option>' +
      '<option value="6">六年級</option>' +
      '</select>' +
      '</td>' +
      '<td style="width: 5%;" class="table_border_1">' +
      '<select id="chapter' + select_index + '" class="form-control">' +
      '<option value="please choose">-chapter-</option>' +
      '<option value="1">第一章</option>' +
      '<option value="2">第二章</option>' +
      '<option value="3">第三章</option>' +
      '<option value="4">第四章</option>' +
      '<option value="5">第五章</option>' +
      '<option value="6">第六章</option>' +
      '<option value="7">第七章</option>' +
      '<option value="8">第八章</option>' +
      '<option value="9">第九章</option>' +
      '<option value="10">第十章</option>' +
      '</select>' +
      '</td>' +
      '<td style="width: 5%;" class="table_border_1">' +
      '<select id="type' + select_index + '" class="form-control">' +
      '<option value="please choose">-type-</option>' +
      '<option value="1">單選題</option>' +
      '<option value="2">複選題</option>' +
      '<option value="3">填空題</option>' +
      '<option value="4">問答題</option>' +
      '</select>' +
      '</td>' +
      '<td style="width: 30%;"><input id="content' + select_index + '" class="form-control" type="text" data-toggle="tooltip" data-placement="top" ></td>' +
      '<td style="width: 8%;"><input id="answer' + select_index + '" class="form-control" type="text" data-toggle="tooltip" data-placement="top" ></td>' +
      '<td style="width: 3%;"><button type="button" class="btn btn-danger btn-circle"  id="Part_del' + select_index + '" onclick="del_data(this)" disabled><i class="fas fa-trash"></i></button></td>' +
      '<td style="width: 8%; display:none;"><input id="subject' + select_index + '" class="form-control" type="text" ></td>' +
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

  var tbody_length = $('#tbd')[0].childNodes.length;

  if ($('#choose_file')[0].value != "") {
    for (let i = 0; i < tbody_length; i++) {
      if ($('#grade' + i)[0].selectedIndex != 0 && $('#chapter' + i)[0].selectedIndex != 0 && $('#type' + i)[0].selectedIndex != 0 && $('#content' + i)[0].value != "") {
        var s_index = $.map(subject[0].data, function (item, index) { return item.subject_name; }).indexOf($('#subject' + i)[0].value);
        let Subject = subject[0].data[s_index].subject_id;
        let Grade = $('#grade' + i)[0].selectedIndex;
        let Chapter = $('#chapter' + i)[0].selectedIndex;
        let Type = $('#type' + i)[0].selectedIndex;
        let Content = $('#content' + i)[0].value;
        let answer = $('#answer' + i)[0].value;

        $.ajax({
          type: "POST",
          url: "../dist/php/public/index.php/api/exam_question/new_add",
          data: {
            subject_id: Subject,
            chapter: Chapter,
            content: Content,
            answer: answer,
            type: Type,
            grade: Grade,
            time: now_time,
            user_id: uname
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
    }
  } else {
    for (let i = 0; i < tbody_length; i++) {
      if ($('#grade' + i)[0].selectedIndex != 0 && $('#chapter' + i)[0].selectedIndex != 0 && $('#type' + i)[0].selectedIndex != 0 && $('#content' + i)[0].value != "") {
        let qnumber = $('#qnumber' + i)[0].innerHTML;
        let Subject = $('#select_subject')[0].value;
        let Grade = $('#grade' + i)[0].selectedIndex;
        let Chapter = $('#chapter' + i)[0].selectedIndex;
        let Type = $('#type' + i)[0].selectedIndex;
        let Content = $('#content' + i)[0].value;
        let answer = $('#answer' + i)[0].value;

        $.ajax({
          type: "POST",
          url: "../dist/php/public/index.php/api/exam_question/add",
          data: {
            question_number: qnumber,
            subject_id: Subject,
            chapter: Chapter,
            content: Content,
            answer: answer,
            type: Type,
            grade: Grade,
            time: now_time,
            user_id: uname
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
    }
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

//點擊按鈕驗證帳號
function del_data(obj) {
  now_main_val = obj.id;
  let del_id = $('#' + now_main_val)["0"].parentElement.parentElement.firstElementChild.innerHTML;

  swal({
    title: 'Are you sure?',
    text: "Delete this question: " + del_id + " ?",
    type: 'warning',
    showCancelButton: true,
    allowEnterKey: true,
    allowOutsideClick: false,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes!'
  }).then((result) => {
    if (result.value) {
      $.ajax({
        type: "POST",
        url: "../dist/php/public/index.php/api/exam_question/del",
        data: {
          ID: del_id
        },
        cache: false,
        dataType: "json",
        async: false,
        success: function (result) {
          if (result[0]["sta"] == "1") {
            swal({
              title: "Successfully Delete !",
              type: "success",
              allowEnterKey: true,
              allowOutsideClick: false
            }).then(() => {
              location.reload();
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
  });
}

function show_data(obj) {
  var a = obj.value;
  console.log(a);

  var base64_uname = Cookies.get('uname');
  var uname = atob(base64_uname);

  var permission = Cookies.get('permission');

  if ($('#select_subject')[0].value != "all") {
    $('#choose_file')[0].removeAttribute("disabled", '');
    $('#save')[0].removeAttribute("disabled", '');
  } else {
    $('#choose_file')[0].setAttribute("disabled", '');
    $('#save')[0].removeAttribute("disabled", '');
  }

  if (a == "all")
    clear_table();
  else {
    clear_table();
    //讀取資料庫的值且顯示至表格中
    $.ajax({
      type: "POST",
      url: "../dist/php/public/index.php/api/exam_question/search",
      cache: false,
      data: {
        subject_id: $('#select_subject')[0].value
      },
      async: false,
      dataType: "json",
      success: function (result) {
        if (result[0]["sta"] == "1") {
          result_length = result["0"].data.length;
          append_table(result_length + 1);

          for (let i = 0; i < result_length; i++) {
            $('#qnumber' + i)[0].innerHTML = result[0].data[i].question_number;
            $('#grade' + i)[0].selectedIndex = result[0].data[i].grade;
            $('#chapter' + i)[0].selectedIndex = result[0].data[i].chapter;
            $('#type' + i)[0].selectedIndex = result[0].data[i].type;
            $('#content' + i)[0].value = result[0].data[i].content;
            $('#content' + i)[0].title = result[0].data[i].content;
            $('#answer' + i)[0].value = result[0].data[i].answer;
            $('#answer' + i)[0].title = result[0].data[i].answer;
            $('#subject' + i)[0].value = result[0].data[i].subject_id;
            $('#read_pic_id' + i)[0].title = "建立時間：" + result[0].data[i].time + "\r\n建立者：" + result[0].data[i].user_id +
              "\r\n最後修改日期：" + result[0].data[i].update_time + "\r\n最後修改者：" + result[0].data[i].update_user;

            if (permission != "0") {
              if (result[0].data[i].user_id != uname) {
                $('#grade' + i)[0].setAttribute("disabled", '');
                $('#chapter' + i)[0].setAttribute("disabled", '');
                $('#type' + i)[0].setAttribute("disabled", '');
                $('#content' + i)[0].setAttribute("disabled", '');
                $('#answer' + i)[0].setAttribute("disabled", '');
              } else {
                $('#Part_del' + i)[0].removeAttribute("disabled", '');
              }
            } else {
              $('#Part_del' + i)[0].removeAttribute("disabled", '');
            }
          }
        } else if (result[0]["sta"] == "0") {
          append_table(6);
          for (let i = 0; i < 6; i++) {
            $('#subject' + i)[0].value = $('#select_subject')[0].value;
          }
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


var wb;//读取完成的数据
var rABS = false; //是否将文件读取为二进制字符串

function importf(obj) {//导入
  if (!obj.files) {
    return;
  }
  var f = obj.files[0];
  var reader = new FileReader();
  reader.onload = function (e) {
    var data = e.target.result;
    if (rABS) {
      wb = XLSX.read(btoa(fixdata(data)), {//手动转化
        type: 'base64'
      });
    } else {
      wb = XLSX.read(data, {
        type: 'binary'
      });
    }
    var question = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
    append_question(question);
  };
  if (rABS) {
    reader.readAsArrayBuffer(f);
  } else {
    reader.readAsBinaryString(f);
  }
}

function fixdata(data) { //文件流转BinaryString
  var o = "",
    l = 0,
    w = 10240;
  for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
  o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
  return o;
}

function append_question(question) {
  clear_table();
  question_length = question.length;
  append_table(question_length);
  for (let i = 0; i < question_length; i++) {
    $('#grade' + i)[0].selectedIndex = question[i].grade;
    $('#chapter' + i)[0].selectedIndex = question[i].chapter;
    $('#type' + i)[0].selectedIndex = question[i].type;
    $('#content' + i)[0].value = question[i].content;
    $('#content' + i)[0].title = question[i].content;
    $('#answer' + i)[0].value = question[i].answer;
    $('#answer' + i)[0].title = question[i].answer;
    $('#subject' + i)[0].value = question[i].subject_id;

    var s_index = $.map(subject[0].data, function (item, index) { return item.subject_name; }).indexOf($('#subject' + i)[0].value);
    if (s_index == -1) {
      swal({
        title: "匯入資料內有科目尚未存在!",
        type: "warning",
        allowEnterKey: true,
        allowOutsideClick: false
      }).then(() => {
        location.reload();
      });;
    }
  }
}

function test() {
  console.log($('#tbd')[0].childNodes.length);
  // clear_table();

  var a = moment().format("YYYY-MM-DD HH:mm:ss");
  console.log(a);
}