import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import Api from '../../../common/Api';
import Alert from '../../../common/Alert';
import Urls from '../constants/Urls';
import ExamTable from './ExamTable';
import ExamTotals from './ExamTotals';

class MarksConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render () {
        return (
            <div className="col-md-12">
                <div className="col-md-6">
                    <ExamTable />
                </div>

                <div className="col-md-6">
                    <ExamTotals />
                </div>
            </div>
        );
    }

}

let mapStateToProps = (state) => {
    return {};
};

let mapDisplatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDisplatchToProps)(MarksConfig);
