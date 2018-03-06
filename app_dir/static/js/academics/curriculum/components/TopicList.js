import React from 'react';
import axios from 'axios';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import classnames from 'classnames';
import LaddaButton, { XL, SLIDE_UP } from 'react-ladda';
import select2 from 'select2';
import { Modal, Button } from 'react-bootstrap';


class TopicListComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          show: false,
          showDelete: false,
          topicDetail:{
            id:'',
            name: '',
            period:'',
            subtopics:[],
            objectives:[],
            expectations:[]
          }
        };
    }

    componentWillMount() {

    }
    componentDidMount(){
    }

    handleClose = () => {
        this.setState({ show: false, showDelete:false });
    }

    handleShow = () => {
        this.setState({ show: true });
    }

    showTopicDetails = (topic) => {
        this.setState({
            show: true,
            topicDetail:{
                id: topic.id,
                name: topic.name,
                period: topic.period,
                subtopics: topic.subtopics,
                objectives: topic.objectives,
                expectations: topic.expectations
            }
        })
    }

    showDeleteTopic = (topic) => {
        let tt = Object.assign({}, this.state.topicDetail, topic)
        this.setState({ showDelete: true, topicDetail: tt})
    }

    deleteTopic = (topic) => {
        this.props.deleteTopicCallBack(this.state.topicDetail)
        this.setState({ showDelete: false})
    }


    render() {
      const { topics } = this.props;
      let _this = this;
      return (
           <div className="col-md-12">
              <div className="col-md-12">
                <table className="table room-striped room-hover dataroom-header-footer" style={{border:"1px solid #ddd"}}>
                        <thead>
                          <tr className="bg-primary">
                            <th>Topic</th>
                            <th>Compeletion Period</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody id="tb">
                        <tr className="text-center" style={{display:"none"}}>
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
                            topics.length > 0
                            ?
                            (topics.map((topic, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{topic.name}</td>
                                        <td>{topic.period}</td>
                                        <td>

                                            <Button className="btn btn-primary" type="button"
                                                onClick={()=>this.showTopicDetails(topic)}>
                                                EDIT({topic.id})
                                            </Button>

                                            <Button className="btn btn-primary" type="button"
                                                onClick={()=>this.showDeleteTopic(topic)}>
                                                DELETE({topic.id})
                                            </Button>

                                        </td>
                                    </tr>
                                )
                            }))
                            :(
                                <tr><td colSpan="2" className="text-center">No Topics Available</td></tr>
                            )


                        }
                        </tbody>
                   </table>
                </div>

                <Modal show={this.state.show} onHide={this.handleClose}>
                  <Modal.Header closeButton>

                    <Modal.Title>{this.state.topicDetail.name}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <h4 className="text-center">Topic Details</h4>
                    <p>
                      Topic Details below.
                    </p>
                    <p>
                        {
                            this.state.topicDetail.subtopics.map((sub, index) => {
                                return (
                                    <li key={index}>{sub}</li>
                                )
                            })
                        }
                    </p>

                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.handleClose}>Close</Button>
                  </Modal.Footer>
                </Modal>

                <Modal show={this.state.showDelete} onHide={this.handleClose}>
                  <Modal.Header closeButton className="bg-primary">
                    <Modal.Title className="text-center">adsa</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <h4 className="text-center">Delete Topic {this.state.topicDetail.name}</h4>
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


  export default TopicListComponent;