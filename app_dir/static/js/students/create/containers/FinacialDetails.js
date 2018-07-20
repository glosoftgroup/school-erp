import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AcademicYears from '../components/AcademicYears';

export class FinacialDetails extends Component {
  static propTypes = {
      data: PropTypes.object.isRequired
  }

  renderAcademic () {
      return (
          <div>
              { this.props.data ?
                  this.props.data.allFeeStructure.map((obj, key) => {
                      return (<div key={key} className="badge badge-primary">2018-2019</div>);
                  })
                  : 'xxxxxx' }
          </div>
      );
  }

  render() {
      return (
          <div className="main-container">
              <div className="title text-bold">Academic Year(s)</div>
              <div className="scrollable-tabs">
                  <div className="tab-item">
                      <AcademicYears items={this.props.data} />
                      {/* {this.renderAcademic()} */}
                  </div>
              </div>
              <div className="fee-structure">
                  <div className="title text-bold">Compulsory Items</div>
                  <div className="title text-bold">Optional Items</div>
              </div>
          </div>
      );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FinacialDetails);
