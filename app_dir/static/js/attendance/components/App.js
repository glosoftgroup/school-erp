import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {connect} from 'react-redux';
import DatePicker from 'react-datepicker';
import Select2 from 'react-select2-wrapper';
import api from '../api/Api'
import {selectStudents} from '../actions/students'
import 'react-datepicker/dist/react-datepicker.css';
import '../css/styles.scss';

class Comp extends React.Component {
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

    // load site settings on mount
    // update state data
    //____________________________
    

    componentDidUpdate(prevProps, prevState){        
        
    }
    componentDidMount() {
        var self = this;

        // set default class
        api.retrieve('/class/api/list')
        .then(data=>data.data.results)
        .then(function(data){
            var option1 = new Option(data[0].name,data[0].id, true);
            self.refs.course.el.append(option1).trigger('change');            
        })

        // set default academic_year
        api.retrieve('/academic_year/api/list')
        .then(data=>data.data.results)
        .then(function(data){
            var option1 = new Option(data[0].name,data[0].id, true);
            self.refs.academic_year.el.append(option1).trigger('change');            
        })
               
    }

    handleChange = (date) => {
        this.setState({
          date: date
        });
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
            api.retrieve('/student/api/list/')
            .then(data=>data.data.results)
            .then(function(data){
                self.props.selectStudents(data)
                self.state.students = data
            })
        }
    }

    
    handleSubmit = event =>{
      event.preventDefault();

      const data = new FormData(event.target);
    }

    selectOptions = (url,placeholder) =>{
        return  {
            placeholder: placeholder,
            allowClear: false,
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
      <div className="">
        {/* filter */}
        <div className="col-md-12">
            <div className="panel panel-flat panel-custom">
                <div className="panel-body  search-panel">
                    
                    <div className="col-md-4">
                        <label>Date {this.state.course}</label>
                        <div className="form-group form-group-material has-feedback">
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.handleChange}
                                name="date"
                                dateFormat="YYYY-MM-DD"
                                className="form-control"
                            />
                        </div>
                    </div>

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
        {/* list */}
        <table className="panel panel-body table table-xxs table-hover">
                <thead>
                    <tr className="bg-primary">
                        <th>First Name</th>
                        <th>Middle Name</th>
                        <th>Last Name</th>
                        <th>Mobile</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.students.map(obj => {
                    return (
                    <tr key={obj.id}>
                        <td>{obj.first_name}</td>
                        <td>{obj.middle_name}</td>
                        <td>{obj.last_name}</td>
                        <td>{obj.mobile}</td>
                        <td onClick={() => this.removeparent(obj.id)} >
                            <i className="icon-trash"></i>
                        </td>
                    </tr>
                    )})
                }
                {this.props.students.length === 0 &&
                    <tr>
                        <td colSpan='4' className="text-center">
                        <h4>No data Found</h4>
                        </td>
                    </tr>
                }
                    
                </tbody>
            </table>
            <div className="col-md-12 text-center">
            {this.props.students.length !== 0 &&                     
            <button onClick={this.handleSubmit} id="add-room-btn" type="submit" className="btn btn-sm btn-primary legitRipple">
                {this.state.buttonText}<i className="icon-arrow-right14 position-right"></i>
            </button>
            }
            </div>
        </div>
        {/* ./list */}
      </div>
      );
    }
  }


  function mapStateToProps(state) {
    return {
        students: state.students
    }
}

export default connect(mapStateToProps, {selectStudents})(Comp);