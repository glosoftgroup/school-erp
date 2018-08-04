import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * components
 */
import Compulsory from './Compulsory';

export class FeeForm extends Component {
  static propTypes = {
      compulsory: PropTypes.array.isRequired,
      optional: PropTypes.array.isRequired,
      student: PropTypes.object.isRequired,
      academics: PropTypes.object
  }

  constructor(props) {
      super(props);
      this.state = {
          value: 'false',
          compulsory: [],
          optional: []
      };
  }

  componentDidMount() {
      setTimeout(() => {
          let compulsory = this.props.compulsory.slice();
          let optional = this.props.optional.slice();
          this.setState({
              compulsory,
              optional
          });
      }, 2000);
  }

  handleInputChange = (event, obj) => {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      // const name = target.name;
      let classNames = '';
      if (value) {
          classNames = 'checked';
      }
      this.setState({
          value, classNames
      });

      //   copy optional list
      let optional = this.state.optional.slice();

      // find item being edited
      let found = optional.find(function(element) {
          return element.id === obj.id;
      });

      // copy
      found = { ...found };
      // assign selected option
      found.compulsory = value;

      // remove old value
      optional = optional.filter(function(el) {
          return el.id !== obj.id;
      });

      // add edited object
      optional.push(found);
      this.setState({optional});
  }

  render() {
      return (
          <div className="table-responsive col-md-">
              <div className="title">
                  <h6>
                      <span className="text-primary text-bold">
                        Academic Year:&nbsp;&nbsp;
                      </span>
                      {this.props.student.academic_year}&nbsp;&nbsp;&nbsp;&nbsp;
                      <span className="text-primary text-bold">
                        Class:&nbsp;&nbsp;
                      </span>
                      {this.props.student.course}&nbsp;&nbsp;&nbsp;&nbsp;
                      <span className="text-primary text-bold">
                        Term:&nbsp;&nbsp;
                      </span>
                      {this.props.student.term}
                  </h6>
              </div>
              <table className="table table-xs">
                  <thead>
                      <tr className="bg-primary">
                          <th>Item</th>
                          <th>Choice</th>
                          <th>Price</th>
                          <th></th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr className="text-bold active border-double">
                          <td>COMPULSORY</td>
                          <td></td>
                          <td></td>
                          <td></td>
                      </tr>
                      {this.props.compulsory.map((value, index) => {
                          return <tr key={index}>
                              <td>{value.name}</td>
                              <td>{JSON.parse(value.choice).name}</td>
                              <td>{value.amount}</td>
                              <td>
                                  <Compulsory instance={value} handleInputChange={this.handleInputChange}/>
                              </td>
                          </tr>;
                      })}
                      <tr className="text-bold active border-double">
                          <td>OPTIONAL</td>
                          <td></td>
                          <td></td>
                          <td></td>
                      </tr>
                      {this.props.optional.map((value, index) => {
                          return <tr key={index}>
                              <td>{value.name}</td>
                              <td>{JSON.parse(value.choice).name}</td>
                              <td>{value.amount}</td>
                              <td>
                                  <Compulsory instance={value} handleInputChange={this.handleInputChange}/>
                              </td>
                          </tr>;
                      })}
                  </tbody>
              </table>
              <div className={'pull-right'}> 
                  <button className="btn btn-primary">
                      Submit
                  </button>
              </div>
          </div>
      );
  }
}

const mapStateToProps = (state) => ({
    student: state.activeStudent,
    academics: state.academics
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FeeForm);
