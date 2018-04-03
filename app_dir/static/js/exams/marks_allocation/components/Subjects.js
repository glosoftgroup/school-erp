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
import { setSubject, fetchSubjects } from '../actions/visibilityStatus';


class Subjects extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
            config:{ stiffness: 120, damping: 20 },
            subjects:[]
        };
    }

    componentWillMount() {

        let trId = this.props.teacher.id,
            yrId = this.props.academicYear.year.id,
            clsId = this.props.classTaught.id,
            trmId = this.props.term.id
        this.props.fetchSubjects(trId, yrId, clsId, trmId)
    }
    componentWillReceiveProps(nextProps){
        this.setState({subjects:nextProps.subjects})
    }

    goToExams = (subject) =>{
        this.props.setSubject(subject)
        this.props.callBack(null, "exam")
    }


    render() {
      const {status } = this.props
      const {subjects} = this.state
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
                                            <th>Subject Name</th>
                                            <th></th>
                                          </tr>
                                        </thead>
                                        <tbody id="tb">
                                        {
                                            subjects.length > 0
                                            ?
                                            (subjects.map((subject, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{subject.name}</td>
                                                        <td><button className="btn btn-primary" onClick={()=>this.goToExams(subject)}>Load Exams</button></td>
                                                    </tr>
                                                )
                                            }))
                                            :(
                                                <tr><td colSpan="2" className="text-center">No Subjects Available</td></tr>
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
        subjects:state.see.subjects,
        term:state.see.term,
        classTaught:state.see.class,
        teacher:state.see.teacher,
        academicYear:state.see.year
  })

  const matchDispatchToProps = dispatch => (
        bindActionCreators(
            {setSubject: setSubject,
             fetchSubjects: fetchSubjects},
            dispatch)
  )


export default connect(mapStateToProps, matchDispatchToProps)(Subjects);