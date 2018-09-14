import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import homeEventList from './components/homeEventList.jsx';

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: []
    }
  }

  componentDidMount() {
    axios.get('/user?name=Kenneth')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render () {
    return (<div>
      <h1>UserPage</h1>
      <List items={this.state.user}/>
      {/* <button></button> */}
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));