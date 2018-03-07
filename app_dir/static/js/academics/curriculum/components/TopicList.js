import React from 'react';
import axios from 'axios';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import classnames from 'classnames';
import LaddaButton, { XL, SLIDE_UP } from 'react-ladda';
import select2 from 'select2';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { Modal, Button, FormGroup,  ControlLabel, FormControl} from 'react-bootstrap';


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
          },
          errors:{},
          namedetails: '',
          perioddetails:'',
          subtopicsdetails:[],
          objectivesdetails:[],
          expectationsdetails:[],
        };
    }

    componentWillMount() {
    }
    componentDidMount(){
        $("#subtopicsdetails").select2({
            dropdownParent: $('.modal-backdrop'),
            tags: true,
            width:"100%"
        }).on('change', function (e) {
            self.handleInputChange(e);
        })

        $("#objectivesdetails").select2({
            tags: true,
            width:"100%"
        }).on('change', function (e) {
            self.handleInputChange(e);
        })

        $("#expectationsdetails").select2({
            tags: true,
            width:"100%"
        }).on('change', function (e) {
            self.handleInputChange(e);
        })
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

    handleInputChange = event =>{
        const name   =  event.target.name;
        let value    =  event.target.value;

        if(isEmpty(value)){
            this.state.errors[name] = "This field is required";
        }else{
            this.state.errors[name] = '';
            if(name == "subtopicsdetails" || name == "expectationsdetails" || name == "objectivesdetails"){
                var options = event.target.options;
                value = [];
                for (var i = 0, l = options.length; i < l; i++) {
                    if (options[i].selected) {
                      value.push(options[i].value);
                    }
                }
            }
        }

        this.setState({
          [name]: value
        });

    }

    handleOnChange (value) {
        console.log(value)
//		this.setState({ subtopicsdetails: value });
    }


    render() {
      const { topics } = this.props;
      const { errors } = this.state;
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
                                                EDIT
                                            </Button>

                                            <Button className="btn btn-primary" type="button"
                                                onClick={()=>this.showDeleteTopic(topic)}>
                                                DELETE
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

                <Modal show={this.state.show} onHide={this.handleClose} id="myModal">
                  <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <h4 className="text-center">{this.state.topicDetail.name}</h4>

                    <fieldset className="scheduler-border">
                       <legend className="scheduler-border">Topic</legend>
                       <div id="addTopicForm">
                           <div className="col-md-6">
                                <div className={classnames("form-group ", {"has-error": errors.name} )}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label className="text-bold">Name:<span className="text-danger">*</span></label>
                                            <input className="form-control" name="namedetails" id="namedetails"
                                                placeholder="Topic Name"
                                                type="text"
                                                value={this.state.topicDetail.name}
                                                onChange={this.handleInputChange}/>
                                                {errors.name && <span className="help-block">{errors.name }</span>}
                                        </div>
                                    </div>
                                </div>
                           </div>
                           <div className="col-md-6">
                                <div className={classnames("form-group ", {"has-error": errors.period} )}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label className="text-bold">Period of Compeletion:<span className="text-danger">*</span></label>
                                            <input className="form-control" name="perioddetails" id="perioddetails"
                                                placeholder="Period"
                                                type="text"
                                                value={this.state.topicDetail.period}
                                                onChange={this.handleInputChange}/>
                                                {errors.period && <span className="help-block">{errors.period }</span>}
                                        </div>
                                    </div>
                                </div>
                           </div>
                           <div className="col-md-12">
                                <div className={classnames("form-group ", {"has-error": errors.subtopics} )}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label className="text-bold">Sub-Topics:<span className="text-danger">*</span></label>
                                            <select multiple="multiple" id="subtopicsdetails" name="subtopicsdetailss"
                                                    className="select-subtopicsdetails border-primary">
                                            </select>
                                            {errors.subtopics && <span className="help-block">{errors.subtopics }</span>}
                                        </div>
                                    </div>
                                </div>
                           </div>

                           <Select.Creatable
                                name="subtopicsdetails"
                                multi={true}
                                value={this.state.subtopicsdetails}
                                onChange={this.handleOnChange}
                                options={[
                                  { value: 'one', label: 'One' },
                                  { value: 'two', label: 'Two' },
                                ]}
                              />

                       </div>
                   </fieldset>
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