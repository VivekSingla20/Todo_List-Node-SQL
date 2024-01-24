const {createPool}=require("mysql2");
const express = require("express");
const app=express();
const pool = createPool({
  host: "localhost",
  user :"root",
  password:"Vivek@20",
  database:"Todo_List",
  connectionLimit:10
});

// TODO: Read about bodyParser
//BY CHAT GPT
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
//CHAT GPT CODE ENDS HERE


const createTable = (req,res)=>{
  let name=req.body.tableName;
  let sql =`CREATE TABLE ${name} (
    name VARCHAR(255),
    id INT AUTO_INCREMENT PRIMARY KEY,
    task VARCHAR(255),
    dateTime DATETIME
);`;

  pool.query(sql,(err,result,fields)=>{
    if (err) throw err;
    else console.log("Created Table SuccessFully");
  });
};



const addTask= (req,res)=>{
    let name = req.body.tableName;
    let task_name= req.body.name;
    let sql = `INSERT INTO ${name} (name,task) VALUES ("${task_name}","Undone");`;
    pool.query(sql,[task_name],(err,result,fields)=>{
      if(err) throw err;
      else console.log("Added Successfully");
    });
};


const showAll =(req,res)=>{
  let name = req.body.tableName;
    pool.query(`SELECT * FROM ${name} ;`,(err,result,fields)=>{
      if(err) throw err;
      res.send(result);
      // console.log(fields);
    });
};

const updateTaskName=(req,res)=>{
  let task_name= req.body.task;
  let table_name= req.body.tableName;
  let new_task= req.body.newTask;
  let sql= `UPDATE ${table_name} SET name="${new_task}" WHERE name=${task_name};`;
  pool.query(sql,(err,result,fields)=>{
    if(err) throw err;
    else console.log("Updated Successfully");
  })
}

const dropTable=(req,res)=>{
let name= req.body.name;
let sql= `DROP TABLE ${name};`;
pool.query(sql,(err,result,fields)=>{
  if(err) throw err;
  console.log("Dropped Successfully");
  // res.send("Dropped Successfully");
})
};
const doneTask=(req,res)=>{
  let name=req.body.taskName;
  let table_name= req.body.tableName;
  let sql = ` UPDATE ${table_name} SET task="done" WHERE name="${name}";`;
  pool.query(sql,(err,result,fields)=>{
    if (err) throw err;
    else console.log("Task Done Successful");
  });
}
app.post("/create-table",createTable);
app.post("/addTask", addTask);
app.post("/updateTask", updateTaskName);
app.get("/showAll",showAll);
app.post("/deleteTable",dropTable);
app.post("/doneTask",doneTask);

app.listen(3000,()=>{
  console.log("Server on");
});

