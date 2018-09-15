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
   this.render = this.render.bind(this);
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
      // console.log(response.data);
      // console.log(Array.isArray(response.data));
      let values = Object.values(response.data);
      console.log(values[0]);
      this.setState({games: values})
    }).then(this.render())
    .catch((error)=>{
      console.error(error);
    })
  }

  shouldComponentUpdate(){
    return this.state.games.length !== 0;
  }
  
  render() {
    
  return (
    <div>
    <h2> Upcoming Events <small>{this.state.games}</small></h2>
    <input onChange={this.onType.bind(this)} />
    <button onClick={this.searchClick}>Search</button>
    <table>
    <thead>
			<tr>
				<th>
					Image
				</th>
				<th>
					Event Name
				</th>
				<th>
					Description
				</th>
				<th>
					Date
				</th>
			</tr>
		</thead>
    <tbody>
    { this.state.games.map(el => {
      return <GameListItem game={el} />
    })}
    </tbody>
    </table>
</div>
  )
  }
}
export default GameList;