//********************************/
//  Getting dependencies         */
//********************************/
let express = require(`express`);
let router = express.Router();

//************************************************************/
// Import the model (cat.js) to use its database functions.  */
//************************************************************/
let burger = require(`../models/burger.js`);

//******************************************************************************/
// Create all our routes and set up logic within those routes where required.  */
//******************************************************************************/
//  First route is the root, returns all burgers and their statuses            */
//******************************************************************************/
router.get("/", (req, res)=> {
  burger.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    res.render("index", hbsObject);
  });
});

//*******************************************************************/
//  Secound route creates a new burger based on customer input      */
//*******************************************************************/
router.post(`/api/burgers`, function(req, res) {
  burger.create( [`burger_name`, `devoured`],
                 [req.body.burger_name, req.body.devoured],
                  function(result) {
                        // Send back the ID of the new quote
                        res.json({ id: result.insertId });
                    });
});

//*******************************************************************/
//  Third route devours a burger that has been previously created   */
//*******************************************************************/
router.put("/api/burgers/:id", function(req, res) {
  let condition =`id=${req.params.id}`;

  burger.update({devoured: req.body.devoured}, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

//**************************************************/
//  Fourth route deletes a burger from the table   */
//**************************************************/
router.delete("/api/burgers/:id",function(req,res){
  let cond=`id=${req.params.id}`;
  burger.delete(cond, function(result){
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      };
    });
});

//**************************************/
// Export routes for server.js to use. */
//**************************************/
module.exports = router;