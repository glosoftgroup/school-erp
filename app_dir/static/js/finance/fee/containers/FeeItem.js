import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import DatePicker from 'react-datepicker';
import Select2 from 'react-select2-wrapper';
import api from '../api/Api'
import StudentList from '../containers/student-list'
import {selectStudents} from '../actions/students'
import {selectAcademicYear} from '../actions/academic-year'
import {selectDate} from '../actions/date'
import {selectCourse} from '../actions/course'
import 'react-datepicker/dist/react-datepicker.css';
import '../css/styles.scss';

class FeeItem extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          name: '',
          date:moment(new Date()),
          academic_year:'',
          course:'',
          students: Object.assign({}),
          loading: false,
          buttonText:'Submit'
      };

    }

    // load default fields on mount
    // update state data
    //____________________________    
    componentDidMount() {
        var self = this;
        let date = Object.assign({'date':moment(new Date()).format('YYYY-MM-DD')})
        this.props.selectDate(date)
        // set default class
        api.retrieve('/class/api/list')
        .then(data=>data.data.results)
        .then(function(data){
            self.props.selectCourse(data[0])
            var option1 = new Option(data[0].name,data[0].id, true);
            self.refs.course.el.append(option1).trigger('change');            
        })

        // set default academic_year
        api.retrieve('/academic_year/api/list')
        .then(data=>data.data.results)
        .then(function(data){
            self.props.selectAcademicYear(data[0])
            var option1 = new Option(data[0].name,data[0].id, true);
            self.refs.academic_year.el.append(option1).trigger('change');            
        })
               
    }

    handleChange = (date) => {
        this.setState({
          date: date
        });

        // change date in store
        let obj = Object.assign({'date':moment(date).format('YYYY-MM-DD')})
        this.props.selectDate(obj)
    }

    handleInputChange = event =>{
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
        
        if(this.state.course  && this.state.academic_year){
            var self = this;
            api.retrieve('/student/api/list/?page_size=1200&course='+this.state.course+'&academic_year='+this.state.academic_year)
            .then(data=>data.data.results)
            .then(function(data){
                self.props.selectStudents(data)
                self.state.students = data
            })
        }
    }

    toggleStatus = (id) =>{
        
    }

    
    handleSubmit = event =>{
      event.preventDefault();

      const data = new FormData(event.target);
    }

    selectOptions = (url,placeholder) =>{
        return  {
            placeholder: placeholder,
            allowClear: false,
            width: "100%",
            dropdownAutoWidth:true,
            formatSelection: function(item){return item.name},
            formatResult: function(item){return item.name},
            ajax: {
                url: function (params) {
                  return url+'?' + params.term;
                },
                processResults: function (data) {
                  // Tranforms the top-level key of the response object from 'items' to 'results'
                  data = data.results;
                  return {
                        results :
                            data.map(function(item) {                    
                                return {
                                    id : item.id,
                                    text : item.name
                                };
                            }
                    )};
                }
              },
              debug: true,
              delay: 250,
        }  
    }

    render() {
        var _options =  this.selectOptions('/class/api/list', 'Select Classes')
        var _academicOptions = this.selectOptions('/academic_year/api/list','Select Academic year')
        var students = this.state.students

      return (
      <div className="row">
        {/* filter */}
        <div className="col-md-12">
            <div className="panel panel-flat panel-custom">
                
                <div className="panel-body  search-panel">                  

                    <div className="col-md-4">
                        <label>Class:</label>
                        <div className="form-group">
                        <Select2 ref="course"
                            onChange = {this.handleInputChange}
                            name = 'course'
                            value = {this.state.course}
                            options={ _options}/>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <label>Academic Year:</label>
                        <div className="form-group">
                        <Select2 ref="academic_year"
                        onChange = {this.handleInputChange}
                        name = 'academic_year'
                        value = {this.state.academic_year}
                        options={ _academicOptions}/>
                        </div>
                    </div>

                </div>
            </div>
       
        {/* ./filter */}    
           
        </div>        
      </div>
      );
    }
  }


function mapStateToProps(state) {
    return {
        students: state.students
    }
}
// Get actions and pass them as props
function matchDispatchToProps(dispatch){
    return bindActionCreators({
        selectStudents: selectStudents,
        selectAcademicYear: selectAcademicYear,
        selectDate: selectDate,
        selectCourse: selectCourse
    }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(FeeItem);