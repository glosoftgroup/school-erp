/* eslint no-undef: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PrintThis from '../../../common/PrintThis';
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

  constructor(props) {
      super(props);
      this.state = {
          printCssPaths: []
      };
  }

  componentDidMount() {
      //   fetch data
      this.props.fetchItems({year: academicYear, course: course});
      var baseURL = document.location.protocol + '//' + document.location.host;
      var printCssPaths = [];
      printCssPaths.push(baseURL + '/static/css/bootstrap.css');
      printCssPaths.push(baseURL + '/static/css/core.css');
      printCssPaths.push(baseURL + '/static/css/print.css');
      this.setState({printCssPaths});
  }

  render() {
      return (
          <div className='table-responsive'>

              <div className='panel'>
                  <div className="panel-heading">
                      <h6 className="no-margin text-big">
                          <span className="text-bold text-indigo">Academic year: </span>
                          {academicYearName}&nbsp;&nbsp;
                          <span className="text-bold text-indigo">Class: </span>
                          {courseName}
                      </h6>
                      <div className="heading-elements media-none no-print print-hidden">
                          <span>
                              <PrintThis printCssPaths={this.state.printCssPaths} title={''} />
                          </span>
                      </div>
                  </div>
                  <div className="panel-body">
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
