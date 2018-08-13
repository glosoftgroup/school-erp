import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Async from 'react-select/lib/Async';
import { getUsers } from '../utils';
import { fetchItems, selectCourse, fetchFeeItems } from '../actions';

export class FeeItem extends Component {
  static propTypes = {
      fetchItems: PropTypes.func.isRequired,
      fetchFeeItems: PropTypes.func.isRequired,
      courses: PropTypes.object.isRequired,
      selectCourse: PropTypes.func.isRequired,
      course: PropTypes.object
  }

  constructor(props) {
      super(props);
      this.state = {
          name: '',
          itemValues: '1',
          itemValues2: '1',
          loading: false,
          allowEdit: false,
          buttonText: 'add',
          errors: {},
          server_errror: '',
          search: '',
          academicYear: '',
          course: ''
      };
  }

  componentDidMount() {
      this.props.fetchItems();
      this.props.fetchFeeItems();
  }

  handleSelectYearChange = (academicYear) => {
      this.setState({ academicYear }, () => {
          this.fetchStructure(academicYear.id, this.state.course.id);
      });
  }

  selectCourse = (value) => {
      this.props.selectCourse({id: value});
      this.fetchStructure(this.state.academicYear.id, value);
  }

  getCourse = (input, url) => {
      return getUsers(input, '/academic_year/api/list/');
  }

  fetchStructure = (year = null, course = null) => {
      var params = {year, course};
      if (!year) {
          params.year = this.state.academicYear.id;
      } else {
          params.year = year;
      }
      if (!course && course !== 0) {
          params.course = this.state.course;
      } else {
          params.course = course;
      }
      console.warn(params);
      this.props.fetchFeeItems(params);
  }

  render() {
      return (
          <div>
              <div className="col-md-12">
                  <div className="panel panel-flat">
                      <div className="panel-body  search-panel">

                          <div className="col-md-3">
                              <label> Select Academic Year</label>
                              <Async
                                  isClearable={true}
                                  cacheOptions
                                  placeholder={'Search academic year'}
                                  value={this.state.course}
                                  onChange={this.handleSelectYearChange}
                                  getOptionLabel={({name}) => name}
                                  getOptionValue={({id}) => id}
                                  loadOptions={this.getCourse}
                                  backspaceRemoves={this.state.backspaceRemoves}
                              />
                          </div>
                          <div className="col-md-9">
                              <label className="course__label text-center">Select Class</label>
                              <div className="course__list text-center">
                                  <div className="btn-group" data-toggle="buttons">
                                      {this.props.courses.results.map((value, index) => {
                                          return (
                                              <label
                                                  key={index}
                                                  onClick={() => this.selectCourse(index)}
                                                  className="btn btn-primary course_btn">
                                                  <input type="radio" name="options" id="option1"/> {value.class_group}
                                              </label>
                                          );
                                      })}
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

          </div>
      );
  }
}

const mapStateToProps = (state) => ({
    courses: state.courses,
    course: state.course
});

const mapDispatchToProps = {
    fetchItems, selectCourse, fetchFeeItems
};

export default connect(mapStateToProps, mapDispatchToProps)(FeeItem);
