import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class ItemList extends Component {
  static propTypes = {
      feeStructure: PropTypes.object.isRequired
  }

  render() {
      return (
          <div className="col-md-12">
              <div className="panel panel-body">
                  <table className="table table-hover">
                      <thead>
                          <tr className="bg-primary">
                              <th>Name</th>
                              {/* set terms */}
                              {this.props.feeStructure.results.terms.map((value, index) => {
                                  return (<th key={index}><span>Term: {value.name}</span></th>);
                              })}
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td>Item Name</td>
                              <td>200</td>
                              <td>300</td>
                              <td>400</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
      );
  }
}

const mapStateToProps = (state) => ({
    feeStructure: state.feeStructure
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
