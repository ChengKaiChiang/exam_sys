//紀錄移動到的tr的索引值
var now_id = 0;
var index_yellow = true;
var index_name = null, last_name = null, old_length = 0;
var result_length = 0;
var subject = null;
var download = null;
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
  for (let select_index = 0; select_index < table_length; select_index++) {
    $('#tbd').append(
      '<tr id="read_id' + select_index + '" data-toggle="tooltip" data-placement="top">' +
      '<td id="qnumber' + select_index + '" style="width: 5%;"></td>' +
      '<td style="width: 5%;" class="table_border_1">' +
      '<select id="grade' + select_index + '" class="form-control" disabled>' +
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
      '<select id="chapter' + select_index + '" class="form-control" disabled>' +
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
      '<select id="type' + select_index + '" class="form-control" disabled>' +
      '<option value="please choose">-type-</option>' +
      '<option value="1">單選題</option>' +
      '<option value="2">複選題</option>' +
      '<option value="3">填空題</option>' +
      '<option value="4">問答題</option>' +
      '</select>' +
      '</td>' +
      '<td style="width: 30%;"><input id="content' + select_index + '" class="form-control" type="text" data-toggle="tooltip" data-placement="top" ></td>' +
      '<td style="width: 8%;"><input id="answer' + select_index + '" class="form-control" type="text" data-toggle="tooltip" data-placement="top" ></td>' +
      '</tr>'
    );
  }

}

function clear_table() {
  var clear_length = $('#tbd')[0].childNodes.length;
  console.log($('#tbd')[0].childNodes.length);

  for (let i = 0; i < clear_length; i++) {
    $('#read_id' + i).remove();
  }

}


function show_data(obj) {
  var a = obj.value;
  console.log(a);

  if (a == "all")
    clear_table();
  else {
    clear_table();
    //讀取資料庫的值且顯示至表格中
    $.ajax({
      type: "POST",
      url: "../dist/php/public/index.php/api/exam_paper/getQuestion",
      cache: false,
      data: {
        id: a
      },
      async: false,
      dataType: "json",
      success: function (result) {
        if (result[0]["sta"] == "1") {
          result_length = result["0"].data.length;
          append_table(result_length);
          download = result["0"].data;
          for (let i = 0; i < result_length; i++) {
            $('#qnumber' + i)[0].innerHTML = result[0].data[i].question_number;
            $('#grade' + i)[0].selectedIndex = result[0].data[i].grade;
            $('#chapter' + i)[0].selectedIndex = result[0].data[i].chapter;
            $('#type' + i)[0].selectedIndex = result[0].data[i].type;
            $('#content' + i)[0].value = result[0].data[i].content;
            $('#content' + i)[0].title = result[0].data[i].content;
            $('#answer' + i)[0].value = result[0].data[i].answer;
            $('#answer' + i)[0].title = result[0].data[i].answer;
            $('#read_id' + i)[0].title = "建立時間：" + result[0].data[i].time + "\r\n建立者：" + result[0].data[i].user_id +
              "\r\n最後修改日期：" + result[0].data[i].update_time + "\r\n最後修改者：" + result[0].data[i].update_user;
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

function show_paper(obj) {
  var a = obj.value;
  console.log(a);

  if (a == "all") {
    clear_table();
    $("#paper").find("option").remove();
    $('#paper').append("<option value=\"all\">-考卷-</option>");
  }
  else {
    clear_table();
    $("#paper").find("option").remove();
    $('#paper').append("<option value=\"all\">-考卷-</option>");
    //讀取資料庫的值且顯示至表格中
    $.ajax({
      type: "POST",
      url: "../dist/php/public/index.php/api/exam_paper/getAllPaper",
      cache: false,
      data: {
        subject_id: $('#select_subject')[0].value
      },
      async: false,
      dataType: "json",
      success: function (result) {
        if (result[0]["sta"] == "1") {
          result_length = result["0"].data.length;
          for (let i = 0; i < result_length; i++) {
            var s_subject = $('#select_subject')[0][result[0].data[i].subject_id].text;
            var s_semester = $('#semester')[0][result[0].data[i].semester].text;
            var s_exam_type = $('#exam_type')[0][result[0].data[i].exam_type].text;

            $('#paper').append("<option value=" + result[0].data[i].id + ">"
              + s_subject + "_" + result[0].data[i].school_year + "" + s_semester + "學期_" + s_exam_type + "</option>");
          }
        } else if (result[0]["sta"] == "0") {

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

function test() {
  console.log($('#tbd')[0].childNodes.length);
  // clear_table();

  var a = moment().format("YYYY-MM-DD HH:mm:ss");
  console.log(a);
}


var tmpDown; //导出的二进制对象
function downloadExl(type) {
  var index = $('#paper')[0].selectedIndex;
  var name = $('#paper')[0][index].text;
  $('#hf')[0].download = name + ".xlsx";
  json = download;
  var tmpdata = json[0];
  json.unshift({});
  var keyMap = []; //获取keys
  for (var k in tmpdata) {
    keyMap.push(k);
    json[0][k] = k;
  }
  var tmpdata = [];//用来保存转换好的json 
  json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
    v: v[k],
    position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
  }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
    v: v.v
  });
  var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10
  var tmpWB = {
    SheetNames: ['mySheet'], //保存的表标题
    Sheets: {
      'mySheet': Object.assign({},
        tmpdata, //内容
        {
          '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
        })
    }
  };
  tmpDown = new Blob([s2ab(XLSX.write(tmpWB,
    { bookType: (type == undefined ? 'xlsx' : type), bookSST: false, type: 'binary' }//这里的数据是用来定义导出的格式类型
  ))], {
    type: ""
  }); //创建二进制对象写入转换好的字节流
  var href = URL.createObjectURL(tmpDown); //创建对象超链接
  document.getElementById("hf").href = href; //绑定a标签
  document.getElementById("hf").click(); //模拟点击实现下载
  setTimeout(function () { //延时释放
    URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL
  }, 100);
}

function s2ab(s) { //字符串转字符流
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}
// 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
function getCharCol(n) {
  let temCol = '',
    s = '',
    m = 0
  while (n > 0) {
    m = n % 26 + 1
    s = String.fromCharCode(m + 64) + s
    n = (n - m) / 26
  }
  return s
}
