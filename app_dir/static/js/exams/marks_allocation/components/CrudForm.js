import React from 'react';
import axios from 'axios';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import classnames from 'classnames';
import LaddaButton, { XL, SLIDE_UP } from 'react-ladda';
import AcademicYears from './AcademicYears';
import BreadCrumb from './BreadCrumb';
import Classes from './Classes';
import Subjects from './Subjects';
import Exams from './Exams';
import select2 from 'select2';
import {jGrowl} from 'jgrowl';
import modal from 'bootstrap';
import {Motion, spring} from 'react-motion';

class CrudForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        academicYears:[
            {name:"2017-2018", terms:[
                {name:"Term 1", classes:["class 1", "class 2"]},
                {name:"Term 2", classes:["class 4"]},
                {name:"Term 3", classes:["class 5", "class 3"]}]},
            {name:"2018-2019", terms:[
                {name:"Term 1", classes:["class 1", "class 2"]},
                {name:"Term 2", classes:["class 4"]}]}
        ],
        status:{
            yearStatus:true,
            classStatus:false,
            subjectStatus:false,
            examStatus:false
        },
        term:{}
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

    callBack = (term, status) =>{
    console.log("terms is "+term)
    console.log("terms is "+this.state.term)
        let item = term == null? this.state.term: term
        let test = this.state.status
        for (let [key, value] of Object.entries(test)) {
            key == status ? test[status] = true : test[key] = false
        }

        this.setState({test:test,term:item})
    }


    render() {
      return (
          <div className="row col-md-12s">
                  <BreadCrumb callBack={this.callBack} status={this.state.status}/>

                  {
                    this.state.status.yearStatus &&
                    <AcademicYears years={this.state.academicYears}
                    status={this.state.status.yearStatus}
                    callBack={this.callBack}/>
                  }
                  {
                    this.state.status.classStatus &&
                    <Classes years={this.state.academicYears}
                      status={this.state.status.classStatus}
                      term={this.state.term}
                      callBack={this.callBack}/>
                  }
                  {
                    this.state.status.subjectStatus &&
                    <Subjects years={this.state.academicYears}
                      status={this.state.status.subjectStatus}
                      term={this.state.term}
                      callBack={this.callBack}/>
                  }
                  {
                    this.state.status.examStatus &&
                    <Exams years={this.state.academicYears}
                      status={this.state.status.examStatus}
                      term={this.state.term}
                      callBack={this.callBack}/>
                  }
          </div>
      );
    }
  }


  export default CrudForm;