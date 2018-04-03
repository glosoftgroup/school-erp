import React from 'react';
import axios from 'axios';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import classnames from 'classnames';
import LaddaButton, { XL, SLIDE_UP } from 'react-ladda';
import { Motion, spring } from 'react-motion';
import Animations from './Animations';
import { MenuItem, DropdownButton } from 'react-bootstrap';


class AcademicYears extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
            config:{ stiffness: 120, damping: 20 },
            terms:[
                {name:"Term 1", classes:["class 1", "class 2"]},
                {name:"Term 2", classes:["class 4"]}]
        };
    }

    goToTerm = (term, year) =>{
        this.props.callBack(term, "class")
        this.props.setTermAndYear(term, year)
    }
    renderTerms = (terms, year) => {
        return (
             <div>
                 <DropdownButton
                      bsStyle="primary"
                      bsSize="small"
                      title="Terms"
                      id="dropdown-size-small"
                    >
                    {
                        terms.map((term, index) => {
                          return (
                            <MenuItem key={index} eventKey={index}
                                onClick={()=>this.goToTerm(term, year)} >
                                {term.name}
                            </MenuItem>
                          )
                        })
                    }
                 </DropdownButton>
             </div>
        )
    }


    render() {
      const { years, status} = this.props;
      let animation = status ? Animations[0] : Animations[1]

      return (
           <div className="col-md-12 pt-15">
             <Motion key={animation.name} defaultStyle={animation.defaultStyle} style={animation.style(this.state.config, status)}>
                {(value) =>(
              <div className="col-md-12" style={animation.render(value)}>
                <table className="table table-striped table-hover" style={{border:"1px solid #ddd", display:"nones"}}>
                        <thead>
                          <tr className="bg-primary">
                            <th>Teacher</th>
                            <th>Academic Year</th>
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
                                        <td>{year.teacher.name}</td>
                                        <td>{year.year.name}</td>
                                        <td>{this.renderTerms(year.terms, year)}</td>
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
