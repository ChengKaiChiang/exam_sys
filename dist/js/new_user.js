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
    url: "../dist/php/public/index.php/api/new_user",
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
          $('#check' + i)[0].removeAttribute("disabled");
          $('#id' + i).val(result[0].data[i].id);
          $('#pwd' + i).val(result[0].data[i].pwd);
          $('#name' + i).val(result[0].data[i].name);
          $('#tel' + i).val(result[0].data[i].tel);
          $('#mail' + i).val(result[0].data[i].mail);
          $('#permission' + i)[0].selectedIndex = result[0].data[i].permission;
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
    $('#tbd').append(
      '<tr>' +
      '<td width: 10%;" id="id' + select_index + '">' + result[0].data[select_index].id + '</td>' +
      '<td width: 10%;" id="pwd' + select_index + '">' + result[0].data[select_index].pwd + '</td>' +
      '<td width: 10%;" id="name' + select_index + '">' + result[0].data[select_index].name + '</td>' +
      '<td width: 10%;" id="tel' + select_index + '">' + result[0].data[select_index].tel + '</td>' +
      '<td width: 10%;" id="mail' + select_index + '">' + result[0].data[select_index].mail + '</td>' +
      // '<td width: 10%;" id="permission' + select_index + '">' + result[0].data[select_index].permission + '</td>' +
      '<td width: 10%;" class="table_border_1">' +
      '<select id="permission' + select_index + '" class="form-control">' +
      '<option value="admin">管理者</option>' +
      '<option value="member">會員</option>' +
      '</select>' +
      '</td>' +
      '<td width: 5%;" class="table_border_1_del"><button type="button" class="btn btn-success btn-circle" id="check' + select_index + '" onclick="review_data(this)" disabled><i class="fas fa-check"></i></button></td>' +
      '</tr>'
    );
  }

}

function clear_table(table_length) {
  for (let select_index = 0; select_index < table_length; select_index++) {
    $('#check' + select_index)[0].setAttribute("disabled", '');
    $('#No' + select_index).val("");
    $('#Name' + select_index).val("");
    $('#IP' + select_index).val("");
    $('#Port' + select_index).val("");
    $('#No' + select_index).prop('readonly', false);
  }
}

function search_data() {
  let No_value = $('#search_No').val();
  if (No_value !== '') {
    $.ajax({
      type: "POST",
      url: "../php/getMachine.php",
      data: {
        Mode: 3,
        machine_id: No_value
      },
      cache: false,
      dataType: "json",
      async: false,
      success: function (result) {
        if (result[0]["sta"] == "1") {
          index_yellow = true;
          index_name = result[0].machine_data[0].No;
          search_length = result["0"].machine_data.length;
          sumlength = result_length;

          //生成表格
          clear_table(result_length);

          for (let i = 0; i < search_length; i++) {
            $('#check' + i)[0].removeAttribute("disabled");
            $('#No' + i).val(result[0].machine_data[i].No);
            $('#Name' + i).val(result[0].machine_data[i].Name);
            $('#IP' + i).val(result[0].machine_data[i].IP);
            $('#Port' + i).val(result[0].machine_data[i].Port);
            $('#No' + i).prop('readonly', true);
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

//點擊按鈕驗證帳號
function review_data(obj) {
  now_main_val = obj.id;
  let review_name = $('#' + now_main_val)["0"].parentElement.parentElement.firstElementChild.value;
  let permission = $('#' + now_main_val)["0"].parentElement.parentElement.children[5].children[0].selectedIndex;
  swal({
    title: 'Are you sure?',
    text: "Review this account: " + review_name + " ?",
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
        url: "../dist/php/public/index.php/api/new_user/review",
        data: {
          ID: review_name,
          Permission: permission
        },
        cache: false,
        dataType: "json",
        async: false,
        success: function (result) {
          if (result[0]["sta"] == "1") {
            swal({
              title: "Successfully Review !",
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
