import React from 'react';
import axios from 'axios';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import classnames from 'classnames';
import LaddaButton, { XL, SLIDE_UP } from 'react-ladda';
import {Motion, spring} from 'react-motion';
import Animations from './Animations';
import {MenuItem, DropdownButton} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchStudents, changeFinalCommitStatus } from '../actions/visibilityStatus';
import Api from '../api/Api';


class Students extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
            config:{ stiffness: 120, damping: 20 },
            students:[],
            marks:'',
            is_committed:false,
            errors:{}
        };
    }

    componentWillMount() {
        let yrId = this.props.academicYear.year.id,
            clsId = this.props.class.id,
            termId = this.props.term.id,
            exam = this.props.exam.name
        this.props.fetchStudents(yrId, clsId, termId, exam)
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.students){
            this.setState({students:nextProps.students})

            nextProps.students.map(student=>{
                let name = student.id,
                    value = student.exams ? student.exams.marks : '0'
                this.setState({[name]: value})
            })
        }

        this.setState({is_committed:nextProps.is_committed})
    }

    goToStudents = (student) =>{
        console.log(this.props.exam.totalmarks)

    }

    onKeyDown = (event) =>{
        let keyCode  = event.keyCode
        const name   =  event.target.name
        let value    =  event.target.value
        
        if(keyCode === 8 || keyCode === 46){
            this.setState({
                [name]: 0
            });
        }
    }

    handleInputChange = event =>{
        const name   =  event.target.name
        let value    =  event.target.value

        const re = /^[0-9\b]+$/;

        if(isEmpty(value)){
                this.state.errors[name] = "This field is required"
        }else if (!isEmpty(value) && (parseInt(value) > parseInt(this.props.exam.totalmarks))){
                this.state.errors[name] = "cannot exceed "+this.props.exam.totalmarks+" marks"
        }else{
            this.state.errors[name] = ''
        }

        if(re.test(value)){
            this.setState({
                [name]: value
              });
            }
        
    }

    validateInput = (data) =>  {
        let errs = {}

        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if((key != 'marks') && (key != 'students') && (key != 'is_committed') && (key != 'config') && (key != 'errors')){
                  if(Validator.isEmpty(data[key])) {
                      errs[key] = "This field is required "+key
                  }
                }
            }
        }

        return {
            errs,
            isValid: isEmpty(errs)
        }
    }

    handleSubmit = event =>{
        event.preventDefault();

        let x = document.getElementById('marksForm')
        let stds = []
        for(let i=0; i < x.length; i++){
            if(x.elements[i].tagName == "INPUT"){
                let ex = {}
                ex["student"] = x.elements[i].name
                ex["student_marks"] = x.elements[i].value
                stds.push(ex)
            }

        }
  
       const { errs, isValid } = this.validateInput(this.state);

       if(!isValid){
            this.setState({errors: errs})
            alertUser('Please fix the errors below', 'bg-danger', 'Oops!')
            return;
       }
    //    return;

        const data = new FormData()
        data.append("subject", this.props.subject.name)
        data.append("academicyear", this.props.academicYear.year.id)
        data.append("academicclass", this.props.class.name)
        data.append("term", this.props.term.id)
        data.append("students", JSON.stringify(stds))
        data.append("exam", this.props.exam.name)
        data.append("exam_marks", this.props.exam.totalmarks)
        data.append("is_committed", this.state.is_committed)


        if(pk){
            Api.retrieve('/exams/marks/allocation/api/update/'+pk+'/')
            .then(response => {
                alertUser('Data sent successfully', 'bg-success','Well Done!')
                // window.location.href = redirectUrl;
            })
            .catch(error =>{
                alertUser('Something Wen Wrong', 'bg-danger','Oops!')
            })
        }else{
            Api.create('/exams/marks/allocation/api/create/', data)
            .then(response => {
                alertUser('Data sent successfully', 'bg-success','Well Done!')
                window.location.reload()
                // window.location.href = redirectUrl;
            })
            .catch(error =>{
                alertUser('already Exists', 'bg-danger','Oops!')
            })
        }

    }

    handleCommit = event => {
        event.preventDefault();
        this.props.changeFinalCommitStatus(null)
    }


    render() {
      const { status, exam } = this.props
      const { students, errors, is_committed } = this.state
      let totalmarks = exam.totalmarks
      let animation = status ? Animations[0] : Animations[1]

      var self = this

      return (
           <div className="col-md-12 pt-15">
            <form encType="multipart/form-data" id="marksForm" onSubmit={this.handleSubmit}>
                  <Motion key={animation.name} defaultStyle={animation.defaultStyle} style={animation.style(this.state.config, status)}>
                    {
                      (value) =>
                            <div className="col-md-12" style={animation.render(value)}>
                                <table className="table table-striped table-hover" style={{border:"1px solid #ddd", display:"nones"}}>
                                        <thead>
                                          <tr className="bg-primary">
                                            <th>Student Admission No</th>
                                            <th>Student Name</th>
                                            <th>Marks / {totalmarks}</th>
                                          </tr>
                                        </thead>
                                        <tbody id="tb">
                                        {
                                            students.length > 0
                                            ?
                                            (students.map((student, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{student.adm_no}</td>
                                                        <td>{student.name}</td>
                                                        <td>
                                                            <div className={classnames("form-group ", {"has-error":errors[student.id]})}>
                                                                <input className="form-control inp"
                                                                            name={`${student.id}`}
                                                                            ref={this.myRef}
                                                                            disabled={is_committed}
                                                                        value={this.state[student.id]?this.state[student.id]:""}
                                                                        onChange={this.handleInputChange}
                                                                        onKeyDown={this.onKeyDown}/>
                                                                {this.state[student.id] ?
                                                                    errors[student.id] && <span className="help-block">{ errors[student.id] }</span>
                                                                : errors[student.id] = ""}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            }))
                                            :(
                                                <tr><td colSpan="3" className="text-center">No Students Available</td></tr>
                                            )
                                        }

                                        </tbody>
                                   </table>
                                </div>
                    }
                    </Motion>
                    <div className="col-md-12 pt-15">
                        <button type="submit" 
                                className="btn btn-sm btn-primary"
                                disabled={is_committed}>Submit</button>
                        <button type="submit" 
                                className="btn btn-sm btn-primary ml-10"
                                onClick = {this.handleCommit}
                                disabled={is_committed}>Final Commit</button>
                    </div>
                </form>

            </div>
      );
    }
  }


  const mapStateToProps = state => ({
        students:state.see.students,
        class:state.see.class,
        term:state.see.term,
        exam:state.see.exam,
        subject:state.see.subject,
        academicYear:state.see.year,
        is_committed:state.see.is_committed
  })

  const matchDispatchToProps = dispatch => (
        bindActionCreators(
            {
                fetchStudents: fetchStudents, 
                changeFinalCommitStatus:changeFinalCommitStatus
            },
            dispatch)
  )


export default connect(mapStateToProps, matchDispatchToProps)(Students);