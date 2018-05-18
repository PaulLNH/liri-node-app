var env = require("dotenv").config();
var fs = require("fs");
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require("./keys");

// Loads keys form keys.js
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

// Input variable
var args = process.argv;
// OMBD variable for multiple word movie titles
var searchMovie = "";
// Spotify variable for multiple word song titles
var searchSong = "";
// Data logging variables
var logInput = "";
var timeIsNow = Date.now();
var logTime;

function getLogTime() {
    var d = new Date();
    d.setTime(timeIsNow);
    logTime = d;
}

function getTweets() {
    var params = {
        screen_name: "PaulLairdDev",
        count: 20,
        extended: true
    };
    client.get("statuses/user_timeline", params, function (err, tweets, response) {
        if (err) {
            return console.log(`Error occurred: ${err}`);
        }
        logInput += `_____________________________________\n`;
        logInput += `Twitter Search Results For: ${tweets[0].user.screen_name}\n`;
        console.log(`_____________________________________`);
        console.log(`${tweets[0].user.screen_name}, here are your latest tweets:`);
        for (var i = 0; i < tweets.length; i++) {
            console.log(`_____________________________________`);
            logInput += `_____________________________________\n`;

            console.log(`Tweet #${i + 1}`);
            logInput += `Tweet #${i + 1}\n`;
            console.log(`Posted at: ${tweets[i].created_at}`);
            logInput += `Posted at: ${tweets[i].created_at}\n`;
            console.log(`${tweets[i].text}`);
            logInput += `${tweets[i].text}\n`;
        }
        logData();
    });
}

function getSongData(input) {
    if (!input[3]) {
        searchSong = "The Sign";
    } else {
        for (var i = 3; i < input.length; i++) {
            if (i > 3 && i < input.length) {
                searchSong = searchSong + "+" + input[i];
            } else {
                searchSong += input[i];
            }
        }
    }
    logInput += `_____________________________________\n`;
    logInput += `OMDB Movie Search: ${searchSong}\n`;

    spotify.search({
            type: "track",
            query: searchSong,
            limit: 3
        },
        function (err, data) {
            if (err) {
                return console.log(`Error occurred: ${err}`);
            }
            var results = data.tracks.items;
            for (key in results) {
                console.log(`_____________________________________`);
                logInput += `_____________________________________\n`;

                console.log(`Artist: ${results[key].artists[0].name}`);
                logInput += `Artist: ${results[key].artists[0].name}\n`;

                console.log(`Song Name: ${results[key].name}`);
                logInput += `Song Name: ${results[key].name}\n`;

                console.log(`Album Name: ${results[key].album.name}`);
                logInput += `Album Name: ${results[key].album.name}\n`;

                console.log(`Spotify Link: ${results[key].external_urls.spotify}`);
                logInput += `Spotify Link: ${results[key].external_urls.spotify}\n`;
            }
            logData();
        }
    );
}

function readText() {
    logInput += `_____________________________________\n`;
    logInput += `Random Query From Text:`;

    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(`Error occurred: ${err}`);
        }
        console.log(`Executing: ${data}`);
        var dataArr = data.split(",");
        dataArr.splice(0, 0, "PleaseVisit", "http://Laird.Codes");
        run(dataArr);
    });
}

function logData() {
    fs.appendFile("log.txt", logInput, function (err) {
        if (err) {
            return console.log(`Error occurred: ${err}`);
        }
        console.log(`log updated at: ${logTime}`);
    });
}

function OMDBquery(input) {
    // Loop to concatinate multiple word movie names
    if (!args[3]) {
        searchMovie = "Mr Nobody";
    } else {
        for (var i = 3; i < input.length; i++) {
            if (i > 3 && i < input.length) {
                searchMovie = searchMovie + "+" + input[i];
            } else {
                searchMovie += input[i];
            }
        }
    }
    logInput += `_____________________________________\n`;
    logInput += `OMDB Movie Search: ${searchMovie}\n`;
    // Make the API request to OMDB
    var queryUrl =
        "http://www.omdbapi.com/?t=" +
        searchMovie +
        "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function (err, response, body) {
        if (err) {
            return console.log(`Error occurred: ${err}`);
        }
        console.log(`_____________________________________`);
        logInput += `_____________________________________\n`;

        console.log(`Movie Title: ${JSON.parse(body).Title}`);
        logInput += `Movie Title: ${JSON.parse(body).Title}\n`;

        console.log(`Release Year: ${JSON.parse(body).Year}`);
        logInput += `Release Year: ${JSON.parse(body).Year}\n`;

        console.log(
            `${JSON.parse(body).Ratings[0].Source} Rating: ${
        JSON.parse(body).Ratings[0].Value
      }`
        );
        logInput += `${JSON.parse(body).Ratings[0].Source} Rating: ${
      JSON.parse(body).Ratings[0].Value
    }\n`;

        console.log(
            `${JSON.parse(body).Ratings[1].Source} Rating: ${
        JSON.parse(body).Ratings[1].Value
      }`
        );
        logInput += `${JSON.parse(body).Ratings[1].Source} Rating: ${
      JSON.parse(body).Ratings[1].Value
    }\n`;

        console.log(`Country Movie was Produced: ${JSON.parse(body).Country}`);
        logInput += `Country Movie was Produced: ${JSON.parse(body).Country}\n`;

        console.log(`Language: ${JSON.parse(body).Language}`);
        logInput += `Language: ${JSON.parse(body).Language}\n`;

        console.log(`Actors: ${JSON.parse(body).Actors}`);
        logInput += `Actors: ${JSON.parse(body).Actors}\n`;

        console.log(`Plot: ${JSON.parse(body).Plot}`);
        logInput += `Plot: ${JSON.parse(body).Plot}\n`;
        logData();
    });
}

function run(input) {
    getLogTime();
    logInput += `_____________________________________\n`;
    logInput += `${logTime}\n`;
    logInput += `New Session Input: ${input}\n`;
    switch (input[2]) {
        case "omdb":
            OMDBquery(input);
            break;
        case "twitter":
            getTweets();
            break;
        case "spotify":
            getSongData(input);
            break;
        case "random":
            readText();
            break;
        default:
            console.log("I'm sorry, you did not give my any instruction.");
            logInput += `No command to execute, user input was invalid.\n`;
            logData();
    }
}

run(args);