const pool = require("../dbConfig")

const addTask = (req, res) => {
  let taskName = req.body.taskName;
  let sql = `INSERT INTO todos (name) VALUES ("${taskName}");`;
  pool.query(sql, [taskName], (err, result, fields) => {
    if (err) throw err;
    else
      res.send({
        success: true,
        message: "Task successfully added to the database.",
      });
  });
};

module.exports=addTask;