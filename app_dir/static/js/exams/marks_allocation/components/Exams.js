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
import { setExam, fetchExams } from '../actions/visibilityStatus';
import LoaderHOC from './HOC/LoaderHOC';


class Exams extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
            config:{ stiffness: 120, damping: 20 },
            exams:[]
        };
    }

    componentWillMount() {

        let yrId = this.props.academicYear.year.id,
            sbjId = this.props.subject.id,
            trmId = this.props.term.id
        this.props.fetchExams(yrId, sbjId, trmId)
    }
    componentWillReceiveProps(nextProps){
        this.setState({exams:nextProps.exams})
    }

    goToStudents = (exam) =>{
        this.props.setExam(exam)
        this.props.callBack(null, "student")
    }


    render() {
      const {status } = this.props
      const {exams} = this.state
      let animation = status ? Animations[0] : Animations[1]

      return (
           <div className="col-md-12 pt-15">
                  <Motion key={animation.name} defaultStyle={animation.defaultStyle} style={animation.style(this.state.config, status)}>
                    {
                      (value) =>
                            <div className="col-md-12" style={animation.render(value)}>
                                <table className="table table-striped table-hover" style={{border:"1px solid #ddd", display:"nones"}}>
                                        <thead>
                                          <tr className="bg-primary">
                                            <th>Exam Name</th>
                                            <th>Total Marks</th>
                                            <th></th>
                                          </tr>
                                        </thead>
                                        <tbody id="tb">
                                        {
                                            exams.length > 0
                                            ?
                                            (exams.map((exam, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{exam.name}</td>
                                                        <td>{exam.totalmarks}</td>
                                                        <td><button className="btn btn-primary" onClick={()=>this.goToStudents(exam)}>Load Students</button></td>
                                                    </tr>
                                                )
                                            }))
                                            :(
                                                <tr><td colSpan="3" className="text-center">No Exams Available</td></tr>
                                            )
                                        }

                                        </tbody>
                                   </table>
                                </div>
                    }
                    </Motion>


            </div>
      );
    }
  }


  const mapStateToProps = state => ({
        exams:state.see.exams,
        term:state.see.term,
        subject:state.see.subject,
        academicYear:state.see.year
  })

  const matchDispatchToProps = dispatch => (
        bindActionCreators(
            {setExam: setExam,
             fetchExams: fetchExams},
            dispatch)
  )


export default LoaderHOC(connect(mapStateToProps, matchDispatchToProps)(Exams));