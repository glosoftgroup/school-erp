import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';
import moment from 'moment';

class CrudForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            middle_name: '',
            last_name: '',
            email: '',
            mobile: '',
            description: '',
            buttonText: 'Add'
        };
    }

    // load site settings on mount
    // update state data
    componentDidMount() {
        var self = this;
        // check if pk checked and populate update details 
        if (pk) {
            axios.get(updateUrl)
                .then(function (response) {
                    response = response.data;
                    if (response.description == null) {
                        response.description = '';
                    }
                    self.setState({
                        first_name: response.first_name,
                        middle_name: response.middle_name,
                        last_name: response.last_name,
                        email: response.email,
                        mobile: response.mobile,
                        description: response.description,
                        relation: response.relation,
                        buttonText: 'Edit'
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    handleSubmit = event => {
        event.preventDefault();
        const data = new FormData(event.target);

        axios.defaults.xsrfHeaderName = 'X-CSRFToken';
        axios.defaults.xsrfCookieName = 'csrftoken';
        // check if pk is set and update details
        if (pk) {
            axios.put(updateUrl,data)
                .then(function (response) {
                    alertUser('Data sent successfully');
                    window.location.href = redirectUrl;
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
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
                            <div className="col-md-4">
                                <label className="text-bold">First Name:<span className="text-danger">*</span></label>
                                <input value={this.state.first_name} onChange={this.handleInputChange} required className="form-control" name="first_name" id="first_name" placeholder="First name" type="text"/>
                                <span className="help-block text-warning"></span>
                            </div>
                            <div className="col-md-4">
                                <label className="text-bold">Middle Name:<span className="text-danger">*</span></label>
                                <input value={this.state.middle_name} onChange={this.handleInputChange} required className="form-control" name="middle_name" id="name" placeholder="Middle name" type="text"/>
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
                                <label className="text-bold">Mobile:<span className="text-danger">*</span></label>
                                <input value={this.state.mobile} onChange={this.handleInputChange} required className="form-control" name="mobile" id="mobile" placeholder="Mobile No." type="text"/>
                                <span className="help-block text-warning"></span>
                            </div>

                            <div className="col-md-4">
                                <label className="text-bold">Email:</label>
                                <input value={this.state.email} onChange={this.handleInputChange} className="form-control" name="email" id="email" placeholder="email@example.com" type="text"/>
                                <span className="help-block text-warning"></span>
                            </div>

                            <div className="col-md-4">
                                <label className="text-bold">Relation:</label>
                                <input value={this.state.relation} onChange={this.handleInputChange} className="form-control" name="relation" id="relation" placeholder="parent/gurdian or slibling" type="text"/>
                                <span className="help-block text-warning"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="text-bold"> Description:</label>
                        <textarea value={this.state.description} onChange={this.handleInputChange} rows="5" cols="5" className="form-control" id="description" name="description" placeholder="Enter description here" />
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
