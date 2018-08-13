import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import Api from '../../../common/Api';
import Alert from '../../../common/Alert';
import Urls from '../constants/Urls';
import {addExamAndValue, setExamMarks} from '../actions/index';

class ExamTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            updateStatus: (window.location.href).includes('update')
        };
    }

    componentDidMount() {
        /* try {
            let self = this;
            let url = self.state.updateStatus ? Urls.updateUrl() : Urls.examTypeUrl();
            Api.retrieve(url).then(function(response) {
                let results = self.state.updateStatus ? response.data.exam_types : response.data.results;
                self.setState({examTypes: results}, () => {
                    if (results) {
                        results.map((exam, index) => {
                            let checked = `${'exam_' + index + '_checked'}`;
                            let value = 0;
                            self.setState({[exam.name]: value, [checked]: ''});
                        });
                    }
                });
            }).catch(function(error) {
                Alert.error(error);
            });
        } catch (error) {
            Alert.error(error);
        } */
    }

    handleInputChange = (event) => {
        let self = this;
        let name = event.target.name;
        let value = event.target.value;
        let errors = { ...self.state.errors };
        errors[name] = (!isEmpty(value) && !Validator.isFloat(value)) ? 'Only numbers required' : '';

        self.setState({
            [name]: value,
            errors
        });

        self.props.setExamMarks({[name]: value});
    }

    removeExam = (index) => {
        console.log(index);
        // this.props.removeExam(index);
    }
    render () {
        let self = this;
        let exams = self.props.ExamConfig.examList;

        return (
            <div className="col-md-12">
                <table className="col-md-12 table-sm table-striped table-hover fixed_header">
                    <thead>
                        <tr className="bg-slate-700 col-md-12">
                            <th className="col-md-3">Exams</th>
                            <th className="col-md-6">Marks</th>
                            <th className="col-md-3"></th>
                        </tr>
                    </thead>
                    <tbody id="tb">
                        <tr className="col-md-12 text-center" style={{display: 'none'}}>
                            <td colSpan="3" className="col-md-3 text-center">
                                <div className="pace-demo">
                                    <div className="theme_xbox">
                                        <div className="pace_progress" data-progress-text="60%" data-progress="60">
                                        </div>
                                        <div className="pace_activity"></div>
                                    </div>
                                </div>
                            </td>
                        </tr>

                        {
                            exams.length > 0 ? (exams.map((exam, index) => {
                                return (
                                    <tr key={index} className="col-md-12">
                                        <td className="col-md-3">{exam}</td>
                                        <td className="col-md-6">
                                            <div className={classnames('form-group ', {'has-error': self.state.errors[exam] ? self.state.errors[exam] : ''})}>
                                                <label>
                                                    <input type="text"
                                                        className="form-control"
                                                        name={exam}
                                                        value={self.state[exam]}
                                                        onChange={self.handleInputChange}
                                                    />
                                                </label>
                                                {self.state.errors[exam] && <span className="help-block">{self.state.errors[exam] }</span>}
                                            </div>
                                        </td>
                                        <td className="col-md-3">
                                            <button className="btn bg-slate-700" type="button"
                                                onClick={() => self.removeExam(exam)}>
                                                <i className="icon-x"></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })) : (
                                <tr className="col-md-12">
                                    <td className="col-md-12">No Exams</td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        ExamConfig: state.ExamConfig
    };
};

let mapDisplatchToProps = (dispatch) => {
    return bindActionCreators({ 
        addExamAndValue,
        setExamMarks
    }, dispatch);
};

export default connect(mapStateToProps, mapDisplatchToProps)(ExamTable);
