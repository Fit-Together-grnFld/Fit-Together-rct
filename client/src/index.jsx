import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import UserHeader from './components/userHeader.jsx';
import UserEventList from './components/userEventList.jsx';
<<<<<<< HEAD
import Signup from './components/signup.jsx';
=======
import GameList from './components/gameList.jsx';
>>>>>>> 2681d5ef051368f012e24bce9882a54d7f70c2bd

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: '',
      username: '',
      password: '',
    }
    this.changeUser = this.changeUser.bind(this);
    this.gotoHomepage = this.gotoHomepage.bind(this);
    this.loginClick = this.loginClick.bind(this);
    this.getUser = this.getUser.bind(this);
    this.onUsername = this.onUsername.bind(this);
    this.onPassword = this.onPassword.bind(this);
  }

  gotoHomepage() {
    let user = this.state.user;
    // console.log(user);
    ReactDOM.render(<UserPage user={user} />, document.getElementById('app'));
  }

  gotoSignUp(){
    ReactDOM.render(<Signup />, document.getElementById('app'));
  }

  changeUser(value){
    let values = Object.values(value);
    this.setState({user: values});
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
    axios.get('/user', {
      params: {
        name: this.state.username
      }
    })
    .then((response) => {
      this.changeUser(response.data)
    })
    .catch((error) => {
      console.error(error);
    });
  }

  loginClick() {
    let condition;
    axios.get('/login', {
      params: {
        name: this.state.username,
        password: this.state.password
      }
    })
    .then((response) => {
      if(response.data === true){
        this.getUser();
      }
    })
    .then(()=> {
      if(condition === true){
        // console.log('truth');
        this.getUser();
      }
    })
    .catch((error) => {
      console.error('error');
    });
  }
  
  shouldComponentUpdate(){
    return (this.state.user !== '');
  }

  componentDidUpdate(){
    if(this.state.user !== '');
    this.gotoHomepage();
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
      user: this.props.user
    }
    this.changeUser = this.changeUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  changeUser(value){
    let values = Object.values(value);
    this.setState({user: values});
  }
  componentDidMount() {
    axios.get('/user', {
      params: {
        name: this.state.user[1]
      }
    })
    .then((response) => {
      this.changeUser(response.data)
    })
    .catch((error) => {
      console.error(error);
    });
  }
  render () {
     let thisUser = this.state.user
     return (<div>
      
      <UserHeader name={this.state.user[1]} image={this.state.user[3]}/>

      <UserEventList user={thisUser} /> 

      <GameList />

     </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));