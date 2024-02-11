const pool = require("../dbConfig");
const {parseDbObject}= require("../utils/function");

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
      const updatedResult=parseDbObject(result);
      res.send(updatedResult);
    }
  });
};

module.exports = showAllTasks;
