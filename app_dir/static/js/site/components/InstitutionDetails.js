import React from 'react';
import axios from 'axios';


class InstitutionDetails extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          name: '',
          listUrl: '',
          address: '',
          email: '',
          mobile: '',
          code: '',
          image: '',
          imagePreviewUrl: '/static/images/users/default.png ',
          postal_code: '',
          city: ''
      };

    }

    // load site settings on mount
    // update state data
    //____________________________
    componentWillMount() {
        var self = this;
        axios.get(listUrl)
          .then(function (response) {
            response = response.data;
            self.setState({
                          email: response[0].email,
                          name: response[0].name,
                          mobile: response[0].mobile,
                          code: response[0].code,
                          postal_code: response[0].postal_code,
                          city: response[0].city,
                          image: response[0].image,
                          imagePreviewUrl: response[0].image,
                          address: response[0].address
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

    // image preview
    _handleImageChange = e =>{
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            image: file,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file)
    }
    
    handleSubmit = event =>{
      event.preventDefault();

      const formToJSON = elements => [].reduce.call(elements, (data, element) => {

        data[element.name] = element.value;
        return data;

      }, {});
      // const data = formToJSON(event.target);

      const data = new FormData(event.target);

      axios.put(updateUrl,data)
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
        <div className="col-md-12">
          <div className="col-md-4">
            <label className="text-center" >School Logo</label>
              <div className="form-group">
                <div className="fileinput fileinput-new" data-provides="fileinput">
                  <div className="fileinput-new thumbnail" style={{width: 200, height: 150}} >
                    <img alt="..." src={this.state.imagePreviewUrl}/>
                  </div>
                  <div className="fileinput-preview fileinput-exists thumbnail" ></div>
                  <div >
                    <span className="btn btn-warning btn-file legitRipple">
                    <span className="fileinput-new">Select Logo </span>
                    <span className="fileinput-exists">Change</span>
                    <input onChange={this._handleImageChange} name="image" id="image" type="file" /></span>

                  </div>
                </div>
              </div>
            </div>
          <div className="col-md-8">
              <div className="form-group col-md-6">
                <label htmlFor="school_name">School Name</label>
                <input value={this.state.name} onChange={this.handleInputChange} className="form-control" name="name" id="school_name" placeholder="School Name"  type="text" />
              </div>
              <div className="form-group col-md-6">
                <label >School Code</label>
                <input value={this.state.code} onChange={this.handleInputChange} className="form-control" name="code" id="school_code" placeholder="School Code" type="text" />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="school_mobile">Phone No.</label>
                <input value={this.state.mobile} onChange={this.handleInputChange} className="form-control" name="mobile" id="school_mobile" placeholder="School phone No."  type="text" />
              </div>
              <div className="form-group col-md-6">
                <label >School Email</label>
                <input value={this.state.email} onChange={this.handleInputChange} className="form-control" name="email" id="school_email" placeholder="School Email" type="text" />
              </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <label>Postal code:</label>
                        <input value={this.state.postal_code} onChange={this.handleInputChange} name="postal_code" placeholder="00200" className="form-control" type="text"/>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="form-group">
                        <label>City:</label>
                        <input value={this.state.city} onChange={this.handleInputChange} name="city" placeholder="Nairobi" className="form-control" type="text" />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label>Address:</label>
                        <input value={this.state.address} onChange={this.handleInputChange} name="address" placeholder="Ring road 12" className="form-control" type="text" />
                    </div>
                </div>
              </div>
            </div>
        
        <button className="btn btn-primary btn-block">Send data</button>
      </form>
      );
    }
  }


  export default InstitutionDetails;