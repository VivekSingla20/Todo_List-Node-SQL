let todoList = [
  {
    name: "Helooooooooooooooooo",
    id: 29,
    isCompleted: false,
    created_date: "Thu Feb 01 2024 17:10:30 GMT+0530 (India Standard Time)",
    updated_date: "Sun Feb 11 2024 13:03:49 GMT+0530 (India Standard Time)",
  },
  {
    name: "Task 1",
    id: 30,
    isCompleted: false,
    created_date: "Thu Feb 01 2024 17:10:31 GMT+0530 (India Standard Time)",
    updated_date: "Thu Feb 01 2024 17:10:31 GMT+0530 (India Standard Time)",
  },
  {
    name: "Task 1",
    id: 31,
    isCompleted: false,
    created_date: "Sat Feb 10 2024 20:31:12 GMT+0530 (India Standard Time)",
    updated_date: "Sat Feb 10 2024 20:31:12 GMT+0530 (India Standard Time)",
  },
  {
    name: "Task 1",
    id: 33,
    isCompleted: false,
    created_date: "Sat Mar 02 2024 16:05:28 GMT+0530 (India Standard Time)",
    updated_date: "Sat Mar 02 2024 16:05:28 GMT+0530 (India Standard Time)",
  },
];

function convertDate(dateString) {
  const dateObject = new Date(dateString);
  return dateObject.toLocaleDateString(undefined);
}

function createActionBtns() {
  let tableCell = document.createElement("td");
  let tickButton = document.createElement("button");
  let deleteButton = document.createElement("button");
  tickButton.textContent = "✅";
  deleteButton.textContent = "❌";
  tableCell.appendChild(tickButton);
  tableCell.appendChild(deleteButton);
  return tableCell;
}

function displayTodo(list) {
  const tableBody = document.getElementById("table-list");
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
    tableRow.appendChild(createActionBtns());
    tableBody.appendChild(tableRow);
  }
}

displayTodo(todoList);
