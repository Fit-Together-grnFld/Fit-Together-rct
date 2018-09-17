import React from 'react';
import axios from 'axios';
import Select from 'react-select';
import ReactDOM from 'react-dom';
import UserPage from './userPage.jsx';
// import MultiSelect from 'multiselect.jsx'

const options = [
  { value: 'running', label: 'Running' },
  { value: 'basketball', label: 'Basketball' },
  { value: 'tennis', label: 'tennis' }
];

class MakeEvent extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      user: this.props.user,
      name: '',
      type: '',
      image: '',
      description: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      creator: '',
      date: '',
      time: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault(e);
    console.log(e)
    // get our form data from state
    // const { name, password, image, phone, email, zip } = this.state;
    console.log(this.state);

    axios.post('/createGame', {
      params: {
        gameName: this.state.name,
        type: this.state.type,
        description: this.state.description,
        address: this.state.address,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip,
        creator: this.state.creator,
        date: this.state.date,
        time: this.state.time
      }
    })
      .then((result) => {
        console.log(result)
        ReactDOM.render(<UserPage user={this.state.user} />, document.getElementById('app'));
        //access the results here....
      });
  }

  render() {
    const { name, type, description, address, city, state, zip, creator, date, time } = this.state;
    const { selectedOption } = this.state;
    return (
      <div className="col-form-label">
        <h1>Create event</h1>
        <p>{this.state.name}</p>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="eventName">Enter event-name: </label>
          <input name="name" type="text" value={name} onChange={this.onChange} />

          <label htmlFor="eventType">Select type of event: </label>
            {/* <MultiSelect /> */}
          {/* <input name="eventType" type="text" value={type} onChange={this.onChange} /> */}

          <label htmlFor="description">Enter event description: </label>
          <input name="description" type="text" value={description} onChange={this.onChange} />

          <label htmlFor="address">Enter event address: </label>
          <input name="address" type="text" value={address} onChange={this.onChange} />

          <label htmlFor="city">Enter your city: </label>
          <input name="city" type="text" value={city} onChange={this.onChange} />

          <label htmlFor="state">Enter your state: </label>
          <input name="state" type="text" value={state} onChange={this.onChange} />

          <label htmlFor="zip">Enter your zip-code: </label>
          <input name="zip" type="text" value={zip} onChange={this.onChange} />

          <label htmlFor="creator">Enter your name: </label>
          <input name="creator" type="text" value={creator} onChange={this.onChange} />

          <label htmlFor="date">Enter event date: </label>
          <input name="date" type="date" value={date} onChange={this.onChange} />

          <label htmlFor="time">Enter event time: </label>
          <input name="time" type="time" value={time} onChange={this.onChange} />

          <button>Send data!</button>

        </form>
      </div>
    );
  }
}

export default MakeEvent;