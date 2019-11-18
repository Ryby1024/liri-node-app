require("dotenv").config();

const Spotify = require("node-spotify-api");
const keys = require("./keys.js");
const fs = require("fs");
const spotify = new Spotify(keys.spotify);
const axios = require("axios");
const moment = require("moment");
const searchInfo = process.argv[2];
const userInput = process.argv.slice(3).join(" ");


switch (searchInfo) {
    case "concert-this":
        concert(userInput);
        break;
    case "spotify-this-song":
        getArtist(userInput);
        break;
    case "movie-this":
        movieInfo(userInput);
        break
    case "do-what-it-says":
        doThis(getArtist);

        break;

}
console.log(userInput);


function concert(artistName) {

    let queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp"
    console.log(queryUrl);

    axios.get(queryUrl).then(function (res) {
        if (artistName === "") {
            console.log("No band or artist entered. Please enter a band or an artist")
        } else {


            console.log("The event is at " + res.data[0].venue.name + " .");
            console.log("The " + res.data[0].venue.name + " is located in " + res.data[0].venue.city + ", " + res.data[0].venue.region + " .");
            console.log("The event is going to be held on " + moment(res.data[0].datetime, 'YYYY-MM-DDTHH:mm:ss').format('MM/DD/YYYY, h:mm')) + " .";
        }

    })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}
function getArtist(songName) {



    if (!songName) {
        songName = "The Sign Ace of Base";
    }

    spotify.search({ type: "track", query: songName }, function (error, res) {
        if (error) {
            console.log(error);
        } else {
            console.log("Artist: " + res.tracks.items[0].artists[0].name);
            console.log("Song Name: " + res.tracks.items[0].name);
            console.log("Song Preview: " + res.tracks.items[0].preview_url);
            console.log("Album: " + res.tracks.items[0].album.name);
        }
    })


}
function movieInfo(movieName) {

    if (!movieName) {
        console.log("If you haven't watched Mr. Nobody then you should")
        movieName = "Mr. Nobody";
        return false;
    } else {
        let queryUrl1 = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        axios.get(queryUrl1).then(function (response) {
            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.tomatoRating);
            console.log("Country Movie was Produced in " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        })

            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log("---------------Data---------------");
                    console.log(error.response.data);
                    console.log("---------------Status---------------");
                    console.log(error.response.status);
                    console.log("---------------Status---------------");
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an object that comes back with details pertaining to the error that occurred.
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });

    }
}

function doThis(dataArray) {
    fs.readFile("random.txt", "utf-8", function (error, data) {
        if (error) {
            throw error;
        }
         dataArray = data.split(",");
        console.log(dataArray[0], dataArray[1]);
    })
}