import React from 'react';
import axios from 'axios';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import classnames from 'classnames';
import LaddaButton, { XL, SLIDE_UP } from 'react-ladda';


class CrudForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          name: '',
          buttonText:'Add',
          errors:{},
          isLoading:false
      };

    }

    // load site settings on mount
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
                            buttonText:'Edit'
                            });
                console.log(self.state);
            })
            .catch(function (error) {
                console.log(error);
            });

        }
    }

    validateInput = (data) =>  {
        let errs = {};
        if(Validator.isEmpty(data.name)){
            errs.name = "This field is required";
        }

        return {
            errs,
            isValid: isEmpty(errs)
        }
    }

    handleInputChange = event =>{
        const value  =  event.target.value;
        const name   =  event.target.name;
        if(isEmpty(value)){
            this.state.errors.name = "This field is required";
         }else{
            this.state.errors.name = '';
         }

        this.setState({
          [name]: value
        });
    }

    
    handleSubmit = event =>{
        event.preventDefault();

        this.setState({
          loading: !this.state.loading,
          progress: 0.5,
        });
    

        const { errs, isValid } = this.validateInput(this.state);

        if(isValid){
            console.log("yes it is valid");
        }else{
            this.setState({errors: errs, isLoading: false });
        }

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

    }

    render() {
      const { errors } = this.state;
      return (
      <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
       <div className="col-md-6">
            <div className={classnames("form-group", {"has-error": errors.name} )}>
                <div className="row">
                    <div className="col-md-6">
                        <label className="text-bold">Stream Name:<span className="text-danger">*</span></label>
                        <input value={this.state.name} onChange={this.handleInputChange} className="form-control" name="name" id="name" placeholder="Name" type="text"/>
                        <span className="help-block text-warning"></span>
                        {errors.name && <span className="help-block">{errors.name }</span>}
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