import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import List from './components/List.jsx';
import Login from './components/login.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: []
    }
  }

  componentDidMount() {
    axios.get('/user', {
      params: {
        name: 'Kenneth'
      }
    })
    .then(function (response) {
      user = response;
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render () {
    return (<div>
      <h1>{this.state.user}</h1>
      <List items={this.state.user}/>
      <Login/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));