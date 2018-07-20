import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class AcademicYears extends Component {
  static propTypes = {
      items: PropTypes.object.isRequired,
      student: PropTypes.object.isRequired
  }

  constructor(props) {
      super(props);
      this.state = {
          fee: [],
          compulsory: [],
          optional: []
      };
  }
  componentDidMount() {
      /**
       * get students academic year
       * Find fee structure for that year
       */
      const data = this.props.items.allFeeStructure;
      const year = this.props.student.academic_year;
      const fee = data.find(value => {
          return value.academicYear.name === year;
      });
      const compulsory = [];
      let optional = [];
      // sort fee items
      fee.feeItems.map((value, index) => {
          if (value.compulsory) {
              compulsory.push(value);
          } else {
              optional.push(value);
          }
      });
      console.error(optional, compulsory);
      this.setState({fee, compulsory, optional});
  }
  render() {
      return (
          <div>
              {this.props.items.allFeeStructure.map((value, index) => {
                  return (
                      <div key={index}>
                          {value.academicYear.name}
                      </div>);
              })}
          </div>
      );
  }
}
const mapStateToProps = state => ({
    student: state.activeStudent
});
export default connect(mapStateToProps)(AcademicYears);
