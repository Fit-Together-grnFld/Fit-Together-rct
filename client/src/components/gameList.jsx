import React from 'react';
import GameListItem from './gameListItem.jsx';
import axios from 'axios';

class GameList extends React.Component {
  constructor(){
    super();
    this.state = {
      games: [],
      type: ''
    }
    // this.componentDidMount = this.componentDidMount.bind(this);
    this.onType = this.onType.bind(this);
    this.searchClick = this.searchClick.bind(this);
    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
  }
  
  onType(e){
     this.setState({
       type: e.target.value
     })
   }
  
   searchClick(){
    axios.get('/interest', {
      params: {
        type: this.state.type
      }
    })
    .then((response)=>{
      this.state.games.push(response.data);
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  shouldComponentUpdate(){
    return this.state.games.length !== 0;
  }
  
  render() {
  return (
  <div className='search'>
    <h2> Upcoming Events </h2>
    <input onChange={this.onType.bind(this)} />
    <button onClick={this.searchClick}>Search</button>
    { this.state.games.map(game => <GameListItem game={game} />)}
  </div>
  )
  }
}
export default GameList;