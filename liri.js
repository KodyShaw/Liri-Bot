require("dotenv").config();
let Keys = require("./keys.js");

let request = require("request");
let fs = require("fs");

//collect user inputs
let userCommand = process.argv[2];
let userSearch = process.argv.slice(3).join(" ");

let Spotify = require('node-spotify-api');
let spotify = new Spotify(Keys.spotify);


function processInput(userCommand, userSearch) {
    switch (userCommand) {
        case "concert-this":
            concertSearch(userSearch);
            console.log(userCommand);
            console.log(userSearch);
            break;

        case "spotify-this-song":
            songSearch(userSearch);
            break;

        case "movie-this":
            movieSearch(userSearch);
            break;

        case "do-what-it-says":
            doWhatSays();
            break;

    }

}

processInput(userCommand, userSearch);


function concertSearch(userSearch) {
    let url = "https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp"

    console.log(url);

    request(url, function (error, response, body) {


        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log(JSON.parse(body))

        }
        else console.log(error);
    })
};

function songSearch() {

    spotify
        .search({ type: 'track', query: "'" + userSearch + "'" }, function (err, data) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(data.tracks.items[0].artists[0].name);
        });

    //console.log(data.tracks.items[0].artists[0].name);
}

function movieSearch() {
    request("http://www.omdbapi.com/?t=" + process.argv.slice(3).join("+") + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("Title: " + JSON.parse(body).title +
                "\nPlot: " + JSON.parse(body).plot +
                "\nRating: " + JSON.parse(body).rating);
        }
    });
}

function doWhatSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
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

