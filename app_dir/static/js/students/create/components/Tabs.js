// file: Tabs.js

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BioData from '../containers/BioData';
import Admission from '../containers/Admission';
import Parent from '../containers/Parents';
// import FinacialDetails from '../containers/FinacialDetails';
import FeeStructure from '../containers/FinacialQuery';

class Comp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            step: 1,
            disable: true
        };
    }

    static propTypes = {
        step: PropTypes.object.isRequired
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.step.id) {
            // this.setState({step:nextProps.step.id})
        }
    }

    render() {
        return (
            <div className="row col-md-12s">
                {this.props.step.id === 1 &&
                    <BioData />
                }
                {this.props.step.id === 2 &&
                    <Admission />
                }
                {this.props.step.id === 3 &&
                    <Parent />
                }
                {this.props.step.id === 4 &&
                    <FeeStructure year={this.props.student.academic_year} />
                }
            </div>);
    }
}

// Get apps state and pass it as props to Bio data
//      > whenever state changes, the UserList will automatically re-render
function mapStateToProps(state) {
    return {
        student: state.activeStudent,
        step: state.step
    };
}

export default connect(mapStateToProps)(Comp);
