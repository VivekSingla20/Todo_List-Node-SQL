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
  let tickButton = document.createElement("button");
  let deleteButton = document.createElement("button");
  tickButton.textContent = "✅";
  tickButton.addEventListener("click", () => {
    doneTask(id);
  });
  deleteButton.textContent = "❌";
  //TODO: Check with Kritika didi later.
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
    for (let j = 0; j < objectKeys.length; j++) {
      if (objectKeys[j] === "id") continue;
      let tableCell = document.createElement("td");
      if (
        objectKeys[j] === "created_date" ||
        objectKeys[j] === "updated_date"
      ) {
        tableCell.textContent = convertDate(list[i][objectKeys[j]]);
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
  const response = await fetch("http://localhost:3000/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      taskName: input,
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
      isCompleted: "true"
    }),
  });
  if (response.status === 200) showAlltasks();
};
