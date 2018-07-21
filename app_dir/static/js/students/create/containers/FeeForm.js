import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class FeeForm extends Component {
  static propTypes = {
      compulsory: PropTypes.array.isRequired,
      optional: PropTypes.array.isRequired
  }

  render() {
      return (
          <div className="table-responsive">
              <table className="table table-xs">
                  <thead>
                      <tr className="bg-primary">
                          <th>Item</th>
                          <th>Choice</th>
                          <th>Price</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr className="text-bold active border-double">
                          <td>COMPULSORY</td>
                          <td></td>
                          <td></td>
                      </tr>
                      {this.props.compulsory.map((value, index) => {
                          return <tr key={index}>
                              <td>{value.name}</td>
                              <td>{JSON.parse(value.choice).name}</td>
                              <td>{value.amount}</td>
                          </tr>;
                      })}
                      <tr className="text-bold active border-double">
                          <td>OPTIONAL</td>
                          <td></td>
                          <td></td>
                      </tr>
                      {this.props.optional.map((value, index) => {
                          return <tr key={index}>
                              <td>{value.name}</td>
                              <td>{JSON.parse(value.choice).name}</td>
                              <td>{value.amount}</td>
                          </tr>;
                      })}
                  </tbody>
              </table>
          </div>
      );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FeeForm);
