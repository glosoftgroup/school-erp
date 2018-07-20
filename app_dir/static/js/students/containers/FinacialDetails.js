import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class FinacialDetails extends Component {
  static propTypes = {
      prop: PropTypes
  }

  render() {
      return (
          <div className="main-container">
              <div className="title text-bold">Academic Year(s)</div>
              <div className="scrollable-tabs">
                  <div className="tab-item">
                      <div className="badge badge-primary">2018-2019</div>
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
