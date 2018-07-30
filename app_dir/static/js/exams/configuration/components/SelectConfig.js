import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from './Select';
import Urls from '../constants/Urls';
import { checkInputErrors } from '../actions';

class SelectConfig extends React.Component {
    static PropTypes = {
        handleSelectChange: PropTypes.func.isRequired
    };

    navigateToTab = (tabId) => {
        let self = this;
        self.props.handleTab(tabId);
        self.props.checkInputErrors();
    }

    render () {
        return (
            <div>
                <div className="col-md-12">
                    <div className="col-md-6">
                        <Select name='subject' selectUrl={Urls.subjectUrl()}
                            labelDisplayName="Subject"/>
                    </div>

                    <div className="col-md-6">
                        <Select name='academicclass' selectUrl={Urls.academicClassUrl()}
                            labelDisplayName="Academic Class"/>
                    </div>

                    <div className="col-md-6">
                        <Select name='term' selectUrl={Urls.termUrl()}
                            labelDisplayName="Term"/>
                    </div>

                    <div className="col-md-6">
                        <Select name='academicyear' selectUrl={Urls.academicYearUrl()}
                            labelDisplayName="Academic Year"/>
                    </div>

                </div>
                <div className="col-md-12 mt-10">
                    <div className="col-md-12">
                        <button className="btn btn-primary pull-left" type="button"
                            onClick={ () => this.navigateToTab(2)}>
                            Set Exam Types
                            <i className="icon-arrow-right14 position-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        selectData: state.selectData
    };
};

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        checkInputErrors
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectConfig);
