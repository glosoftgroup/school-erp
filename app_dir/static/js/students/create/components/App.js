import React from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';
import ImagePreview from '../containers/ImagePreview';
import Tabs from './Tabs';
import { ToastContainer, toast } from 'react-toastify';
import {selectStep} from '../actions/tab-step';
import {selectEditable} from '../actions/editable';

import 'react-tabs/style/react-tabs.css';
import '../css/styles.scss';
import '../css/avatar.styles.scss';
import '../css/breadcrumbs.scss';
import '../css/tabs.scss';

class CrudForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            step: 1,
            disable: true
        };
    }
    componentDidMount() {
        if (!pk) {
            this.editable();
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.student.id) {
            this.setState({disable: false});
        }
    }
    navigate = (step) => {
        if (!this.state.disable) {
            let tab = Object.assign({ 'id': step });
            this.props.selectStep(tab);
        } else {
            toast.error('Sorry! Add student bio details to proceed.', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    editable = () => {
        let editable = Object.assign({ 'editable': true });
        this.props.selectEditable(editable);
    }

    render() {
        var inputProps = {
            disabled: this.state.disable
        };
        return (
            <div className="row panel panel-default">
                <ToastContainer />

                <div className="col-md-2">
                    {(() => {
                        switch (this.props.editable.editable) {
                        case true: return;
                        default: return <button onClick={() => { this.editable(); } } className="mt-20 btn btn-sm bg-primary">Edit</button>
                        ;
                        }
                    })()}
                    <ImagePreview/>
                </div>
                <div className="col-md-10">
                    <div className="a">
                        <div className="panel-body">

                            {/* tabs */}
                            <div className="tab">
                                <div onClick={() => { this.navigate(1) ;}} className={classnames('tab-btn ', {'tab-active': this.props.step.id == 1})}> Bio Data</div>
                                <div onClick={() => { this.navigate(2); }} className={classnames('tab-btn ', {'tab-active': this.props.step.id == 2})}> Academic Admissions</div>
                                <div onClick={() => { this.navigate(3) ;}} className={classnames('tab-btn ', {'tab-active': this.props.step.id == 3})}> Parental Details</div>
                                <div onClick={() => { this.navigate(4) ;}} className={classnames('tab-btn ', {'tab-active': this.props.step.id == 4})}> Financial Details</div>

                            </div>
                            <div className="ilive-preview">
                                <Tabs/>
                            </div>
                            {/* /tabs */}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

// Get apps state and pass it as props to Bio data
//      > whenever state changes, the UserList will automatically re-render
function mapStateToProps(state) {
    return {
        editable: state.editable,
        student: state.activeStudent,
        step: state.step
    };
}

export default connect(mapStateToProps, {selectStep, selectEditable})(CrudForm);
