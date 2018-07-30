/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import classnames from 'classnames';
import { ToastContainer, toast } from 'react-toastify';
import api from '../api/Api';
import { fetchItems } from '../actions/action-items';
import { toggleStatus } from '../actions/action-form-status';

class Comp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            itemValues: '1',
            itemValues2: '1',
            loading: false,
            allowEdit: false,
            buttonText: 'edit',
            errors: {},
            server_errror: '',
            search: '',
            selectedOption: '',
            backspaceRemoves: true,
            multi: true,
            creatable: false,
            updateUrl: `/finance/item/api/update/${pk}/`
        };
    }
    componentWillMount() {
        let self = this;
        api.retrieve(this.state.updateUrl)
            .then(function(response) { // reload items
                return response.data;
            })
            .then(function(data) {
                let name = data.name;
                let selectedOption = data.values;
                self.setState({name, selectedOption});
            })
            .catch(function(error) { console.log(error); });
    }
  handleSelectChange = (selectedOption) => {
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
  handleChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      });
      this.filterContent();
  }
  handleNameChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      });
  }
  handleSubmit = event => {
      event.preventDefault();

      // validation
      let errors = {};
      let self = this;
      if (this.state.name === '') errors.name = 'Field required';

      this.setState({errors: errors});

      const isValid = Object.keys(errors).length === 0;

      if (isValid) {
          this.setState({loading: true, buttonText: ''});
          const data = new FormData();
          data.append('name', this.state.name);
          data.append('vals', JSON.stringify(this.state.selectedOption));
          // update
          api.update(this.state.updateUrl, data)
              .then(function(data) { // reload items
                  window.location.href = document.referrer;
              })
              .catch(function(error) { console.log(error); });
      }
  }
  render() {
      return (
          <div className="col-md-12">
              <ToastContainer />
              <div className="panel panel-flat">
                  <div className="panel-body  search-panel">
                      <div className={classnames('col-md-10 mini-form', { showform: this.props.toggler.id })}>
                          <div className="error">
                              {!!this.state.server_errror && <div className="ui alert alert-warning negative message"><p>{this.state.server_errror}</p></div>}
                          </div>
                          <table className="table table-xs table-hover fixed">
                              <thead>
                                  <tr className="bg-primary">
                                      <th >Name</th>
                                      <th >Item Choices</th>
                                      <th ></th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr>
                                      <td>
                                          <input value={this.state.name} name="name" onChange={this.handleNameChange} className="form-control" placeholder="eg. Transport" type="text"/>
                                          <span className="help-block text-warning">{this.state.errors.name}</span>
                                      </td>
                                      <td>
                                          <Select.AsyncCreatable
                                              multi={true}
                                              value={this.state.selectedOption}
                                              onChange={this.handleSelectChange}
                                              //   onValueClick={this.gotoUser}
                                              valueKey="id" labelKey="name"
                                              loadOptions={this.getUsers}
                                              backspaceRemoves={this.state.backspaceRemoves}
                                          />
                                      </td>
                                      <td>
                                          <button onClick={this.handleSubmit} className="btn btn-xs btn-primary legitRipple">
                                              {this.state.buttonText}
                                          </button>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>

                  </div>
              </div>

          </div>
      );
  }
}

function mapStateToProps(state) {
    return {
        item: state.item,
        items: state.items,
        toggler: state.toggler
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchItems: fetchItems,
        toggleStatus: toggleStatus
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Comp);
