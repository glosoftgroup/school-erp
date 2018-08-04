/* eslint no-undef: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PrintThis from '../../../common/PrintThis';
import formatNumber from '../../../common/NumberFormatter';
/**
 * actions
 */
import { fetchItems, fetchSettings } from '../actions';

/** Components */
import FeeItem from './FeeItem';
import FeeItemOptional from './FeeItemOptional';
import { DIRECTIVE } from 'graphql/language/kinds';

export class FeeStrucuture extends Component {
  static propTypes = {
      items: PropTypes.object.isRequired,
      settings: PropTypes.object.isRequired,
      fetchItems: PropTypes.func.isRequired,
      fetchSettings: PropTypes.func.isRequired
  }

  constructor(props) {
      super(props);
      this.state = {
          printCssPaths: []
      };
  }

  componentDidMount() {
      //   fetch data
      this.props.fetchSettings();
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
          <div className='col-md-12'>

              <div className='panel'>
                  <div className="row">
                      <div className="col-md-4">
                          <div className="pull-left p-10  text-center">
                              <img width={130} height={130} src={this.props.settings.image} alt="logo" />
                          </div>
                      </div>
                      <div className="col-md-4">
                          <div className="text-big text-center">
                              <span className="bold-title">
                                  {this.props.settings.name}
                              </span><br/>
                              {/* address */}
                              <div className="address">
                                  <span className="address-item">
                                      {this.props.settings.address}<span>, </span>
                                      {this.props.settings.code}<br />
                                      {this.props.settings.mobile}<br/>
                                      {this.props.settings.email}
                                  </span>
                              </div>
                              <span className="text-bold text-indigo">Academic year: </span>
                              {academicYearName}&nbsp;&nbsp;
                              <span className="text-bold text-indigo">Class: </span>
                              {courseName}
                          </div>
                      </div>
                      <div className="col-md-4">
                          <div className="text-center mt-20 media-none no-print print-hidden">
                              <span>
                                  <PrintThis printCssPaths={this.state.printCssPaths} title={''} />
                              </span>
                          </div>
                      </div>
                  </div>

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
                                  <th className="text-indigo text-bold">Fee Total</th>
                                  {this.props.items.results.terms.map((obj, index) => {
                                      return <th className="text-indigo text-bold text-right" key={index}>{formatNumber(obj.amount, 2, '.', ',')}</th>;
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
    items: state.items,
    settings: state.settings
});

const mapDispatchToProps = {
    fetchItems, fetchSettings
};

export default connect(mapStateToProps, mapDispatchToProps)(FeeStrucuture);
