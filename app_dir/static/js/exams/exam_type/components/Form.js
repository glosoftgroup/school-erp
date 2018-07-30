import React from 'react';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import Validator from 'validator';
import Urls from '../constants/Urls';
import Api from '../../../common/Api';
import Alert from '../../../common/Alert';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            buttonText: 'Add',
            errors: {},
            updateStatus: (window.location.href).includes('update')
        };
    }

    _________________________
    componentWillMount() {
        var self = this;
        if (self.state.updateStatus) {
            Api.retrieve(Urls.updateUrl()).then(function(response) {
                response = response.data;
                if (response.description == null) {
                    response.description = '';
                }
                self.setState({
                    name: response.name,
                    description: response.description,
                    buttonText: 'Edit'
                });
            }).catch(function(error) {
                console.log(error);
            });
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let errors = {...this.state.errors};

        if (isEmpty(value)) {
            errors[name] = 'This field is required';
        } else {
            errors[name] = '';
        }

        this.setState({
            [name]: value,
            errors: errors
        });
    }

    validateInput = (data) => {
        let errs = {};

        if (Validator.isEmpty(data.name)) {
            errs.name = 'This field is required';
        }

        return {
            errs,
            isValid: isEmpty(errs)
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { errs, isValid } = this.validateInput(this.state);

        if (isValid) {
            console.log('yes it is valid');
        } else {
            this.setState({errors: errs});
            return;
        }

        const data = new FormData(event.target);

        if (this.state.updateStatus) {
            Api.update(Urls.updateUrl(), data)
                .then(function(response) {
                    Alert.success('Data sent successfully', 'Well Done!');
                    window.location.href = Urls.redirectUrl();
                    console.log(response);
                }).catch(function(error) {
                    Alert.error(error);
                    console.log(error);
                });
        } else {
            Api.create(Urls.createUrl(), data)
                .then(function (response) {
                    Alert.success('Data sent successfully', 'Well Done!');
                    window.location.href = Urls.redirectUrl();
                })
                .catch(function (error) {
                    console.log(error);
                    Alert.error(error);
                });
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-12">
                            <div className={classnames('form-group ', {'has-error': errors.name})}>
                                <label className="text-bold">Name:<span className="text-danger">*</span></label>
                                <input value={this.state.name} onChange={this.handleInputChange} className="form-control" name="name" id="name" placeholder="Name" type="text"/>
                                {errors.name && <span className="help-block">{errors.name }</span>}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label className="text-bold">
                                Description:</label>
                                <textarea value={this.state.description}
                                    onChange={this.handleInputChange}
                                    rows="5" cols="5"
                                    className="form-control" id="description"
                                    name="description"
                                    placeholder="Enter room description here" />
                            </div>
                        </div>
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

export default Form;
