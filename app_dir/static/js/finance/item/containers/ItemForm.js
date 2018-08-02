/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import CreatableSelect from 'react-select/lib/Creatable';
// import 'react-select/dist/react-select.css';
import classnames from 'classnames';
import { ToastContainer, toast } from 'react-toastify';
import api from '../api/Api';
import { fetchItems, toggleStatus } from '../actions/';

class ItemForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            itemValues: '1',
            itemValues2: '1',
            loading: false,
            allowEdit: false,
            buttonText: 'add',
            errors: {},
            server_errror: '',
            search: '',
            selectedOption: '',
            backspaceRemoves: true,
            multi: true,
            creatable: false
        };
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

  filterContent=() => {
      var params = Object.assign({page_size: 5});
      if (this.state.search) {
          params = Object.assign(params, {'q': this.state.search});
      }
      this.props.fetchItems(params);
  }
  toggleForm =() => {
      var toggle;
      if (this.props.toggler.id) {
          toggle = false;
      } else {
          toggle = true;
      }

      var status = Object.assign({'id': toggle});
      this.props.toggleStatus(status);
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
          data.append('values', JSON.stringify(this.state.selectedOption));
          if (this.props.item.id) {
              // update
              api.update(this.props.item.update_url, data)
                  .then(function(data) { // reload items
                      self.props.fetchItems(); // close form
                      self.toggleForm();
                      window.location.reload();
                  })
                  .catch(function(error) { console.log(error); });
          } else {
              // create admissions
              api.create('/finance/item/api/create/', data)
                  .then(function (response) {
                      // alertUser('Data sent successfully');
                      toast.success('Data sent successfully.', {
                          position: toast.POSITION.TOP_RIGHT
                      });

                      self.setState({
                          loading: false,
                          buttonText: 'submit',
                          name: '',
                          update_url: response.data.update_url
                      });

                      // close form
                      self.toggleForm();

                      // reload items
                      self.props.fetchItems();
                  })
                  .catch(function(error) {
                      console.log(error);
                      toast.error('Sorry! try adding a unique fee item.', {
                          position: toast.POSITION.TOP_RIGHT
                      });
                      self.setState({
                          loading: false,
                          buttonText: 'submit',
                          server_errror: ''
                      });
                  });
          }
      }
  }
  render() {
      return (
          <div className="col-md-12">
              <ToastContainer />
              <div className="panel panel-flat">
                  <div className="panel-body  search-panel">

                      <div className="col-md-2">
                          <label> &nbsp;</label>
                          <div className="form-group">
                              <button id="toggle-add-form" onClick={this.toggleForm} className={classnames('btn btn-primary hvr-glow btn-raised legitRipple waves-effect waves-light togglebtn', { showbutton: this.props.toggler.id })}>
                                  {!this.props.toggler.id && <span><i className="icon-plus2 position-left"></i>Add</span>}
                                  {this.props.toggler.id && <i className="icon-cross"></i>}
                              </button>
                          </div>
                      </div>

                      <div className={classnames('col-md-4 mini-form', { showform: !this.props.toggler.id })}>
                          <label>Search </label>
                          <div className="form-group form-group-material has-feedback">
                              <input value={this.state.search} name="search" onChange={this.handleChange} className="form-control" placeholder="Search ..." type="text" />
                              <div className="form-control-feedback">
                                  <i className="icon-search4 text-size-base"></i>
                              </div>
                          </div>
                      </div>

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
                                          <CreatableSelect
                                              isMulti={true}
                                              value={this.state.selectedOption}
                                              onChange={this.handleSelectChange}
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

export default connect(mapStateToProps, matchDispatchToProps)(ItemForm);
