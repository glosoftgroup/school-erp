import React from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import Select2 from 'react-select2-wrapper';
import Async from 'react-select/lib/Async';
import api from '../api/Api';
import ItemList from '../containers/ItemList';
import {selectAcademicYear} from '../actions/academic-year';
import {selectDate} from '../actions/date';
import { selectTerm } from '../actions/action-term';
import {selectCourse} from '../actions/course';
import { getUsers } from '../utils';
import '../css/popover.scss';

class FeeItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            date: moment(new Date()),
            academic_year: '',
            course: '',
            term: '',
            loading: false,
            buttonText: 'Submit'
        };
    }

    // load default fields on mount
    // update state data
    componentDidMount() {
        var self = this;
        let date = Object.assign({'date': moment(new Date()).format('YYYY-MM-DD')});
        this.props.selectDate(date);

        if (!pk) {
            // set default term
            api.retrieve('/term/api/list')
                .then(data => data.data.results)
                .then(function(data) {
                    self.props.selectTerm(data[0]);
                    var option1 = new Option(data[0].name, data[0].id, true);
                    self.refs.term.el.append(option1).trigger('change');
                });
            api.retrieve('/class/api/list')
                .then(data => data.data.results)
                .then(function(data) {
                    self.props.selectCourse(data[0]);
                    var option1 = new Option(data[0].name, data[0].id, true);
                    self.refs.course.el.append(option1).trigger('change');
                });

            // set default academic_year
            api.retrieve('/academic_year/api/list')
                .then(data => data.data.results)
                .then(function(data) {
                    self.props.selectAcademicYear(data[0]);
                    var option1 = new Option(data[0].name, data[0].id, true);
                    self.refs.academic_year.el.append(option1).trigger('change');
                });
        }
    }

    getUsers = (input) => {
        return getUsers(input, '/academic_year/api/list/');
    }
  handleChange = (date) => {
      this.setState({
          date: date
      });

      // change date in store
      let obj = Object.assign({'date': moment(date).format('YYYY-MM-DD')});
      this.props.selectDate(obj);
  }

  handleInputChange = event => {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
          [name]: value
      });
      if (name === 'academic_year') {
          this.props.selectAcademicYear({id: value});
      } else if (name === 'term') {
          this.props.selectTerm({ id: value });
      } else if (name === 'course') {
          this.props.selectCourse({id: value});
      }
  }

toggleStatus = (id) => {}

handleSubmit = event => {
    event.preventDefault();

//   const data = new FormData(event.target);
}

selectOptions = (url, placeholder) => {
    return {
        placeholder: placeholder,
        allowClear: false,
        width: '100%',
        dropdownAutoWidth: true,
        formatSelection: function(item) { return item.name; },
        formatResult: function(item) { return item.name; },
        ajax: {
            url: function (params) {
                return url + '?' + params.term;
            },
            processResults: function (data) {
                // Tranforms the top-level key of the response object from 'items' to 'results'
                data = data.results;
                return {
                    results:
            data.map(function(item) {
                return {
                    id: item.id,
                    text: item.name
                };
            }
            )};
            }
        },
        debug: true,
        delay: 250
    };
}

handleSelectCourseChange = (course) => {
    this.setState({ course });
    // selectedOption can be null when the `x` (close) button is clicked
    if (course) {
        console.log(`Selected: ${course.name}`);
    }
    // this.filterContent(this.state.search, this.state.academicYear.id, course.id);
}

render() {
    var _options = this.selectOptions('/class/api/list', 'Select Classes');
    var _academicOptions = this.selectOptions('/academic_year/api/list', 'Select Academic year');
    var _termOptions = this.selectOptions('/term/api/list', 'Select term');

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="panel panel-flat panel-custom">
                    <div className="panel-body  search-panel">
                        <div className="col-md-3">
                            <label>Class</label>
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
                        <div className="col-md-4">
                            <label>Academic Year:</label>
                            <div className="form-group">
                                <Select2 ref='academic_year'
                                    onChange = {this.handleInputChange}
                                    name = 'academic_year'
                                    value = {this.state.academic_year}
                                    options={ _academicOptions}/>
                            </div>
                        </div>

                        <div className="col-md-8">
                            <label>Term:</label>
                            <div className="form-group">
                                <Select2 ref="term"
                                    onChange = {this.handleInputChange}
                                    name = 'term'
                                    value = {this.state.term}
                                    options={ _termOptions}/>
                            </div>
                        </div>

                        <ItemList />
                    </div>
                </div>
            </div>
        </div>
    );
}
}

FeeItem.propTypes = {
    selectDate: PropTypes.func.isRequired,
    selectTerm: PropTypes.func.isRequired,
    selectCourse: PropTypes.func.isRequired,
    selectAcademicYear: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {};
}
// Get actions and pass them as props
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        selectAcademicYear: selectAcademicYear,
        selectDate: selectDate,
        selectCourse: selectCourse,
        selectTerm: selectTerm
    }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(FeeItem);
