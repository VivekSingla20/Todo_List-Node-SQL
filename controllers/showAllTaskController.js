const pool = require("../dbConfig");

const databaseError = {
  success: false,
  error: {
    code: "ERR_DATABASE",
    message: "Failed to add task to the database. Please try again later.",
  },
};
const errorObject = {
  success: true,
  message: "No tasks found ERROR 404.",
};

const showAllTasks = (req, res) => {
  let sql = `SELECT * FROM todos ;`;
  pool.query(sql, (err, result, fields) => {
    if (err) res.status(500).json(databaseError);
    else if (result.length === 0) res.status(404).json(errorObject);
    else {
      for (let i = 0; i < result.length; i++) {
        if (result[i].isCompleted === 0) result[i].isCompleted = false;
        else result[i].isCompleted = true;
      }
      res.send(result);
    }
  });
};

module.exports = showAllTasks;
