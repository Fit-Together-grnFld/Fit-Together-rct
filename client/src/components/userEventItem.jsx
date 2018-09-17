// import React from 'react';



// const UserEventItem = (props) => (


// <tr>
//   <td>
//   <img alt="profile-pic" src={props.game.data.image} className="rounded" />
//   </td>
//   <td>
//     {props.game.data.name}
//   </td>
//   <td>
//   	{props.game.data.city}
//   </td>
//   <td>
//   	{props.game.data.date}
//   </td>
//   <td>
//     {console.log(props)}
//   </td>
// </tr>

// )


import React from 'react';
import axios from 'axios';
// import ReactDOM from 'react-dom';
// import UserEventItem from './userEventItem.jsx';
// import MakeEvent from './makeEvent.jsx'

class UserEventItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      geoCode: {},
      ADDpic: ''
    }
    this.getGeoCode = this.getGeoCode.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this)
    this.getImage - this.getImage.bind(this);
  }
  

  getImage(long, lat){
    axios({
      method: 'post',
      url: '/image',
      data: {
        longitude: long,
        latitude: lat
      }
    }).then( (image) => {
      console.log(image);
      this.setState({ADDpic: image.data})
      // always executed
      console.log(this.state)
    });
    // axios.post('/image', {
      
    //     longitude: long,
    //     latitude: lat
      
    // })
    //   .then((response) => {
    //     console.log(response.data);
    //     this.setState({
    //       geoCode: response.data
    //     })
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   })
    //   .then(function () {
    //     // always executed
    //   }); 
  }


  getGeoCode(address){
    axios.get('/geoCode', {
      params: address
    })
      .then((response) => {
        console.log(response.data);
        this.setState({
          geoCode: response.data
        })
        console.log(this.state)
        this.getImage(this.state.geoCode.latitude, this.state.geoCode.longitude)
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });  
  }

  componentDidMount(){
    const address = this.getGeoCode(this.props.game.data.street)
    this.setState({ADDpic: address})
  }
  
  render() {
    
    return (
      <div>
        <tr>
          <td>
            <img alt="profile-pic" src={this.state.ADDpic} className="rounded" />
          </td>
          <td>
            {this.props.game.data.name}
          </td>
          <td>
            {this.props.game.data.city}
          </td>
          <td>
            {this.props.game.data.date}
          </td>
          <td>
            {console.log(this.props)}
          </td>
        </tr>
      </div>

)
}
}

export default UserEventItem;
// export default UserEventList;
