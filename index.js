const express = require("express");
const bodyParser = require('body-parser');
const addTask = require("./controllers/addTaskController")

const app=express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/addTask", addTask);

app.listen(3000,()=>{
  console.log("Server on");
});

