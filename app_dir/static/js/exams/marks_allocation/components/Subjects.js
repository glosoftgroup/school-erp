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


class Subjects extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
            config:{ stiffness: 110, damping: 10 }
        };
    }

    componentWillReceiveProps(nextProps) {
    }

    showAlert = (index) =>{
        alert(index)

    }
    renderTerms = (year) => {
        return (
             <div>
                 <DropdownButton
                      bsStyle="primary"
                      bsSize="small"
                      title="Terms"
                      id="dropdown-size-small"
                    >
                    {
                        year.terms.map((term, index) => {
                          return (
                            <MenuItem key={index} eventKey={index}
                                onClick={()=>this.showAlert(term)} >
                                {term}
                            </MenuItem>
                          )
                        })
                    }
                 </DropdownButton>
             </div>
        )
    }


    render() {
      const { years, scale, status, term } = this.props;
      const config = { stiffness: 110, damping: 10 };

      const toCSS = (scale, visibility) => ({
            transform: `scale3d(${scale}, ${scale}, ${scale})`,
            opacity: `${scale}`,
            visibility:visibility == 1 ? 'visible': 'hidden'
            })
      let animation = Animations[0]
      let animation1 = Animations[1]

      return (
           <div className="col-md-12 pt-15">
             <Motion defaultStyle={{scale: status?0:1, visibility:status?0:1}}
                     style={{ scale: spring(status?1:0, config), visibility:status?1:0 }}>
                {(value) =>(
              <div className={status?"hidden":"hidden"} style={toCSS(value.scale, value.visibility)}>
                <table className="table-sm table-striped table-hover" style={{border:"1px solid #ddd", display:"nones"}}>
                        <caption> {term} </caption>
                        <thead>
                          <tr className="bg-primary">
                            <th>Name X</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody id="tb">
                        {
                            years.length > 0
                            ?
                            (years.map((year, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            {year.name}
                                        </td>
                                        <td>
                                        {this.renderTerms(year)}
                                        </td>
                                    </tr>
                                )
                            }))
                            :(
                                <tr><td colSpan="2" className="text-center">No Academic Years Assigned have been set</td></tr>
                            )
                        }

                        </tbody>
                   </table>
                </div>
                )}
             </Motion>

                    {
                    status?
                     <div key={animation.name}>
                      <Motion key={animation.name} defaultStyle={animation.defaultStyle} style={animation.style(this.state.config, status)}>
                        {
                          (value) =>
                            <div>
                                <div className="navbar" style= {animation.render(value)}>
                                 hello
                                </div>
                            </div>
                        }
                        </Motion>
                   </div>
                   :
                   <div key={animation1.name}>
                      <Motion key={animation1.name} defaultStyle={animation1.defaultStyle} style={animation1.style(this.state.config)}>
                        {
                          (value) =>
                            <div>
                                <div className="navbar" style= {animation1.render(value)}>
                                 hello
                                </div>
                            </div>
                        }
                        </Motion>
                   </div>
                   }


            </div>
      );
    }
  }


  export default Subjects;