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
    this.changeUser = this.changeUser.bind(this);
    this.gotoHomepage = this.gotoHomepage.bind(this);
    this.loginClick = this.loginClick.bind(this);
    this.getUser = this.getUser.bind(this);
    this.onUsername = this.onUsername.bind(this);
    this.onPassword = this.onPassword.bind(this);
  }

  gotoSignUp(){
    ReactDOM.render(<Signup />, document.getElementById('app'));
  }

<<<<<<< HEAD
=======
  changeUser(value){
    console.log(value)
    let values = Object.values(value);
    this.setState({user: values});
  }

>>>>>>> 8e0a1a98c4c095ac421b6740cc13d14574b136c6
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
<<<<<<< HEAD
      this.setState({user: response.data})
      console.log(this.state.user);
=======
      // console.log(response)
      this.changeUser(response.data)
>>>>>>> 8e0a1a98c4c095ac421b6740cc13d14574b136c6
    })
    .catch((error) => {
      console.error(error);
    });
  }

  loginClick() {
    axios.get('/login', {
      params: {
        name: this.state.username,
        password: this.state.password
      }
    })
    .then((response) => {
      console.log(response)
      if(response.data === true){
<<<<<<< HEAD
        document.cookie = `username=${this.state.username};password=${this.state.password};`
        this.getUser(this.state.username);
      }
    })
=======
        this.getUser();
      }
    })
    // .then(()=> {
    //   console.log(condition)
    //   if(condition === true){
    //     // console.log('truth');
    //     this.getUser();
    //   }
    // })
>>>>>>> 8e0a1a98c4c095ac421b6740cc13d14574b136c6
    .catch((error) => {
      console.error('error');
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

class GamePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
}

if(this.state.user !== ''){
  let user = this.state.user;
  ReactDOM.render(<UserPage user={user} />, document.getElementById('app'));
} else {
  ReactDOM.render(<App />, document.getElementById('app'));
}