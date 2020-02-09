//*************************************************************************/
// Make sure we wait to attach our handlers until the DOM is fully loaded.
//*************************************************************************/
$(function() {

    //************************************************************************/
    // The following function provides a message that the burger name needs  */
    // to be at least five characters long.                                  */
    //************************************************************************/
    function AlertMC(ptitle,pcontent){
        $.confirm({
          title: ptitle,
          content: pcontent,
          type: 'red',   
          buttons: {
                      delete: {text: 'Understand', btnClass: 'btn-red',
                      action: function(){}  }
                    }
        });  // Jquery confirm
    };  // End of function

    //*************************************************************************/
    // Click event for the 'Devour' button.  Should change status from        */
    // devoured=false to devoured=true o the table and then refresh page      */
    //*************************************************************************/
    $(".change-devour").on("click", function(event) {

      let id = $(this).data("id");
      let newDevour = $(this).data("newstatus");
  
      let newDevourState = {
        devoured: newDevour
      };
  
      // Send the PUT request.
      $.ajax(`/api/burgers/${id}`, {
        type: "PUT",
        data: newDevourState
      }).then(
        function() {
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    //********************************************************************************************/
    //  The following function is called whenever the delete-burger button is clickes.  It will  */
    //  make an API call to delete the record from the database and will refresh the page.       */
    //********************************************************************************************/
    $(".delete-burger").on("click",function(event){
          let id=$(this).data("id");
          // Send the PUT request.
          $.ajax(`/api/burgers/${id}`, {type: "DELETE"
          }).then(
            function() {
              location.reload();  // Reload the page to get the updated list
            }
          );
    })

    //*********************************************************************************/
    // Function will be called whenever the "add burger" button is clicked, so that   */
    // a new burger is created.  Add a new record to the table and refreshes page     */
    //*********************************************************************************/
    $(".add-bg").on("click", function(event) {
        event.preventDefault();  // Preventing default event 

        //******************************************************/
        // Validates burger name is at least 5 characters long */
        //******************************************************/
        if($("#ca").val().trim().length<5){
          AlertMC('Invalid length','There needs to be at least 5 characters on the burger name');
          $("#ca").focus();
          return;
        }

        let newBurger = {burger_name: $("#ca").val().trim(), devoured: 0};

        // Send a POST request.
        $.ajax("/api/burgers", {type: "POST",data: newBurger}).then(function() {
                  // Reload the page to get the updated list
                location.reload();
              });
    });

});
  