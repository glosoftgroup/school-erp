import React from 'react';
import axios from 'axios';
import moment from 'moment';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import Validator from 'validator';
import daterangepicker from 'daterangepicker';


class CrudForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          name: '',
          description:'',
          buttonText:'Add',
          openingDate:'',
          closingDate:'',
          errors:{},
      };

    }

    // load site settings on mount
    // update state data
    //____________________________
    componentWillMount() {
        var self = this;
        let pk = pk ? pk : false
        // check if pk checked and populate update details 
        if(pk){
            axios.get(updateUrl)
            .then(function (response) {
                response = response.data;
                if(response.description == null){
                    response.description = '';
                }
                self.setState({
                            name: response.name,
                            description: response.description,
                            openingDate: response.openingDate,
                            closingDate: response.closingDate,
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
        $('.opening_date').daterangepicker({
            singleDatePicker: true,
            locale:{format: 'YYYY-MM-DD'},
            showDropdowns:true,
            autoUpdateInput:false
        },function(chosen_date) {
            let event = []
            event['target'] = {}
            event['target']['name'] = "openingDate"
            event['target']['type'] = "input"
            event['target']['value'] = chosen_date.format('YYYY-MM-DD')
            self.handleInputChange(event)

        });

        $('.closing_date').daterangepicker({
            singleDatePicker: true,
            locale:{format: 'YYYY-MM-DD'},
            showDropdowns:true,
            autoUpdateInput:false,
            minDate: new Date()
        },function(chosen_date) {
            let event = []
            event['target'] = {}
            event['target']['name'] = "closingDate"
            event['target']['type'] = "input"
            event['target']['value'] = chosen_date.format('YYYY-MM-DD')
            self.handleInputChange(event)

        });

    }

    handleInputChange = event =>{
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if(isEmpty(value)){
            this.state.errors[name] = "This field is required";
        }else{
            this.state.errors[name] = '';
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

        if(Validator.isEmpty(data.openingDate)){
            errs.openingDate = "This field is required";
        }

        if(Validator.isEmpty(data.closingDate)){
            errs.closingDate = "This field is required";
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
            <div className="col-md-6">
                <div className="row">
                    <div className="col-md-12">
                        <div className={classnames("form-group ", {"has-error":errors.name})}>
                            <label className="text-bold">Name:<span className="text-danger">*</span></label>
                            <input value={this.state.name} onChange={this.handleInputChange} className="form-control" name="name" id="name" placeholder="Name" type="text"/>
                            {errors.name && <span className="help-block">{errors.name }</span>}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className={classnames("form-group ", {"has-error":errors.openingDate})}>
                            <label className="text-bold">Opening Date:</label>
                            <input name="openingDate"  id="opening_date"
                                placeholder="eg 2018/12/12" className="form-control opening_date"
                                type="text"
                                 value={this.state.openingDate}/>
                           {errors.openingDate && <span className="help-block">{errors.openingDate }</span>}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className={classnames("form-group ", {"has-error":errors.closingDate})}>
                            <label className="text-bold">Closing Date:</label>
                            <input name="closingDate"  id="closing_date"
                                placeholder="eg 2018/12/12" className="form-control closing_date"
                                type="text"
                                value={this.state.closingDate}/>
                            {errors.closingDate && <span className="help-block">{errors.closingDate }</span>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label className="text-bold">
                    Description:</label>
                    <textarea value={this.state.description} onChange={this.handleInputChange} rows="5" cols="5" className="form-control" id="description" name="description" placeholder="Enter room description here" />

                    <span className="help-block text-warning"></span>
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