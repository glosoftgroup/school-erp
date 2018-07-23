import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FeeStructure from '../components/FeeStructure';

export class FinacialDetails extends Component {
  static propTypes = {
      data: PropTypes.object.isRequired
  }

  render() {
      return (
          <div className="maincontainer">
              <FeeStructure items={this.props.data} />
          </div>
      );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FinacialDetails);
