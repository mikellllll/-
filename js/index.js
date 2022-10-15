import { getData } from "../utils/getdata.js";
let dataArr = null;
const table = document.querySelector("table");
if (!window.localStorage.getItem("storageArr")) {
  const { data } = getData;
  dataArr = data;
  console.log(dataArr);
  window.localStorage.setItem("storageArr", JSON.stringify(dataArr));
  render(dataArr);
} else {
  dataArr = JSON.parse(window.localStorage.getItem("storageArr"));
  console.log(dataArr);
  console.log("走缓存");
  render(dataArr);
}
// 数据模板

function render(dataInfo) {
  let str = `
	<tr>
	<th>序号</th>
	<th>标题</th>
	<th>发布人</th>
	<th>发布时间</th>
	<th>操作</th>
</tr>`;
  const pre = dataInfo.reduce((pre, item, index) => {
    return (pre += ` <tr id =${item.id}>
		<td>${item.id}</td>
		<td>${item.title}</td>
		<td>${item.user}</td>
		<td>${item.date}</td>
		<td>
			<button class="dele">删除</button>
			<button class="editor">编辑</button>
		</td>
	</tr>`);
  }, "");
  table.innerHTML = str += pre;
  dele = document.querySelectorAll(".dele");
  dele.forEach((ele) => {
    ele.addEventListener("click", deleData);
  });
  modified = document.querySelectorAll(".editor");
  modified.forEach((e) => {
    e.addEventListener("click", modifiedData);
  });
}

// 增加功能

const add = document.querySelector(".add");
add.addEventListener("click", addSome);
function addSome() {
  const title = document.querySelector(".title");
  const autho = document.querySelector(".autho");
  const date = document.querySelector(".date");
  const obj = {
    id: dataArr.length + 1,
    title: title.value,
    user: autho.value,
    date: date.value,
  };
  dataArr.push(obj);
  window.localStorage.setItem("storageArr", JSON.stringify(dataArr));
  render(dataArr);
}
// 删除功能
var dele = document.querySelectorAll(".dele");
dele.forEach((ele) => {
  ele.addEventListener("click", deleData);
});
function deleData(e) {
  const id = e.target.closest("tr").id;
  let index = dataArr.findIndex((val, index) => {
    return val.id == id;
  });
  dataArr.splice(index, 1);
  for (let i = index; i < dataArr.length; i++) {
    dataArr[i].id--;
  }
  window.localStorage.setItem("storageArr", JSON.stringify(dataArr));
  render(dataArr);
}
// 模态框
var modified = document.querySelectorAll(".editor");
const card = document.querySelector(".card");
const mask = document.querySelector(".mask");
const adds = document.querySelector(".adds");
const close = document.querySelector(".close");
modified.forEach((e) => {
  e.addEventListener("click", modifiedData);
});
function modifiedData(e) {
  card.style.opacity = 1;
  mask.style.display = "block";
  window.sessionStorage.setItem("id", e.target.closest("tr").id);
}
close.addEventListener("click", () => {
  card.style.opacity = 0;
  mask.style.display = "none";
});
adds.addEventListener("click", () => {
  card.style.opacity = 0;
  mask.style.display = "none";
});
// 修改功能
adds.addEventListener("click", () => {
  const book = document.querySelector(".book");
  const autho = document.querySelector(".inp.autho");
  const date = document.querySelector(".input.date");
  const id = window.sessionStorage.getItem("id");
  const data = {
    id,
    title: book.value,
    user: autho.value,
    date: date.value,
  };
  let res = dataArr.find((val, index) => {
    return val.id == id;
  });
  res.id = data.id;
  res.title = data.title;
  res.user = data.user;
  res.date = data.date;
  window.localStorage.setItem("storageArr", JSON.stringify(dataArr));
  render(dataArr);
});
