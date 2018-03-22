import React from 'react';
import axios from 'axios';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import classnames from 'classnames';
import LaddaButton, { XL, SLIDE_UP } from 'react-ladda';
import AcademicYears from './AcademicYears';
import Subjects from './Subjects';
import select2 from 'select2';
import {jGrowl} from 'jgrowl';
import modal from 'bootstrap';
import {Motion, spring} from 'react-motion';

class CrudForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        academicYears:[
            {name:"2017-2018", terms:["Term 1", "Term 2", "Term 3"]},
            {name:"2018-2019", terms:["Term 1", "Term 2"]}
        ],
        status:false,
        term:''
      }

    }

    componentWillMount(){

    }
    componentDidMount(){

    }

    handleInputChange = event =>{
        const name   =  event.target.name;
        let value    =  event.target.value;

        if(isEmpty(value)){
            this.state.errors[name] = "This field is required";
        }else{
            this.state.errors[name] = '';
        }

        this.setState({
          [name]: value
        });

    }

    validateInput = (data) =>  {
        let errs = {};

        if(Validator.isEmpty(data.subject)){
            errs.subject = "This field is required";
        }


        return {
            errs,
            isValid: isEmpty(errs)
        }
    }

    handleSubmit = event =>{
        event.preventDefault();
        const { errs, isValid } = this.validateInput(this.state);

        if(!isValid){
            this.setState({errors: errs});
            return;
        }

        const data = new FormData()

        axios.defaults.xsrfHeaderName = "X-CSRFToken"
        axios.defaults.xsrfCookieName = 'csrftoken'



        if(pk){
            axios.put(updateUrl,data)
            .then(function (response) {
                alertUser('Data sent successfully', 'bg-success','Well Done!')
                window.location.href = redirectUrl;
            })
            .catch(function (error) {
                console.log(error);
            });
        }else{
            axios.post(createUrl,data)
            .then(function (response) {
                alertUser('Data sent successfully', 'bg-success','Well Done!')
                window.location.href = redirectUrl;
            })
            .catch(function (error) {
                alertUser('Exam Setting already Exists','bg-danger','Oops! Error Found')

            });
        }

    }

    callBack = (item) =>{
        console.log(item)
        this.setState({status: !this.state.status, term:item})
    }


    render() {
      return (
          <div className="col-md-12">
                <AcademicYears years={this.state.academicYears}
                        callBack={this.callBack}/>
                <Subjects years={this.state.academicYears}
                          status={this.state.status}
                          term={this.state.term}/>
          </div>
      );
    }
  }


  export default CrudForm;