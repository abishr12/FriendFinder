// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Get the routes
var htmlRoutes = require("./app/routing/htmlRoutes.js");
var apiRoutes = require("./app/routing/apiRoutes.js");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var friends = [
  {
    name: "Brad",
    photo:
      "https://pmchollywoodlife.files.wordpress.com/2016/12/brad-pitt-meet-joe-black.jpg?w=600",
    scores: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1],
    totalScore: 32
  }
];

app.get("/home", function(req, res) {
  res.sendFile(path.join(__dirname, htmlRoutes.home_page));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, htmlRoutes.survey_page));
});

app.get(apiRoutes.get, function(req, res) {
  res.json(friends);
});

app.post(apiRoutes.post, function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newFriend = req.body;

  console.log(newFriend);

  friends.push(newFriend);

  res.json(newFriend);
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
