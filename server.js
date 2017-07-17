var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static('public'))


// current date
const rightNow = new Date();
const res = rightNow.toISOString().slice(0, 10).replace(/-/g, "");

// Boxscore, DailySchedule - Mike
const MyMethods = require('./api/boxscore.js');
const incomingBoxscore = MyMethods.boxscore('20170716-TOR-DET', true);
const incomingDailySchedule = MyMethods.dailySchedule(res, true);

// DailySchedule - Kian
const schedule = require('./api/dailySchedule.js');
const incomingSchedule = schedule('20170714', true);



// could be used as gameIds in boxscore?
incomingDailySchedule.then(function (data) {
  let output = [];
  data.dailygameschedule.gameentry.forEach(function(element, index, array){
    const date = element.date.replace(/-/g, '');
    const awayTeam = element.awayTeam.Abbreviation;
    const homeTeam = element.homeTeam.Abbreviation;
    // const time = element.time;
    output.push (`${date}-${awayTeam}-${homeTeam}`);
  })
  console.log(output);
  return output
})



// Boxscore promise fulfilled - from Mike
app.get('/testData', (req, res) => {
  incomingBoxscore.then(function (data) {
    const gameTime = data.gameboxscore.game.time;
    const awayTeamAbbreviation = data.gameboxscore.game.awayTeam.Abbreviation;
    const homeTeamAbbreviation = data.gameboxscore.game.homeTeam.Abbreviation;
    const awayScore = data.gameboxscore.inningSummary.inningTotals.awayScore;
    const homeScore = data.gameboxscore.inningSummary.inningTotals.homeScore;

    const resultData = {
      gameTime: gameTime,
      awayScore: awayScore,
      awayTeamAbbreviation: awayTeamAbbreviation,
      homeTeamAbbreviation: homeTeamAbbreviation,
      homeScore: homeScore
    };
    res.send(JSON.stringify(resultData));
  });
});

// DailySchedule promise fulfilled from Kian
app.get('/testData2',(req,res) => {
  const today = [];
  incomingSchedule.then((data) => {
    data.dailygameschedule.gameentry.forEach(gameEntry => {
      console.log(gameEntry.time)
      today.push({
        gameTime: gameEntry.time,
        teams: gameEntry.awayTeam.Name + " @ " + gameEntry.homeTeam.Name,
        gameId: gameEntry.id
      });
    })
  res.send(JSON.stringify(today));
  });
});



io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});
