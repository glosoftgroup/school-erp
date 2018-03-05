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
          topicDetail:{}
        };
    }

    componentWillMount() {

    }
    componentDidMount(){
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow = () => {
        this.setState({ show: true });
    }

    showTopicDetails = (topic) => {
        let tt  = Object.assign({}, topic)
        this.setState({ show: true, topicDetail: tt });
        console.log("topic "+topic)
        console.log("topicDetail "+this.state.topicDetail.subtopics)
        console.log("tt "+tt.subtopics)
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
                            topics.map((topic, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{topic.name}</td>
                                        <td>{topic.period}</td>
                                        <td>
                                            <Button className="btn btn-primary" type="button"
                                                onClick={()=>this.showTopicDetails(topic)}>
                                                edit({topic.id})
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                        </tbody>
                   </table>
                </div>

                <Modal show={this.state.show} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>{this.state.topicDetail.name}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <h4>Overflowing text to show scroll behavior</h4>
                    <p>
                      Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                      dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
                      ac consectetur ac, vestibulum at eros.
                    </p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.handleClose}>Close</Button>
                  </Modal.Footer>
                </Modal>

            </div>
      );
    }
  }


  export default TopicListComponent;