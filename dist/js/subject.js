//紀錄移動到的tr的索引值
var now_id = 0;
var index_yellow = false;
var index_name = null, last_name = null, sumlength = 0;
var Permission = true;
var result_length = 0;

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
        index_yellow = true;
        result_length = result["0"].data.length;
        sumlength = result_length;

        //生成表格
        append_table(result_length, result);

        for (let i = 0; i < result_length; i++) {
          $('#Part_del' + i)[0].removeAttribute("disabled");
          $('#name' + i).val(result[0].data[i].subject_name);
        }
      } else if (result[0]["sta"] == "0") {
        //生成表格
        append_table(0, result);
      }
    },
    error: function (xhr, status, msg) {
      console.error(xhr);
      console.error(status);
      console.error(msg);
    }
  });
});

function append_table(table_length, result) {
  var null_num = 0;
  if (table_length < 6) {
    null_num = 6 - table_length;
  } else {
    null_num = 1;
  }
  for (let select_index = 0; select_index < table_length; select_index++) {
    $('#tbd').append(
      '<tr>' +
      '<td style="width: 10%;">' + result[0].data[select_index].subject_id + '</td>' +
      '<td style="width: 10%;"><input id="name' + select_index + '" class="form-control offset-xl-3 col-xl-6" type="text" ></td>' +
      '<td style="width: 5%;"><button type="button" class="btn btn-danger btn-circle"  id="Part_del' + select_index + '" onclick="del_data(this)" disabled><i class="fas fa-trash"></i></button></td>' +
      '</tr>'
    );
  }
  for (let i = 0; i < null_num; i++) {
    $('#tbd').append(
      '<tr>' +
      '<td style="width: 10%;"></td>' +
      '<td style="width: 10%;"><input id="name' + table_length + '" class="form-control offset-xl-3 col-xl-6" type="text" ></td>' +
      '<td style="width: 5%;"><button type="button" class="btn btn-danger btn-circle"  id="Part_del' + (table_length++) + '" onclick="del_data(this)" disabled><i class="fas fa-trash"></i></button></td>' +
      '</tr>'
    );
  }

}


//儲存按鈕
function save_data() {
  //總共有幾筆資料
  let num_length = 0;
  //是否有新增失敗的資料
  let no_fail_data = true;
  // check
  let arr = [];

  //若name有空的欄位則跳出迴圈 否則計數+1
  for (let i = 0; i < 999; i++) {
    if ($('#name' + i)[0] != undefined) {
      if ($('#name' + i)[0].value != "") {
        if (arr.indexOf($('#name' + i).val()) != -1) {
          no_fail_data = false;
        } else {
          arr.push($('#name' + i).val());
        }
        num_length++;
      } else {
        i = 999;
      }
    } else {
      i = 999;
    }
  }

  if (no_fail_data) {
    for (let i = 0; i < num_length; i++) {
      let name = $('#name' + i).val();
      let name_space = $('#name' + i)[0].value != "";

      if (name_space) {
        $.ajax({
          type: "POST",
          url: "../dist/php/public/index.php/api/subject/add",
          data: {
            Name: name
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

      } else {
        swal({
          title: "Blank Information !",
          type: "warning",
          allowEnterKey: true,
          allowOutsideClick: false
        });
        no_fail_data = false;
      }
    }
  } else {
    swal({
      title: "Duplicate Data !",
      type: "warning",
      allowEnterKey: true,
      allowOutsideClick: false
    }).then(() => {
      location.reload();
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

//點擊按鈕驗證帳號
function del_data(obj) {
  now_main_val = obj.id;
  let del_id = $('#' + now_main_val)["0"].parentElement.parentElement.firstElementChild.innerHTML;
  let del_name = $('#' + now_main_val)["0"].parentElement.parentNode.children[1].firstChild.value;

  swal({
    title: 'Are you sure?',
    text: "Delete this Subject: " + del_name + " ?",
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
        url: "../dist/php/public/index.php/api/subject/del",
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
          } else {
            swal({
              title: "此科目尚有考題存在，請先刪除!",
              type: "warning",
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