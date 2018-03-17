import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import Select2 from 'react-select2-wrapper';
import {connect} from 'react-redux';
 
import 'react-datepicker/dist/react-datepicker.css';
class BioData extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          first_name: '',
          middle_name:'',
          last_name:'',
          nationality:'KE',
          description:'',
          dob: moment(new Date()),
          pob:'',
          buttonText:'Add'
      };      

    }

    // load site settings on mount
    // update state data
    //____________________________
    componentDidMount() { 
        // console.log(this.props.countries)
        // this.refs.start_date.value = moment(new Date()).format("YYYY-MM-DD");
        // this.refs.end_date.value = moment(new Date()).format("YYYY-MM-DD");       
        
        var self = this; 
        // check if pk checked and populate update details 
        if(pk){
            axios.get(updateUrl)
            .then(function (response) {
                response = response.data;
                if(response.description == null){
                    response.description = '';
                }
                self.refs.start_date.value = response.start_date;
                self.refs.end_date.value = response.end_date;
                self.setState({
                            name: response.name,
                            description: response.description,
                            start_date: response.start_date,
                            end_date: response.end_date,
                            buttonText:'Edit'
                            });
            })
            .catch(function (error) {
                console.log(error);
            });

        }
    }

    handleInputChange = event =>{        
                
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;        
                
        this.setState({
          [name]: value
        });
       
    }
    
    handleChange = (date) => {
        this.setState({
          dob: date
        });
    }
    onSelectChange = (e) => {
        this.setState({
            nationality: e.target.value
        });
    }
    
    handleSubmit = event =>{
      event.preventDefault();
      const data = new FormData(event.target);
      data.append('csrfmiddlewaretoken', csrfmiddlewaretoken);
      
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
      const { nationality } = this.state;
      return (
      <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
       <div className="col-md-8">
            <div className="form-group">
                <div className="row">
                    <div className="col-md-4">
                        <label className="text-bold">First Name:<span className="text-danger">*</span></label>
                        <input value={this.state.first_name} onChange={this.handleInputChange} required className="form-control" name="first_name" id="first_name" placeholder="First name" type="text"/>
                        <span className="help-block text-warning"></span>
                    </div>
                    <div className="col-md-4">
                        <label className="text-bold">Middle Name:<span className="text-danger">*</span></label>
                        <input value={this.state.middle_name} onChange={this.handleInputChange} required className="form-control" name="middle_name" id="middle_name" placeholder="Middle name" type="text"/>
                        <span className="help-block text-warning"></span>
                    </div>
                    <div className="col-md-4">
                        <label className="text-bold">Last Name:<span className="text-danger">*</span></label>
                        <input value={this.state.last_name} onChange={this.handleInputChange} required className="form-control" name="last_name" id="last_name" placeholder="Last name" type="text"/>
                        <span className="help-block text-warning"></span>
                    </div>                    
                </div>
            </div>
            <div className="form-group">

                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="text-bold">Date of Birth:</label>
                            <DatePicker
                                selected={this.state.dob}
                                onChange={this.handleChange}
                                dateFormat="YYYY-MM-DD"
                                className="form-control"
                            />
                            <span className="help-block text-warning"></span>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="text-bold">Place of birth:</label>
                            <input ref="pob" onChange={this.handleInputChange} name="pob"  id="pob" placeholder="eg Moscow" className="form-control" type="text"  required="required" />
                            <span className="help-block text-warning"></span>
                        </div>
                    </div>
                    
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="text-bold">Place of residence:</label>
                            <input ref="end_date" onChange={this.handleInputChange} name="end_date"  id="end_date" placeholder="eg 2018/12/12" className="form-control datepicker" type="text"  required="required" />
                            <span className="help-block text-warning"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-md-4"> 
            <div className="form-group">
                <label>Countries</label>
                <Select2
                data={this.props.countries}
                onChange={this.onSelectChange}
                value={ nationality }
                name="nationality"
                options={{
                    placeholder: 'search country',
                }}
                />
            </div>
            <div className="form-group hidden">
                <label className="text-bold"> Description:</label>
                <textarea value={this.state.description} onChange={this.handleInputChange} rows="5" cols="5" className="form-control" id="description" name="description" placeholder="Enter room description here" />
                
                <span className="help-block text-warning"></span>
            </div>
        </div>
        <div className="text-right col-md-12">
            <button id="add-room-btn" type="submit" className="btn btn-primary legitRipple">
            {this.state.buttonText}<i className="icon-arrow-right14 position-right"></i>
            </button>
        </div> 
      </form>
      );
    }
  }

// Get apps state and pass it as props to UserList
//      > whenever state changes, the UserList will automatically re-render
function mapStateToProps(state) {
    return {
        countries: state.countries
    }
}

export default connect(mapStateToProps)(BioData);