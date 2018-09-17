import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';

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

export default GamePage;