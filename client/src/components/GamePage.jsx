import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import UserPage from './userPage.jsx'

class GamePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: this.props.user,
      userName: this.props.userName,
      gameName: this.props.game,
      game: ''
    }
  this.joinGame = this.joinGame.bind(this)
  this.addUser = this.addUser.bind(this)
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

  addUser(userName){
    this.setState({user: userName}, ()=>{console.log(this.state)})
  }
  joinGame(){
    console.log(this.state.userName)
    // let apple = this;
    // let innerPromise = new Promise(function(resolve, reject){
    //   axios.get('./user', {
    //     params: {
    //       name: apple.state.userName
    //     }
    //   }).then ((response)=>{
    //     // console.log(response.data)
    //     apple.addUser(response.data)
    //     // console.log(apple.state)
    //   })
    //   if(apple.state.user){
    //     console.log('yip')
    //     resolve('Yay')
    //   } else {
    //     reject('Boo')
    //   } 

    // })
    // let outerPromise = new Promise(function(resolve, reject){
      axios.post('/joinGame', {
        params: {
          name: this.state.userName,
          game: this.state.gameName
        }
      })
      // .then(()=>{
      //   setTimeout(()=>{console.log(apple.state)})
      // })
    //   if('u' === 'u'){
    //     resolve('Yay')
    //   } else {
    //     reject('Boo Hoo')
    //   }  
    // })
    // outerPromise
    .then((response)=>{
      console.log(response)
      ReactDOM.render(<UserPage user={this.state.user} username={this.state.userName} />, document.getElementById('app'))
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

export default GamePage;