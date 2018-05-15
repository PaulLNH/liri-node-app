var env = require("dotenv").config();
var fs = require("fs");
var request = require("request");
var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// Data logging variables
var logData;

// OMDB  variables
var args = process.argv;
var searchMovie = "";

function getTweets() {
    var params = {
        screen_name: 'PaulLairdDev'
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
    });
}

function readText() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        // We will then print the contents of data
        console.log(data);

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        // We will then re-display the content as an array for later use.
        console.log(dataArr);

    });
}

function logData() {
    fs.appendFile("log.txt", logData, function (err) {
        if (err) {
            console.log(err);
        } else {
            var logTime = Date.now();
            console.log("log.txt updated at: " + logTime);
        }

    });
}

function OMDBquery(input) {
    // Loop to concatinate multiple word movie names
    for (var i = 3; i < input.length; i++) {
        if (i > 3 && i < input.length) {
            searchMovie = searchMovie + "+" + input[i];
        } else {
            searchMovie += input[i];
        }
    }

    // Make the API request to OMDB
    var queryUrl = "http://www.omdbapi.com/?t=" + searchMovie + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("_____________________________________");
            console.log("Movie Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log(JSON.parse(body).Ratings[0].Source + " Rating: " + JSON.parse(body).Ratings[0].Value);
            console.log(JSON.parse(body).Ratings[1].Source + " Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country Movie was Produced: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("Plot: " + JSON.parse(body).Plot);
        }
    });
}

switch (args[2]) {
    case "omdb":
        OMDBquery(args);
        break;
    case "twitter":
        getTweets();
        break;
    default:
        // Spotify something
}