const pool = require("../dbConfig");
const functions = require("../utils/function");

const errorObject = {
  success: true,
  message: "Task not found.",
};

const databaseError = {
  success: false,
  error: {
    code: "ERR_DATABASE",
    message: "Failed to add task to the database. Please try again later.",
  },
};

const updateTask = (req, res) => {
  let id = req.query.id;
  let isCompleted = req.body.isCompleted;
  let name = req.body.name;
  const dateTime = new Date();
  let sql = `UPDATE todos SET ${
    isCompleted === undefined ? "" : `isCompleted=${isCompleted},`
  }${
    name === undefined ? "" : `name="${name}",`
  }updated_date="${dateTime}" WHERE id=${id};`;
  pool.query(sql, (err, result, fields) => {
    if (result.affectedRows === 0) res.status(404).json(errorObject);
    else if (err) res.status.json(databaseError);
    else {
      pool.query(
        `SELECT * FROM todos WHERE id=${id};`,
        (err, result, fields) => {
          if (err) res.status(500).json(databaseError);
          else {
            const updatedResult = functions.parseDbObject(result);
            res.send(updatedResult);
          }
        }
      );
    }
  });
};

module.exports = updateTask;
