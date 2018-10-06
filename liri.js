require("dotenv").config();
var keys = require('./keys.js')
var Spotify = require('node-spotify-api');
var spoofy = new Spotify(keys.spotify);
var request = require('request');
var oper = process.argv[2];
var item = process.argv[3];
var moment = require('moment');
var fs= require('fs');

if (oper === 'concert-this') {
    request("https://rest.bandsintown.com/artists/" + item + "/events?app_id=codingbootcamp", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            results = JSON.parse(body);
            for (i = 0; i < results.length; i++) {
                var date = moment(results[i].datetime).format('MM/DD/YYYY')
                console.log("Venue Name: " + results[i].venue.name)
                console.log("Location: " + results[i].venue.city)
                console.log("Date: " + date + "\n")

            }
        }
    })
}

if (oper === 'spotify-this-song') {
    if (!item) {
        item = 'The Sign'
    }
    spoofy.search({
        type: 'track',
        query: item,
        limit: 8
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        for (i = 0; i < data.tracks.items.length; i++) {

            console.log('Artist: ' + data.tracks.items[i].album.artists[0].name); //Returning Artist    

            console.log('Song Title: ' + item); //Returning Song Title

            console.log('Preview: ' + data.tracks.items[i].album.external_urls.spotify); //Link to Song on Spotify

            console.log('Album: ' + data.tracks.items[i].album.name + '\n'); //Album Name
        }
    })
}

// not sure if multiple results should be returned for this, if so just needs a for loop around the if statement with the console logs
if (oper === 'movie-this') {
    if (!item) {
        item = 'Mr. Nobody'
    }
    request("http://www.omdbapi.com/?t=" + item + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

        if (!error && response.statusCode === 200) {
            var parse = JSON.parse(body);
            console.log('Title: ' + parse.Title);
            console.log('Year: ' + parse.Year);
            console.log('Rated: ' + parse.Rated);
            console.log('Rotten Tomatoes Rating: ' + parse.Ratings[1].Value);
            console.log('Country: ' + parse.Country);
            console.log('Language: ' + parse.Language);
            console.log('Plot: ' + parse.Plot);
            console.log('Actors: ' + parse.Actors);

        }
    })
}

fs.readFile('random.txt', 'utf8', function(error, data) {
// this needs to pull from random.txt to enter a command that we specified previously
})