import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FeeForm from '../containers/FeeForm';

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

      // get academic details from student details
      const year = this.props.student.academic_year;
      const course = this.props.student.course;

      // find students fee structure
      const fee = data.find(value => {
          return value.academicYear.name === year && value.course.name === course;
      });

      let compulsory = [];
      let optional = [];
      // sort fee items
      fee.feeItems.map((value, index) => {
          if (value.compulsory) {
              compulsory.push(value);
          } else {
              optional.push(value);
          }
      });
      this.setState({fee, compulsory, optional});
  }
  render() {
      return (
          <div>
              <FeeForm compulsory={this.state.compulsory} optional={this.state.optional}/>
          </div>
      );
  }
}
const mapStateToProps = state => ({
    student: state.activeStudent
});
export default connect(mapStateToProps)(AcademicYears);
