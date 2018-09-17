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
      name: document.cookie || ''
    }
  }

  componentDidMount(){
    // if(document.cookie){
    //   axios.get('/user', {
    //     params: {
    //       name: document.cookie 
    //     }
    //   })
    //   .then((response)=>{
    //     this.setState({user: response})
    //   })
    // }
    
  }

  render () {
    // if(document.cookie){
    //   let apple = this;
    //   let promise = new Promise(function(resolve, reject){
    //     axios.get('/user', {
    //       params: {
    //         name: apple.document.cookie 
    //       }
    //     }).then(apple.setState({user: cookie}, ()=>{console.log(apple.state)}))
    //     if(apple.state.user){
    //       resolve('Yes')
    //     } else {
    //       reject('No')
    //     }
    //   })
    //   promise.then(()=>{
    //     return (<div><UserPage user={this.state.user} /></div>)
    //   })
    // } else {
      return (<div><Login /></div>)
  //   }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));