import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import UserHeader from './userHeader.jsx';
import UserEventList from './userEventList.jsx';
import GameList from './gameList.jsx';

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: this.props.user,
      games: []
    }
    this.changeUser = this.changeUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  changeUser(value){
    let values = Object.values(value);
    this.setState({user: values});
  }
  componentDidMount() {
    // console.log(this.state.user)
    axios.get('/user', {
      params: {
        name: this.state.user.name
      }
    })
    .then((response) => {
      console.log(response);
      this.setState({user: response.data})
    })
    .catch((error) => {
      console.error(error);
    });

    axios.get('/allgames')
    .then((response)=>{
      this.setState({games: response.data})
    })
    .catch((error)=>{console.error(error)})

  }
  render () {
     let thisUser = this.state.user
     console.log(this.state.games);
     return (<div>
      
      <UserHeader name={thisUser.name} image={thisUser.image}/>

      <UserEventList user={thisUser} /> 

      <GameList userName={this.state.user.name} games={this.state.games} />

     </div>)
  }
}

export default UserPage;
  