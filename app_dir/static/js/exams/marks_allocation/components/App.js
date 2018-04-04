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
import Students from './Students';
import {Motion, spring} from 'react-motion';
import {Provider} from 'react-redux';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { changeStatus, fetchAcademicYears, setTermAndYear } from '../actions/visibilityStatus';
import Select2 from 'react-select2-wrapper';
import Api from '../api/Api';

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        teachers:[{"id":1, "text":"alex"},{"id":2, "text":"kim"}, {"id":3, "text":"susan"}],
        teacher:1,
        teacherLoggedIn:false,
        teacherLoggedId:null,
        errors:{}
      }

    }

    componentWillMount(){
        let teacher = teacherLoggedIn == null ? false : true
        let teacherId = teacherLoggedId == null ? null : teacherLoggedId
        this.state.teacherLoggedIn = teacher
        this.state.teacherLoggedId = teacherId

        if(teacher){
            this.props.fetchAcademicYears(teacherId)
        }else{
            this.props.fetchAcademicYears('')
        }

        Api.retrieve('/exams/marks/allocation/api/teacher/list/')
            .then(response =>{
                  let tt = []
                  response.data.results.map(teacher=>{
                    tt.push({"id":teacher.id, "text":teacher.name})
                  })
                  this.setState({teachers:tt})
                }

            )
            .catch(error => {console.log(error)})
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

    handleSelectInputChange = (event) =>{
        this.handleInputChange(event)
        this.props.fetchAcademicYears(event.target.value)
        this.callBack(null, 'year')
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
        this.props.changeStatus(status)
    }


    render() {

      return (
          <div className="row col-md-12s">
                  {
                      !this.state.teacherLoggedIn &&
                      <div className="col-md-12">
                          <div className="col-md-12">
                               <Select2
                                    className="col-md-6"
                                    data={this.state.teachers}
                                    onChange={this.handleSelectInputChange}
                                    value={ this.state.teacher }
                                    name="teacher"
                                    options={{
                                        formatSelection: this.format,
                                        formatResult: this.format,
                                        placeholder: 'Select Teacher',
                                    }}
                               />
                          </div>
                      </div>
                  }

                  <BreadCrumb callBack={this.callBack}
                             status={this.props.status}
                             term={this.props.term}
                             classTaught={this.props.classTaught}
                             teacher={this.props.teacher}
                             subject={this.props.subject}
                             exam={this.props.exam}
                             academicYear={this.props.academicYear}/>

                  {
                    this.props.status.year &&
                    <AcademicYears years={this.props.years}
                             status={this.props.status.year}
                             callBack={this.callBack}
                             setTermAndYear={this.props.setTermAndYear}/>
                  }
                  {
                    this.props.status.class &&
                    <Classes years={this.state.academicYears}
                              status={this.props.status.class}
                              term={this.state.term}
                              callBack={this.callBack}/>
                  }
                  {
                    this.props.status.subject &&
                    <Subjects status={this.props.status.subject}
                              callBack={this.callBack}/>
                  }
                  {
                    this.props.status.exam &&
                    <Exams    status={this.props.status.exam}
                              callBack={this.callBack}/>
                  }
                  {
                    this.props.status.student &&
                    <Students status={this.props.status.student}
                              callBack={this.callBack}/>
                  }
          </div>
      );
    }
  }


  const mapStateToProps = state => ({
        status:state.see.status,
        years:state.see.yearDetails,
        term:state.see.term,
        classTaught:state.see.class,
        teacher:state.see.teacher,
        academicYear:state.see.year,
        subject:state.see.subject,
        exam:state.see.exam
    })

  const matchDispatchToProps = dispatch => (
        bindActionCreators(
            {changeStatus: changeStatus,
            fetchAcademicYears: fetchAcademicYears,
            setTermAndYear: setTermAndYear},
            dispatch)
  )


export default connect(mapStateToProps, matchDispatchToProps)(App);