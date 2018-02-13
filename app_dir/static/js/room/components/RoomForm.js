import React from 'react';
import axios from 'axios';

import Select from 'react-select';
import SiteUsers from './SiteUsers';


class RoomForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          name: '',
          description:'',
          max_capacity: 0,
          current_capacity:0,
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
                            max_capacity: response.max_capacity,
                            current_capacity: response.current_capacity,
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

    
    handleSubmit = event =>{
      event.preventDefault();

      const data = new FormData(event.target);
    
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
                            <label className="text-bold">Class Name:<span className="text-danger">*</span></label>
                            <input value={this.state.name} onChange={this.handleInputChange} required className="form-control" name="name" id="name" placeholder="Room Name" type="text"/>
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
                                <label className="text-bold">Maximum Capacity:</label>
                                <input value={this.state.max_capacity} onChange={this.handleInputChange} name="max_capacity" id="max_capacity" placeholder="Maximum Capacity" className="form-control" type="number"  required="required" />
                                <span className="help-block text-warning"></span>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="text-bold">Current Capacity:</label>
                                <input value={this.state.current_capacity} onChange={this.handleInputChange} name="current_capacity"  id="current_capacity" placeholder="eg 17" className="form-control packages" type="number"  required="required" />
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
                {this.state.buttonText} <i className="icon-arrow-right14 position-right"></i>
                </button>
            </div> 
      </form>
      );
    }
  }


  export default RoomForm;