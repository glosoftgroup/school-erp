import React from 'react';
import axios from 'axios';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import classnames from 'classnames';
import LaddaButton, { XL, SLIDE_UP } from 'react-ladda';
import {Motion, spring} from 'react-motion';
import Animations from './Animations';
import { MenuItem, DropdownButton } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setClass } from '../actions/visibilityStatus';
import LoaderHOC from './HOC/LoaderHOC';


class Classes extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
            config:{ stiffness: 120, damping: 20 },
            classes:[]
        };
    }

    componentWillMount() {
        this.setState({classes:this.props.classes})
    }

    goToSubjects = (cls) =>{
        this.props.setClass(cls)
        this.props.callBack(null, "subject")
    }


    render() {
      const {scale, status} = this.props;
      const {classes} = this.state;
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
                                        <th>Class Name</th>
                                        <th></th>
                                      </tr>
                                    </thead>
                                    <tbody id="tb">
                                        {
                                        Object.keys(classes).length !== 0
                                        ?
                                        (classes.map((cls, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{cls.name}</td>
                                                    <td><button className="btn btn-primary" onClick={()=>this.goToSubjects(cls)}>Load Subjects</button></td>
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

  const mapStateToProps = state => ({
        classes:state.see.term.classes
  })

  const matchDispatchToProps = dispatch => (
        bindActionCreators(
            {setClass: setClass},
            dispatch)
  )


export default LoaderHOC(connect(mapStateToProps, matchDispatchToProps)(Classes));