const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-button");
const alertMessage = document.getElementById("alert-message");
const todosBody = document.querySelector("tbody");
const deleteAllButton = document.getElementById("delete-all-button");

// const todos = [];
let todos = JSON.parse(localStorage.getItem("todos")) || [];
console.log(todos);

const saveToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const generatedId = () => {
  return Math.round(
    Math.random() * Math.random() * Math.pow(10, 15)
  ).toString();
};

const showAlert = (message, type) => {
  alertMessage.innerHTML = "";
  const alert = document.createElement("p");
  (alert.innerText = message), alert.classList.add("alert");
  alert.classList.add(`alert-${type}`);
  alertMessage.append(alert);

  setTimeout(() => {
    alert.style.display = "none";
  }, 2000);
};

const displayTodos = () => {
  todosBody.innerHTML = "";
  if (todos.length === 0) {
    todosBody.innerHTML = "<tr><td colspan='4'>No task found</td></tr>";
    return;
  }
  todos.forEach((todo) => {
    todosBody.innerHTML += `
    <tr>
    <td>${todo.task}</td>
    <td>${todo.date || "No date"}</td>
    <td>${todo.completed ? "Completed" : "Pending"}</td>
    <td>
    <button>Edit</button>
    <button onclick="toggleHandler('${todo.id}')">${
      todo.completed ? "Undo" : "Do"
    }</button>
    <button onclick="deleteHandler('${todo.id}')">Delete</button>
    </td>
    </tr>
    `;
  });
};

const addHandler = () => {
  const task = taskInput.value;
  const date = dateInput.value;
  const todo = {
    id: generatedId(),
    task,
    date,
    completed: false,
  };
  if (task) {
    todos.push(todo);
    saveToLocalStorage();

    taskInput.value = "";
    dateInput.value = "";
    console.log(todos);
    showAlert("Todo added successfully", "success");
  } else {
    showAlert("please enter a todo", "error");
  }
};

const deleteAllHandler = () => {
  if (todos.length) {
    todos = [];
    saveToLocalStorage();
    displayTodos();
    showAlert("All todos cleared successfully", "success");
  } else {
    showAlert("no todos to clear", "error");
  }
};

const deleteHandler = (id) => {
  const newTodos = todos.filter((todo) => todo.id !== id);
  console.log(newTodos);
  todos = newTodos;
  saveToLocalStorage();
  displayTodos();
  showAlert("Todo deleted successfully", "success");
};

const toggleHandler = (id) => {
  // const newTodos = todos.map((todo) => {
  //   if (todo.id === id) {
  //     // return {
  //     //   id: todo.id,
  //     //   task: todo.task,
  //     //   date: todo.date,
  //     //   completed: !todo.completed,
  //     // };
  //     return {
  //       ...todo,
  //       completed: !todo.completed,
  //     };
  //   } else {
  //     return todo;
  //   }
  // });
  // todos = newTodos;
  // console.log(todos);
  const todo = todos.find((todo) => todo.id === id);
  todo.completed = !todo.completed;
  console.log(todo);
  saveToLocalStorage();
  displayTodos();
  showAlert("Todo status changed successfully", "success");
};

window.addEventListener("load", displayTodos);
addButton.addEventListener("click", addHandler);
deleteAllButton.addEventListener("click", deleteAllHandler);
