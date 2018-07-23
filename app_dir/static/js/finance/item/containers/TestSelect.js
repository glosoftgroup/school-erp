import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export class TestSelect extends Component {
  state = {
      selectedOption: '',
      backspaceRemoves: true,
      multi: true,
      creatable: false
  }
  handleChange = (selectedOption) => {
      console.warn(selectedOption);
      this.setState({ selectedOption });
      // selectedOption can be null when the `x` (close) button is clicked
      if (selectedOption) {
          console.log(`Selected: ${selectedOption.label}`);
      }
  }
  getUsers = (input) => {
      if (!input) {
          return Promise.resolve({ options: [] });
      }

      return fetch(`https://api.github.com/search/users?q=${input}`)
          .then((response) => response.json())
          .then((json) => {
              return { options: json.items };
          });
  }
  toggleBackspaceRemoves () {
      this.setState({
          backspaceRemoves: !this.state.backspaceRemoves
      });
  }
  render() {
      return (
          <div>
              <Select.AsyncCreatable
                  multi={true}
                  value={this.state.selectedOption}
                  onChange={this.handleChange}
                  //   onValueClick={this.gotoUser}
                  valueKey="id" labelKey="login"
                  loadOptions={this.getUsers}
                  backspaceRemoves={this.state.backspaceRemoves}
              />
          </div>
      );
  }
}

export default TestSelect;
