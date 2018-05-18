# liri-node-app

Welcome to the Language Interpretation and Recognition Interface node application!

## How it works:

First of all you will want to clone the repo at: `https://github.com/PaulLNH/liri-node-app.git` then be sure to run `npm install` in the terminal to install all the dependencies used in this application.

Next you will navigate to the relative path of the node app in terminal type in one of the following commands:

* `node liri.js omdb <Movie name>` - This returns: Title of the movie, year the movie came out, IMDB Rating of the movie, Rotten Tomatoes Rating of the movie, country where the movie was produced, language of the movie, plot of the movie, and the Actors in the movie.

* `node liri.js spotify <Song Name>` - This returns: Artist(s), the song's name, a preview link of the song from Spotify, the album that the song is from, and if no song is provided then your program will default to "The Sign" by Ace of Base **(although spotify logic returns most popular results first so results may vary)**.

* `node liri.js twitter` - This will show your last 20 tweets and when they were created at in your terminal/bash window.

* `node liri.js random` - This will run whatever command is listed in the random.txt file. By default it's set to: spotify, "I Want it That Way"

## Note:

This app logs the commands executed and their outputs in log.txt
