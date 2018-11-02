      var topics = [];

      function renderButtons() {

        $("#buttons-view").empty();

        for (var i = 0; i < topics.length; i++) {

          var a = $("<button>");

          a.addClass("animalbutton");

          a.attr("data-name", topics[i]);

          a.text(topics[i]);

          $("#buttons-view").append(a);
        }
      }

      $("#add-animal").on("click", function(event) {

        event.preventDefault();

        var animal = $("#animal-input").val().trim();

        topics.push(animal);

        renderButtons();

      });

      $(document).on("click", ".animalbutton", function() {

        $("#gifcontainer").empty();

        var animalname = $(this).attr("data-name");
  
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          animalname + "&api_key=32JNflUExfUFgkes38n788ZH82lBUetW&limit=10";
  
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            var results = response.data;
  
            for (var i = 0; i < results.length; i++) {
  
              var animalDiv = $("<div>");
  
              var p = $("<p>").text("Rating: " + results[i].rating);
  
              var animalImage = $("<img>");              
              animalImage.attr("src", results[i].images.fixed_height_still.url);
              animalImage.attr("data-still", results[i].images.fixed_height_still.url);
              animalImage.attr("data-animate", results[i].images.fixed_height.url);
              animalImage.attr("data-state", "still");


              animalImage.addClass("gif");
              animalDiv.attr("id", "gif" + i);
              
              animalDiv.append(p);
              animalDiv.append(animalImage);
  
              $("#gifcontainer").append(animalDiv);

              $(".gif").on("click", function() {
                var state = $(this).attr("data-state");
                if (state === "still") {
                  $(this).attr("src", $(this).attr("data-animate"));
                  $(this).attr("data-state", "animate");
                } else {
                  $(this).attr("src", $(this).attr("data-still"));
                  $(this).attr("data-state", "still");
                }
              });
            }
          });
      });