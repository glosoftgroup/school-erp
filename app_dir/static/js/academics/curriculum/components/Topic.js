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
      this.state = {
            id: Math.floor(Math.random() * 2000),
            name: '',
            period:'',
            subtopics:[],
            objectives:[],
            expectations:[],
            errors:{}

      }

      this.baseState = Object.assign({}, this.state)
    }



    componentDidMount(){
        var self = this;

        let data = [
            {"id": 1, "text": "Option 1", "value": "ha 1"},
            {"id": 2, "text": "Option 2", "value": "ha 2", "selected": true},
            {"id": 3, "text": "Option 3", "value": "ha 3", "disabled": true}
            ]
        $("#subtopics").select2({
            tags: true,
            width:"100%"
        }).on('change', function (e) {
            self.handleInputChange(e);
        })

        $("#objectives").select2({
            tags: true,
            width:"100%",
            data: data
        }).on('change', function (e) {
            self.handleInputChange(e);
        })

        $("#expectations").select2({
            tags: true,
            width:"100%",
            data: data
        }).on('change', function (e) {
            self.handleInputChange(e);
        })
    }

    resetForm = () => {
        this.setState(this.baseState)
        this.props.slideToggle()
    }

    handleInputChange = event =>{
        const name   =  event.target.name;
        let value    =  event.target.value;

        if(isEmpty(value)){
            this.state.errors[name] = "This field is required";
        }else{
            this.state.errors[name] = '';
            if(name == "subtopics" || name == "expectations" || name == "objectives"){
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

    validateInput = (data) =>  {
        let errs = {};

        if(Validator.isEmpty(data.name)){
            errs.name = "This field is required";
        }

        if(Validator.isEmpty(data.period)){
            errs.period = "This field is required";
        }

        if(Validator.equals(String(data.subtopics.length), "0")){
            errs.subtopics = "This field is required";
        }

        if(Validator.isEmpty(String(data.expectations.length), "0")){
            errs.expectations = "This field is required";
        }

        if(Validator.isEmpty(String(data.objectives.length), "0")){
            errs.objectives = "This field is required";
        }

        return {
            errs,
            isValid: isEmpty(errs)
        }
    }

    addTopic = (event) => {
        const { errs, isValid } = this.validateInput(this.state);

        if(isValid){
            let newTopicState = Object.assign({}, this.state)
            delete newTopicState.errors
            this.props.addTopicCallBack(newTopicState)
            this.resetForm()
            this.props.slideToggle()
        }else{
            this.setState({errors: errs });
            return;
        }

    }

    render() {
      const { errors } = this.state;
      return (
            <div className={this.props.status == true ? "col-md-12 animated slideInDown": "col-md-12 animate slideOutUp"} id="topic-div"
                            style={{display: this.props.status == true ? "": "none"}}>
                   <fieldset className="scheduler-border">
                       <legend className="scheduler-border">Topic</legend>
                       <div id="addTopicForm">
                           <div className="col-md-6">
                                <div className={classnames("form-group ", {"has-error": errors.name} )}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label className="text-bold">Name:<span className="text-danger">*</span></label>
                                            <input className="form-control" name="name" id="name"
                                                placeholder="Topic Name"
                                                type="text"
                                                value={this.state.name}
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
                                            <input className="form-control" name="period" id="period"
                                                placeholder="Period"
                                                type="text"
                                                value={this.state.period}
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
                                            <select multiple="multiple" id="subtopics" name="subtopics"
                                                    className="select-subtopics border-primary"
                                                    value={this.state.subtopics}
                                                    onChange={this.handleInputChange}>
                                            </select>
                                            {errors.subtopics && <span className="help-block">{errors.subtopics }</span>}
                                        </div>
                                    </div>
                                </div>
                           </div>
                           <div className="col-md-12">
                                <div className={classnames("form-group ", {"has-error": errors.objectives} )}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label className="text-bold">Objectives:<span className="text-danger">*</span></label>
                                            <select multiple="multiple" id="objectives" name="objectives"
                                                className="select-objectives border-warning select2-hidden-accessible"
                                                tabIndex="-1" aria-hidden="true"
                                                value={this.state.objectives}
                                                onChange={this.handleInputChange}>
                                            </select>
                                            {errors.objectives && <span className="help-block">{errors.objectives }</span>}
                                        </div>
                                    </div>
                                </div>
                           </div>
                           <div className="col-md-12">
                                <div className={classnames("form-group ", {"has-error": errors.expectations} )}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label className="text-bold">Expected Values:<span className="text-danger">*</span></label>
                                            <select multiple="multiple" id="expectations" name="expectations"
                                                className="select-expectations border-warning select2-hidden-accessible"
                                                tabIndex="-1" aria-hidden="true"
                                                value={this.state.expectations}
                                                onChange={this.handleInputChange}>
                                            </select>
                                            {errors.expectations && <span className="help-block">{errors.expectations }</span>}
                                        </div>
                                    </div>
                                </div>
                           </div>
                           <div className="text-left col-md-12">
                               <button id="cancel-topic-btn" type="button"
                               className="btn btn-danger legitRipple" onClick={this.resetForm}>
                                    Cancel
                                    <i className="icon-cross3 position-right"></i>
                                </button>
                                <button id="add-topic-btn" type="button"
                                    className="btn btn-primary legitRipple"
                                    onClick={this.addTopic}>
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