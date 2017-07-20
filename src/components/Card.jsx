import React from 'react';

function Card({ gameId, gameTime, homeTeamAbbreviation, awayTeamAbbreviation, homeScore, awayScore, innings }) {
  
  return (
    <div className="scorecard">
      <div className="card text-center boardcard">
        <div className="card-header boardheader">
          <a href={'/#/games/' + gameId}><i className="fa fa-star" aria-hidden="true"></i></a>
            { gameTime } 
        </div>
          <div className="card-block">
          <h3 className="card-title">{ awayTeamAbbreviation } @ { homeTeamAbbreviation }</h3>
          <h2 className="card-title">{ awayScore } - { homeScore }</h2>
          
          {(() => {
            switch (innings) {
              case null: return ;
              default:  return innings.map((inning, index) => {
                  return <p key={index}> {inning['@number']}: {inning.awayScore}-{inning.homeScore}</p>
                });
            }
          })()}
          <div className="card-footer boardfooter">
              <i className="fa fa-commenting-o" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card;
