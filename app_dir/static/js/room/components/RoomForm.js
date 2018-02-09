import React from 'react';
import axios from 'axios';


class RoomForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          name: '',
          name: '',
          description:'',
          maximum_capacity: 0,
          current_capacity:0,
      };

    }

    // load site settings on mount
    // update state data
    //____________________________
    componentWillMount() {
        var self = this;        
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

      axios.put(addUrl,data)
      .then(function (response) {
        alertUser('Data sent successfully');
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });      
    }

    render() {

      return (
      <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
       <div className="col-md-6">            

                <div className="form-group">
                    <div className="row">
                        <div className="col-md-6">
                            <label>Class Name:<span className="text-danger">*</span></label>
                            <input value={this.state.name} onChange={this.handleInputChange} required className="form-control" name="name" id="name" placeholder="Room Name" type="text"/>
                            <span className="help-block text-warning"></span>
                        </div>
                        <div className="col-md-3" id="parent-div">
                            <label>Floor:<span className="text-danger">*</span></label>
                            <select className="bootstrap-select floor">
                                

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
                                <input value={this.state.maximum_capacity} onChange={this.handleInputChange} name="maximum_capacity" id="maximum_capacity" placeholder="Maximum Capacity" className="form-control" type="number"  required="required" />
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
                    <label>Room Description:</label>
                    <textarea value={this.state.description} onChange={this.handleInputChange} rows="5" cols="5" className="form-control" id="description" name="description" placeholder="Enter room description here"></textarea>
                    <span className="help-block text-warning"></span>
                </div>
            </div>
            <div className="text-right col-md-12">
                <button id="add-room-btn" type="submit" className="btn btn-primary legitRipple">
                Add Room <i className="icon-arrow-right14 position-right"></i>
                </button>
            </div> 
      </form>
      );
    }
  }


  export default RoomForm;