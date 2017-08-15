var app = require('express')();
var http = require('http').Server(app);
const fs = require('fs');
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies


function getLeaderboard(callback) {
  fs.readFile('storage/leaderboard.json', "utf8", function(err, data) {
    callback(JSON.parse(data))
  })
}
function saveLeaderboard(data){
  fs.writeFileSync("storage/leaderboard.json", JSON.stringify(data))
}
function getTopLeaderboard(callback1){
  getLeaderboard(function (data) {
    callback1(data.sort(function (a, b) {
      if (a.score > b.score) { return -1; };
      if (a.score < b.score) { return 1; };
      return 0; }).slice(0, 20)
    )
  }
)
}
function saveToLeaderboard(name, score){
  getLeaderboard(function(data){
    data.push({"name": name, "score": score})
    console.log(data)
    saveLeaderboard(data)
  })
}


app.get('/', function(req, res){
  res.sendFile(__dirname + '/html/game.html');
});
app.post("/add-score/", function(req, res){
  console.log(req.headers.xname, req.headers.xscore)
  saveToLeaderboard(req.headers.xname, parseInt(req.headers.xscore));
  res.end('{"done": true}')
})
app.get("/get-score/", function(req, res) {
  getTopLeaderboard(function (data) { res.end( JSON.stringify(data) ) } )
})
app.use(require('express').static('assets'));


http.listen(4000, function(){
  console.log('listening on *:4000');
});
