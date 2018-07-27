import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
// import Select2 from 'react-select2-wrapper';
import { updateFeeItem } from '../actions/action-fee-item';

export class Compulsory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: false,
            error: '',
            classNames: ''
        };
    }
  componentDidMount = () => {
      var condition = this.props.instance;
      let classNames = '';
      if (condition.compulsory) {
          classNames = 'checked';
          this.setState({classNames, value: condition.compulsory});
      }
  }

  isNumeric = (n) => {
      return !isNaN(parseFloat(n)) && isFinite(n);
  }

  handleInputChange = event => {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      // const name = target.name;
      let classNames = '';
      if (value) {
          classNames = 'checked';
      }
      this.setState({
          value, classNames
      });

      var instance = { ...this.props.instance };
      instance.compulsory = value;
      this.props.updateFeeItem(instance);
  }
  render() {
      return (
          <div>
              <label className="checkbox-inline">
                  <div className="checker">
                      <span className={this.state.classNames}>
                          <input
                              name="value"
                              onChange={this.handleInputChange}
                              checked={this.state.value}
                              className="styled" type="checkbox" />
                      </span>
                  </div>
              </label>
              <span className="help-block text-warning">{this.state.error}</span>
          </div>
      );
  }
}
Compulsory.propTypes = {
    updateFeeItem: PropTypes.func.isRequired,
    instance: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {};
}
// Get actions and pass them as props
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        updateFeeItem: updateFeeItem
    }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Compulsory);
