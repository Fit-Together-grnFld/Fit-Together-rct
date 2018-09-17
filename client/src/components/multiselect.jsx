import React from 'react';
import Select from "react-select";

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
    );
  }
}

export default MultiSelect;