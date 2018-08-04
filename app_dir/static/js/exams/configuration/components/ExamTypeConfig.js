/* eslint no-return-assign:0 */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import { checkInputErrors } from '../actions';
import Api from '../../../common/Api';
import Alert from '../../../common/Alert';
import Urls from '../constants/Urls';

class ExamTypeConfig extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            errors: {},
            disabled: true,
            examTypes: [],
            spanChecked: '',
            updateStatus: (window.location.href).includes('update')
        };
    }

    componentDidMount () {
        try {
            let self = this;
            let url = self.state.updateStatus ? Urls.updateUrl() : Urls.examTypeUrl();
            Api.retrieve(url).then(function(response) {
                let results = self.state.updateStatus ? response.data.exam_types : response.data.results;
                self.setState({examTypes: results}, () => {
                    if (results) {
                        results.map((exam, index) => {
                            let exm = `${'exam_' + index}`;
                            let checked = `${'exam_' + index + '_checked'}`;
                            let value = 0;
                            self.setState({[exm]: value, [checked]: ''});
                        });
                    }
                });
            }).catch(function(error) {
                Alert.error(error);
            });
        } catch (error) {
            Alert.error(error);
        }
    }
    checkBoxToggle = (event) => {
        let checkbox = document.getElementById(event.target.name);
        let spanId = checkbox.parentElement.id;
        let checkedValue = isEmpty(checkbox.parentElement.className) ? 'checked' : '';

        this.setState({ [spanId]: checkedValue });
    }
    handleInputChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        let errors = { ...this.state.errors };
        errors[name] = (!isEmpty(value) && !Validator.isFloat(value)) ? 'Only numbers required' : '';

        this.setState({ [name]: value, errors });
    }
    navigateToTab = (tabId) => {
        let self = this;
        self.props.handleTab(tabId);
        self.props.checkInputErrors();
    }

    renderExam = (exam, index) => {
        return (
            <div className="col-md-12" key={index}>
                <div className="col-md-4">
                    <div className="form-group pt-15s">
                        <div className="checkbox">
                            <label>
                                <div className="checker">
                                    <span id={'exam_' + index + '_checked'}
                                        className={this.state[('exam_' + index + '_checked')]}>
                                        <input id={'exam_' + index}
                                            name={'exam_' + index}
                                            className="styled" type="checkbox" value={true}
                                            onClick={this.checkBoxToggle}/>
                                    </span>
                                </div>
                                {exam.name} (s)
                            </label>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className={
                        classnames('form-group ',
                            {'has-error': this.state.errors[('exam_' + index)] ? this.state.errors[('exam_' + index)] : ''})}>
                        <label>
                            <input type="text" className="form-control"
                                name={'exam_' + index}
                                value={this.state[('exam_' + index)] ? this.state[('exam_' + index)] : ''}
                                disabled={this.state[('exam_' + index + '_checked')] === '' ? true : false}
                                onChange={this.handleInputChange}
                            />
                        </label>
                        {this.state.errors[('exam_' + index)] && <span className="help-block">{this.state.errors[('exam_' + index)] }</span>}
                    </div>
                </div>
            </div>
        );
    }
    renderExamTypes = () => {
        if (this.state.examTypes.length > 0) {
            return (
                <div>
                    {this.state.examTypes.length > 0 ? 
                        (this.state.examTypes.map((exam, index) => {
                            return (
                                this.renderExam(exam, index)
                            );
                        })) : (null)
                    }
                    <div className="col-md-12 mt-10">
                        <div className="col-md-12">
                            <button className="btn btn-primary pull-left"
                                type="button" onClick={ () => this.navigateToTab(3)}>
                                Set Exam Types Marks
                                <i className="icon-arrow-right14 position-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="col-md-12">
                    <h5 className="bg-slate-600 p-20 text-center text-bold">No Exam Settings</h5>
                </div>
            );
        }
    }

    render () {
        return (
            <div>
                {this.renderExamTypes()}
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        selectedData: state.selectedData
    };
};

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        checkInputErrors
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ExamTypeConfig);
