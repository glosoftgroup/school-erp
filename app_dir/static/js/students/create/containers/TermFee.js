import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class TermFee extends Component {
  static propTypes = {
      student: PropTypes.object.isRequired
  }

  render() {
      return (
          <View>
              <Text> prop </Text>
          </View>
      );
  }
}

const mapStateToProps = (state) => ({
    student: state.activeStudent
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TermFee);
