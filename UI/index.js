
function addingTask(){
let data = ["1", "2", "3", "4", "5", "6"];
let list = document.getElementById("table-list");
let tr = document.createElement('tr');
for (let i = 0; i < data.length; i++) {
  let td = document.createElement('td');
  td.innerText = data[i];
  tr.appendChild(td);
  list.appendChild(tr);
}
}