import React, { Component} from 'react';
import axios from 'axios';


class AddUserForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        fullname:'',
        username: '',
        nationalId:'',
        password:'',
        email:'',
        mobile:'',
        jobTitle:'',
        passwordConfirmation:'',
        image:'',
        imagePreviewUrl: '/static/images/users/default.png '
      }
    }



    onInputChange = e => {
        this.setState({ [e.target.name] : e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        let selectOptions = document.getElementById('multiple').options;
        const raw_groups = [];

        for (var i = 0, l = selectOptions.length; i < l; i++) {
            if (selectOptions[i].selected) {
              raw_groups.push(selectOptions[i].value);
              console.log(selectOptions[i].value);
            }
          }


        let formData = new FormData(e.target);
        for (var i = 0; i < raw_groups.length; i++) {
            formData.append('groups[]', raw_groups[i]);
         }

        axios.post(addUserUrl, formData);
    }


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


    render() {
      const optionsArray = ["Sales", "Accounts", "Security", "Admin"];
      let options = optionsArray.map((value, key) => {
            return(
                <option key={key} value={value}> {value} </option>
                )
        });
      return (
        <form onSubmit={this.onSubmit} className="form" encType="multipart/form-data" id="user-details" name="user-details">

                  <div className="row">
                    <div className="col-md-4">
                      <label htmlFor="exampleInputEmail1">User Image</label>
                      <div className="form-group">
                        <div className="fileinput fileinput-new" data-provides="fileinput">
                          <div className="fileinput-new thumbnail" style={{width: 200, height: 150}}>
                             <img alt="..." src={this.state.imagePreviewUrl}/>
                          </div>
                          <div className="fileinput-preview fileinput-exists thumbnail" style={{maxWidth: 200, maxHeight: 150}}></div>
                          <div style={{textAlign: 'center'}}>
                            <span className="btn btn-warning btn-file">
                                <span className="fileinput-new">Select</span>
                                <span className="fileinput-exists">Change</span>
                                <input type="file" name="image" id="image"
                                    onChange={this._handleImageChange}
                                 />
                            </span>
                            <a href="#" className="btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a>
                          </div>
                        </div>
                      </div>

                        <div className="col-md-10">
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Select Permissions Group:</label>
                            <div className="multi-select-full">
                            <select className="multiselect-full-featured" multiple="multiple" style={{display: 'none'}} name="groups" id="multiple" placeholder="select a group..."
                                 value={this.state.group}
                                 onChange={this.onInputChange} >
                                   <option value="">
                                     Choose your Group
                                   </option>
                                   {options}
                              </select>
                            </div>
                            <label id="group_name_error" className="select-error" htmlFor="user_select"></label>
                           </div>
                        </div>
                    </div>

                    <div className="col-md-8">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="name">Full Names</label>
                            <input type="text" className="form-control" name="fullname" id="fullname" placeholder="Full Names"
                                    value={this.state.fullname}
                                    onChange={this.onInputChange}
                                    />
                          </div>
                          <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" name="username"
                                    id="username" placeholder="Name"
                                    value={this.state.username}
                                    onChange={this.onInputChange}
                                    />
                          </div>
                          <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" id="password" placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.onInputChange}
                                    />
                           </div>
                           <div className="form-group">
                            <label htmlFor="nationalId">National ID No:</label>
                            <input type="text" className="form-control" name="nationalId" id="nid" placeholder="Id No"
                                    value={this.state.nationalId}
                                    onChange={this.onInputChange}
                                    />
                           </div>

                        </div>
                        <div className="col-md-6">
                           <div className="form-group">
                              <label htmlFor="email">Email address</label>
                              <input type="email" className="form-control" name="email" id="email" placeholder="Email"
                                    value={this.state.email}
                                    onChange={this.onInputChange}
                                    />
                           </div>
                           <div className="form-group">
                            <label htmlFor="mobile">Phone</label>
                            <input type="text" data-mask="(+254)-999-999-999" className="form-control" name="mobile" id="mobile" placeholder="Mobile"
                                    value={this.state.mobile}
                                    onChange={this.onInputChange}
                                    />
                           </div>
                           <div className="form-group">
                            <label htmlFor="passwordConfirmation">Confirm Password</label>
                            <input type="password" className="form-control" name="passwordConfirmation" id="confirm_password" placeholder="Confirm Password"
                                    value={this.state.passwordConfirmation}
                                    onChange={this.onInputChange}
                                    />
                           </div>
                           <div className="form-group">
                              <label htmlFor="jobTitle">Job Title</label>
                              <input type="text" className="form-control" name="jobTitle" id="id_job_title" placeholder="Job title (e.g Cashier)"
                                    value={this.state.jobTitle}
                                    onChange={this.onInputChange}
                                    />
                           </div>
                        </div>
                      </div>


                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                     <div className="pull-right" style={{marginTop:40}}>
                      <a href="#" className="btn btn-default waves-effect waves-light">Cancel</a>
                      <button className="btn btn-primary waves-effect waves-light" id="submit" type="submit">Create User <i className="icon-arrow-right14 position-right"></i></button>
                     </div>
                    </div>
                  </div>
                </form>
      );
    }
  }


  export default AddUserForm;