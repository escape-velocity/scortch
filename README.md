
Scortch  -  Connects Fans in Real Time on unique Chat Channels
=====================	
A real time Sports tracker for Major League Baseball built with ReactJS with an integrated chat app.

PURPOSE of App:      To make a sports fan feel good by connecting them back to their community
PROBLEM SOLVED:      Fans don’t need to watch a game in Isolation

### API

this is the CORE of our product:     
* Comes from   mysportsfeeds.com 
* Incorporates 3 primary feeds  Daily Schedule, Scoreboards (w/boxscore) and Play by Play
* Show the API feed in terminal


### Usage

Clone the repo and create your own git repo.

```
git clone git@github.com:escape-velocity/scortch
cd scortch
git remote rm origin
git remote add origin [YOUR NEW REPOSITORY]
# Manually update your package.json file

Install the dependencies and start the server.

```
npm install
npm start
open http://localhost:3000
```
You will also need to start the webpack dev server on port 8080 using the following: 

```

### API access

As this app was built as a student project in Lighthouse labs coding bootcamp
it will at some time have the API credentials expired and thus be unable to pull new feeds of games

### Linting

This Scortch project includes React ESLint configuration.
npm run lint

### STACK

Node.js  	-  Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. 

React  - React used to create interactive UIs. Design simple views for each state in the application. React will efficiently update and render game data when it changes.

Html5 -
 
CSS/SASS - Using Bootstrap - a Framework for developing a responsive website.  Scales our website from a single code base for  phones to tablets to desktops using CSS media queries.

Postgres SQL - with queries built in Knex 

### Dependencies:

Style-loader -  Adds CSS to the DOM used to implement animation in the Card loading 
Axios -  Promise based HTTP client for the browser and node.js.    		The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value. 
Express -  minimal and flexible Node.js web application framework 
Knex -  SQL query builder for Postgres
Socket.IO  -  enables real-time bidirectional event-based communication over an established socket from client to server.  Features include: A heartbeat mechanism is implemented across the socket for detecting disconnections and Auto-Reconnection Support 
Ajax  -  Web apps can send data to and retrieve from a server asynchronously (in the background) without interfering with the display and behaviour of the existing page.  decoupling the data layer from the presentation layer, Ajax allows for Web pages to change content dynamically without the need to reload the entire page. 

###Student Challenges

Working with an API provider was the biggest challenge 
	Understanding API call json data structure
	Working around rate limitations to data calls
  Estimating the time required to implement new features 
