import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Select2 from 'react-select2-wrapper';
import classnames from 'classnames';
import { ToastContainer, toast } from 'react-toastify';
import api from '../api/Api';
import { fetchItems } from '../actions/action-items';
import { toggleStatus } from '../actions/action-form-status';

class Comp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            itemValues: '1',
            itemValues2: '1',
            loading: false,
            allowEdit: false,
            buttonText: 'add',
            errors: {},
            server_errror: '',
            search: ''
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        this.filterContent(e.target.value);
    }

    filterContent=(search) => {
        var params = Object.assign({page_size: 5});
        if (this.state.search) {
            params = Object.assign(params, {'q': search});
        }
        this.props.fetchItems(params);
    }

    onMultiSelectChange = (e) => {
        if (!this.props.item.id) {
            var value = [];
            var options = e.target.options;
            for (var i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                    value.push(options[i].value);
                }
            }
            this.setState({itemValues: value});
        } else {
            this.onMultiSelectChange2(e);
        }
    }

    onMultiSelectChange2 = (e) => {
        if (this.state.allowEdit) {
            var value = [];
            var options = e.target.options;
            for (var i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                    value.push(options[i].value);
                }
            }
            this.setState({itemValues: value});
            console.log('allow edit..');
        } else {
            this.setState({
                allowEdit: true
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.item.id) {
            var value = [];
            var options = nextProps.item.values;
            this.refs.values.el.empty().trigger('change'); ;
            this.refs.values.el.val(null).trigger('change');
            for (var i = 0, l = options.length; i < l; i++) {
                value.push(options[i].name);
                this.refs.values.el.select2({
                    width: '100%',
                    tags: true,
                    tokenSeparators: [',', ' ']}).append('<option value="' + options[i].name +
                       '">' + options[i].name + '</option>');
            }
            this.setState({
                name: nextProps.item.name,
                itemValues: value,
                allowEdit: false
            });
            this.refs.values.el.trigger('change');
            var toggle;
            if (this.props.toggler.id) {
                toggle = false;
            } else {
                toggle = true;
                var status = Object.assign({'id': toggle});
                this.props.toggleStatus(status);
            }
            window.scrollTo(0, 0);
        } else {

        }
    }

    onSelectChange = (e) => {
        console.log(e.target.name);
        if (this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];

            this.setState({
                [e.target.name]: e.target.value,
                errors: errors
            });
        } else {
            this.setState({
                [e.target.name]: e.target.value
            });
        }
    }

    toggleForm =() => {
        var toggle;
        if (this.props.toggler.id) {
            toggle = false;
        } else {
            toggle = true;
        }

        var status = Object.assign({'id': toggle});
        this.props.toggleStatus(status);
    }

    handleSubmit = event => {
        event.preventDefault();

        // validation
        let errors = {};
        let self = this;
        console.log(self.refs.values.el.val());
        if (this.state.name === '') errors.name = 'Field required';

        this.setState({errors: errors});

        const isValid = Object.keys(errors).length === 0;

        if (isValid) {
            this.setState({loading: true, buttonText: ''});
            const data = new FormData();
            data.append('name', this.state.name);
            var choices = this.state.itemValues;
            data.append('values', JSON.stringify(this.state.itemValues));
            // var value = []
            // for (var i = 0, l = choices.length; i < l; i++) {
            //     data.append('values',choices[i])
            // }

            if (this.props.item.id) {
                // update
                console.log('update me');
                console.log(data);
                console.log(this.props.item);
                api.update(this.props.item.update_url, data)
                    .then(function(data) { // reload items
                        self.props.fetchItems(); // close form
                        self.toggleForm();
                        window.location.reload();
                    })
                    .catch(function(error) { console.log(error); });
            } else {
                // create admissions
                api.create('/finance/item/api/create/', data)
                    .then(function (response) {
                        // alertUser('Data sent successfully');
                        toast.success('Data sent successfully.', {
                            position: toast.POSITION.TOP_RIGHT
                        });

                        self.setState({
                            loading: false,
                            buttonText: 'submit',
                            name: '',
                            update_url: response.data.update_url
                        });

                        // close form
                        self.toggleForm();

                        // reload items
                        self.props.fetchItems();
                    })
                    .catch(function(error) {
                        console.log(error);
                        toast.error('Sorry! try adding a unique fee item.', {
                            position: toast.POSITION.TOP_RIGHT
                        });
                        self.setState({
                            loading: false,
                            buttonText: 'submit',
                            server_errror: ''
                        });
                    });
            }
        }
    }
    render() {
        return (
            <div className="col-md-12">
                <ToastContainer />
                <div className="panel panel-flat">
                    <div className="panel-body  search-panel">

                        <div className="col-md-2">
                            <label> &nbsp;</label>
                            <div className="form-group">
                                <a href="/finance/fee/add/" className={classnames('btn btn-primary hvr-glow btn-raised legitRipple waves-effect waves-light togglebtn', { showbutton: this.props.toggler.id })}>
                                    {!this.props.toggler.id && <span><i className="icon-plus2 position-left"></i>Add</span>}
                                    {this.props.toggler.id && <i className="icon-cross"></i>}
                                </a>
                            </div>
                        </div>

                        <div className={classnames('col-md-4 mini-form', { showform: !this.props.toggler.id })}>
                            <label>Search </label>
                            <div className="form-group form-group-material has-feedback">
                                <input value={this.state.search} name="search" onChange={this.handleChange} className="form-control" placeholder="Search by academic year, class or term..." type="text" />
                                <div className="form-control-feedback">
                                    <i className="icon-search4 text-size-base"></i>
                                </div>
                            </div>
                        </div>

                        <div className={classnames('col-md-10 mini-form', { showform: this.props.toggler.id })}>
                            <div className="error">
                                {!!this.state.server_errror && <div className="ui alert alert-warning negative message"><p>{this.state.server_errror}</p></div>}
                            </div>
                            <table className="table table-xs table-hover fixed">
                                <thead>
                                    <tr className="bg-primary">
                                        <th >Name</th>
                                        <th >Item Choices</th>
                                        <th ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input value={this.state.name} name="name" onChange={this.onSelectChange} className="form-control" placeholder="eg. Transport" type="text"/>
                                            <span className="help-block text-warning">{this.state.errors.name}</span>
                                        </td>
                                        <td>
                                            <Select2
                                                multiple
                                                onChange={this.onMultiSelectChange}
                                                value={ this.state.itemValues }
                                                ref="values"
                                                name="itemValues"
                                                options={{
                                                    width: '100%',
                                                    tags: true,
                                                    tokenSeparators: [',', ' '],
                                                    placeholder: 'eg. Full way, half way'
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <button onClick={this.handleSubmit} className="btn btn-xs btn-primary legitRipple">
                                                {this.state.buttonText}
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        item: state.item,
        items: state.items,
        toggler: state.toggler
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchItems: fetchItems,
        toggleStatus: toggleStatus
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Comp);
