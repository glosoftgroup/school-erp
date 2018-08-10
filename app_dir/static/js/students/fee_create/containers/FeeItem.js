import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Async from 'react-select/lib/Async';
import { getUsers } from '../utils';

export class FeeItem extends Component {
  static propTypes = {
      prop: PropTypes
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
  handleSelectCourseChange = (course) => {
      this.setState({ course });
      // selectedOption can be null when the `x` (close) button is clicked
      if (course) {
          console.log(`Selected: ${course.name}`);
      }
  }

  getCourse = (input, url) => {
      return getUsers(input, '/class/api/list/');
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
                                  placeholder={'Search class'}
                                  value={this.state.course}
                                  onChange={this.handleSelectCourseChange}
                                  getOptionLabel={({name}) => name}
                                  getOptionValue={({id}) => id}
                                  loadOptions={this.getCourse}
                                  backspaceRemoves={this.state.backspaceRemoves}
                              />
                          </div>
                          <div className="col-md-9">
                              <label className="course__label text-center">Select Class</label>
                              <div className="course__list text-center">
                                  <div className="course__list__item label label-primary">
                                   class 9
                                  </div>
                                  <div className="course__list__item label label-primary">
                                   class 2
                                  </div>
                                  <div className="course__list__item label label-primary">
                                   class 2
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

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(FeeItem);
