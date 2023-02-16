//todo-control
//header-input
// todo-list
//todo-completed

const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");

let toDoData = [];
toDoData = localStorage.getItem("item")
  ? JSON.parse(localStorage.getItem("item"))
  : toDoData;
console.log(toDoData);

const render = function () {
  todoList.innerHTML = "";
  todoCompleted.innerHTML = "";

  toDoData.forEach(function (item, index) {
    const li = document.createElement("li");

    li.classList.add("todo-item");

    li.innerHTML =
      " <span class='text-todo'>" +
      item.text +
      "</span>" +
      ' <div class="todo-buttons">' +
      ' <button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      " </div>";
    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }
    li.querySelector(".todo-complete").addEventListener("click", function () {
      item.completed = !item.completed;
      render();
    });
    li.querySelector(".todo-remove").addEventListener("click", function () {
      li.remove();

      toDoData.splice(index, 1);
      localStorage.removeItem("item", JSON.stringify(toDoData));

      render();
    });
    localStorage.setItem("item", JSON.stringify(toDoData));
  });
};

todoControl.addEventListener("submit", function (e) {
  e.preventDefault();
  const checkValue = headerInput.value.trim();
  if (checkValue === "") {
    todoControl.disabled = true;
  } else {
    const newToDo = {
      text: headerInput.value,
      completed: false,
    };

    toDoData.push(newToDo);
    headerInput.value = "";
    localStorage.setItem("item", JSON.stringify(toDoData));
    render();
  }
});

render(toDoData); // чтобы после перезагрузки страницы у нас все вывелось из localStorage
console.log(toDoData);
