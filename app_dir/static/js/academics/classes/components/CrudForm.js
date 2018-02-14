import React from 'react';
import axios from 'axios';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import classnames from 'classnames';
import LaddaButton, { XL, SLIDE_UP } from 'react-ladda';


class CrudForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          name: '',
          stream:'',
          room:'',
          no_of_students:'',
          class_teacher:'',
          streams:[],
          errors:{},
          isLoading:false,
          academic_year:'',
          buttonText:'Add',
      };

    }
    // update state data
    //____________________________
    componentWillMount() {
        var self = this; 
        // check if pk checked and populate update details 
        if(pk){
            axios.get(updateUrl)
            .then(function (response) {
                response = response.data;
                if(response.description == null){
                    response.description = '';
                }
                self.setState({
                            name: response.name,
                            stream:response.stream,
                            buttonText:'Edit'
                            });
            })
            .catch(function (error) {
                console.log(error);
            });

        }

        let initialStreams = [];
        axios.get(streamUrl)
            .then(response => {
                var result = response.data.results;
                var arrTen = [];
                for (var k = 0; k < result.length; k++) {
//                    arrTen.push(result[k].name)
                    arrTen.push(<option value={result[k].id}> {result[k].name} </option>);
                    document.getElementById('reactStreams').selectpicker('refresh');
                }
                this.setState({
                  streams: arrTen
                });
                console.log(arrTen);
            })
            .catch(function (error) {
                console.log("error fetching "+ error);
            });

    }

    validateInput = (data) =>  {
        let errs = {};
         for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if(isEmpty(data[key]) ){
                    errs[key] = "This field is required";
                 }else{
                    errs[key] = '';
                 }
            }
        }

        return {
            errs,
            isValid: isEmpty(errs)
        }
    }

    handleInputChange = event =>{
        const value  =  event.target.value;
        const name   =  event.target.name;

         if(isEmpty(value) ){
            this.state.errors[name] = "This field is required";
         }else{
            this.state.errors[name] = '';
         }

        this.setState({
          [name]: value
        });
    }

    
    handleSubmit = event =>{
        event.preventDefault();
    

        const { errs, isValid } = this.validateInput(this.state);

        if(isValid){
            const data = new FormData(event.target)
            axios.defaults.xsrfHeaderName = "X-CSRFToken"
            axios.defaults.xsrfCookieName = 'csrftoken'
            if(pk){
                axios.put(updateUrl,data)
                .then(function (response) {
                    alertUser('Data sent successfully');
                    window.location.href = redirectUrl;
                })
                .catch(function (error) {
                    console.log(error);
                });
            }else{
                axios.post(createUrl,data)
                .then(function (response) {
                    alertUser('Data sent successfully');
                    window.location.href = redirectUrl;
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        }else{
            this.setState({errors: errs, isLoading: false });
        }

    }

    render() {
      const { errors } = this.state;
      const options = map(this.state.streams, (val, key) =>
        <option value={val}>{val}</option>
      );

      return (
      <form encType="multipart/form-data" onSubmit={this.handleSubmit} id="f">
      <div className="col-md-12">
       <div className="col-md-4">
            <div className={classnames("form-group", {"has-error": errors.name} )}>
                <div className="row">
                    <div className="col-md-12">
                        <label className="text-bold">Class Name:<span className="text-danger">*</span></label>
                        <input value={this.state.name} onChange={this.handleInputChange} className="form-control" name="name" id="name" placeholder="Name" type="text"/>
                        {errors.name && <span className="help-block">{errors.name }</span>}
                    </div>
                </div>
            </div>
        </div>
        <div className="col-md-4">
            <div className={classnames("form-group", {"has-error": errors.stream} )}>
                <div className="row">
                    <div className="col-md-12">
                    <label className="text-bold">Stream Name:<span className="text-danger">*</span></label>
                        <select name="stream" className="form-select bootstrap-select" style={{display:"nones"}}
                        onChange={this.handleInputChange} value={this.state.stream} id="reactStreams">
                            <option value="">select stream</option>
                            <option value="20">2012-2013</option>
                            {this.state.streams}
                        </select>
                        {errors.stream && <span className="help-block">{errors.stream }</span>}
                    </div>
                </div>
            </div>
        </div>
        <div className="col-md-4">
            <div className={classnames("form-group", {"has-error": errors.academic_year} )}>
                <div className="row">
                    <div className="col-md-12">
                    <label className="text-bold">Academic Year:<span className="text-danger">*</span></label>
                        <select name="academic_year" className="bootstrap-select" style={{display:"none"}} data-width="100%" tabIndex="-98"
                        onChange={this.handleInputChange} value={this.state.academic_year}>
                            <option value="">select academic year</option>
                            <option value="2">2012-2013</option>
                        </select>
                        {errors.academic_year && <span className="help-block">{errors.academic_year }</span>}
                    </div>
                </div>
            </div>
        </div>
        </div>

        <div className="col-md-12">
       <div className="col-md-4">
            <div className={classnames("form-group", {"has-error": errors.class_teacher} )}>
                <div className="row">
                    <div className="col-md-12">
                        <label className="text-bold">Class Teacher:<span className="text-danger">*</span></label>
                        <input value={this.state.class_teacher} onChange={this.handleInputChange} className="form-control" name="class_teacher" id="name" placeholder="Name" type="text"/>
                        {errors.class_teacher && <span className="help-block">{errors.class_teacher }</span>}
                    </div>
                </div>
            </div>
        </div>
        <div className="col-md-4">
            <div className={classnames("form-group", {"has-error": errors.no_of_students} )}>
                <div className="row">
                    <div className="col-md-12">
                        <label className="text-bold">No of Students:<span className="text-danger">*</span></label>
                        <input value={this.state.no_of_students} onChange={this.handleInputChange} className="form-control" name="no_of_students" id="name" placeholder="Name" type="text"/>
                        {errors.no_of_students && <span className="help-block">{errors.no_of_students }</span>}
                    </div>
                </div>
            </div>
        </div>
        <div className="col-md-4">
            <div className={classnames("form-group", {"has-error": errors.room} )}>
                <div className="row">
                    <div className="col-md-12">
                    <label className="text-bold">Room:<span className="text-danger">*</span></label>
                        <select name="room" className="bootstrap-select" style={{display:"none"}} data-width="100%" tabIndex="-98"
                        onChange={this.handleInputChange} value={this.state.room}>
                            <option value="">select room</option>
                            <option value="2">2012-2013</option>
                        </select>
                        {errors.room && <span className="help-block">{errors.room }</span>}
                    </div>
                </div>
            </div>
        </div>
        </div>

        <div className="text-left col-md-12">
            <button id="add-room-btn" type="submit" className="btn btn-primary legitRipple">
            {this.state.buttonText}<i className="icon-arrow-right14 position-right"></i>
            </button>
        </div>
      </form>
      );
    }
  }


  export default CrudForm;