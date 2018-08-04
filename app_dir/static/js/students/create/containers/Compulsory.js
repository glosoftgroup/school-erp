import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

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
          classNames = 'checked disabled hidden';
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

      //   var instance = { ...this.props.instance };
      this.props.handleInputChange(event, this.props.instance);
  }
  render() {
      return (
          <div>
              <label className="checkbox-inline">
                  <div className={'checker ' + this.state.classNames}>
                      <span className={this.state.classNames}>
                          <input
                              { ...this.props.instance.compulsory && 'disbled="disabled"' }
                              name="value"
                              onChange={this.handleInputChange}
                              checked={this.value}
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
    instance: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(Compulsory);
