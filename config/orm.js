//*******************************************/
// Import MySQL connection to access table  */
//*******************************************/
let connection = require(`./connection`);

//**********************************************************************************/
// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks
//   - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
//**********************************************************************************/
function printQuestionMarks(num) {
  let arr = [];
  for (var i = 0; i < num; i++) {arr.push("?")};
  return arr.toString();
}

//*******************************************************************/
// Helper function to convert object key/value pairs to SQL syntax  */
//*******************************************************************/
function objToSql(ob) {
  let arr = [];
  for (var key in ob) {     // loop through the keys and push the key/value as a string int arr
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }
  // translate array of strings to a single comma-separated string
  return arr.toString();
}

//**********************************************/
// Object for all our SQL statement functions. */
//**********************************************/
let orm = {
    //***************************************************************************************/
    //  First object creates a SQL query to get all of the records out of the burger table  */
    //***************************************************************************************/
    all: function(tableInput, cb) {
        let queryString = `SELECT * FROM ${tableInput};` ;
        connection.query(queryString, function(err, result) {
            if (err) {throw err}
            cb(result);
        });
    },

    //*********************************************************/
    //  Second object inserts a record into the burger table  */
    //*********************************************************/
    create: function(table, cols, vals, cb) {
        let queryString = `INSERT INTO ${table}` ;
        queryString += ` (${cols.toString()}) VALUES (${printQuestionMarks(vals.length)})`;

        console.log(queryString);

        connection.query(queryString, vals, function(err, result) {
            if (err) { throw err; }
            cb(result);
        });
    },

    //***************************************************************************/
    //  Third object updates a record into the burger table                     */
    // An example of objColVals would be {name: Imposible Burger, devour: true} */
    //***************************************************************************/
    update: function(table, objColVals, condition, cb) {
        let queryString = `UPDATE ${table} SET ${objToSql(objColVals)} WHERE ${condition}`;

        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) {throw err;}
            cb(result);
        });
    },

    //***************************************************/
    //  Fourth object deletes a record from the table   */
    //***************************************************/
    delete: function(table, cond, cb) {
        let queryString =`DELETE FROM ${table} WHERE ${cond}`;
        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) {throw err;}
            cb(result);
        });
    }
};

// Export the orm object for the model (cat.js).
module.exports = orm;
