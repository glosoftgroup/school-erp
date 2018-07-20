import React from 'react';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import classnames from 'classnames';
import TopicComponent from './Topic';
import TopicListComponent from './TopicList';
import MiniModal from './Modal';
import Api from '../../../common/Api';
import Alert from '../../../common/Alert';
import Urls from '../constants/Urls';
import { Tab, Col, Nav, NavItem, Row } from 'react-bootstrap';

class CrudForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            subject: '',
            academicyear: '',
            academicclass: '',
            errors: {},
            topics: [],
            config: [],
            showModal: false,
            term: '',
            assignmentArray: [],
            catArray: [],
            examArray: [],
            total_marks: '',
            pass_marks: '',
            is_percentage: 'false',
            updateStatus: (window.location.href).includes('update'),
            key: 1
        };
    }

    componentWillMount () {
        var self = this;
        if (self.state.updateStatus) {
            Api.retrieve(Urls.updateUrl()).then(function(response) {
                console.log(response.data);
            }).catch(function(error) {
                console.log(error);
            });
        }
    }

    componentDidMount () {
        let self = this;
        if (self.state.updateStatus) {
            Api.retrieve(Urls.updateUrl()).then(function(response) {
                /* 1. subject data */
                let subjectData = response.data.subject;
                self.state.subject = subjectData.id;
                $('#subject').append(
                    new Option(subjectData.name, subjectData.id, true, true)
                ).trigger('change');
                /* 2. academic class data */
                let classData = response.data.academicclass;
                self.state.academicclass = classData.id;
                $('#academicclass').append(
                    new Option(classData.name, classData.id, true, true)
                ).trigger('change');
                /* 3. term data */
                let termData = response.data.term;
                self.state.term = termData.id;
                $('#term').append(
                    new Option(termData.name, termData.id, true, true)
                ).trigger('change');
                /* 4. academic year data */
                let academicData = response.data.academicyear;
                self.state.academicyear = academicData.id;
                $('#academicyear').append(
                    new Option(academicData.name, academicData.id, true, true)
                ).trigger('change');
            }).catch(function(error) {
                console.log(error);
                Alert.error('Error fetching exam details');
            });
        }

        this.initializeSelect2('#subject', Urls.subjectUrl());
        this.initializeSelect2('#academicyear', Urls.academicYearUrl());
        this.initializeSelect2('#academicclass', Urls.academicClassUrl());
        this.initializeSelect2('#term', Urls.termUrl());
    }

    initializeSelect2 = (id, url) => {
        let self = this;
        $(id).select2({
            width: '100%',
            formatSelection: function(item) { return item.name; },
            formatResult: function(item) { return item.name; },
            ajax: {
                url: function (params) {
                    return url + '?' + params.term;
                },
                processResults: function (data) {
                    data = data.results;
                    return {
                        results:
                            data.map(function(item) {
                                return {
                                    id: item.id,
                                    text: (id.includes('academicclass')) ? 'class ' + item.class_group : item.name
                                };
                            }
                            )
                    };
                }
            },
            debug: true,
            delay: 250
        }).on('change', function (e) {
            self.handleInputChange(e);
        });
    }

    handleInputChange = event => {
        const name = event.target.name;
        let value = event.target.value;
        let errors = { ...this.state.errors };

        if (isEmpty(value)) {
            errors[name] = 'This field is required';
            this.setState({errors});
        } else {
            errors[name] = '';
            this.setState({errors});
        }

        this.setState({
            [name]: value
        });
    }

    slideToggle = () => {
        this.setState({visible: !this.state.visible});
    }

    getPassCallBack = (isPercentage, totals, passMarks) => {
        this.setState({
            is_percentage: isPercentage,
            total_marks: totals,
            pass_marks: passMarks
        });
    }

    addConfigCallBack = (examsFromChild) => {
        this.setState({config: examsFromChild});
        Alert.success('Settings saved successfully');
    }

    addTopicCallBack = (topicFromChild) => {
        let topics = this.state.topics;
        console.log(topicFromChild);
        topics.push(topicFromChild);
        let v = [];
        for (let i = 0; i < topicFromChild.cat; i++) {
            v.push(i + 1);
        }

        let v2 = [];
        for (let i = 0; i < topicFromChild.assignment; i++) {
            v2.push(i + 1);
        }

        let v3 = [];
        for (let i = 0; i < topicFromChild.exam; i++) {
            v3.push(i + 1);
        }
        this.setState({topics: topics, catArray: v, assignmentArray: v2, examArray: v3});
        let errors = {...this.state.errors};
        errors['topics'] = '';
        this.setState({errors});
        Alert.success('Number of exams added successfully');
    }

    deleteTopicCallBack = (exam, type) => {
        let assignmentArray = this.state.assignmentArray;
        let catArray = this.state.catArray;
        let examArray = this.state.examArray;

        if (type === 'assignment') {
            this.state.assignmentArray.splice(assignmentArray.indexOf(exam), 1);
            this.setState({assignmentArray: this.state.assignmentArray});
        }
        if (type === 'cat') {
            this.state.catArray.splice(catArray.indexOf(exam), 1);
            this.setState({catArray: this.state.catArray});
        }
        if (type === 'exam') {
            this.state.examArray.splice(examArray.indexOf(exam), 1);
            this.setState({examArray: this.state.examArray});
        }
    }

    handleSubjectCallBack = (subject) => {
        let subjectData = {'id': subject.id, 'text': subject.name};
        let oldState = {...this.state};
        oldState['subject'] = subject.id;
        this.setState({state: oldState});
        // this.state.subject = subject.id;

        let option = new Option(subject.name, subject.id, true, true);
        $('#subject').append(option).trigger('change');
        $('#subject').trigger({
            type: 'select2:select',
            params: {
                data: subjectData
            }
        });
    }

    validateInput = (data) => {
        let errs = {};
        if (Validator.isEmpty(data.subject)) {
            errs.subject = 'This field is required';
        }
        if (Validator.isEmpty(data.term)) {
            errs.term = 'This field is required';
        }
        if (Validator.isEmpty(data.academicyear)) {
            errs.academicyear = 'This field is required';
        }
        if (Validator.isEmpty(data.academicclass)) {
            errs.academicclass = 'This field is required';
        }
        if (Validator.equals(String(data.topics.length), '0')) {
            errs.topics = 'This field is required';
        }

        return {
            errs,
            isValid: isEmpty(errs)
        };
    }

    handleSubmit = event => {
        event.preventDefault();
        const { errs, isValid } = this.validateInput(this.state);

        if (!isValid || !this.state.config.length) {
            this.setState({errors: errs});
            Alert.error('Exam settings are incomplete');
            return;
        }

        const data = new FormData();
        data.append('subject', this.state.subject);
        data.append('academicyear', this.state.academicyear);
        data.append('academicclass', this.state.academicclass);
        data.append('term', this.state.term);
        data.append('total_marks', this.state.total_marks);
        data.append('pass_marks', this.state.pass_marks);
        data.append('is_percentage', this.state.is_percentage);
        data.append('exams', JSON.stringify(this.state.config));

        if (this.state.updateStatus) {
            Api.update(Urls.updateUrl(), data)
                .then(function(response) {
                    Alert.success('Data sent successfully', 'Well Done!');
                    console.log(response);
                    // window.location.href = Urls.redirectUrl();
                }).catch(function(error) {
                    Alert.error(error);
                    console.log(error);
                });
        } else {
            Api.create(Urls.createUrl(), data)
                .then(function (response) {
                    Alert.success('Data sent successfully', 'Well Done!');
                    window.location.href = Urls.redirectUrl();
                })
                .catch(function (error) {
                    console.log(error);
                    Alert.error('Exam Setting already Exists');
                });
        }
    }

    showSubjectModal = () => {
        this.setState({showModal: true});
    }

    handleHideModal = () => {
        this.setState({showModal: false});
    }

    handleShowModal = () => {
        this.setState({showModal: true});
    }

    handleTab = (key) => {
        const { errs } = this.validateInput(this.state);
        /* topics not needed for the first tab */
        delete errs['topics'];

        if (!isEmpty(errs)) {
            this.setState({
                key: 1,
                errors: errs
            });
            Alert.error('set the subject, class, year and term')
            return;
        }
        this.setState({ key });
    }

    render () {
        const { errors, key } = this.state;

        return (
            <div>
                <form encType="multipart/form-data" id="addForm" onSubmit={this.handleSubmit}>
                    <Tab.Container id="tabs-with-dropdown" activeKey={key} onSelect={this.handleTab}>
                        <Row className="clearfix">
                            <Col sm={12}>
                                <Nav bsStyle="tabs" className="nav-tabs-highlight">
                                    <NavItem eventKey={1}>Set (Subject, Class, Year and Term)</NavItem>
                                    <NavItem eventKey={2}>Set Exam Types and Marks</NavItem>
                                </Nav>
                            </Col>
                            <Col sm={12}>
                                <Tab.Content animation>
                                    <Tab.Pane eventKey={1}>
                                        <div className="col-md-12">
                                            <div className="col-md-6">
                                                <div className={
                                                    classnames('form-group ',
                                                        {'has-error': errors.subject})}>
                                                    <div className="row">
                                                        <div className="col-md-12s">
                                                            <label className="text-bold pl-10">Subject Name:
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <div className="input-group">
                                                                <div className="col-md-12" id="subjects">
                                                                    <select name="subject" id="subject"
                                                                        className="sel" value={this.state.subject}
                                                                        onChange={this.handleInputChange}>
                                                                        <option value="">select subject</option>
                                                                    </select>
                                                                </div>
                                                                {errors.subject && <span className="help-block">{errors.subject}</span>}

                                                                <div className="input-group-btn">
                                                                    <button type="button" className="btn bg-slate-700 btn-icon legitRipple modal-trigger edit-btn"
                                                                        data-ta="#subject_modal_instance"
                                                                        data-title="Add New Subject"
                                                                        data-select="#academicyears"
                                                                        data-href="subject/api/create/url"
                                                                        data-cat="name" data-label="Subject Name:"
                                                                        onClick={this.showSubjectModal}>
                                                                        <i className="icon-plus-circle2"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className={
                                                    classnames('form-group ',
                                                        {'has-error': errors.academicclass})}>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <label className="text-bold">Academic Class Group:<span className="text-danger">*</span></label>
                                                            <div className="classes" id="academicclasss">
                                                                <select name="academicclass" id="academicclass"
                                                                    className="sel" value={this.state.academicclass}
                                                                    onChange={this.handleInputChange}>
                                                                    <option value="">select academic class</option>
                                                                </select>
                                                            </div>
                                                            {errors.academicclass && <span className="help-block">{errors.academicclass}</span>}

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className={
                                                    classnames('form-group ',
                                                        {'has-error': errors.term})}>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <label className="text-bold">Term:
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <div>
                                                                <div id="terms">
                                                                    <select name="term" id="term"
                                                                        className="sel" value={this.state.term}
                                                                        onChange={this.handleInputChange}>
                                                                        <option value="">select term</option>
                                                                    </select>
                                                                </div>
                                                                {errors.term && <span className="help-block">{errors.term }</span>}

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className={
                                                    classnames('form-group ',
                                                        {'has-error': errors.academicyear})}>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <label className="text-bold">Academic Year:
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <div>
                                                                <div id="academicyears">
                                                                    <select name="academicyear" id="academicyear"
                                                                        className="sel" value={this.state.academicyear}
                                                                        onChange={this.handleInputChange}>
                                                                        <option value="">select academic year</option>
                                                                    </select>
                                                                </div>
                                                                {errors.academicyear && <span className="help-block">{errors.academicyear }</span>}

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-md-12 mt-10">
                                            <div className="col-md-12">
                                                <button className="btn btn-primary pull-left" type="button" onClick={ () => this.handleTab(2)}>
                                                    Set Exam Types <i className="icon-arrow-right14 position-right"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey={2}>
                                        <TopicComponent status={this.state.visible}
                                            slideToggle={this.slideToggle}
                                            topics={this.state.topics}
                                            addTopicCallBack={this.addTopicCallBack} />

                                        <div className={classnames({'has-error': errors.academicyear})}>
                                            <TopicListComponent topics={this.state.topics}
                                                deleteTopicCallBack={this.deleteTopicCallBack}
                                                config={this.state.config}
                                                catArray={this.state.catArray}
                                                assignmentArray={this.state.assignmentArray}
                                                examArray={this.state.examArray}
                                                addConfigCallBack={this.addConfigCallBack}
                                                getPassCallBack={this.getPassCallBack} />
                                            <div className="col-md-12">
                                                <div className="col-md-12">
                                                    {errors.topics && <span className="help-block">
                                                        {errors.topics }</span>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-10">
                                            <div className="col-md-12">
                                                <button className="btn btn-primary pull-left" type="submit">
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </form>

                {this.state.showModal ? (
                    <MiniModal handleHideModal={this.handleHideModal}
                        handleSubjectCallBack={this.handleSubjectCallBack}
                    />) : null}

            </div>
        );
    }
}

export default CrudForm;
