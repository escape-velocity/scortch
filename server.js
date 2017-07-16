var express = require('express');

const TestMethods = require('./test.js');
const incoming = TestMethods.boxscore('mlb', '2017-regular', '20170716-TOR-DET', true);

const incoming2 = TestMethods.dailyGameSchedule('mlb', '2017-regular', '20170716-TOR-DET', true);
incoming2.then(function(data){
  console.log("BALSDFASDFAS", data);
})


var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'))

http.listen(3000, function(){
  console.log('listening on *:3000');
});

app.get('/testData',(req,res)=>{
  incoming.then(function(data){
    const gameTime = data.gameboxscore.game.time;
    const awayTeamAbbreviation = data.gameboxscore.game.awayTeam.Abbreviation;
    const homeTeamAbbreviation = data.gameboxscore.game.homeTeam.Abbreviation;
    const awayScore = data.gameboxscore.inningSummary.inningTotals.awayScore;
    const homeScore = data.gameboxscore.inningSummary.inningTotals.homeScore;

    const resultData = {
      gameTime : gameTime,
      awayScore: awayScore,
      awayTeamAbbreviation: awayTeamAbbreviation,
      homeTeamAbbreviation: homeTeamAbbreviation,
      homeScore: homeScore
    };
  res.send(JSON.stringify(resultData));
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});