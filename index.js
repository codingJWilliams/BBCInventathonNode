var app = require('express')();                                                 // Import web framework
var http = require('http').Server(app);                                         // Import HTTP library and init it with web framework
const fs = require('fs');                                                       // Import FileSystem to save leaderboards
var bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

function getLeaderboard(callback) {                                             // This reads in the leaderboard and calls "callback([{name: Jay, score: 10}, {name: Dude, score: 20}])"
  fs.readFile('storage/leaderboard.json', "utf8", function(err, data) {
    callback(JSON.parse(data))
  })
}
function saveLeaderboard(data){                                                 // This saves said json to the disk so it can be read later
  fs.writeFileSync("storage/leaderboard.json", JSON.stringify(data))
}
function getTopLeaderboard(callback1){                                          // Will call "callback1" with the top 20 players
  getLeaderboard(function (data) {                                              // First it gets the leaderboard
    callback1(data.sort(function (a, b) {                                       // Then sorts based on the logic:
      if (a.score > b.score) { return -1; };
      if (a.score < b.score) { return 1; };                                     // Which puts higher scores earlier in the array
      return 0; }).slice(0, 20)                                                 // Then returns the first 20 (Can be changed)
    )
  }
)
}
function saveToLeaderboard(name, score){                                        // Saves a name and score to leaderboard
  getLeaderboard(function(data){                                                // First gets leaderboard
    data.push({"name": name, "score": score})                                   // Then adds an object with {name: "Jay", score: 69}
    console.log(data)                                                           // Logs for troubleshooting
    saveLeaderboard(data)                                                       // Saves the data
  })
}

app.get('/', function(req, res){                                                // On someone requesting the homepage
  res.sendFile(__dirname + '/html/game.html');                                  // Send them the "game.html" file
});
app.post("/clear-leaderboard/", function (req, res) {                           // I have an IFTTT set up to call this at 1:pm every day
  saveLeaderboard([])                                                           // Delete the leaderboard
  res.end('{"done": true}')
})
app.post("/add-score/", function(req, res){                                     // On someone triggering add-score
  var name = req.body.name                                                      // Store name
  var score = parseInt(req.body.score)                                          // Store score
  console.log(name, score, typeof score)                                        // Log their name and score
  saveToLeaderboard(name, score);                                               // Then parse their score and save it
  res.end('{"done": true}')                                                     // Reply with success
})
app.get("/get-score/", function(req, res) {                                     // On someone requesting the leaderboard
  getTopLeaderboard(function (data) { res.end( JSON.stringify(data) ) } )       // Get the leaderboard then send it to them
})
app.use(require('express').static('assets'));                                   // Finally if none of these rules match, search the "assets" folder, to allow serving images


http.listen(4000, function(){                                                   // Then listen on port 4000 for connections
  console.log('listening on *:4000');
});
