import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';
import Select2 from 'react-select2-wrapper';
import api from '../api/Api';
import Modal from '../components/Modal';
import formatNumber from '../../../common/NumberFormatter';

import { fetchItems, deleteItem, selectItem } from '../actions/action-items';

class ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            totalPages: 450,
            itemsCountPerPage: 10,
            show: false,
            edit: false,
            deleteUrl: 'url',
            item: {},
            pageSizes: [
                { 'text': '5', 'id': '5' },
                { 'text': '10', 'id': '10' },
                { 'text': '20', 'id': '20' }
            ]
        };
    }

    componentWillMount() {
    // fetch items
        this.props.fetchItems();
    }

    onSelectChange=(e) => {
        this.setState({
            [e.target.name]: e.target.value
        });

        this.filterContent();
    }

    filterContent=(page = 1) => {
        var params = Object.assign({
            page_size: this.state.itemsCountPerPage,
            page: page
        });
        if (this.state.search) {
            params = Object.assign(params, {'q': this.state.search});
        }
        // update store
        this.props.fetchItems(params);
    }

    handlePageChange =(pageNumber) => {
        // console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
        this.filterContent(pageNumber);
    }

    handleClose =() => {
        this.setState({ show: false });
    }

    handleShow =(url, obj) => {
        this.setState({ show: true, deleteUrl: url, item: obj });
    }

    handleEditClose =() => {
        this.setState({ show: false });
    }

    handleEditShow =() => {
        this.setState({ edit: true });
    }

    deleteItem = () => {
        var self = this;
        api.delete(this.state.deleteUrl)
            .then((data) => { self.setState({show: false}); })
            .then(function(data) { self.filterContent(self.state.activePage); })
            .catch(function(error) { console.log(error); });
    }

    selectItem = (obj) => {
        this.props.selectItem(obj);
        this.handleEditShow();
    }
    goTo = (url) => {
        window.location.href = url;
    }

    render() {
        return (
            <div className="">

                <Modal deleteInstance={this.deleteItem} show={this.state.show} handleShow={this.handleShow} handleClose={this.handleClose} />

                <div className="col-md-12">
                    <div className="panel panel-flat">
                        <div className="panel-body">

                            <table className="table table-xs table-hover">
                                <thead>
                                    <tr className="bg-primary">
                                        <th>Academic Year</th>
                                        <th>Class</th>
                                        <th>Term</th>
                                        <th>Amount</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.items.results.map(obj => {
                                        return (
                                            <tr key={obj.id}>
                                                <td className="cursor-pointer" onClick={() => this.goTo(obj.update_view_url)}>{obj.academic_name}</td>
                                                <td className="cursor-pointer" onClick={() => this.goTo(obj.update_view_url)}>{obj.course_name}</td>
                                                <td className="cursor-pointer" onClick={() => this.goTo(obj.update_view_url)}>{obj.term_name}</td>
                                                <td className="cursor-pointer" onClick={() => this.goTo(obj.update_view_url)}>{formatNumber(obj.amount, 2, '.', ',')}</td>
                                                <td >
                                                    <ul className="icons-list">
                                                        <li className="dropdown">
                                                            <button type="button" data-toggle="dropdown" aria-expanded="true" className="btn btn-xs btn-primary dropdown-toggle legitRipple">
                                                Actions<span className="caret"></span>
                                                            </button>
                                                            <ul className="dropdown-menu-xs dropdown-menu">
                                                                <li>
                                                                    <a href={obj.update_view_url}>
                                                                        <i className="icon-eye"></i> View
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href={obj.update_url}>
                                                                        <i className="icon-pencil"></i> Edit
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a onClick={() => { this.handleShow(obj.delete_url, obj); }} href="javascript:;"><i className="icon-trash-alt"></i> Delete</a>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                        );
                                    })
                                    }
                                    {this.props.items.results.length === 0 &&
                      <tr>
                          <td colSpan='5' className="text-center">
                              <h4>No data Found</h4>
                          </td>
                      </tr>
                                    }

                                </tbody>
                            </table>

                            <div className="row text-center mb-15">
                                <div className="col-md-2 mt-15">
                                    <Select2
                                        data={this.state.pageSizes}
                                        onChange={this.onSelectChange}
                                        value={ this.state.itemsCountPerPage }
                                        name="itemsCountPerPage"
                                        options={{
                                            minimumResultsForSearch: -1,
                                            placeholder: 'Select Page size'
                                        }}
                                    />
                                </div>
                                <div className="col-md-8 mt-15">
                                    <Pagination
                                        activePage={this.state.activePage}
                                        itemsCountPerPage={this.state.itemsCountPerPage}
                                        totalItemsCount={this.props.items.count}
                                        pageRangeDisplayed={5}
                                        onChange={this.handlePageChange}
                                    />
                                </div>
                                <div className="col-md-2 mt-15">Page {this.state.activePage} of {this.props.items.total_pages}</div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

ItemList.propTypes = {
    fetchItems: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    selectItem: PropTypes.func.isRequired,
    items: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        items: state.items
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchItems: fetchItems,
        deleteItem: deleteItem,
        selectItem: selectItem
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ItemList);
