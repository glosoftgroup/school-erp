import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Select2 from 'react-select2-wrapper';
import PropTypes from 'prop-types';
import { updateFeeItem } from '../actions/action-fee-item';

export class ItemChoices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choices: [],
      choice: ''
    };
  }

  componentDidMount = () => {
    var obj = this.props.instance;
    this.setState({choices: obj.values});
    if (obj.value !== '') {
      this.setState({choice: obj.value});
    }
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    var val = Object.assign({'choice': value, id: this.props.instance.id});
    var instance = Object.assign(this.props.instance);
    instance.choice = val;
    this.props.updateFeeItem(instance);
  }

  render() {
    return (
      <div>
        <Select2
          onChange={this.handleInputChange}
          data={this.state.choices}
          value= {this.state.choice}
          name="choice"
          options={{
            width: '100%',
            placeholder: 'search by tags'
          }}
        />
      </div>
    );
  }
}

ItemChoices.propTypes = {
  instance: PropTypes.object.isRequired,
  updateFeeItem: PropTypes.func.isRequired
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
export default connect(mapStateToProps, matchDispatchToProps)(ItemChoices);
