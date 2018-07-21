# LIRI-node-application (Language Interpretation and Recognition Interface)

Liri is a node application that accept command line arguments to grab data from multiples APIs.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

To run this application you will need Node.JS and NPM installed on your system.You nee API keys for
twitter, spotify, and omdb.

### Installing
First, clone the  project:
```
https://github.com/wbudoyo07/liri-node-app.git
```

Run the following command inside the folder you cloned:
```
npm install
```
## Set up API keys
Insert your API inside key.js
```

consumer_key: <twitter api keys>,
consumer_secret: <twitter api keys>,
access_token_key: <twitter api keys>,
access_token_secret: <twitter api keys>

id: <spotify api keys>,
secret: <spotify api keys>

omdbKey: <omdb api key>
```
## Running the application 

```
node liri.js my-tweets
node liri.js spotify-this-song (Pick your song)
node liri.js movie-this
node liri.js movie-this (pick your movie)
node liri.js do-what-it-says
```

Available commands:

**my-tweets**
* This will output my last 20 tweets.

**spotify-this-song (Pick you song)**
* This will output the song information from spotify:
  * Artist(s)
  * The song's name
  * A preview link of the song from Spotify
  * The album that the song is from

**movie-this**
* This will ouput Mr. Nobody movie links.

**movie-this (Pick your movie)**
* This will ouput the movie information from omdb :
 * Title of the movie.
   * Year the movie came out.
   * IMDB Rating of the movie.
   * Rotten Tomatoes Rating of the movie.
   * Country where the movie was produced.
   * Language of the movie.
   * Plot of the movie.
   * Actors in the movie.
**do-what-it-says**
* This will get an ouput from random.txt. It will show "I Want it That Way" song information.
  
