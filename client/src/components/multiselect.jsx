import React from 'react';
import Select from "react-select";

<<<<<<< HEAD
const options = [
  { value: 'running', label: 'Running' },
  { value: 'cycling', label: 'Cyling' },
  { value: 'tennis', label: 'Tennis' },
  { value: 'basketball', label: 'Basketball' }
];

class MultiSelect extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selectedOption: null,
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(selectedOption){
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
=======
class MultiSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productIds: ['tennis', 'running', 'basketball', 'cycling'],
      selectedValues: []
    }
  }

  onChange(values) {
    this.setState({
      selectedValues: values
    });
  }

  render() {
    return (
      <div>
            <Select multi options={this.state.productIds.map(i => { return { label: i, value: i }; })}
              onChange={this.onChange.bind(this)} value={this.state.selectedValues} />
          <ul style={{ width: 300 }}>
            {this.state.selectedValues.map(i => <li>{i.value}</li>)}
          </ul>
        
      </div>
>>>>>>> 44505b146cc0dd07e1c5fb33585c8e102adb8f9d
    );
  }
}

export default MultiSelect;