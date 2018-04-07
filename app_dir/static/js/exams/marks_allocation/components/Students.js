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
import { fetchStudents } from '../actions/visibilityStatus';
import Api from '../api/Api';


class Students extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
            config:{ stiffness: 120, damping: 20 },
            students:[],
            marks:'',
        };
    }

    componentWillMount() {
        let yrId = this.props.academicYear.year.id,
            clsId = this.props.class.id
        this.props.fetchStudents(yrId, clsId)
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.students){
            this.setState({students:nextProps.students})

            nextProps.students.map(student=>{
                let name = student.student_pk
                this.setState({[name]: ''})
            })
        }
    }

    goToStudents = (student) =>{
        console.log(this.props.exam.totalmarks);

    }

    handleInputChange = event =>{
        const name   =  event.target.name;
        let value    =  event.target.value;
//        if(isEmpty(value)){
//            this.state.errors[name] = "This field is required";
//        }else{
//            this.state.errors[name] = '';
//        }

        this.setState({
          [name]: value
        });
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

        if(stds.length == 0){
            alertUser('No Marks', 'bg-danger', null)
        }else{
            stds.map(s=>{
                console.log(s)
                if(s.student_marks == ''){
                    alertUser('No Marks have been set for'+s.student, 'bg-danger', null)
                }
            })
        }
//        const { errs, isValid } = this.validateInput(this.state);
//
//        if(!isValid){
//            this.setState({errors: errs});
//            return;
//        }

        const data = new FormData()
        data.append("subject", this.props.subject.name)
        data.append("academicyear", this.props.academicYear.year.id)
        data.append("academicclass", this.props.class.name)
        data.append("term", this.props.term.id)
        data.append("students", JSON.stringify(stds))
        data.append("exam", this.props.exam.name)
        data.append("exam_marks", this.props.exam.totalmarks)
        data.append("is_committed", false)


        if(pk){
            Api.retrieve('/exams/marks/allocation/api/update/'+pk+'/')
            .then(response => {
                alertUser('Data sent successfully', 'bg-success','Well Done!')
                window.location.href = redirectUrl;
            })
            .catch(error =>{
                alertUser('Something Wen Wrong', 'bg-danger','Oops!')
            })
        }else{
            Api.create('/exams/marks/allocation/api/create/', data)
            .then(response => {
                alertUser('Data sent successfully', 'bg-success','Well Done!')
                window.location.href = redirectUrl;
            })
            .catch(error =>{
                alertUser('already Exists', 'bg-danger','Oops!')
            })
        }

    }


    render() {
      const {status, exam } = this.props
      const {students} = this.state
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
                                                            <input className="form-control inp"
                                                                        name={`${student.student_pk}`}
                                                                        ref={this.myRef}
                                                                       value={this.state[student.student_pk]?this.state[student.student_pk]:""}
                                                                       onChange={this.handleInputChange}/>
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
                        <button type="submit" className="btn btn-sm btn-primary">Submit</button>
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
        academicYear:state.see.year
  })

  const matchDispatchToProps = dispatch => (
        bindActionCreators(
            {fetchStudents: fetchStudents},
            dispatch)
  )


export default connect(mapStateToProps, matchDispatchToProps)(Students);