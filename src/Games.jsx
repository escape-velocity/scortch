import React from 'react';

class Games extends React.Component {
  constructor() {
    super();
    this.state = {
      inputMessage: '',
      messages: []
    }
    this.onPost = this.onPost.bind(this);
  }
  /* setup socket and join game by unique id */
  componentDidMount() {
    this.props.socket.emit('game join', this.props.params.id);
    /* setup event handlers for messages from the server */
    this.props.socket.on('game chat', msg => {
      this.setState({
        messages: this.state.messages.concat({
          content: msg
        })
      })
    });
  }
  /* on click send message back to sever for game channel */
  onPost() {
    this.props.socket.emit('game chat', this.props.params.id, this.state.inputMessage)
    this.setState({inputMessage: ''});
  }

  render(){
    const index = this.props.scoreboards.length;
    console.log(this.props.scoreboards)
    if(index > 1) {
      var scoreboards = this.props.scoreboards.filter((scoreboard) => {
        return this.props.params.id.includes(scoreboard.gameId);
      })
      console.log(scoreboards[0], "chris00")
    }
    
    
    const messages = this.state.messages.map((message, index) => {
      return ( <p className="msgClass" key={ index }> { message.content }</p>);
    });
    if( index > 1) {
    return (
      <div className="container">
        <div className="row">
          <div className="card-deck">
            <div className="col-md-8 gamecard">
              <div className="card text-center scoretop">
                <div className="card-header scoreheader">
                  Todays Game between: { scoreboards[0].awayTeamAbbreviation } @ { scoreboards[0].homeTeamAbbreviation }
                </div>
                  <div className="card-block"> 
                    <h3 className="card-title">Other logo Logo</h3>
                    <h3 className="card-title">{ scoreboards[0].awayTeamAbbreviation }</h3>
                    <h1 className="card-title">{ scoreboards[0].awayScore } - { scoreboards[0].homeScore }</h1>
                    <h2 className="card-title">{ scoreboards[0].homeTeamAbbreviation }</h2>
                  </div>
                  <div className="card-block">
                    <h3 className="card-title">Batting: Ramirez</h3>
                    <h3 className="card-title">Pitching: Hunter</h3>
                    <h2 className="card-title"></h2>
                  </div>
                  <div className="card-deck">Play by Play: Today's game is brought to you by the lawfirm of Kian, Lee and Shin.'
                  <div className="card-deck">TEST</div>
                </div>
              </div>
            </div>
              <div className="col-md-4 gamecard">
                <div className="card text-center scoretop">
                  <div className="card-header scoreheader">
                   Today's Game Chatter
                  </div>
                  <div className="card-block">
                    <ul id="messages">
                      { messages }
                    </ul>
                    <input value={ this.state.inputMessage } onChange={ (event) => this.setState({ inputMessage: event.target.value })} />
                    <button onClick={ this.onPost }>Send it!</button>
                  </div>
                </div>
               </div>
              </div>
            </div>
          </div>
    );
    } else {
      return (
        <div>
        </div>
      );
    }
  }
}
export default Games;