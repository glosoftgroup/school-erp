import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * actions
 */
import { fetchItems } from '../actions';

/** Components */
import FeeItem from './FeeItem';
import FeeItemOptional from './FeeItemOptional';

export class FeeStrucuture extends Component {
  static propTypes = {
      items: PropTypes.object.isRequired,
      fetchItems: PropTypes.func.isRequired
  }

  componentDidMount() {
      this.props.fetchItems({year: '2017-2018', course: '1'});
  }

  render() {
      return (
          <div className='table-responsive'>
              <div className="panel panel-body">
                  <table className="table table-hover">
                      <thead>
                          <tr className="bg-primary text-bold">
                              <th>&nbsp;</th>
                              {this.props.items.results.terms.map((obj, index) => {
                                  return <th className="text-bold text-right" key={index}>Term {obj.name} </th>;
                              })}
                          </tr>
                      </thead>
                      <tbody>
                          <tr className="active">
                              <td colSpan={4} className="text-bold text-primary">
                               Compulsory
                              </td>
                          </tr>
                          {this.props.items.results.items.map((items, index) => {
                              return <FeeItem key={index} data={items}/>;
                          })}
                          <tr className="active">
                              <td colSpan={4} className="text-bold text-primary">
                               Optional
                              </td>
                          </tr>
                          {this.props.items.results.items.map((items, index) => {
                              return <FeeItemOptional key={index} data={items}/>;
                          })}
                      </tbody>
                      <tfoot>
                          <tr className="active">
                              <th>&nbsp;</th>
                              {this.props.items.results.terms.map((obj, index) => {
                                  return <th className="text-indigo text-bold text-right" key={index}>{obj.amount} </th>;
                              })}
                          </tr>
                      </tfoot>
                  </table>
              </div>
          </div>
      );
  }
}

const mapStateToProps = (state) => ({
    items: state.items
});

const mapDispatchToProps = {
    fetchItems
};

export default connect(mapStateToProps, mapDispatchToProps)(FeeStrucuture);
