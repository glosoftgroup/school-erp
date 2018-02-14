import React from 'react';
import axios from 'axios';

import moment from 'moment';

class CrudForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          name: '',
          description:'',
          start_date: moment(new Date()).format("YYYY-MM-DD"),
          end_date: moment(new Date()).format("YYYY-MM-DD"),
          startDate:moment(),
          buttonText:'Add'
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
                if(response.description == null){
                    response.description = '';
                }
                self.setState({
                            name: response.name,
                            description: response.description,
                            start_date: response.start_date,
                            end_date: response.end_date,
                            buttonText:'Edit'
                            });
                console.log(self.state);
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

    
    handleSubmit = event =>{
      event.preventDefault();

      const data = new FormData(event.target);
      data.append('csrfmiddlewaretoken', csrfmiddlewaretoken);
      
    
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

      return (
      <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
       <div className="col-md-6">            

                <div className="form-group">
                    <div className="row">
                        <div className="col-md-6">
                            <label className="text-bold">Academic Year Name:<span className="text-danger">*</span></label>
                            <input value={this.state.name} onChange={this.handleInputChange} required className="form-control" name="name" id="name" placeholder="Name" type="text"/>
                            <span className="help-block text-warning"></span>
                        </div>
                        <div className="col-md-3 hidden" id="parent-div">
                            <label>Floor:<span className="text-danger">*</span></label>
                            <select value={this.state.name} onChange={this.handleInputChange}  className="bootstrap-select floor">
                                

                            </select>
                            <span className="help-block text-warning"></span>
                        </div>
                    </div>
                </div>
                <div className="form-group">

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="text-bold">Start Date:</label>
                                <input value={this.state.start_date} onChange={this.handleInputChange} name="start_date"  id="end_date" placeholder="eg 2018/12/12" className="form-control datepicker2" type="text"  required="required" />
                               <span className="help-block text-warning"></span>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="text-bold">Current Capacity:</label>
                                <input value={this.state.end_date} onChange={this.handleInputChange} name="end_date"  id="end_date" placeholder="eg 2018/12/12" className="form-control datepicker" type="text"  required="required" />
                                <span className="help-block text-warning"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-6">                
                <div className="form-group">
                    <label className="text-bold">Room Description:</label>
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


  export default CrudForm;