import React from 'react';
import axios from 'axios';


class InstitutionDetails extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          name: true,
          listUrl: '',
          address: '',
          email: '',
          mobile: '',
          code: '',
          logo: '',
      };

      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    // load site settings on mount
    //____________________________
    componentDidMount() {
        console.log('mounted,,oo..');
        console.log(listUrl);
        axios.post(listUrl)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
    }
    
    handleSubmit(event) {
      event.preventDefault();

      const formToJSON = elements => [].reduce.call(elements, (data, element) => {

        data[element.name] = element.value;
        return data;

      }, {});
      const data = formToJSON(event.target);

      // const data = new FormData(event.target);
      axios.post('/user',data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      // fetch('/api/form-submit-url', {
      //   method: 'POST',
      //   body: data,
      // });
    }

    render() {
      return (
      <form onSubmit={this.handleSubmit}>
        <div className="col-md-12">
                  <div className="col-md-4">
                    <label className="text-center" >Business Logo</label>
                      <div className="form-group">     
                        <div className="fileinput fileinput-new" data-provides="fileinput">
                          <div className="fileinput-new thumbnail" >
                            <img data-src="holder.js/100%x100%" alt="..." src="/static/images/users/default.png "/>
                          </div>
                          <div className="fileinput-preview fileinput-exists thumbnail" ></div>
                          <div >
                            <span className="btn btn-warning btn-file legitRipple">
                            <span className="fileinput-new">Select Logo </span>
                            <span className="fileinput-exists">Change</span>
                            <input onChange={this.handleInputChange} name="image" id="image" type="file" /></span>
                            <a href="#" className="btn btn-default fileinput-exists legitRipple" data-dismiss="fileinput">Remove</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  <div className="col-md-8">
                      <div className="form-group col-md-6">
                        <label htmlFor="company_name">Business Name</label>
                        <input onChange={this.handleInputChange} className="form-control" name="company_name" id="company_name" placeholder="Company Name" value=" " type="text" />
                      </div>
                      <div className="form-group col-md-6">
                        <label >Business Email</label>
                        <input onChange={this.handleInputChange} className="form-control" name="company_email" id="company_email" placeholder="Company Email" value=" " type="text" />
                      </div>

                      <div className="col-md-12"> <h6>Sales Settings</h6></div>
                      <div className="row">
                      <div className="col-md-12">
                          <div className="form-group col-md-4">
                               <label>
                                Points equivalent to 1
                               </label>
                            <input onChange={this.handleInputChange} className="form-control" name="loyalty_point_equiv" id="loyalty_point_equiv" min="0" placeholder=" 0 " type="text" />

                            <span className="help-block">e.g 100 loyalty points is equal to 1 
                          </span></div>
                          <div className="col-md-4">
                              <label >Max Credit Expiration(days)  </label>

                              <span className="help-block">Maximum days before which credit sale should be paid</span>
                              
                          </div>
                          <div className="col-md-4">
                              <label >Show transferred Sales</label>

                              <span className="help-block">If checked transferred stock sales will be visible on reports</span>

                          </div>
                      </div>
                      </div>


                  </div>
              </div>

          <label htmlFor="username">Enter name</label>
          <input id="username" onChange={this.handleInputChange} name="name" type="text" />

          <label htmlFor="email">Enter your email</label>
          <input onChange={this.handleInputChange} id="email" name="email" type="email" />

          <label htmlFor="birthdate">Enter your birth date</label>
          <input onChange={this.handleInputChange} id="birthdate" name="birthdate" type="text" />

          <button>Send data!</button>
        </form>
      );
    }
  }


  export default InstitutionDetails;