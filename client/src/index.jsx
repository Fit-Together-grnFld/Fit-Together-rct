import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import Signup from './components/signup.jsx';
import UserPage from './components/userPage.jsx'
import GamePage from './components/GamePage.jsx'
import Login from './components/Login.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    }
  }
  render () {
    return (<div>
      <Login />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));