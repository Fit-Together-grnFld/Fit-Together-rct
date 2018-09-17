import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import UserPage from '../index.jsx'

class Signup extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      name: '',
      password: '',
      image: '',
      phone: '',
      email: '',
      zip: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault(e);
    console.log(e)
    // get our form data out of state
    // const { name, password, image, phone, email, zip } = this.state;
      console.log(this.state);
    let promise = new Promise(function(resolve,reject){
      axios.post('/signup', { 
        params: {
          name: this.state.name,
          password: this.state.password,
          image: this.state.image,
          phone: this.state.phone,
          email: this.state.email,
          zip: this.state.zip
        }
      }) 
      .then((result) => {
        setTimeout(()=>{console.log(result)}, 500)
        
        //access the results here....
      })
      if('u' === 'u'){
        resolve(()=>{console.log('resolved')})
      } else {
        reject((error)=>{console.log('error')})
      }
    })
    promise.then(()=>{
      ReactDOM.render(<App userName={this.state.name} password={this.state.password}/>, document.getElementById('app'));
    })
      
  }

  render() {
    const { name, password, image, phone, email, zip} = this.state;
    return (
      <div className="col-form-label">
      <h1>Sign-Up</h1>
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="username">Enter username: </label>
        <input name="name" type="text" value={name} onChange={this.onChange}/>

        <label htmlFor="password">Enter your password: </label>
        <input name="password" type="password" value={password} onChange={this.onChange}/>

        <label htmlFor="image">upload image: </label>
        <input name="image" type="file" value={image} onChange={this.onChange}/>

        <label htmlFor="phone">Enter your phone-number: </label>
        <input name="phone" type="text" value={phone} onChange={this.onChange}/>

        <label htmlFor="email">Enter your email: </label>
        <input name="email" type="email" value={email} onChange={this.onChange}/>

        <label htmlFor="zip">Enter your zip-code: </label>
        <input name="zip" type="text" value={zip} onChange={this.onChange}/>

        <button>Send data!</button>

      </form>
    </div>
    );
  }
}

export default Signup;