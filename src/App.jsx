import React from 'react';
import { Router, Route, hashHistory} from 'react-router'
import Nav from './Nav.jsx'
import Dashboard from './Dashboard.jsx'
import Games from './Games.jsx'
import io from 'socket.io-client';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      isActive2: false,
      games: [],
      scoreboards: []
    };

    this.getApi = this.getApi.bind(this);
    this.loginModal = this.loginModal.bind(this);
    this.registerModal = this.registerModal.bind(this);

    this.socket = io();
  }

  componentDidMount() {
    console.log('api componentDidMount');
    this.getApi();
    this.socket.on('schedule update', data => {
      console.log('schedule ' + data);
    });
  }

  //login register popup
  loginModal() {
    this.setState({
      isActive: !this.state.isActive
    })
  }

  registerModal() {
    this.setState({
      isActive2: !this.state.isActive2
    })
  }


  getApi() {
    $.ajax({
      type: 'GET',
      url: '/testData',
      contentType: 'JSON',
      success: (data) => {
        this.setState({ scoreboards: JSON.parse(data) });
      },
      error: function (error) {
        console.log(error);
      }.bind(this),
    });

    $.ajax({
      type: 'GET',
      url: '/testData2',
      contentType: 'JSON',
      success: (data) => {
        this.setState({ games: JSON.parse(data) });
      },
      error: function (error) {
        console.log(error);
      }.bind(this),
    });
  }


  render() {
    let now = new Date()

    return (
      <div>
        <Nav
          loginModal={this.loginModal}
          registerModal={this.registerModal}
          isActive={this.state.isActive}
          isActive2={this.state.isActive2} >
        </Nav>
        <button type="button" className="btn" onClick={this.getApi}>Score!</button>
        <Router history={hashHistory}>
          <Route exact path="/" component={ props => <Dashboard { ...props } games={ this.state.games } scoreboards={ this.state.scoreboards } /> } />
          <Route path="/games/:id" component={(props) => <Games { ...props } socket={this.socket} /> } />
        </Router>
      </div>
    );
  }
}
export default App;
