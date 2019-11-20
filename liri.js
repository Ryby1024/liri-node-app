require("dotenv").config();

const Spotify = require("node-spotify-api");
const keys = require("./keys.js");
const fs = require("fs");
const spotify = new Spotify(keys.spotify);
const axios = require("axios");
const moment = require("moment");
const searchInfo = process.argv[2];
const userInput = process.argv.slice(3).join(" ");

function runInput(searchInfo, userInput){
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
        doThis();
        break;
        default:
            console.log("this doesn't exist")
}
}
console.log(userInput);


function concert(artistName) {
    var artistName = userInput;
    let queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp"
    console.log(queryUrl);

    axios.get(queryUrl).then(function (res) {
         
        if (!artistName) {
            console.log("Please enter the name of an Artist or Band.");
        } else {
            let concertVenue = res.data;

            for(let i = 0; i < concertVenue.length; i++){
                console.log("\n")
                console.log("The event is at " + concertVenue[i].venue.name + " ." + "\n");
                console.log("The " + concertVenue[i].venue.name + " is located in " + concertVenue[i].venue.city + ", " + concertVenue[i].venue.region + " ." + "\n");
                console.log("The event is going to be held on " + moment(concertVenue[i].datetime, 'YYYY-MM-DDTHH:mm:ss').format('MM/DD/YYYY, h:mm')) + " ." + "\n";
            }
           
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
            console.log("Artist: " + res.tracks.items[0].artists[0].name + "\n");
            console.log("Song Name: " + res.tracks.items[0].name + "\n");
            console.log("Song Preview: " + res.tracks.items[0].preview_url + "\n");
            console.log("Album: " + res.tracks.items[0].album.name + "\n");
        }
    })


}
function movieInfo(movieName) {
    if (!movieName) {
        movieName = "Mr. Nobody";
    }
    
        let queryUrl1 = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        axios.get(queryUrl1).then(function (response) {
            console.log("Title: " + response.data.Title + "\n");
            console.log("Release Year: " + response.data.Year + "\n");
            console.log("IMDB Rating: " + response.data.imdbRating + "\n");
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\n");
            console.log("Country Movie was Produced in " + response.data.Country + "\n");
            console.log("Language: " + response.data.Language + "\n");
            console.log("Plot: " + response.data.Plot + "\n");
            console.log("Actors: " + response.data.Actors + "\n");
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


    function doThis(dataArray) {
        fs.readFile("random.txt", "utf-8", function (error, data) {
            if (error) {
                throw error;
            }
             dataArray = data.split(",");
            runInput(dataArray[0], dataArray[1]);
        })
    }
    runInput(searchInfo, userInput);