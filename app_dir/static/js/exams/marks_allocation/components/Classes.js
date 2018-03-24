import React from 'react';
import axios from 'axios';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import classnames from 'classnames';
import LaddaButton, { XL, SLIDE_UP } from 'react-ladda';
import select2 from 'select2';
import 'select2/dist/css/select2.css';
import {Motion, spring} from 'react-motion';
import Animations from './Animations';

import modal from 'bootstrap';
import {MenuItem, DropdownButton} from 'react-bootstrap';


class Classes extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
            config:{ stiffness: 110, damping: 10 }
        };
    }

    componentWillReceiveProps(nextProps) {
    }

    showAlert = (index) =>{
        this.props.callBack(index, "subjectStatus")
    }


    render() {
      const {scale, status, term } = this.props;
      let animation = status ? Animations[0] : Animations[1]

      return (
           <div className="col-md-12 pt-15">
                     <div key={animation.name}>
                      <Motion key={animation.name} defaultStyle={animation.defaultStyle} style={animation.style(this.state.config, status)}>
                        {
                          (value) =>
                            <div>
                                <div style={animation.render(value)}>
                                    <table className="table-sm table-striped table-hover" style={{border:"1px solid #ddd", display:"nones"}}>
                                            <caption> Term X </caption>
                                            <thead>
                                              <tr className="bg-primary">
                                                <th>Class Name</th>
                                                <th></th>
                                              </tr>
                                            </thead>
                                            <tbody id="tb">
                                            {
                                                Object.keys(term).length !== 0
                                                ?
                                                (term.classes.map((tm, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{tm}</td>
                                                            <td><button className="btn btn-primary" onClick={()=>this.showAlert(tm)}>Load Subjects</button></td>
                                                        </tr>
                                                    )
                                                }))
                                                :(
                                                    <tr><td colSpan="2" className="text-center">No Classes</td></tr>
                                                )
                                            }

                                            </tbody>
                                       </table>
                                    </div>
                            </div>
                        }
                        </Motion>
                   </div>


            </div>
      );
    }
  }


  export default Classes;