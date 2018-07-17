import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import classnames from 'classnames';
import LaddaButton, { XL, SLIDE_UP } from 'react-ladda';
import select2 from 'select2';
import modal from 'bootstrap';
import Alert from '../../../common/Alert';


class MiniModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        subject:"",
        errors:{},
      }
    }

    componentDidMount(){
        const element = ReactDOM.findDOMNode(this);
        $(element).modal('show');
        $(element).on('hidden.bs.modal', this.props.handleHideModal);
    }

    validateInput = (data) =>  {
        let errs = {};
        if(Validator.isEmpty(data.subject)){
            errs.subject = "This field is required";
        }

        return {
            errs,
            isValid: isEmpty(errs)
        }
    }

    handleInputChange = (event) => {
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

    submitSubject = (event) => {
        event.preventDefault();
        const { errs, isValid } = this.validateInput(this.state);

        if(isValid){
            console.log("yes it is valid");
        }else{
            this.setState({errors: errs});
            return;
        }

        let self = this

        const data = new FormData()
        data.append("name", this.state.subject)

        axios.defaults.xsrfHeaderName = "X-CSRFToken"
        axios.defaults.xsrfCookieName = 'csrftoken'



        axios.post(subjectCreateUrl, data)
        .then(function (response) {
            Alert.success('Data sent successfully')
            let newOption = Object.assign({}, {id:response.data.id, name:response.data.name})
            self.props.handleSubjectCallBack(newOption)
            $(ReactDOM.findDOMNode(self)).modal('hide')
        })
        .catch(function (error) {
            console.log(error);
        });

    }

    render() {
    const { errors } = this.state;
      return (
                <div id="subjectModal" className="modal fade"  role="dialog">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 className="modal-title">Add Subject</h4>
                      </div>
                      <div className="modal-body">
                           <div className="col-md-12">
                                <div className={classnames("form-group", {"has-error": errors.suject})}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label className="text-bold">Subject:<span className="text-danger">*</span></label>
                                            <input className="form-control" name="subject" id="subject"
                                                placeholder="Subject Name"
                                                type="text"
                                                onChange={this.handleInputChange}
                                                value={this.state.subject}/>
                                                {errors.subject && <span className="help-block">{errors.subject }</span>}
                                        </div>
                                    </div>
                                </div>
                           </div>
                       </div>

                      <div className="modal-footer">
                        <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={this.submitSubject}>Save changes</button>
                      </div>

                    </div>
                  </div>
                </div>

      );
    }

    propTypes:{
        	handleHideModal: React.PropTypes.func.isRequired
        }
  }

  export default MiniModal;