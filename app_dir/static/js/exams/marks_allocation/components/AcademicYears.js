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

import modal from 'bootstrap';
import {MenuItem, DropdownButton} from 'react-bootstrap';


class AcademicYears extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        };
    }

    componentWillReceiveProps(nextProps) {
    }

    showAlert = (index) =>{
        this.props.callBack(index)

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
      const { years} = this.props;
      const config = { stiffness: 110, damping: 10 };

      const toCSS = (scale) => ({
            transform: `scale3d(${scale}, ${scale}, ${scale})`,
            opacity: `${scale}`
            })

      return (
           <div className="col-md-12 pt-15">
             <Motion defaultStyle={{scale: 0}} style={{ scale: spring(1, config) }}>
                {(value) =>(
              <div className="col-md-12" style={toCSS(value.scale)}>
                <table className="table-sm table-striped table-hover" style={{border:"1px solid #ddd", display:"nones"}}>
                        <thead>
                          <tr className="bg-primary">
                            <th>Name</th>
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

            </div>
      );
    }
  }


  export default AcademicYears;