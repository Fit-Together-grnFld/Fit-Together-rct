import React from 'react';
import GameListItem from './gameListItem.jsx';
import axios from 'axios';

class GameList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: this.props.user,
      type: '',
      userName: this.props.userName
      
    }
    // this.componentDidMount = this.componentDidMount.bind(this);
   this.render = this.render.bind(this);
  
  }
  render() {
    
  return (
    <div>
    <h2> Upcoming Events </h2>
    {/* <input onChange={this.onType.bind(this)} />
    <button onClick={this.searchClick}>Search</button> */}
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
      {/* <GameListItem game={this.state.games[0]} /> */}
    {this.props.games.map(el => {
      // console.log('inside render function')
      // console.log(el)
      
      return <GameListItem user={this.state.user} name={el.name} image={el.image} desc={el.description} date={el.date} userName={this.state.userName}/>
    })}
    </tbody>
    </table>
</div>
  )
  }
}
export default GameList;