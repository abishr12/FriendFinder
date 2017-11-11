// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Get the routes
var htmlRoutes = require("./app/routing/htmlRoutes");
var apiRoutes = require("./app/routing/apiRoutes");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "/app/public")));
//app.use(express.static(path.join(__dirname, "/app/data")));

var friends = [
  {
    name: "Brad",
    photo:
      "https://pmchollywoodlife.files.wordpress.com/2016/12/brad-pitt-meet-joe-black.jpg?w=600",
    scores: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1],
    totalScore: 32
  },
  {
    name: "James",
    photo:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMjEzMjk4NDU4MF5BMl5BanBnXkFtZTcwMDMyNjQzMg@@._V1_UX214_CR0,0,214,317_AL_.jpg",
    scores: [3, 4, 2, 1, 4, 5, 3, 2, 2, 3],
    totalScore: 29
  },
  {
    name: "Andrew",
    photo:
      "http://ethnicelebs.com/wp-content/uploads/2010/07/Andrew-Garfield.jpg",
    scores: [5, 3, 2, 5, 4, 5, 3, 5, 2, 5],
    totalScore: 39
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
