// --------- ---------------  ---------  --------------- ---------------  ---------  ------

$(document).ready(function () {

  // create an array of strings, Save it to a variable called topics.

  var topics = ['books', 'factory', 'coffee', 'dizzy', 'beer', 'stupid', 'cheese', 'moon', 'shampoo', 'sarcasm', 'shame', 'sneeze'];

  // Your app should take the topics in this array and create buttons in your HTML.

  // Function for displaying topic data
  function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < topics.length; i++) {

      // Then dynamicaly generating buttons for each topic in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of movie-btn to our button
      a.addClass("topic-btn");
      // Adding a data-attribute
      a.attr("data-name", topics[i]);
      // Providing the initial button text
      a.text(topics[i]);

      // Try using a loop that appends a button for each string in the array.
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }

  // Calling the renderButtons function to display the initial buttons
  renderButtons();

  // When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

  // Event listener for all button elements
  $("button").on("click", function () {
    // In this case, the "this" keyword refers to the button that was clicked
    var topic = $(this).attr("data-name");

    // Constructing a URL to search Giphy for the topic
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Tv0EOvxJVNjxdfLB2EN7YUdSZXSW2MjW&q=" +
      topic + "&limit=10&offset=0&rating=R&lang=en";

    // Performing our AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After the data comes back from the API
      .then(function (response) {

        console.log(response.data);

        // Storing an array of results in the results variable
        var results = response.data;

        // Looping over every result item
        for (var i = 0; i < results.length; i++) {

          // Only taking action if the photo has an appropriate rating
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            // Creating a div with the class "item"
            var gifDiv = $("<div class='item'>");

            // Storing the result item's rating
            var rating = results[i].rating;

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);

            // Creating an image tag
            var topicImage = $("<img>");

            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            topicImage.attr("src", results[i].images.fixed_height.url);
            topicImage.attr("data-still", results[i].images.fixed_height_still.url);
            topicImage.attr("data-animate", results[i].images.fixed_height.url);
            topicImage.attr("data-state", "animate");
            topicImage.attr("class", "gif");





            // Appending the paragraph and topicImage we created to the "gifDiv" div we created. 
            // Under every gif, display its rating (PG, G, so on).

            gifDiv.append(topicImage);
            gifDiv.append(p);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gifs-appear-here").prepend(gifDiv);
          }
        }
      });
  });

  // When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

  $(".gif").on("click", function () {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "animate") {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");

    } else {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
  });
  
});

// This data is provided by the GIPHY API.
// Only once you get images displaying with button presses should you move on to the next step. 


// Add a form to your page takes the value from a user input box and adds it into your topics array. Then make a function call that takes each topic in the array remakes the buttons on the page.




