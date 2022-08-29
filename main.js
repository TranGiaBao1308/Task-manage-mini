var data = []; // Khai báo mảng trong javascript

function item(id,taskname,deadline,status) {
    this.id =id,
    this.taskname= taskname,
    this.deadline= deadline,
    this.status = status
  };
//khai bao cac bien
var btnOpen = document.querySelector(".open-modal");
var modal = document.querySelector(".model");
var Close = document.querySelector(".model_header i");
var btnSave = document.getElementById("Save");
var editOpen = document.getElementById("openModal");
//fc modal
function toggleModal(e) {
  modal.classList.toggle("hide");
}
btnOpen.addEventListener("click", toggleModal);
Close.addEventListener("click", toggleModal);
btnSave.addEventListener("click", toggleModal);
editOpen.addEventListener("click", toggleModal);

// Check chưa nhập thông tin
function checkInfo() {
  var id = document.getElementById("id").value;
  var taskname = document.getElementById("taskname").value;
  var deadline = document.getElementById("deadline").value;
  var status = document.getElementById("status").value;

  /*if (id && taskname && deadline && status) {
        return true;
    } else {
        alert('Vui lòng nhập đầy đủ thông tin trước khi thêm!');

    }*/

  if (taskname == null || taskname == "") {
    alert("First taskname must be filled out");
    return false;
  } else if (deadline == null || deadline == "") {
    alert("First taskname must be filled out");
    return false;
  } else if (status == null || status == "") {
    alert("First taskname must be filled out");
    return false;
  }
}

// Thêm mới nhân viên
function Add() {
  var id = document.getElementById("id").value;
  var taskname = document.getElementById("taskname").value;
  var deadline = document.getElementById("deadline").value;
  var status = document.getElementById("status").value;

  

  let index = data.findIndex((c) => c.id == item.id);
  if (index >= 0) {
    data.splice(index, 1, item);
  }
  this.data.push(item);
  saveData();

  checkInfo();
  View();
  Refresh();
}

// Hiển thị nhân viên
function View() {
  var list = this.data;
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDay() + 28;

  // Xử lý cộng chuỗi thành html - table
  var datas =
    '<table border="1" cellpadding="10" width=100%><tr><th>ID</th><th>NAME<th>CREATED</th><th>DEALINE</th><th>STATUS</th><th>ACTION</th></tr>';
  for (var i = 0; i < list.length; i++) {
    datas += "<tr>";

    datas += "<td>" + list[i].id + "</td>";
    datas += "<td>" + list[i].taskname + "</td>";
    datas += "<td>" + list[i].deadline + "</td>";
    datas += "<td>" + list[i].deadline + "</td>";
    datas += "<td>" + list[i].status + "</td>";

    datas +=
      "<td colspan=2><button onclick='Deletes(" +
      list[i].id +
      ")' id='DeleModal' >Xóa</button>&nbsp;&nbsp;<button onclick='Edit(" +
      list[i].id +
      ")' id='openModal'>Edit</button>";
    datas += "</tr>";
  }
  datas += "</table>";

  if (list.length != 0) {
    document.getElementById("database").innerHTML = datas;
  } else {
    document.getElementById("database").innerHTML = "Dữ liệu trống!";
  }
}

// Xóa nhân viên theo id
function Deletes(id) {
  var list = this.data;

  var check = confirm("Bạn có muốn xóa task này không?");

  if (check) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].id == id) {
        list.splice(i, 1);
      }
    }
  }
  View(); // gọi hàm hiển thị
}

function Edit(id) {
  toggleModal("show");

  var list = this.data;

  //var check = confirm("Bạn có muốn edit task này không?")
  for (var i = 0; i < list.length; i++) {
    if (list[i].id == id) {
      document.getElementById("id").value = data[i].id;
      document.getElementById("taskname").value = data[i].taskname;
      document.getElementById("create").value = data[i].create;
      document.getElementById("deadline").value = data[i].deadline;
      document.getElementById("status").value = data[i].status;
    }
  }

  View(); // gọi hàm hiển thị
}
// Refresh
function Refresh() {
  document.getElementById("id").value = "";
  document.getElementById("taskname").value = "";
  document.getElementById("deadline").value = "";
  document.getElementById("status").value = "";
}
//local storage
var saveData = function () {
  const jsonData = JSON.stringify(data);
  console.log(jsonData);
  localStorage.setItem("list", jsonData);
};
var getData = function(){
    var dataJson = localStorage.getItem("list");
    if(dataJson){
        var dataList = JSON.parse(dataJson);
        for(var i = 0 ; i<dataList.length;i++){
            var newItem = new item(
                dataList[i].id,
                dataList[i].taskname,
                dataList[i].deadline,
                dataList[i].status
            );
            data.push(newItem);
        }
        View();
    }
};
getData();