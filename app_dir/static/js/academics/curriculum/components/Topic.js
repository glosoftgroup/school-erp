import React from 'react';
import axios from 'axios';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import classnames from 'classnames';
import LaddaButton, { XL, SLIDE_UP } from 'react-ladda';
import select2 from 'select2';


class TopicComponent extends React.Component {
    constructor(props) {
      super(props);
    }

    componentWillMount() {

    }
    componentDidMount(){

        let data = [
            {"id": 1, "text": "Option 1", "value": "ha 1"},
            {"id": 2, "text": "Option 2", "value": "ha 2", "selected": true},
            {"id": 3, "text": "Option 3", "value": "ha 3", "disabled": true}
            ]
        $("#subtopic").select2({
            tags: true,
            width:"100%",
            data: data
        }).on('change', function (e) {
        })

        $("#objectives").select2({
            tags: true,
            width:"100%",
            data: data
        }).on('change', function (e) {
        })

        $("#expectations").select2({
            tags: true,
            width:"100%",
            data: data
        }).on('change', function (e) {
        })
    }


    render() {
      return (
            <div className={this.props.status == true ? "col-md-12 animated slideInDown": "col-md-12 animate slideOutUp"} id="topic-div"
                            style={{display: this.props.status == true ? "": "none"}}>
                   <fieldset className="scheduler-border">
                       <legend className="scheduler-border">Topic</legend>
                       <div id="addTopicForm">
                           <div className="col-md-6">
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label className="text-bold">Name:<span className="text-danger">*</span></label>
                                            <input className="form-control" name="topic" id="topic" placeholder="Topic"
                                            type="text"/>
                                        </div>
                                    </div>
                                </div>
                           </div>
                           <div className="col-md-6">
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label className="text-bold">Period of Compeletion:<span className="text-danger">*</span></label>
                                            <input className="form-control" name="topic" id="topic" placeholder="Topic"
                                                   type="text"/>
                                        </div>
                                    </div>
                                </div>
                           </div>
                           <div className="col-md-12">
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label className="text-bold">Sub-Topics:<span className="text-danger">*</span></label>
                                            <select multiple="multiple" id="subtopic" name="subtopic"
                                                    className="select-subtopic border-primary">
                                                <option value="80">Colouring</option>
                                                <option value="80">ASDF</option>
                                                <option value="80">Colsfduring</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                           </div>
                           <div className="col-md-12">
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label className="text-bold">Objectives:<span className="text-danger">*</span></label>
                                            <select multiple="multiple" id="objectives" name="objectives"
                                                className="select-objectives border-warning select2-hidden-accessible"
                                                tabIndex="-1" aria-hidden="true">
                                                <option value="80">Colouring</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                           </div>
                           <div className="col-md-12">
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label className="text-bold">Expected Values:<span className="text-danger">*</span></label>
                                            <select multiple="multiple" id="expectations" name="expectations"
                                                className="select-expectations border-warning select2-hidden-accessible"
                                                tabIndex="-1" aria-hidden="true">
                                                <option value="80">Colouring</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                           </div>
                           <div className="text-left col-md-12">
                               <button id="cancel-topic-btn" type="button"
                               className="btn btn-danger legitRipple" onClick={this.props.slideToggle}>
                                    Cancel
                                    <i className="icon-cross3 position-right"></i>
                                </button>
                                <button id="add-topic-btn" type="submit" className="btn btn-primary legitRipple">
                                    Add Topic
                                    <i className="icon-arrow-right14 position-right"></i>
                                </button>
                           </div>
                       </div>
                   </fieldset>
               </div>

      );
    }
  }


  export default TopicComponent;