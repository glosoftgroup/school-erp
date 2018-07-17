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
      errors: {},
      assignmentstatus: false,
      catstatus: false,
      examstatus: false,
      disabled: true,
      assignment: '',
      cat: '',
      exam: ''
    };

    this.baseState = Object.assign({}, this.state);
  }

  componentDidMount() {
    var self = this;
  }

    resetForm = () => {
      this.setState(this.baseState);
      this.props.slideToggle();
    }

    handleInputChange = event => {
      const name = event.target.name;
      let value = event.target.value;

      if (isEmpty(value)) {
        this.state.errors[name] = 'This field is required';
      } else if (!isEmpty(value) && (name == 'assignment' || name == 'cat' || name == 'exam') && !Validator.isInt(value)) {
        this.state.errors[name] = 'Only numbers required';
      } else {
        this.state.errors[name] = '';
      }
      this.setState({
        [name]: value,
        disabled: false
      });
    }

    validateInput = (data) => {
      let errs = {};

      if (Validator.isEmpty(data.assignment)) {
        errs.assignment = 'This field is required';
      }

      if (Validator.isEmpty(data.cat)) {
        errs.cat = 'This field is required';
      }

      if (Validator.isEmpty(data.exam)) {
        errs.exam = 'This field is required';
      }

      return {
        errs,
        isValid: isEmpty(errs)
      };
    }

    addTopic = (event) => {
      const { errs, isValid } = this.validateInput(this.state);

      if (isValid) {
        let newTopicState = Object.assign({}, this.state);
        delete newTopicState.errors;
        this.props.addTopicCallBack(newTopicState);
        this.resetForm();
        this.props.slideToggle();
        // uncheck the fields
        for (const field in this.refs) {
          $(this.refs[field]).prop('checked', false);
          $(this.refs[field]).parent().removeClass('checked');
        }
      } else {
        this.setState({errors: errs });
      }
    }

    checkToggle = (event) => {
      const name = event.target.name;
      let value = event.target.value;
      this.setState({[name]: !this.state[name]});
    }

    render() {
      const { errors } = this.state;
      return (
        <div className={this.props.status == true ? 'col-md-6 animated slideInDown' : 'col-md-6 animate slideOutUp'} id="topic-div"
        >
          <div className="row">
            <div className="col-md-12">
              <h6 className="col-md-12">Check revelant exams and input the number of exams</h6>
            </div>

            <div className="col-md-12">
              <div className="col-md-4">
                <div className="form-group pt-15s">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" onClick={this.checkToggle}
                        name="assignmentstatus" className="styled"
                        ref="assignment" />
                                        Assignment(s)
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className={classnames('form-group ', {'has-error': this.state.assignmentstatus ? errors.assignment : ''})}>
                  <label>
                    <input type="text" className="form-control"
                      placeholder="No of assignments" name="assignment" disabled={!this.state.assignmentstatus}
                      onChange={this.handleInputChange}
                      value={this.state.assignmentstatus ? this.state.assignment : this.state.assignment = ''}
                    />
                  </label>
                  {this.state.assignmentstatus
                    ? errors.assignment && <span className="help-block">{errors.assignment }</span>
                    : errors.assignment = ''}
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <div className="col-md-4">
                <div className="form-group pt-15s">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" className="styled"
                        onClick={this.checkToggle} name="catstatus"
                        ref="cat"/>
                                        CAT(s)
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className={classnames('form-group ', {'has-error': this.state.catstatus ? errors.cat : ''})}>
                  <label>
                    <input type="text" className="form-control" name="cat"
                      disabled={!this.state.catstatus}
                      onChange={this.handleInputChange}
                      value={this.state.catstatus ? this.state.cat : this.state.cat = ''}
                      placeholder="No. of CATS"/>
                  </label>
                  {this.state.catstatus
                    ? errors.cat && <span className="help-block">{errors.cat }</span>
                    : errors.cat = ''}
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <div className="col-md-4">
                <div className="form-group pt-15s">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" className="styled"
                        onClick={this.checkToggle} name="examstatus"
                        ref="exam"/>
                                        Exam(s)
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className={classnames('form-group ', {'has-error': this.state.examstatus ? errors.exam : ''})}>
                  <label>
                    <input type="text" className="form-control" name="exam"
                      disabled={!this.state.examstatus}
                      onChange={this.handleInputChange}
                      value={this.state.examstatus ? this.state.exam : this.state.exam = ''}
                      placeholder="No. of Exams"/>
                  </label>
                  {this.state.examstatus
                    ? errors.exam && <span className="help-block">{errors.exam }</span>
                    : errors.exam = ''}
                </div>
              </div>
            </div>

          </div>
          <div id="addTopicForm">
            <div className="text-left col-md-12">
              <button id="add-topic-btn pull-left" type="button"
                className="btn bg-slate-800 legitRipple"
                onClick={this.addTopic} disabled={this.state.disabled}>
                                    Add Configuration
                <i className="icon-arrow-right14 position-right"></i>
              </button>
            </div>
          </div>
        </div>

      );
    }
}

export default TopicComponent;
