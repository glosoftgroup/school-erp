import React from 'react';
import axios from 'axios';
import moment from 'moment';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import Validator from 'validator';
import select2 from 'select2';
import {jGrowl} from 'jgrowl';
import modal from 'bootstrap';


class CrudForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          teacher:'',
          classTaught:'',
          academicYear:'',
          subject:'',
          buttonText:'Add',
          term:'',
          hours:'',
          errors:{},
      };

    }

    // load site settings on mount
    // update state data
    //____________________________
    componentWillMount() {
        var self = this; 
        // check if pk checked and populate update details 
        if(pk){
            axios.get(updateUrl)
            .then(function (response) {
                response = response.data;
                self.setState({
                            hours: response.hours,
                            buttonText:'Edit'
                            });
                console.log(self.state);
            })
            .catch(function (error) {
                console.log(error);
            });

        }
    }

    componentDidMount(){
        let self = this

        if(pk){
             //academic class
            this.state.classTaught = objectClassId
            let option = new Option(objectClass, objectClassId, true, true)
            $('#classTaught').append(option).trigger('change')

            this.state.academicYear = objectAcademicId
            let option2 = new Option(objectAcademic, objectAcademicId, true, true)
            $('#academicYear').append(option2).trigger('change')

            this.state.subject = objectSubjectId
            let option3 = new Option(objectSubject, objectSubjectId, true, true)
            $('#subject').append(option3).trigger('change')

            this.state.term = objectTermId
            let option4 = new Option(objectTerm, objectTermId, true, true)
            $('#term').append(option4).trigger('change')

            this.state.teacher = objectTeacherId
            let option5 = new Option(objectTeacher, objectTeacherId, true, true)
            $('#teacher').append(option5).trigger('change')

        }

        $('#teacher').select2({
            width:'100%',
            formatSelection: function(item){return item.name},
            formatResult: function(item){return item.name},
            ajax: {
                url: function (params) {
                    return teachersrUrl+'?' + params.term;
                },
                processResults: function (data) {
                    data = data.results;
                    return {
                        results :
                            data.map(function(item) {
                                return {
                                    id : item.id,
                                    text : item.fullname
                                };
                            }
                    )};
                }
            },
            debug: true,
            delay: 250,
        }).on('change', function (e) {
            self.handleInputChange(e)
        });

        $('#classTaught').select2({
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
                                    text : item.name+' '+item.stream
                                };
                            }
                    )};
                }
            },
            debug: true,
            delay: 250,
        }).on('change', function (e) {
            self.handleInputChange(e)
        });

        $('#academicYear').select2({
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
            self.handleInputChange(e)
        });

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
            self.handleInputChange(e)
        });


        $('#term').select2({
            width:'100%',
            formatSelection: function(item){return item.name},
            formatResult: function(item){return item.name},
            ajax: {
                url: function (params) {
                    return termUrl+'?' + params.term;
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
            self.handleInputChange(e)
        });

    }

    handleInputChange = event =>{
        const name   =  event.target.name;
        let value    =  event.target.value;

        if(isEmpty(value)){
            this.state.errors[name] = "This field is required";
        }else if( !isEmpty(value) && name=="hours" && !Validator.isInt(value)){
            this.state.errors[name] = "Only numbers required";
        }else{
            this.state.errors[name] = '';
        }

        this.setState({
          [name]: value
        });
    }

    validateInput = (data) =>  {
        let errs = {};

        if(Validator.isEmpty(data.subject)){
            errs.subject = "This field is required";
        }

        if(Validator.isEmpty(data.classTaught)){
            errs.classTaught = "This field is required";
        }

        if(Validator.isEmpty(data.academicYear)){
            errs.academicYear = "This field is required";
        }

        if(Validator.isEmpty(data.term)){
            errs.term = "This field is required";
        }

        if(Validator.isEmpty(data.teacher)){
            errs.teacher = "This field is required";
        }

        if(Validator.isEmpty(data.hours)){
            errs.hours = "This field is required";
        }

        if(!Validator.isEmpty(data.hours) && !Validator.isInt(data.hours)){
            errs.hours = "Only numbers required";
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

      const data = new FormData(event.target);
      axios.defaults.xsrfHeaderName = "X-CSRFToken"
      axios.defaults.xsrfCookieName = 'csrftoken'
    
      // check if pk is set and update details 
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

    render() {
      const { errors } = this.state;
      return (
      <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
            <div className="col-md-12">
                <div className="row">

                    <div className="col-md-4">
                        <div className={classnames("form-group ",{"has-error": errors.teacher} )}>
                            <label className="text-bold">Teacher:<span className="text-danger">*</span></label>
                                <div>
                                <select name="teacher" id="teacher"
                                    className="sel" value={this.state.teacher}
                                            onChange={this.handleInputChange}>
                                    <option value="">select teacher</option>
                                </select>
                                </div>
                            {errors.teacher && <span className="help-block">{errors.teacher }</span>}
                        </div>
                    </div>

                     <div className="col-md-4">
                        <div className={classnames("form-group ", {"has-error": errors.classTaught} )}>
                            <label className="text-bold">Class:<span className="text-danger">*</span></label>
                            <div className="input-group">
                                <div className="btn-group col-md-12" id="classTaughts">
                                    <select name="classTaught" id="classTaught"
                                        className="sel" value={this.state.classTaught}
                                                onChange={this.handleInputChange}>
                                        <option value="">select academic class</option>
                                    </select>
                                </div>
                                {errors.classTaught && <span className="help-block">{errors.classTaught }</span>}
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

                    <div className="col-md-4">
                        <div className={classnames("form-group ", {"has-error": errors.academicYear} )}>
                            <label className="text-bold">Academic Year:<span className="text-danger">*</span></label>
                            <div className="input-group">
                                <div className="btn-group col-md-12" id="academicYears">
                                    <select name="academicYear" id="academicYear"
                                        className="sel" value={this.state.academicYear}
                                                onChange={this.handleInputChange}>
                                        <option value="">select academic year</option>
                                    </select>
                                </div>
                                {errors.academicYear && <span className="help-block">{errors.academicYear }</span>}
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

                <div className="row">
                    <div className="col-md-4">
                        <div className={classnames("form-group ", {"has-error": errors.subject} )}>
                            <label className="text-bold">Subject:<span className="text-danger">*</span></label>
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
                                            data-cat="name" data-label="Subject Name:">
                                        <i className="icon-plus-circle2"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className={classnames("form-group ",{"has-error": errors.term} )}>
                            <label className="text-bold">Term:<span className="text-danger">*</span></label>
                            <div className="input-group">
                                <div className="btn-group col-md-12" id="terms">
                                    <select name="term" id="term"
                                        className="sel" value={this.state.term}
                                                onChange={this.handleInputChange}>
                                        <option value="">select term</option>
                                    </select>
                                </div>
                                {errors.term && <span className="help-block">{errors.term }</span>}
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

                    <div className="col-md-4">
                        <div className={classnames("form-group ", {"has-error":errors.hours})}>
                            <label className="text-bold">Hours per Week:</label>
                            <input name="hours"  id="hours"
                             className="form-control hours"
                                type="text"
                                value={this.state.hours}
                                onChange={this.handleInputChange} />
                            {errors.hours && <span className="help-block">{errors.hours }</span>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-left col-md-12">
                <button id="add-room-btn" type="submit" className="btn btn-primary legitRipple">
                  {this.state.buttonText}
                  <i className="icon-arrow-right14 position-right"></i>
                </button>
            </div>
      </form>
      );
    }
  }


  export default CrudForm;