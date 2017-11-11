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
      for (var i = 0; i < response.length; i++) {
        var newDiff = Math.abs(totalScore - response[i].totalScore);
        if (newDiff < diff) {
          diff = newDiff;
          bestFriend = i;
        }
      }
      console.log(response[bestFriend]);
    });
    $.post("/api/new", newFriend).done(function(data) {
      console.log(data);
      alert("Adding friend...");
    });
  });
});
