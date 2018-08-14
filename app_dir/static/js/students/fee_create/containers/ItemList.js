import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/** Components */
import CompulsoryRow from './CompulsoryRow';
import OptionalRow from './OptionalRow';

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
                                  return (<th key={index} className="text-right"><span>Term: {value.name}</span></th>);
                              })}
                          </tr>
                      </thead>
                      <tbody>
                          <tr className="active">
                              <td colSpan={4} className="text-bold text-primary">
                               Compulsory
                              </td>
                          </tr>
                          {this.props.feeStructure.results.items.map((items, index) => {
                              return <CompulsoryRow key={index} data={items}/>;
                          })}
                          <tr className="active">
                              <td colSpan={4} className="text-bold text-primary">
                               Optional
                              </td>
                          </tr>
                          {this.props.feeStructure.results.items.map((items, index) => {
                              return <OptionalRow key={index} data={items}/>;
                          })}
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
