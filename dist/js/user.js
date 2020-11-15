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
    url: "../dist/php/public/index.php/api/user",
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
          if (result[0].data[i].permission == "會員")
            $('#check' + i)[0].removeAttribute("disabled");
        }
      } else if (result[0]["sta"] == "0") {
        //生成表格
        append_table(1);
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

  for (let select_index = 0; select_index < table_length; select_index++) {
    result[0].data[select_index].permission == 0 ? result[0].data[select_index].permission = "管理者" : result[0].data[select_index].permission = "會員";
    $('#tbd').append(
      '<tr>' +
      '<td width: 10%;" id="id' + select_index + '">' + result[0].data[select_index].id + '</td>' +
      '<td width: 10%;" id="name' + select_index + '">' + result[0].data[select_index].name + '</td>' +
      '<td width: 10%;" id="tel' + select_index + '">' + result[0].data[select_index].tel + '</td>' +
      '<td width: 10%;" id="mail' + select_index + '">' + result[0].data[select_index].mail + '</td>' +
      '<td width: 10%;" id="permission' + select_index + '">' + result[0].data[select_index].permission + '</td>' +
      '<td width: 5%;"><button type="button" class="btn btn-danger btn-circle" id="check' + select_index + '" onclick="del_data(this)" disabled><i class="fas fa-trash"></i></button></td>' +
      '</tr>'
    );
  }

}

//點擊按鈕驗證帳號
function del_data(obj) {
  now_main_val = obj.id;
  let del_name = $('#' + now_main_val)["0"].parentElement.parentElement.firstElementChild.innerHTML;

  swal({
    title: 'Are you sure?',
    text: "Delete this account: " + del_name + " ?",
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
        url: "../dist/php/public/index.php/api/user/del",
        data: {
          ID: del_name
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