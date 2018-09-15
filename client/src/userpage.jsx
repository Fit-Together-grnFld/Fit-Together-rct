import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
=======
import $ from 'jquery';
>>>>>>> parent of f9e8ced... lots of changes
import axios from 'axios';
// import homeEventList from './components/homeEventList.jsx';

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: []
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
        name: 'Kenneth'
      }
    })
    .then((response) => {
      this.changeUser(response.data)
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render () {
     let thisUser = this.state.user
     return (<div>
       <h1>Username: {thisUser[1]}</h1>
       <p>Password: {thisUser[2]}</p>
     </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
module.exports.UserPage = UserPage;