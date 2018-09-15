import React from 'react';
import GameListItem from './ListItem.jsx';
import axios from 'axios';
class GameList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      games: []
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.onType = this.onType.bind(this);
    this.searchClick = this.searchClick.bind(this);
    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
  }
  
  searchClick(){

  }

  shouldComponentUpdate(){
    return this.state.games.length !== 0;
  }
  render() {
  return (
  <div>
    <h2> Upcoming Events </h2>
    Type: <input onChange={this.onType.bind(this)} />
    <button onClick={this.searchClick}>Search</button>
    There are { props.items.length } items.
    { props.games.map(item => <GameListItem item={item}/>)}
  </div>
  )
  }
}
export default GameList;