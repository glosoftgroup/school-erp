import React from 'react';
import axios from 'axios';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import classnames from 'classnames';
import LaddaButton, { XL, SLIDE_UP } from 'react-ladda';
import select2 from 'select2';
import 'select2/dist/css/select2.css';

import modal from 'bootstrap';
import { Modal, Button, FormGroup,  ControlLabel, FormControl} from 'react-bootstrap';


class TopicListComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          show: false,
          showDelete: false,
          examDetail:'',
          examName:'',
          examType:'',
          total:'',
          errors:{},
          percentage:false
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.catArray){
            for(let i=0;i<nextProps.catArray.length;i++){
                let v = "cat_"+nextProps.catArray[i]
                let value = this.state[v] ? this.state[v] : 0
                this.setState({[v]: value})
            }
        }

        if(nextProps.assignmentArray){
            for(let i=0;i<nextProps.assignmentArray.length;i++){
                let v = "assignment_"+nextProps.assignmentArray[i]
                let value = this.state[v] ? this.state[v] : 0
                this.setState({[v]: value})
            }
        }

        if(nextProps.examArray){
            for(let i=0;i<nextProps.examArray.length;i++){
                let v = "exam_"+nextProps.examArray[i]
                let value = this.state[v] ? this.state[v] : 0
                this.setState({[v]: value})
            }
        }
    }

    handleClose = () => {
        this.setState({ show: false, showDelete:false });
    }

    handleShow = () => {
        this.setState({ show: true });
    }

    showDeleteTopic = (exam, name, type) => {
        this.setState({ showDelete: true, examDetail: exam, examName: name, examType:type})
    }

    deleteTopic = () => {
        delete this.state[this.state.examType+"_"+this.state.examDetail]
        this.props.deleteTopicCallBack(this.state.examDetail, this.state.examType)
        this.setState({ showDelete: false})
    }

    handleInputChange = event =>{
        const name   =  event.target.name;
        let value    =  event.target.value;

        if(name=="percentage"){
            this.setState({percentage: !this.state.percentage})
            return;
        }

        if(isEmpty(value)){
            this.state.errors[name] = "This field is required";
        }else{
            this.state.errors[name] = '';
        }

        this.setState({
          [name]: value
        });

    }

    render() {
      const { config, catArray, assignmentArray, examArray } = this.props;
      const { errors } = this.state;

      return (
           <div className="col-md-12 pt-15">
              <div className="col-md-12">
                <table className="table-sm table-striped table-hover" style={{border:"1px solid #ddd", display:"nones"}}>
                        <thead>
                          <tr className="bg-primary">
                            <th>Exams</th>
                            <th>Marks</th>
                            <th>
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" className="styled control-warning"
                                        name="percentage"
                                        checked={this.state.percentage}
                                        value={this.state.percentage}
                                        onClick={this.handleInputChange}/>
                                        use percentage (%)
                                    </label>
                                </div>
                            </th>
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
                            assignmentArray.length > 0
                            ?
                            (assignmentArray.map((exam, index) => {
                                return (
                                    <tr key={index}>
                                        <td>Assignment {index+1}</td>
                                        <td>
                                            <input type="text" className="form-control"
                                                name={`assignment_${exam}`}
                                                value={this.state["assignment_"+(exam)]?this.state["assignment_"+(exam)]:""}
                                                onChange={this.handleInputChange}/>
                                        </td>
                                        <td>
                                            <Button className="btn btn-primary" type="button"
                                                onClick={()=>this.showDeleteTopic(exam, "Assignment "+(index+1), "assignment")}>
                                                DELETE
                                            </Button>

                                        </td>
                                    </tr>
                                )
                            }))
                            :(
                                <tr><td colSpan="2" className="text-center">No Assignments have been set</td></tr>
                            )
                        }
                        {

                            catArray.length > 0
                            ?
                            (catArray.map((exam, index) => {
                                return (
                                    <tr key={index}>
                                        <td>CAT {index+1}</td>
                                        <td>
                                            <input type="text" className="form-control"
                                            name={`cat_${exam}`}
                                            value={this.state["cat_"+(exam)]?this.state["cat_"+(exam)]:""}
                                            onChange={this.handleInputChange}

                                            />
                                        </td>
                                        <td>
                                            <Button className="btn btn-primary" type="button"
                                                onClick={()=>this.showDeleteTopic(exam, "CAT "+(index+1), "cat")}>
                                                DELETE
                                            </Button>

                                        </td>
                                    </tr>
                                )
                            }))
                            :(
                                <tr><td colSpan="2" className="text-center">No Cats have been set</td></tr>
                            )
                        }
                        {
                            examArray.length > 0
                            ?
                            (examArray.map((exam, index) => {
                                return (
                                    <tr key={index}>
                                        <td>Exam {index+1}</td>
                                        <td>
                                            <input type="text" className="form-control"
                                            name={`exam_${exam}`}
                                            value={this.state["exam_"+(exam)]?this.state["exam_"+(exam)]:""}
                                            onChange={this.handleInputChange}
                                            />
                                        </td>
                                        <td>
                                            <Button className="btn btn-primary" type="button"
                                                onClick={()=>this.showDeleteTopic(exam, "Exam "+(index+1),  "exam")}>
                                                DELETE
                                            </Button>

                                        </td>
                                    </tr>
                                )
                            }))
                            :(
                                <tr><td colSpan="2" className="text-center">No Exams have been set</td></tr>
                            )


                        }
                        <tr>
                            <td className="text-right"><span>Total Marks</span></td>
                            <td colSpan="2">
                                <input type="text" className="form-control"
                                name="total"
                                value={this.state.total}
                                onChange={this.handleInputChange}
                                />
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


  export default TopicListComponent;