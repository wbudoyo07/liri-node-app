require("dotenv").config();

var keys = require("./keys.js")
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var userInput = process.argv[2];

switch(userInput){
  case "my-tweets":
  getMyTweets();
  break;

  case "spotify-this-song":
  getMySpotify();
  break;

}

// function to get recent 20 tweets
function getMyTweets(){

    // You can change the user_ID and how many tweet count that you want
    var params = {screen_name: 'Drakenzer_Drz', count:'20'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {

        if (!error && response.statusCode === 200) {    

            // if tweet is successful run this
            for(var i= 0; i<tweets.length; i++){
        
            // .text is the user's tweet in Twitter JSON format
            console.log(`\nTweet no ${i} : ${tweets[i].text}`);
            }
            }else if (error){

            console.log(error);
            }
        });
    };

function getMySpotify(){

    spotify.search({ type: 'track', query: 'All the Small Things', limit:1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
    // console.log(data.tracks.items[0].name); 
    // console.log(data.tracks.items[0].artists[0].name);
    
      });
};

