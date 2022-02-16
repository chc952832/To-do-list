// 觀摩後: 使用函式封裝新增到Done清單的項目

// 初始變數
const list = document.querySelector("#my-todo");
const addBtn = document.querySelector("#add-btn");
const input = document.querySelector("#new-todo");
const done = document.querySelector("#done");

// 資料
const todos = [
  "Hit the gym",
  "Read a book",
  "Buy eggs",
  "Organize office",
  "Pay bills"
];

for (let todo of todos) {
  addItem(todo);
}

// 函式
// 新增Todo
function addItem(text) {
  let newItem = document.createElement("li");
  newItem.innerHTML = `
    <label for="todo">${text}</label>
    <i class="delete fa fa-trash"></i>
  `;
  list.appendChild(newItem);
  input.value = ""; // 移除輸入框中文字
}
// 新增Done(加上class="checked"(呈現劃掉效果))
function addToDone(text) {
  const newItem = document.createElement("li");
  newItem.innerHTML = `
  <label for="todo" class="checked">${text}</label>  
  <i class="delete fa fa-trash"></i>`;
  done.appendChild(newItem);
}

// Create
addBtn.addEventListener("click", function () {
  const inputValue = input.value;
  // console.log(inputValue)
  // 1. 使用者未輸入字元直接點擊Add, 或輸入空格都不會產生new todo (p.s. trim()可移除字串前後空格)
  if (inputValue.length > 0 && inputValue.trim() !== "") {
    addItem(inputValue);
  } else {
    // 輸入空白或未輸入字元時給予警示
    alert("Please enter what to do!");
  }
});

// 2. 在輸入框按下Enter鍵新增todo
// 在輸入框設置事件監聽器, 當按下鍵盤鍵時, 執行函式
input.addEventListener("keypress", (event) => {
  // console.log(event); // 打開Devtool觀察event物件
  const inputValue = input.value;
  // 經觀察發現, event物件中的key會顯示按下的鍵盤按鍵種類, 如果按下的是Enter鍵, 建立新todo
  // 同樣須排除使用者未輸入字元或輸入空格的情況
  if (
    event.key === "Enter" &&
    inputValue.length > 0 &&
    inputValue.trim() !== ""
  ) {
    addItem(inputValue);
    // 輸入空白或未輸入字元時給予警示
  } else if (
    event.key === "Enter" &&
    (inputValue.length === 0 || inputValue.trim() === "")
  ) {
    alert("Please enter what to do!");
  }
});

//3.點擊垃圾桶可以刪除項目; 點擊Todo(非垃圾桶區塊)會移轉到Done區塊, 並顯示已完成(劃掉效果);
list.addEventListener("click", (event) => {
  const target = event.target;
  // console.log(target);
  const parentElement = target.parentElement;
  // 如果target中含有delete class name, 表示點擊的是垃圾桶icon-> 選取父層元素, 刪除整條Todo(含垃圾桶)
  if (target.classList.contains("delete")) {
    parentElement.remove();
  } else if (target.tagName === "LABEL") {
    // 條件式(target.tagName === "LABEL")確保點擊的位置是在text上而不是其他區域-> 刪除Todo項目並在Done新增此條項目
    parentElement.remove(); // 選取父層元素, 刪除整條Todo(含垃圾桶)
    // 將Todo區塊刪除的項目新增到Done區塊, 並加上class="checked"(呈現劃掉效果)
    addToDone(target.innerText);
  }
});

// 4. 點擊Done中的項目, 可以還原到Todo區塊
done.addEventListener("click", (event) => {
  // console.log(event.target);
  const target = event.target;
  const parentElement = target.parentElement;
  // 如果target中含有delete class name, 表示點擊的是垃圾桶icon-> 選取父層元素, 刪除整條Done(含垃圾桶)
  if (target.classList.contains("delete")) {
    parentElement.remove();
    // 條件式(target.tagName === "LABEL")確保點擊的位置是在text上而不是其他區域-> 刪除Done項目並將此條項目還原到Todo
  } else if (target.tagName === "LABEL") {
    parentElement.remove();
    // 將done區塊項目還原到todo區塊, 這邊不用加class="checked"
    addItem(target.innerText);
  }
});

///////觀摩前(未使用函式封裝 新增到Done的項目)

// // 初始變數
// const list = document.querySelector("#my-todo");
// const addBtn = document.querySelector("#add-btn");
// const input = document.querySelector("#new-todo");
// const done = document.querySelector("#done");

// // 資料
// const todos = [
//   "Hit the gym",
//   "Read a book",
//   "Buy eggs",
//   "Organize office",
//   "Pay bills"
// ];

// for (let todo of todos) {
//   addItem(todo);
// }

// // 函式
// function addItem(text) {
//   let newItem = document.createElement("li");
//   newItem.innerHTML = `
//     <label for="todo">${text}</label>
//     <i class="delete fa fa-trash"></i>
//   `;
//   list.appendChild(newItem);
// }

// // Create
// addBtn.addEventListener("click", function () {
//   const inputValue = input.value;
//   // console.log(inputValue)
//   // 1. 使用者未輸入字元直接點擊Add, 或輸入空格都不會產生new todo (p.s. trim()可移除字串前後空格)
//   if (inputValue.length > 0 && inputValue.trim() !== "") {
//     addItem(inputValue);
//   }
// });

// // 2. 在輸入框按下Enter鍵新增todo
// // 在輸入框設置事件監聽器, 當按下鍵盤鍵時, 執行函式
// input.addEventListener("keypress", (event) => {
//   // console.log(event); // 打開Devtool觀察event物件
//   const inputValue = input.value;
//   // 經觀察發現, event物件中的key會顯示按下的鍵盤按鍵種類, 如果按下的是Enter鍵, 建立新todo
//   // 同樣須排除使用者未輸入字元或輸入空格的情況
//   if (
//     event.key === "Enter" &&
//     inputValue.length > 0 &&
//     inputValue.trim() !== ""
//   ) {
//     addItem(inputValue);
//   }
// });

// //3.點擊todo會移轉到Done區塊, 並顯示已完成(劃掉效果)
// list.addEventListener("click", (event) => {
//   const target = event.target;
//   // console.log(target);
//   const parentElement = target.parentElement;
//   if (target.classList.contains("delete")) {
//     parentElement.remove();
//   } else {
//     parentElement.remove(); // 選取父層元素, 刪除整條todo(含垃圾桶)
//     // 修改DOM元素, 將todo區塊刪除的項目新增到done區塊, 並加上class="checked"(呈現劃掉效果)
//     done.innerHTML += `
//   <li>
//     <label for="todo" class="checked">${target.innerText}</label>
//     <i class="delete fa fa-trash"></i>
//   </li> `;
//   }
// });

// // 4. 點擊Done中的項目, 可以還原到Todo區塊
// done.addEventListener("click", (event) => {
//   // console.log(event.target);
//   const target = event.target;
//   const parentElement = target.parentElement;
//   if (target.classList.contains("delete")) {
//     parentElement.remove();
//   } else {
//     parentElement.remove();
//     // 修改DOM元素, 將done區塊項目還原到todo區塊, 這邊不用加class="checked"
//     list.innerHTML += `
//   <li>
//     <label for="todo">${target.innerText}</label>
//     <i class="delete fa fa-trash"></i>
//   </li>
//   `;
//   }
// });