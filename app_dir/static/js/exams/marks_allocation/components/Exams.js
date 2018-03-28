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


class Exams extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
            config:{ stiffness: 120, damping: 20 },
            exams:["Assignment 1", "Assignment 2", "CAT 1", "Exam"]
        };
    }

    componentWillReceiveProps(nextProps) {
    }

    showAlert = (index) =>{
        this.props.callBack(null, "year")
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
                                            <th></th>
                                          </tr>
                                        </thead>
                                        <tbody id="tb">
                                        {
                                            exams.length > 0
                                            ?
                                            (exams.map((tm, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{tm}</td>
                                                        <td><button className="btn btn-primary" onClick={()=>this.showAlert(tm)}>Load Students</button></td>
                                                    </tr>
                                                )
                                            }))
                                            :(
                                                <tr><td colSpan="2" className="text-center">No Exams Available</td></tr>
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


  export default Exams;