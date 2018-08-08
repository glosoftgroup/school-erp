import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import Async from 'react-select/lib/Async';
import { fetchItems } from '../actions';

import { getUsers } from '../utils';

class ItemFilter extends Component {
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
            search: '',
            academicYear: '',
            course: ''
        };
    }

    static propTypes = {
        fetchItems: PropTypes.func.isRequired
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        this.filterContent(e.target.value);
    }

    filterContent=(search, academicYear = null, course = null) => {
        var params = {page_size: 5};
        params = (search) ? { ...params, 'q': search } : params;
        params = (course) ? { ...params, 'course': course } : params;
        params = (academicYear) ? { ...params, 'year': academicYear } : params;
        this.props.fetchItems(params);
    }
    handleSelectChange = (academicYear) => {
        this.setState({ academicYear });
        // selectedOption can be null when the `x` (close) button is clicked
        if (academicYear) {
            console.log(`Selected: ${academicYear.name}`);
        }
        this.filterContent(this.state.search, academicYear.id, this.state.course.id);
    }
    handleSelectCourseChange = (course) => {
        this.setState({ course });
        // selectedOption can be null when the `x` (close) button is clicked
        if (course) {
            console.log(`Selected: ${course.name}`);
        }
        this.filterContent(this.state.search, this.state.academicYear.id, course.id);
    }

    toggleBackspaceRemoves () {
        this.setState({
            backspaceRemoves: !this.state.backspaceRemoves
        });
    }

    getUsers = (input) => {
        // if (!input) {
        //     return Promise.resolve({ options: [] });
        // }
        return getUsers(input, '/academic_year/api/list/');
    }

    getCourse = (input, url) => {
        // if (!input) {
        //     return Promise.resolve({ options: [] });
        // }
        return getUsers(input, '/class/api/list/');
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
                                <a href="/finance/fee/add/"
                                    className={classnames('btn btn-primary hvr-glow btn-raised legitRipple waves-effect waves-light togglebtn', { showbutton: '' })}>
                                    Create New
                                </a>
                            </div>
                        </div>

                        <div className='col-md-3'>
                            <label>Search </label>
                            <div className="form-group form-group-material has-feedback">
                                <input value={this.state.search} name="search" onChange={this.handleChange} className="form-control" placeholder="Search by academic year, class or term..." type="text" />
                                <div className="form-control-feedback">
                                    <i className="icon-search4 text-size-base"></i>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label>Academic Year</label>
                            <Async
                                isClearable={true}
                                label={'academicYear'}
                                value={this.state.academicYear}
                                onChange={this.handleSelectChange}
                                getOptionLabel={({name}) => name}
                                getOptionValue={({id}) => id}
                                loadOptions={this.getUsers}
                            />

                        </div>
                        <div className="col-md-3">
                            <label>Class</label>
                            <Async
                                isClearable={true}
                                cacheOptions
                                placeholder={'Search class'}
                                value={this.state.course}
                                onChange={this.handleSelectCourseChange}
                                getOptionLabel={({name}) => name}
                                getOptionValue={({id}) => id}
                                loadOptions={this.getCourse}
                                backspaceRemoves={this.state.backspaceRemoves}
                            />

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

export default connect(mapStateToProps, matchDispatchToProps)(ItemFilter);
