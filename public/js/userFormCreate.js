/**
 * Created by billy_000 on 12/16/2015.
 */
$( "#userFormCreate" ).submit(function( event ) {
    event.preventDefault();
    $.ajax({
            method: "GET",
            url: "/saveUserAjax",
            data: $(this).serialize()
        })
        .fail(function () {
            // failure() is only triggered if there was an error submitting data to the
            //web server;
            // i.e. the server is offline or the URL we are trying to send data to doesn't
            //exist (404)
            console.log('there was a failure.');
        })
        .success(function (response) {
            // if the web server successfully send backs a message the success() function
            //is run.
            console.log('submitted successfully');
            console.log(response);
        })
        .done(function (response) {
            // the done() function is run no matter if the request succeeded or failed.
        });
});