import React from 'react';
import Select from "react-select";

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
    );
  }
}

export default MultiSelect;