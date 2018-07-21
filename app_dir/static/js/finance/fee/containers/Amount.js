import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
// import Select2 from 'react-select2-wrapper';
import { updateFeeItem } from '../actions/action-fee-item';

export class Amount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            error: ''
        };
    }
  componentDidMount = () => {
      if (this.props.instance.amount) {
          this.setState({amount: this.props.instance.amount});
      }
  }

  isNumeric = (n) => {
      return !isNaN(parseFloat(n)) && isFinite(n);
  }

  handleInputChange = event => {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      if (!this.isNumeric(value) && value !== '') {
          console.error('Enter a valid number');
      } else {
          this.setState({
              [name]: value,
              error: ''
          });

          var instance = Object.assign(this.props.instance);
          instance.amount = value;
          this.props.updateFeeItem(instance);
      }
  }

  render() {
      return (
          <div>
              <input type="number" onChange={this.handleInputChange} value={this.state.amount} name="amount" className="form-control" placeholder="amount"/>
              <span className="help-block text-warning">{this.state.error}</span>
          </div>
      );
  }
}
Amount.propTypes = {
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
export default connect(mapStateToProps, matchDispatchToProps)(Amount);
