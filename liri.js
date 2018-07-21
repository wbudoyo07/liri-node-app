require("dotenv").config();

const keys = require("./keys.js")
const Twitter = require("twitter");
const Spotify = require("node-spotify-api");
const omdbRequest = require("request");
const fs = require("fs");

const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);
const omdbApiKey = keys.omdb.omdbKey;

let userInput = process.argv[2];
let pickContent = process.argv[3];

switch(userInput){
  case "my-tweets":
  getMyTweets();
  logText(userInput,pickContent);
  break;

  case "spotify-this-song":
  getMySpotify(pickContent);
  logText(userInput,pickContent);
  break;

  case "movie-this":
  getMovieInfo();
  logText(userInput,pickContent);
  break;

  case "do-what-it-says":
  doWhatItSays();
  logText(userInput,pickContent);
  break;
}

// function to get recent 20 tweets
function getMyTweets(){

    // You can change the user_ID and how many tweet count that you want
    let params = {screen_name: 'Drakenzer_Drz', count:'20'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {

        if (!error && response.statusCode === 200) {    

            // if tweet is successful run this
            for(let i= 0; i<tweets.length; i++){
        
            // .text is the user's tweet in Twitter JSON format
            console.log(`\nTweet no ${i} : ${tweets[i].text}`);
            }
            }else if (error){

            console.log(error);
            }
        });
    };

function getMySpotify(querySong){

    spotify.search({ type: 'track', query: querySong, limit:1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }else{
            
            // print out Artist name, song, preview link and album
           
            console.log(`\nArtist: ${data.tracks.items[0].artists[0].name}`);
            console.log(`Song: ${data.tracks.items[0].name}`);
            console.log(`Preview link: ${data.tracks.items[0].artists[0].external_urls.spotify}`);
            console.log(`Album: ${data.tracks.items[0].album.name}`);
        }
    });
};

function getMovieInfo(){

   if(pickContent === undefined){
       console.log(`If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/ \nIt's on Netflix!`);
   }else{

   
    omdbRequest(`http://www.omdbapi.com/?t=${pickContent}&y=&plot=short&apikey=${omdbApiKey}`, function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

            // print out title, year, rating, Rotten tomatoes rating,country,language, plot, and Actors
            console.log(`\nTitle of the movie: ${JSON.parse(body).Title}`);
            console.log(`Year the movie came out: ${JSON.parse(body).Year}`);
            console.log(`IMDB Rating of the movie: ${JSON.parse(body).imdbRating}`);
            console.log(`Rotten Tomatoes Rating of the movie: ${JSON.parse(body).Ratings[1].Value}`);
            console.log(`Country where the movie was produced: ${JSON.parse(body).Country}`);
            console.log(`Language of the movie: ${JSON.parse(body).Language}`);
            console.log(`Plot of the movie: ${JSON.parse(body).Plot}`);
            console.log(`Actors in the movie: ${JSON.parse(body).Actors}\n`);

        }
    });
   }
}

function doWhatItSays(){
    
    let dataArr;

    if(pickContent === undefined){
        fs.readFile("random.txt", "utf8", function(error, data) {

            // If the code experiences any errors it will log the error to the console.
            if (error) {
              return console.log(error);
            }else{
           // We will then print the contents of data
           console.log(`"${data}" inside random.txt`);
          
          //  // Then split it by commas (to make it more readable)
           dataArr = data.split(",");
          
          
           getMySpotify(dataArr);
            }
          
           });
       
    }
};

function logText(userInput,pickContent){

    fs.appendFile("log.txt",`\n${userInput}  ${pickContent}`, function(err){

        if (err){
            console.log(err);
        }
        else{
            console.log("log.txt is update")
        }
    })
}

