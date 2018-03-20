import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import Select2 from 'react-select2-wrapper';
import {connect} from 'react-redux';
import { saveStudent } from '../actions/actions';
 
import 'react-datepicker/dist/react-datepicker.css';
class BioData extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          first_name: '',
          middle_name:'',
          last_name:'',
          nationality:'KE',
          description:'',
          dob: moment(new Date()),
          pob:'',
          errors:{},
          loading:false,
          buttonText:'Add'
      };      

    }

    // load site settings on mount
    // update state data
    //____________________________
    componentDidMount() { 
        // console.log(this.props.countries)
        // this.refs.start_date.value = moment(new Date()).format("YYYY-MM-DD");
        // this.refs.end_date.value = moment(new Date()).format("YYYY-MM-DD");       
        
        var self = this; 
        // check if pk checked and populate update details 
        if(pk){
            // FETCH    data
        }
    }

    handleInputChange = event =>{   
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name; 

        if(!!this.state.errors[name]){
            let errors = Object.assign({}, this.state.errors);
            delete errors[name];             
                    
            this.setState({
                [name]: value,
                errors
            });
        }else{
            this.setState({
                [name]: value
            });
        }
        
       
    }
    
    handleChange = (date) => {
        this.setState({
          dob: date
        });
    }
    onSelectChange = (e) => {
        this.setState({
            nationality: e.target.value
        });
    }
    
    handleSubmit = event =>{
      event.preventDefault();

      // validation
      let errors = {};
      if(this.state.first_name === '') errors.first_name = 'Field required';
      if(this.state.middle_name === '') errors.middle_name = 'Field required';
      if(this.state.last_name === '') errors.last_name = 'Field required';

      this.setState({errors:errors});

      const isValid = Object.keys(errors).length === 0;

      if(isValid){
        //  if data is valid, add student
        // const data = this.state;
        this.setState({loading:true, buttonText:'loading ..'})
        const data = new FormData(event.target);
        // check if pk is set and update details 
        if(pk){
            // UPDATE STUDENT 
        }else{
            // CREATE STUDENT
            axios.defaults.xsrfHeaderName = "X-CSRFToken"
            axios.defaults.xsrfCookieName = 'csrftoken'
            axios.post(createUrl,data)
            .then(function (response) {
                alertUser('Data sent successfully');
                return response;
            })
            .then(data => dispatch(addStudent(data)))
            .catch(function (error) {
                return error;
            });
        }
        // this.props.addStudent(data);
      }else{
          return;
      }      
         
    }

    render() {
      const { nationality } = this.state;
      return (
      <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
       <div className="col-md-8">
            <div className="form-group">
                <div className="row">
                    <div className="col-md-12">
                        <div className="ui alert alert-warning negative message"><p>{this.state.errors.global}</p></div>
                    </div>
                    <div className="col-md-4">
                        <label className="text-bold">First Name:<span className="text-danger">*</span></label>
                        <input value={this.state.first_name} onChange={this.handleInputChange} className="form-control" name="first_name" id="first_name" placeholder="First name" type="text"/>
                        <span className="help-block text-warning">{this.state.errors.first_name}</span>
                    </div>
                    <div className="col-md-4">
                        <label className="text-bold">Middle Name:<span className="text-danger">*</span></label>
                        <input value={this.state.middle_name} onChange={this.handleInputChange} required className="form-control" name="middle_name" id="middle_name" placeholder="Middle name" type="text"/>
                        <span className="help-block text-warning"></span>
                    </div>
                    <div className="col-md-4">
                        <label className="text-bold">Last Name:<span className="text-danger">*</span></label>
                        <input value={this.state.last_name} onChange={this.handleInputChange} required className="form-control" name="last_name" id="last_name" placeholder="Last name" type="text"/>
                        <span className="help-block text-warning"></span>
                    </div>                    
                </div>
            </div>
            <div className="form-group">

                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="text-bold">Date of Birth:</label>
                            <DatePicker
                                selected={this.state.dob}
                                onChange={this.handleChange}
                                dateFormat="YYYY-MM-DD"
                                className="form-control"
                            />
                            <span className="help-block text-warning"></span>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="text-bold">Place of birth:</label>
                            <input ref="pob" onChange={this.handleInputChange} name="pob"  id="pob" placeholder="eg Moscow" className="form-control" type="text"  required="required" />
                            <span className="help-block text-warning"></span>
                        </div>
                    </div>
                    
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="text-bold">Place of residence:</label>
                            <input ref="end_date" onChange={this.handleInputChange} name="end_date"  id="end_date" placeholder="eg 2018/12/12" className="form-control datepicker" type="text"  required="required" />
                            <span className="help-block text-warning"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-md-4"> 
            <div className="form-group">
                <label>Countries</label>
                <Select2
                data={this.props.countries}
                onChange={this.onSelectChange}
                value={ nationality }
                name="nationality"
                options={{
                    placeholder: 'search country',
                }}
                />
            </div>
            <div className="form-group hidden">
                <label className="text-bold"> Description:</label>
                <textarea value={this.state.description} onChange={this.handleInputChange} rows="5" cols="5" className="form-control" id="description" name="description" placeholder="Enter room description here" />
                
                <span className="help-block text-warning"></span>
            </div> 
        </div>
        <div className="text-right col-md-12">
            <button id="add-room-btn" type="submit" className="btn btn-primary legitRipple">
            {this.state.buttonText}<i className="icon-arrow-right14 position-right"></i>
            </button>
        </div> 
      </form>
      );
    }
  }

// Get apps state and pass it as props to UserList
//      > whenever state changes, the UserList will automatically re-render
function mapStateToProps(state) {
    return {
        countries: state.countries
    }
}

export default connect(mapStateToProps, {saveStudent})(BioData);