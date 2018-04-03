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


class Classes extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
            config:{ stiffness: 120, damping: 20 },
            term:{name:"Term 1", classes:["class 1", "class 2"]}
        };
    }

    componentWillMount() {
    }

    showAlert = (index) =>{
        this.props.callBack(null, "subject")
    }


    render() {
      const {scale, status} = this.props;
      const {term} = this.state;
      let animation = status ? Animations[0] : Animations[1]

      console.log(this.props.fetch)

      return (
           <div className="col-md-12 pt-15">
                  <Motion key={animation.name} defaultStyle={animation.defaultStyle} style={animation.style(this.state.config, status)}>
                    {
                      (value) =>
                            <div className="col-md-12" style={animation.render(value)}>
                               <table className="table table-striped table-hover" style={{border:"1px solid #ddd", display:"nones"}}>
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
                    }
                    </Motion>


            </div>
      );
    }
  }


  export default Classes;