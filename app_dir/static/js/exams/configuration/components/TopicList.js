import React from 'react';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import 'select2/dist/css/select2.css';
import { Modal, Button } from 'react-bootstrap';
import Alert from '../../../common/Alert';
import Urls from '../constants/Urls';
import Api from '../../../common/Api';
import '../../../../scss/exams/table.scss';
import ExamType from './ExamType';

class TopicListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            showDelete: false,
            examDetail: '',
            examName: '',
            examType: '',
            total: '0',
            pass: '0',
            errors: {},
            percentage: false,
            updateStatus: (window.location.href).includes('update')
        };
    }

    componentWillMount () {
        var self = this;
        if (self.state.updateStatus) {
            Api.retrieve(Urls.updateUrl()).then(function(response) {
                console.log('in the topic list');
                console.log(response.data);
                console.log(typeof response.data.exam_settings.assignments);
            }).catch(function(error) {
                console.log(error);
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.catArray) {
            for (let i = 0; i < nextProps.catArray.length; i++) {
                let v = 'cat_' + nextProps.catArray[i];
                let value = this.state[v] ? this.state[v] : 0;
                this.setState({[v]: value});
            }
        }

        if (nextProps.assignmentArray) {
            for (let i = 0; i < nextProps.assignmentArray.length; i++) {
                let v = 'assignment_' + nextProps.assignmentArray[i];
                let value = this.state[v] ? this.state[v] : 0;
                this.setState({[v]: value});
            }
        }

        if (nextProps.examArray) {
            for (let i = 0; i < nextProps.examArray.length; i++) {
                let v = 'exam_' + nextProps.examArray[i];
                let value = this.state[v] ? this.state[v] : 0;
                this.setState({[v]: value});
            }
        }
    }

    handleClose = () => {
        this.setState({ show: false, showDelete: false });
    }

    deleteTopic = () => {
        delete this.state[this.state.examType + '_' + this.state.examDetail];
        this.props.deleteTopicCallBack(this.state.examDetail, this.state.examType);
        this.setState({ showDelete: false });
    }

    percentageToggle = event => {
        const name = event.target.name;
        // let value = event.target.value;
        if (name === 'percentage') {
            this.setState({percentage: !this.state.percentage});
            if (!this.state.percentage) {
                let exams = [];
                for (const field in ExamType.refs) {
                    if (ExamType.refs[field].value !== 0) {
                        let ex = {};
                        ex['name'] = ExamType.refs[field].name;
                        ex['value'] = ExamType.refs[field].value;
                        exams.push(ex);
                    }
                }
                this.props.addConfigCallBack(exams);
            }
        }
    }

    handleInputChange = event => {
        const name = event.target.name;
        let value = event.target.value;
        const re = /^[0-9\b]+$/;
        let errors = { ...this.state.errors };
        if (isEmpty(value)) {
            errors[name] = 'This field is required';
            this.setState({errors});
        } else {
            errors[name] = '';
            this.setState({errors});
        }
        if (re.test(value)) {
            let total = (this.state.total - parseInt(this.state[name])) + parseInt(value);
            this.setState({
                [name]: value,
                total: total
            });
        }
    }

    handlePassMarkChange = event => {
        const name = event.target.name;
        let value = event.target.value;
        let val = parseInt(value);
        /* test */
        if (isNaN(val)) {
            this.setState({ [name]: '' });
        } else {
            this.setState({[name]: value});
        }
    }

    onKeyDown = (event) => {
        let keyCode = event.keyCode;
        const name = event.target.name;
        let value = event.target.value;

        if (value === '') { value = 0; }
        if (keyCode === 8 || keyCode === 46) {
            let total = this.state.total - parseInt(value)
            this.setState({
                [name]: 0,
                total: total
            });
        }
    }

    saveConfig = () => {

        console.log('*** ExamType.refs ***');
        console.log(ExamType.refs);
        console.log('*** ExamType.refs ***');
        if (this.state.percentage === true) {
            let totalmarks = 0;
            for (const field in ExamType.refs) {
                let value = ExamType.refs[field].value;
                totalmarks += parseInt(value);
            }

            if (totalmarks > 100) {
                Alert.error('Should be less than or a hundred');
                return;
            } else if (totalmarks < 50) {
                Alert.error('Should more than half percentage');
                return;
            } else {
                Alert.success('Settings saved successfully');
            }
        }

        let exams = [];
        for (const field in ExamType.refs) {
            if (ExamType.refs[field].value !== 0) {
                let ex = {};
                ex['name'] = ExamType.refs[field].name;
                ex['value'] = ExamType.refs[field].value;
                exams.push(ex);
            }
        }

        if (exams.length === 0) {
            Alert.error('No exams Settings');
            return;
        }

        this.props.addConfigCallBack(exams);
        this.props.getPassCallBack(this.state.percentage, this.state.total, this.state.pass);
    }

    dummyHandler = (event) => {
        console.log(event.target.value);
    }

    render () {
        const { catArray, assignmentArray, examArray } = this.props;

        return (
            <div className="col-md-6 pt-15">
                <div className="col-md-12">
                    <table className="col-md-12s table-sm table-striped table-hover fixed_header">
                        <thead>
                            <tr className="bg-slate-700">
                                <th>Exams</th>
                                <th>Marks</th>
                                <th>
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" className="control-info"
                                                name="percentage"
                                                checked={this.state.percentage}
                                                value={this.state.percentage}
                                                onClick={this.percentageToggle}/>
                                                use percentage (%)
                                        </label>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody id="tb">
                            <tr className="text-center" style={{display: 'none'}}>
                                <td colSpan="3" className="text-center">
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
                                assignmentArray.length > 0 ? (assignmentArray.map((exam, index) => {
                                    return (
                                        <ExamType key={index} exam={exam} index={index}
                                            type='assignment'
                                            handleInputChange={this.handleInputChange}
                                            onKeyDown={this.onKeyDown}
                                        />
                                    );
                                })) : (<tr><td colSpan="3" className="text-left">No Assignments have been set</td></tr>)
                            }

                            {
                                catArray.length > 0 ? (catArray.map((exam, index) => {
                                    return (
                                        <ExamType key={index} exam={exam} index={index}
                                            type='cat'
                                            handleInputChange={this.handleInputChange}
                                            onKeyDown={this.onKeyDown}
                                        />
                                    );
                                })) : (<tr><td colSpan="3" className="text-left">No Cats have been set</td></tr>)
                            }

                            {
                                examArray.length > 0 ? (examArray.map((exam, index) => {
                                    return (
                                        <ExamType key={index} exam={exam} index={index}
                                            type='exam'
                                            handleInputChange={this.handleInputChange}
                                            onKeyDown={this.onKeyDown}
                                        />
                                    );
                                })) : (<tr><td colSpan="3" className="text-left">No Exams have been set</td></tr>)
                            }

                        </tbody>
                    </table>
                </div>
                <div className="col-md-12 mt-10">
                    <table className="col-md-12 table-xs table-striped" style={{border: '1px solid #ddd'}}>
                        <tbody>
                            <tr>
                                <td>Total Marks</td>
                                <td colSpan="2">
                                    <input type="text" className="form-control"
                                        name="total"
                                        value={this.state.total}
                                        onChange={this.dummyHandler}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td>Pass Marks</td>
                                <td colSpan="2">
                                    <input type="text" className="form-control"
                                        name="pass"
                                        value={this.state.pass}
                                        onChange={this.handlePassMarkChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="3">
                                    <button type="button" className="btn bg-slate-800 pull-right"
                                        onClick={this.saveConfig}>
                                        Save
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Modal show={this.state.showDelete} onHide={this.handleClose}>
                    <Modal.Header closeButton className="bg-primary">
                        <Modal.Title className="text-center">{this.state.examName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4 className="text-center">Delete Exam {this.state.examName}</h4>
                        <p className="text-center">
                            Are you sure?.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="pull-left" onClick={this.handleClose}>Close</Button>
                        <Button bsStyle="danger" className="pull-right" onClick={this.deleteTopic}>OK</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

TopicListComponent.propTypes = {
    catArray: PropTypes.array,
    assignmentArray: PropTypes.array,
    examArray: PropTypes.array,
    deleteTopicCallBack: PropTypes.func,
    addConfigCallBack: PropTypes.func,
    getPassCallBack: PropTypes.func
};

export default TopicListComponent;
