const pool = require("../dbConfig");

const successObject = {
  success: true,
  message: "Task successfully added to the database.",
};
const databaseError = {
  success : false,
  error: {
    code: "ERR_DATABASE",
    message: "Failed to add task to the database. Please try again later."
  }
}


const addTask = (req, res) => {
  const date= new Date();
  const dateString=date.toString();
  let taskName = req.body.taskName;
  let sql = `INSERT INTO todos (name,created_date,updated_date) VALUES ("${taskName}","${dateString}","${dateString}");`;
  pool.query(sql, [taskName], (err, result, fields) => {
    if (err) 
    {res.status(500).json(databaseError);
      console.log(err);
    }
    else res.send(successObject);
  });
};

module.exports = addTask;
