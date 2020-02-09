//****************************************************************************/
// Import the ORM to create functions that will interact with the database.  */
//****************************************************************************/
let orm = require(`../config/orm.js`);

let burger = {

    //*********************************************/
    //  Calls ORM for a full list of all burgers  */
    //*********************************************/
    all: function(cb) {
        orm.all(`burgers`, function(res) {
        cb(res);
        });
    },

    //**********************************************************/
    //  Calls ORM to insert a new record into the burger table */
    // The variables cols and vals are arrays.                 */
    //*********************************************************/
    create: function(cols, vals, cb) {
        orm.create(`burgers`, cols, vals, function(res) {
        cb(res);
        });
    },

    //*********************************************************/
    //  Calls ORM to update the status devoured of the burger */
    //*********************************************************/
    update: function(objColVals, condition, cb) {
        orm.update(`burgers`, objColVals, condition, function(res) {
        cb(res);
        });
    },

    //*********************************************************/
    //  Calls ORM to delete the status devoured of the burger */
    //*********************************************************/
    delete: function(condition, cb) {
        orm.delete(`burgers`, condition, function(res) {
            cb(res);
        });
    },

};

// Export the database functions for the controller 
module.exports = burger;