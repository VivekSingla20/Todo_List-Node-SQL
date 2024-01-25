const { createPool } = require("mysql2");

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "Vivek@20",
  database: "TodoList",
  connectionLimit: 10,
});

module.exports=pool;