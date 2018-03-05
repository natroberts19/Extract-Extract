// GET to grab the headlines as a json
function getResults() {
  // Empty any results currently on the page
  $("#headlines").empty();
$.getJSON("/api/all", function(data) {
    // For each one
    // var i = i.slice(0, 4);
    for (var i = 0; i < data.length; i++) {
      // Display the information on the page
      $("#headlines").append("<p data-id='" + data[i]._id + "'>" + data[i].title + '<br><a href="'+ data[i].link +' " target="iframe_a">' + data[i].link + '</a>');
    }
  });
}

// Runs the getResults function as soon as the script is executed
getResults();

// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Headline
  $.ajax({
    method: "GET",
    url: "/api/headlines/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#comment-input").append("<h3>Comment on this article: <br>" + data.title + "</h3><br>");
      // An input to enter a new name
      $("#comment-input").append("Your Name: <br><br><input id='nameinput' name='name' ><br><br>");
      // A textarea to add a new note body
      $("#comment-input").append("Add a Comment: <br><br><textarea id='bodyinput' name='body'></textarea><br><br>");
      // A button to submit a new note, with the id of the article saved to it
      $("#comment-input").append("<br><button class='btn btn-default' data-id='" + data._id + "' id='savenote'>Submit</button><br>");

      // If there's a note in the article
      if (data.note) {
        // Place the the comment in the #savednotes area.
        $("#savednotes").val(data.note.name);
        $("#savednotes").val(data.note.body);
      }
    });
});


// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/api/headlines/" + thisId,
    data: {
      // Value taken from name input
      name: $("#nameinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#comment-input").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#nameinput").val("");
  $("#bodyinput").val("");
});


  
  

  