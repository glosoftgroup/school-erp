import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ToastContainer, toast } from 'react-toastify';
import api from '../api/Api';
import { fetchItems } from '../actions/action-items';

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

    static propTypes = {
        fetchItems: PropTypes.func.isRequired,
        toggleStatus: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired
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
            data.append('values', JSON.stringify(this.state.itemValues));
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
                                <a href="/student/fee/add/" className={classnames('btn btn-primary hvr-glow btn-raised legitRipple waves-effect waves-light togglebtn', { })}>
                                    { <span><i className="icon-plus2 position-left"></i>Add</span>}
                                    
                                </a>
                            </div>
                        </div>

                        <div className={classnames('col-md-4 ', { })}>
                            <label>Search </label>
                            <div className="form-group form-group-material has-feedback">
                                <input value={this.state.search} name="search" onChange={this.handleChange} className="form-control" placeholder="Search by academic year, class or term..." type="text" />
                                <div className="form-control-feedback">
                                    <i className="icon-search4 text-size-base"></i>
                                </div>
                            </div>
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
        fetchItems: fetchItems
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Comp);
