import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import Select2 from 'react-select2-wrapper';
import Loader from 'react-loaders'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { saveStudent, apiFetchStudent } from '../actions/actions';
import { fetchParents } from '../actions/parents'
import { selectStep } from '../actions/tab-step'
import api from '../api/Api'
import 'react-datepicker/dist/react-datepicker.css';
import 'loaders.css/src/animations/line-scale.scss'

class BioData extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          first_name: '',
          middle_name:'',
          last_name:'',
          nationality:'KE',
          gender:'male',
          religion:'christian',
          description:'',
          dob: moment(new Date()),
          pob:'',
          por:'',
          errors:{},
          loading:false,
          buttonText:'save & continue',
          server_errror:''
      };
    }

    // load site settings on mount
    // update state data
    //____________________________
    componentDidMount() { 
      var self = this; 
        // check if pk checked and populate update details 
        if(pk){
            if(this.props.student.first_name === undefined){
            // FETCH from api 
            api.retrieve(updateUrl)
            .then(data => self.props.saveStudent(data))
            .then(()=>self.fetchStudent())
                       
            api.retrieve(updateUrl)
            .then(data => self.props.fetchParents(data))                       
            .catch(function (error) {
                return error       
            });            
          }else{self.fetchStudent()}
        }else{
            self.fetchStudent()
        }
        
    }

    // populate state values with student details from redux store
    fetchStudent = () =>{
        if(this.props.student.first_name != undefined){
            this.setState({
                first_name: this.props.student.first_name,
                last_name: this.props.student.last_name,
                middle_name: this.props.student.middle_name,
                nationality: this.props.student.nationality,
                gender: this.props.student.gender,
                religion: this.props.student.religion,
                por: this.props.student.por,
                pob: this.props.student.pob,
                dob: moment(new Date(this.props.student.dob))                
            })
        }else{
            console.log('no data found in store');
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
            [e.target.name]: e.target.value
        });
    }
    
    handleSubmit = event =>{
      event.preventDefault();

      // validation
      let errors = {};
      let self = this;
      if(this.state.first_name === '') errors.first_name = 'Field required';
      if(this.state.middle_name === '') errors.middle_name = 'Field required';
      if(this.state.last_name === '') errors.last_name = 'Field required';
      if(this.state.dob === '') errors.dob = 'Field required';
      if(this.state.por === '') errors.por = 'Field required';
      if(this.state.pob === '') errors.pob = 'Field required';

      this.setState({errors:errors});

      const isValid = Object.keys(errors).length === 0;

      if(isValid){
        //  if data is valid, add student
        this.setState({loading:true, buttonText:''})
        const data = new FormData(event.target);

        // add image on formdata if is set
        if(this.props.avatar){
            data.append('image', this.props.avatar.avatar)        
        }
        
        // add parents        
        if(this.props.parents){            
            // data.append('parents',JSON.parse([11,10]))
            // var arr = [12, 10];
            const arr = new Array();
            this.props.parents.map(item => {
                arr.push(item.id)             
            })
            for (var i = 0; i < arr.length; i++) {
                data.append('parents', arr[i]);
            }
        }

        
        // check if pk is set and update details 
        if(pk){
            // UPDATE STUDENT 
            axios.defaults.xsrfHeaderName = "X-CSRFToken"
            axios.defaults.xsrfCookieName = 'csrftoken'
            axios.put(updateUrl,data)
            .then(function (response) {
                alertUser('Data sent successfully');
                self.setState({loading:false, buttonText:'Submit'});
                
                // goto next tab
                let step = Object.assign({'id':self.props.step.id+1})
                self.props.selectStep(step);
                return response;
            })
            .then(data => this.props.saveStudent(data))
            .catch(function (response) {
                console.log(response.message)
                let error = new Error(response.message);
               
                error.response = response;
                self.setState({server_errror:response.message, loading:false, buttonText:'Submit'});
                return;
            });
        }else{
            // CREATE STUDENT
            
            axios.defaults.xsrfHeaderName = "X-CSRFToken"
            axios.defaults.xsrfCookieName = 'csrftoken'
            axios.post(createUrl,data)
            .then(function (response) {
                alertUser('Data sent successfully');
                self.setState({loading:false, buttonText:'Submit'});
                pk = response.data.id
                updateUrl = response.data.update_url
                return response;
            })
            .then(data => this.props.saveStudent(data))
            .catch(function (response) {
                let error = new Error(response.message);
               
                error.response = response;
                self.setState({server_errror:response.message, loading:false, buttonText:'Submit'});
                return;
            });
        }
        // this.props.addStudent(data);
      }else{
          return;
      }      
         
    }

    render() {
      const { nationality, gender, religion, server_errror, por, pob } = this.state;
      return (
      <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
      <div className="col-md-12">
            {!!server_errror && <div className="ui alert alert-warning negative message"><p>{this.state.server_errror}</p></div>} 
      </div>
       <div className="col-md-12 animated fadeIn">
            <div className="form-group">
                <div className="row">                    
                    <div className="col-md-4">
                        <label className="text-bold">First Name:<span className="text-danger">*</span></label>
                        {(() => {
                            switch (this.props.editable.editable) {
                                case true:   return <input value={this.state.first_name} onChange={this.handleInputChange} className="form-control" name="first_name" id="first_name" placeholder="First name" type="text"/>                        
                                ;
                                case false: return <span><br/>{this.state.first_name}</span>;
                                
                                default:      return "";
                            }
                        })()}
                        <span className="help-block text-warning">{this.state.errors.first_name}</span>
                    </div>
                    <div className="col-md-4">
                        <label className="text-bold">Middle Name:<span className="text-danger">*</span></label>
                        {(() => {
                            switch (this.props.editable.editable) {
                                case true:   return <input value={this.state.middle_name} onChange={this.handleInputChange} className="form-control" name="middle_name" id="middle_name" placeholder="Middle name" type="text"/>                        
                                ;
                                case false: return <span><br/>{this.state.middle_name}</span>;
                                
                                default:      return "";
                            }
                        })()}
                        <span className="help-block text-warning">{this.state.errors.middle_name}</span>
                    </div>
                    <div className="col-md-4">
                        <label className="text-bold">Last Name:<span className="text-danger">*</span></label>
                        {(() => {
                            switch (this.props.editable.editable) {
                                case true:   return <input value={this.state.last_name} onChange={this.handleInputChange} className="form-control" name="last_name" id="last_name" placeholder="Last name" type="text"/>                        
                                ;
                                case false: return <span><br/>{this.state.last_name}</span>;
                                
                                default:      return "";
                            }
                        })()}
                        <span className="help-block text-warning">{this.state.errors.last_name}</span>
                    </div>                    
                </div>
            </div>
            <div className="form-group">

                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="text-bold">Date of Birth:</label>                            
                            {(() => {
                            switch (this.props.editable.editable) {
                                case true:   return <DatePicker
                                                selected={this.state.dob}
                                                onChange={this.handleChange}
                                                name="dob"
                                                dateFormat="YYYY-MM-DD"
                                                className="form-control"
                                            />;
                                case false: return <span><br/>{this.state.first_name}</span>;
                                
                                default:      return "";
                            }
                        })()}
                            <span className="help-block text-warning">{this.state.errors.dob}</span>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="text-bold">Place of birth:</label>
                            {(() => {
                                switch (this.props.editable.editable) {
                                    case true:   return <input ref="pob" onChange={this.handleInputChange} name="pob" value={this.state.pob}  id="pob" placeholder="eg Moscow" className="form-control" type="text"   />
                                    ;
                                    case false: return <span><br/>{this.state.pob}</span>;
                                    
                                    default:      return "";
                                }
                            })()}
                            
                            <span className="help-block text-warning">{this.state.errors.pob}</span>
                        </div>
                    </div>
                    
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="text-bold">Place of residence:</label>
                            {(() => {
                                switch (this.props.editable.editable) {
                                    case true:   return <input ref="por" onChange={this.handleInputChange} name="por" value={por}  id="por" placeholder="eg. Moscow" className="form-control" type="text"  />
                                    ;
                                    case false: return <span><br/>{this.state.pob}</span>;
                                    
                                    default:      return "";
                                }
                            })()}
                            
                            <span className="help-block text-warning">{this.state.errors.por}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-md-4"> 
            <div className="form-group">
                <label>Gender:</label>
                {(() => {
                    switch (this.props.editable.editable) {
                        case true:   return <Select2
                                            data={this.props.genders}
                                            onChange={this.onSelectChange}
                                            value={ gender }
                                            name="gender"
                                            options={{
                                                placeholder: 'select gender',
                                            }}
                                            />;
                        case false: return <span><br/>{this.state.gender}</span>;
                        
                        default:      return "";
                    }
                })()}
                
            </div>            
        </div>
        <div className="col-md-4"> 
            <div className="form-group">
                <label>Religion:</label>
               
                {(() => {
                    switch (this.props.editable.editable) {
                        case true:   return <Select2
                                            data={this.props.religions}
                                            onChange={this.onSelectChange}
                                            value={ religion }
                                            name="religion"
                                            options={{
                                                placeholder: 'select religion',
                                            }}
                                            />;
                        case false: return <span><br/>{this.state.religion}</span>;
                        
                        default:      return "";
                    }
                })()}
            </div>            
        </div>
        
        <div className="col-md-4"> 
            <div className="form-group">
                <label>Countries</label>
                
                {(() => {
                    switch (this.props.editable.editable) {
                        case true:   return <Select2
                                            data={this.props.countries}
                                            onChange={this.onSelectChange}
                                            value={ nationality }
                                            name="nationality"
                                            options={{
                                                placeholder: 'search country',
                                            }}
                                            />;
                        case false: return <span><br/>{this.state.nationality}</span>;
                        
                        default:      return "";
                    }
                })()}
            </div>            
        </div>
        <div className="text-right col-md-12">
        {(() => {
            switch (this.props.editable.editable) {
                case true:   return <button type="button" type="submit" className="btn btn-primary legitRipple">
                                    {!!this.state.loading && <Loader type="line-scale" className="custom-loader" />}{this.state.buttonText}
                                    </button>;
                default:      return "";
            }
        })()}
           
            
        </div> 
      </form>
      );
    }
  }

// Get apps state and pass it as props to Bio data
//      > whenever state changes, the UserList will automatically re-render
function mapStateToProps(state) {
    return {
        avatar: state.avatar,
        countries: state.countries,
        editable: state.editable,        
        genders: state.genders,
        religions: state.religions,        
        parents: state.parents,
        step: state.step,
        student: state.activeStudent
    }
}

// Get actions and pass them as props
function matchDispatchToProps(dispatch){
    return bindActionCreators({
        saveStudent, apiFetchStudent,
        fetchParents, selectStep       
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(BioData);