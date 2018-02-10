import React from 'react';
import axios from 'axios';


class SmsSettings extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          name: '',
          username: '',
          api_key: ''
      };

    }

    // load site settings on mount
    // update state data
    //____________________________
    componentWillMount() {
        var self = this;
        axios.get(listSmsUrl)
          .then(function (response) {
            response = response.data;
            self.setState({
                          username: response[0].username,
                          api_key: response[0].api_key,
                          
                        });
            console.log(self.state);
          })
          .catch(function (error) {
            console.log(error);
        });
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

      axios.put(updateSmsUrl,data)
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
        
        <div className="row">
            <div className="panel-body">
                
                    <div className="col-md-12">
                    <h5 className="text-bold"> SMS gateway login credentials</h5>        
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                        <label>Username</label>
                        <input type="text" value={this.state.username} onChange={this.handleInputChange} placeholder="Username" className="form-control" id="api_username" name="username"/>
                        </div>                
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                        <label>API key</label>
                        <input type="text" value={this.state.api_key} onChange={this.handleInputChange} placeholder="API Key" className="form-control"  id="api_key" name="api_key"/>
                        </div>               
                    </div>                          
                </div>       
               <div className="col-md-12 text-center">
                 <button className="btn btn-primary">Update settings</button>
               </div>
            </div>       
        
        
      </form>
      );
    }
  }


  export default SmsSettings;