//TODO:Extract Edit Task functionality into a function.
//TODO:Improve Create action button by making functions.


async function showAlltasks() {
  const response = await fetch("http://localhost:3000/tasks");
  const taskList = await response.json();
  displayTodo(taskList);
}

showAlltasks();

function convertDate(dateString) {
  const dateObject = new Date(dateString);
  return dateObject.toLocaleDateString(undefined);
}

function createActionBtns(id) {
  let tableCell = document.createElement("td");
  let tickButton = document.createElement("div");
  let deleteButton = document.createElement("div");
  tickButton.classList.add("action-btns");
  deleteButton.classList.add("action-btns");
  tickButton.textContent = "✔";
  tickButton.addEventListener("click", () => {
    doneTask(id);
  });
  deleteButton.textContent = "❌";
  deleteButton.addEventListener("click", () => {
    deleteTask(id);
  });

  tableCell.appendChild(tickButton);
  tableCell.appendChild(deleteButton);
  return tableCell;
}

function displayTodo(list) {
  const tableBody = document.getElementById("table-list");
  tableBody.textContent = null;
  for (let i = 0; i < list.length; i++) {
    let tableRow = document.createElement("tr");
    const objectKeys = Object.keys(list[i]);
    let td = document.createElement("td");
    td.textContent = i + 1;
    tableRow.appendChild(td);
    for (let j = 0; j < objectKeys.length - 1; j++) {
      if (objectKeys[j] === "id") continue;
      let tableCell = document.createElement("td");
      tableCell.id = list[i].id;
      if (objectKeys[j] === "created_date") {
        tableCell.textContent = convertDate(list[i][objectKeys[j]]);
      } else if (objectKeys[j] === "name") {
        let newTask = document.createElement("input");
        newTask.value = list[i].name;
        tableCell.appendChild(newTask);
        newTask.id = "inputBlur";
        newTask.addEventListener("blur", (event) => {
          newTask.id = "inputBlur";
          if (event.target.value === "") {
            newTask.value = list[i].name;
          } else editTask(event.target.value, list[i].id);
        });
        newTask.addEventListener("focus", (event) => {
          newTask.id = "inputFocus";
        });
      } else {
        tableCell.textContent = list[i][objectKeys[j]];
      }
      tableRow.appendChild(tableCell);
    }
    tableRow.appendChild(createActionBtns(list[i].id));
    tableBody.appendChild(tableRow);
  }
}

const addTask = async () => {
  const input = document.getElementById("input").value;
  if (input === "") alert("Enter something...");
  else {
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskName: input,
      }),
    });
    document.getElementById("input").value = "";
    if (response.status === 200) showAlltasks();
  }
};

const editTask = async (value, id) => {
  const response = await fetch(`http://localhost:3000/tasks/?id=${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: value,
    }),
  });
  if (response.status === 200) showAlltasks();
};

const deleteTask = async (id) => {
  const response = await fetch(`http://localhost:3000/tasks/?id=${id}`, {
    method: "DELETE",
  });
  if (response.status === 200) showAlltasks();
};

const doneTask = async (id) => {
  const response = await fetch(`http://localhost:3000/tasks/?id=${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isCompleted: "true",
    }),
  });
  if (response.status === 200) showAlltasks();
};
