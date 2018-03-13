import React from 'react';
import axios from 'axios';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import classnames from 'classnames';
import LaddaButton, { XL, SLIDE_UP } from 'react-ladda';
import TopicComponent from './Topic';
import TopicListComponent from './TopicList';
import MiniModal from './Modal';
import select2 from 'select2';
import {jGrowl} from 'jgrowl';
import modal from 'bootstrap';

class CrudForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        visible:false,
        subject:'',
        academicyear:'',
        academicclass:'',
        errors:{},
        topics:[],
        showModal:false
      }

    }

    componentWillMount(){
        if(pk){
            this.state.topics = objectTopics
        }
    }
    componentDidMount(){
        let self = this
        if(pk){
            //subject
            let subjectData = {"id": objectSubjectId, "text": objectSubject}
            this.state.subject = objectSubjectId
            let option = new Option(objectSubject, objectSubjectId, true, true)
            $('#subject').append(option).trigger('change')
             $('#subject').trigger({
                type:'select2:select',
                params:{
                    data:subjectData
                }
             });

             //academic class
            let classData = {"id": objectClassId, "text": objectClass}
            this.state.academicclass = objectClassId
            let option2 = new Option(objectClass, objectClassId, true, true)
            $('#academicclass').append(option2).trigger('change')
             $('#subject').trigger({
                type:'select2:select',
                params:{
                    data:classData
                }
             });

             //academic year
            let academicData = {"id": objectAcademicId, "text": objectAcademic}
            this.state.academicyear = objectAcademicId
            let option3 = new Option(objectAcademic, objectAcademicId, true, true)
            $('#academicyear').append(option3).trigger('change')
             $('#subject').trigger({
                type:'select2:select',
                params:{
                    data:academicData
                }
             });
        }


        $('#subject').select2({
            width:'100%',
            formatSelection: function(item){return item.name},
            formatResult: function(item){return item.name},
            ajax: {
                url: function (params) {
                    return subjectUrl+'?' + params.term;
                },
                processResults: function (data) {
                    data = data.results;
                    return {
                        results :
                            data.map(function(item) {
                                return {
                                    id : item.id,
                                    text : item.name
                                };
                            }
                    )};
                }
            },
            debug: true,
            delay: 250,

        }).on('change', function (e) {
            self.handleInputChange(e);
        });

        $('#academicyear').select2({
            width:'100%',
            formatSelection: function(item){return item.name},
            formatResult: function(item){return item.name},
            ajax: {
                url: function (params) {
                    return academicYearUrl+'?' + params.term;
                },
                processResults: function (data) {
                    data = data.results;
                    return {
                        results :
                            data.map(function(item) {
                                return {
                                    id : item.id,
                                    text : item.name
                                };
                            }
                    )};
                }
            },
            debug: true,
            delay: 250,

        }).on('change', function (e) {
            self.handleInputChange(e);
        });

        $('#academicclass').select2({
            width:'100%',
            formatSelection: function(item){return item.name},
            formatResult: function(item){return item.name},
            ajax: {
                url: function (params) {
                    return academicClassUrl+'?' + params.term;
                },
                processResults: function (data) {
                    data = data.results;
                    return {
                        results :
                            data.map(function(item) {
                                return {
                                    id : item.id,
                                    text : item.name
                                };
                            }
                    )};
                }
            },
            debug: true,
            delay: 250,

        }).on('change', function (e) {
            self.handleInputChange(e);
        });



    }

    handleInputChange = event =>{
        const name   =  event.target.name;
        let value    =  event.target.value;

        if(isEmpty(value)){
            this.state.errors[name] = "This field is required";
        }else{
            this.state.errors[name] = '';
        }

        this.setState({
          [name]: value
        });

    }

    slideToggle = () => {
        this.setState({visible:!this.state.visible})
    }

    addTopicCallBack = (topicFromChild) => {
        let topics = this.state.topics
        let found = false;

        if(topics.length > 0){
            for(let i = 0; i < topics.length; i++) {
                if (topics[i].name == topicFromChild.name) {
                    found = true;
                    $.jGrowl('Topic Already Exists', {
                          theme: 'bg-danger'
                     });
                    return;
                }
            }
        }

        topics.push(topicFromChild)
        this.setState({topics:topics})
        this.state.errors['topics'] = '';
        $.jGrowl('Topic Added Successfully', {
                      theme: 'bg-success'
                 });
    }

    deleteTopicCallBack = (topic) => {

        let topics = this.state.topics
        let found = false;

        for(let i = 0; i < topics.length; i++) {
            if (topics[i].name == topic.name) {
                found = true;
                topics.splice(topics.indexOf(topics[i]), 1);
                $.jGrowl('Topic Deleted Successfully', {
                    theme: 'bg-success'
                });
                this.setState({topics:topics})
                if(this.state.topics.length == 0){
                    this.state.errors['topics'] = 'This is field is required';
                }
                return;
            }
        }
    }

    handleSubjectCallBack = (subject) => {
        let subjectData = {"id": subject.id, "text": subject.name}
        this.state.subject = subject.id
        let option = new Option(subject.name, subject.id, true, true)
        $('#subject').append(option).trigger('change')
         $('#subject').trigger({
            type:'select2:select',
            params:{
                data:subjectData
            }
         });
    }


    validateInput = (data) =>  {
        let errs = {};

        if(Validator.isEmpty(data.subject)){
            errs.subject = "This field is required";
        }

        if(Validator.isEmpty(data.academicyear)){
            errs.academicyear = "This field is required";
        }

        if(Validator.isEmpty(data.academicclass)){
            errs.academicclass = "This field is required";
        }

        if(Validator.equals(String(data.topics.length), "0")){
            errs.topics = "This field is required";
        }

        return {
            errs,
            isValid: isEmpty(errs)
        }
    }

    handleSubmit = event =>{
        event.preventDefault();
        const { errs, isValid } = this.validateInput(this.state);

        if(isValid){
            console.log("yes it is valid");
        }else{
            this.setState({errors: errs});
            return;
        }

        const data = new FormData()
        data.append("subject", this.state.subject)
        data.append("academicyear", this.state.academicyear)
        data.append("academicclass", this.state.academicclass)
        data.append("topics", JSON.stringify(this.state.topics))

        axios.defaults.xsrfHeaderName = "X-CSRFToken"
        axios.defaults.xsrfCookieName = 'csrftoken'



        if(pk){
            axios.put(updateUrl,data)
            .then(function (response) {
                alertUser('Data sent successfully');
                window.location.href = redirectUrl;
            })
            .catch(function (error) {
                console.log(error);
            });
        }else{
            axios.post(createUrl,data)
            .then(function (response) {
                alertUser('Data sent successfully');
                window.location.href = redirectUrl;
            })
            .catch(function (error) {
                console.log(error);
            });
        }

    }

    showSubjectModal = () =>{
        this.setState({showModal:true})
    }

    handleHideModal = () =>{
        this.setState({showModal: false})
    }

    handleShowModal = () =>{
        this.setState({showModal: true})
    }

    render() {
        let _this = this;
        const { errors } = this.state;

      return (
      <div>
        <form encType="multipart/form-data" id="addForm" onSubmit={this.handleSubmit}>
              <div className="col-md-12">
                 <div className="col-md-4">
                    <div className={classnames("form-group ", {"has-error": errors.subject} )}>
                        <div className="row">
                            <div className="col-md-12">
                                <label className="text-bold">Subject Name:<span className="text-danger">*</span></label>
                                <div className="input-group">
                                    <div className="btn-group col-md-12" id="subjects">
                                        <select name="subject" id="subject"
                                            className="sel" value={this.state.subject}
                                                    onChange={this.handleInputChange}>
                                            <option value="">select subject</option>
                                        </select>
                                    </div>
                                    {errors.subject && <span className="help-block">{errors.subject }</span>}

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
                
                <div className="col-md-4">
                    <div className={classnames("form-group ", {"has-error": errors.academicclass} )}>
                        <div className="row">
                            <div className="col-md-12">
                                <label className="text-bold">Academic Class:<span className="text-danger">*</span></label>
                                <div className="input-group">
                                    <div className="btn-group col-md-12" id="academicclasss">
                                        <select name="academicclass" id="academicclass"
                                            className="sel" value={this.state.academicclass}
                                                    onChange={this.handleInputChange}>
                                            <option value="">select academic class</option>
                                        </select>
                                    </div>
                                    {errors.academicclass && <span className="help-block">{errors.academicclass }</span>}
                                    <div className="input-group-btn">
                                        <button type="button" className="btn bg-slate-700 btn-icon legitRipple modal-trigger edit-btn"

                                                data-ta="#subject_modal_instance"
                                                data-title="Add New Subject"
                                                data-select="#academicyears"
                                                data-href="subject/api/create/url"
                                                data-cat="name" data-label="Subject Name:">
                                            <i className="icon-plus-circle2"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className={classnames("form-group ", {"has-error": errors.academicyear} )}>
                        <div className="row">
                            <div className="col-md-12">
                                <label className="text-bold">Academic Year:<span className="text-danger">*</span></label>
                                <div className="input-group">
                                    <div className="btn-group col-md-12" id="academicyears">
                                        <select name="academicyear" id="academicyear"
                                            className="sel" value={this.state.academicyear}
                                                    onChange={this.handleInputChange}>
                                            <option value="">select academic year</option>
                                        </select>
                                    </div>
                                    {errors.academicyear && <span className="help-block">{errors.academicyear }</span>}
                                    <div className="input-group-btn">
                                        <button type="button" className="btn bg-slate-700 btn-icon legitRipple modal-trigger edit-btn"

                                                data-ta="#subject_modal_instance"
                                                data-title="Add New Subject"
                                                data-select="#academicyears"
                                                data-href="subject/api/create/url"
                                                data-cat="name" data-label="Subject Name:">
                                            <i className="icon-plus-circle2"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

              </div>
               <div className="col-md-12">
                       <div className="col-md-12">
                           <a href="javascript:;" id="reveal-topic-btn"
                                className="btn btn-warning border-left-danger"
                                style={{marginBottom:5}} onClick={this.slideToggle}>
                               <i className="icon-plus2 position-left"></i>
                                Add a Topic
                           </a>
                       </div>
               </div>
                <TopicComponent status={this.state.visible}
                                slideToggle={this.slideToggle}
                                topics={this.state.topics}
                                addTopicCallBack={this.addTopicCallBack}/>

                <div className={classnames({"has-error": errors.academicyear} )}>
                    <TopicListComponent topics={this.state.topics}
                                deleteTopicCallBack={this.deleteTopicCallBack}
                                />
                    <div className="col-md-12">
                        <div className="col-md-12">
                        {errors.topics && <span className="help-block">{errors.topics }</span>}
                        </div>
                    </div>
                </div>
                <div className="col-md-12" style={{"marginTop":10}}>
                    <div className="col-md-12">
                        <button className="btn btn-primary pull-left" type="submit">Submit</button>
                    </div>
                </div>
        </form>

            {this.state.showModal ? <MiniModal handleHideModal={this.handleHideModal} handleSubjectCallBack={this.handleSubjectCallBack}
                                /> : null}

          </div>
      );
    }
  }


  export default CrudForm;