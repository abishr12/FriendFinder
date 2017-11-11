console.log("hello");

$(document).ready(function() {
  var sum = function(array) {
    return array.length === 0 ? 0 : array[0] + sum(array.slice(1));
  };

  $("#submit").on("click", function() {
    event.preventDefault();
    var questionsAnswered = $(".selectpicker");
    var scores = [];
    for (var i = 0; i < questionsAnswered.length; i++) {
      scores.push(parseInt(questionsAnswered[i].value));
    }
    var totalScore = sum(scores);

    var name = $("#name").val();
    var photoLink = $("#photo-link").val();

    var newFriend = {
      name: name,
      photo: photoLink,
      scores: scores,
      totalScore: totalScore
    };

    $.get("/all").done(function(response) {
      var diff = Math.abs(totalScore - response[0].totalScore);
      var bestFriend = 0;
      for (var i = 0; i < response.length - 1; i++) {
        var newDiff = Math.abs(totalScore - response[i].totalScore);
        if (newDiff < diff) {
          diff = newDiff;
          bestFriend = i;
        }
      }
      var match = response[bestFriend];
      var pictureURL = match.photo;
      var personImage = $("<img>");
      personImage.attr("src", match.photo);

      console.log(match);
      $(".modal-title").text("You matched with " + match.name + "!");
      $(".modal-body").prepend(personImage);
    });

    $.post("/api/new", newFriend).done(function(data) {
      console.log(data);
    });
  });
});
