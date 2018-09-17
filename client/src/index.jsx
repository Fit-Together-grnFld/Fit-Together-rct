import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import UserHeader from './components/userHeader.jsx';
import UserEventList from './components/userEventList.jsx';
import GameList from './components/gameList.jsx';
import Signup from './components/signup.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: '',
      username: '',
      password: '',
    }
    // this.changeUser = this.changeUser.bind(this);
    // this.gotoHomepage = this.gotoHomepage.bind(this);
    this.loginClick = this.loginClick.bind(this);
    this.getUser = this.getUser.bind(this);
    this.onUsername = this.onUsername.bind(this);
    this.onPassword = this.onPassword.bind(this);
  }

  gotoSignUp(){
    ReactDOM.render(<Signup />, document.getElementById('app'));
  }

  onUsername (e) {
    this.setState({
      username: e.target.value
    });
  }

  onPassword (e) {
    this.setState({
      password: e.target.value
    });
  }

  getUser() {
    let uName = this.state.username;
    let u = this.state.user;
    let apple = this;
    var promise = new Promise(function(resolve, reject) {
      // do a thing, possibly async, then…
      axios.get('/user', {
        params: {
          name: uName
        }
      }).then((response)=>{
        apple.setState({user: response.data}, ()=>{console.log(apple.state)})
      })
      setTimeout(()=>{
        console.log(apple.state.user)
        if (u === u) {
          resolve("Stuff worked!");
        }
        else {
          reject(Error("It broke"));
        }
      },1000)
      
    })
    promise.then(()=>{
        
        console.log(apple.state.user);
        ReactDOM.render(<UserPage user={apple.state.user} />, document.getElementById('app'))
      }) 

   
    
  }

  loginClick() {
    axios.get('/login', {
      params: {
        name: this.state.username,
        password: this.state.password
      }
    })
    .then((response) => {
      if(response.data === true){
        document.cookie = `username=${this.state.username};password=${this.state.password};`
        this.getUser();
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render () {
    return (<div>
      <h1>Login</h1>
      Username: <input onChange={this.onUsername.bind(this)}/>
      Password: <input onChange={this.onPassword.bind(this)}/>
      <button onClick={this.loginClick}>Log In</button>
      <button onClick={this.gotoSignUp}>Sign-Up</button>
      <p>{this.state.username}, {this.state.password}</p>
    </div>)
  }
}

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: this.props.user,
      games: []
    }
    this.changeUser = this.changeUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  changeUser(value){
    let values = Object.values(value);
    this.setState({user: values});
  }
  componentDidMount() {
    // console.log(this.state.user)
    axios.get('/user', {
      params: {
        name: this.state.user.name
      }
    })
    .then((response) => {
      console.log(response);
      this.setState({user: response.data})
    })
    .catch((error) => {
      console.error(error);
    });

    axios.get('/allgames')
    .then((response)=>{
      this.setState({games: response.data})
    })
    .catch((error)=>{console.error(error)})

  }
  render () {
     let thisUser = this.state.user
     console.log(this.state.games);
     return (<div>
      
      <UserHeader name={thisUser.name} image={thisUser.image}/>

      <UserEventList user={thisUser} /> 

      <GameList userName={this.state.user.name} games={this.state.games} />

     </div>)
  }
}

class GamePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userName: this.props.userName,
      gameName: this.props.game,
      game: ''
    }
  this.joinGame = this.joinGame.bind(this)
  }
  componentDidMount(){
    axios.get('/game', {
      params: {
        gameName: this.state.gameName 
      }
    })
    .then((response)=>{this.setState({game: response.data})})
    .catch((error)=>{console.error(error)})
  }

  joinGame(){
    console.log(this.state.userName)
    axios.post('/joinGame', {
      params: {
        name: this.state.userName,
        game: this.state.gameName
      }
    }).then((response)=>{
      console.log(response)
      console.log('joined')
    })
  }

  render(){
    return (
      <div>
      <img src={this.state.game.image}></img>
      <h1>{this.state.game.name}</h1>
      <h2>{this.state.game.creator}</h2>
      <h2>{this.state.game.city}</h2>
      <h2>{this.state.game.date}</h2>
      <h2>{this.state.game.description}</h2>
      <button onClick={this.joinGame.bind(this)}>Join Game</button>
      </div>
    )
  }
}


  ReactDOM.render(<App />, document.getElementById('app'));

  export default GamePage;
