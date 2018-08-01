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
import SelectConfig from './SelectConfig';
import { Tab, Col, Nav, NavItem, Row } from 'react-bootstrap';
import ExamType from './ExamType';
import ExamTypeConfig from './ExamTypeConfig';
import MarksConfig from './MarksConfig';
import { ToastContainer } from 'react-toastify';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            key: 1
        };
    }

    handleTab = (key) => {
        // const { errs } = this.validateInput(this.state);
        /* topics not needed for the first tab */
        /* remember to uncomment */

        // if (!isEmpty(errs)) {
        //     this.setState({
        //         key: 1,
        //         errors: errs
        //     });
        //     Alert.error('set the subject, class, year and term');
        //     return;
        // }
        this.setState({ key });
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }

    render () {
        const { key } = this.state;

        return (
            <div>
                <form encType="multipart/form-data" id="addForm" onSubmit={this.handleSubmit}>
                    <Tab.Container id="tabs-with-dropdown" activeKey={key} onSelect={this.handleTab}>
                        <Row className="clearfix">
                            <Col sm={12}>
                                <Nav bsStyle="tabs" className="nav-tabs-highlight">
                                    <NavItem eventKey={1}>Set (Subject, Class, Year and Term)</NavItem>
                                    <NavItem eventKey={2}>Set Exam Types</NavItem>
                                    <NavItem eventKey={3}>Add Exam Types Marks</NavItem>
                                </Nav>
                            </Col>
                            <Col sm={12}>
                                <Tab.Content animation>
                                    <Tab.Pane eventKey={1}>
                                        <SelectConfig handleTab={this.handleTab} />
                                    </Tab.Pane>

                                    <Tab.Pane eventKey={2}>
                                        <ExamTypeConfig handleTab={this.handleTab} />
                                    </Tab.Pane>

                                    <Tab.Pane eventKey={3}>
                                        <MarksConfig />
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
                <ToastContainer />
            </div>
        );
    }
}

export default App;
