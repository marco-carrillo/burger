//***********************/
// Getting dependencies
//***********************/
let mysql = require("mysql");

//*******************************************/
// Establishing connection with the server  */
//*******************************************/
let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "mydogandcat",
  database: "burgers_db"
});

//*******************************************/
// Making the connection with the database  */
//*******************************************/
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;
