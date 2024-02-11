const pool = require("../dbConfig");

const errorObject = {
  success: true,
  message: "Task not found.",
};

const databaseError = {
  success: false,
  error: {
    code: "ERR_DATABASE",
    message: "Failed to delete task to the database. Please try again later.",
  },
};

const successObject = {
  success: true,
  message: "Task successfully Deleted.",
};

const deleteTask = (req, res) => {
  let id = req.query.id;
  pool.query(`SELECT * FROM todos WHERE id=${id} ;`, (err, result, fields) => {
    if (result.length === 0) {
      res.status(404).json(errorObject);
    } else if (err) {
      res.status(500).json(databaseError);
    } else {
      let sql = `DELETE FROM todos WHERE id=${result[0].id};`;
      pool.query(sql, (err, result, fields) => {
        if (err) res.status(500).json(databaseError);
        else res.send(successObject);
      });
    }
  });
};

module.exports = deleteTask;
