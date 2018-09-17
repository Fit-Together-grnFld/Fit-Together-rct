import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import UserEventItem from './userEventItem.jsx';
import MakeEvent from './makeEvent.jsx'

class UserEventList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: props.user,
      games: []
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.makeAnEvnt = this.makeAnEvnt.bind(this)
  } 

  makeAnEvnt (){
    ReactDOM.render(<MakeEvent user={this.state.user}/>, document.getElementById('app'))
  }
  
  
  componentDidMount(){
    this.state.user[7].forEach(game => {
      axios.get('/game', {
        params: {
          gameName: game
        }
      })
      .then((response) => {
        // console.log(response);
        this.state.games.push(response);
      })
      .catch((err) => {
        console.error('error')
      })


    });
  }
  
  render() {
    
    return (
      <div>

      <button onClick={this.makeAnEvnt} type="button" className="btn btn-primary btn-lg btn-block">Make event</button>
  <table className="table">
	  <thead>
		  <tr>
			  <th>
				  Image
			  </th>
					<th>
						Event Name
 				 </th>
  			<th>
	  			City
		  	</th>
			  <th>
					Date
  			</th>
			</tr>
 		 </thead>
		<tbody>
    {this.state.games.map( el => {
      // console.log(el);
      return <UserEventItem game={el} />
    })}
	 		   
  	</tbody>
  </table>
    </div>

  )
}
}

export default UserEventList;