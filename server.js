var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

let converter = require('./plays')


app.use(express.static('public'))

// current date
const rightNow = new Date()
const now = rightNow.toISOString().slice(0, 10).replace(/-/g, "");

const feed = require('./api/feed.js');
const updated = feed();



// Scoreboard - Mike
const scoreboard = require('./api/scoreboard.js');


// JSON.stringify(objA) === JSON.stringify(objB)


let gameIds = [];



// DailySchedule - Kian
const schedule = require('./api/dailySchedule.js');
const incomingSchedule = schedule(20170720, true);
const pbp = require('./api/playByPlay.js');

const getGameIds = ({ dailygameschedule }) => {
  const { gameentry } = dailygameschedule;
  return gameentry.map(entry => entry.id);
}

const getPlayByPlay = (gameIds) => {
  const playByPlays = gameIds.map(gId => pbp(gId))
  return Promise.all(playByPlays);
}

// const playbyplay = () => {
//   incomingSchedule
//     .then(getGameIds)
//     .then(getPlayByPlay)
//     .then(data => res.send(JSON.stringify(data)))
// }

var requestLoop = setInterval(() => {
  let scoreboards = [];
  const incomingScoreboard = scoreboard(20170720, true);
  console.log("!......")
  let temp = []
  incomingScoreboard.then((data) => {
    data.scoreboard.gameScore.forEach(item => {
      temp.push({
        gameId: item.game.ID,
        gameTime: item.game.time,
        awayTeamAbbreviation: item.game.awayTeam.Abbreviation,
        homeTeamAbbreviation: item.game.homeTeam.Abbreviation,
        awayScore: item.awayScore,
        homeScore: item.homeScore,
        isInProgress: item.isInProgress,
        isCompleted: item.isCompleted,
        innings: item.inningSummary && item.inningSummary.inning,
        currentInning: item.currentInning,
        currentInningHalf: item.currentInningHalf,
      })
    });
    if(JSON.stringify(temp) !== JSON.stringify(scoreboards)){
      scoreboards = JSON.parse(JSON.stringify(temp));
      io.emit('scoreboard update', JSON.stringify(scoreboards));
      temp = [];
    }
  });

  incomingSchedule
  .then(getGameIds)
  .then(getPlayByPlay)
  .then(data => (io.emit('playbyplay update', JSON.stringify(data))))


}, 25000 );




// DailySchedule promise fulfilled - from Kian

//PlayByPlay
// const playByPlay = pbp(38347);



// Boxscore promise fulfilled - from Mike
// app.get('/scoreboard', (req, res) => {
//     res.send(JSON.stringify(scoreboards));
// });


// DailySchedule promise fulfilled - from Kian
app.get('/dailyschedule',(req,res) => {
  const dailySchedule = [];
  incomingSchedule.then((data) => {
    data.dailygameschedule.gameentry.forEach(gameEntry => {
      dailySchedule.push({
        gameId: gameEntry.id,
        gameTime: gameEntry.time,
        teams: gameEntry.awayTeam.Abbreviation + ' @ ' + gameEntry.homeTeam.Abbreviation
      });
    })
  res.send(JSON.stringify(dailySchedule));
  });
});

// app.get('/gameIDs',(req,res) => {
//   incomingSchedule.then((data) => {
//     data.dailygameschedule.gameentry.forEach(gameEntry => {
//       gameIds.push(gameEntry.id);
//     })
//   res.send(JSON.stringify(gameIds));
//   });

// });


  /* setup socket and connect user game chat by unique id */
io.on('connection', function(socket){
  socket.on('game join', game => {
    socket.join(`game${game}`);
  });
    /* broadcast out to users joined game by unique id */
  socket.on('game chat', function(id, msg){
    io.to(`game${id}`).emit('game chat', msg);
    io.emit('schedule update', 'here is schedule data');
  });
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});
