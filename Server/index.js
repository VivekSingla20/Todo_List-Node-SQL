const express = require("express");
const bodyParser = require('body-parser');
const addTask = require("./controllers/addTaskController");
const showAllTasks=require("./controllers/showAllTaskController");
const deleteTask = require("./controllers/deleteTaskController");
const updateTask = require ("./controllers/updatetaskController");

const app=express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/tasks", addTask);
app.get("/tasks",showAllTasks);
app.delete("/tasks/",deleteTask);
app.patch("/tasks",updateTask)

app.listen(3000,()=>{
  console.log("Server on");
});