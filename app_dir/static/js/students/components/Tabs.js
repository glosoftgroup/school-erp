// file: Tabs.js

import React from 'react'
import {connect} from 'react-redux';
import BioData from '../containers/BioData';
import Admission from '../containers/Admission'
import Parent from '../containers/Parents'

class Comp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            step:1,
            disable:true
        }; 
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.step.id){
           // this.setState({step:nextProps.step.id}) 
        }       
    }

    render() {
        return (
            <div className="row col-md-12s">
              {this.props.step.id == 1 &&
                <BioData />
              }
              {this.props.step.id == 2 &&
                <Admission />
              }
              {this.props.step.id == 3 &&
                <Parent />
              }
            </div>)
            
    }
}

// Get apps state and pass it as props to Bio data
//      > whenever state changes, the UserList will automatically re-render
function mapStateToProps(state) {
    return {
        student: state.activeStudent,
        step: state.step
    }
}

export default connect(mapStateToProps)(Comp);