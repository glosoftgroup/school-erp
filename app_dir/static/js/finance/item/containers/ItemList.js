import React, { Component } from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Pagination from "react-js-pagination";
import api from '../api/Api'
import { selectItems } from '../actions/action-items'

class Comp extends Component {
    constructor(props) {
        super(props);
        this.state = {
          activePage: 15,
          totalPages: 450
        };
    }
    
    componentWillMount(){
        // fetch items
        var self = this;
        api.retrieve('/finance/item/api/list/')
        .then(data => self.props.selectItems(data.data.results))
    }
    
    handlePageChange =(pageNumber)=> {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
    }

    render(){
        return (
            <div className="">             
                <div className="col-md-12"> 
                    <div className="panel panel-flat">
                        <div className="panel-body  search-panel">
                    
                            <table className="table table-xs table-hover">
                                <thead>
                                    <tr className="bg-primary">
                                        <th>Name</th>
                                        <th>Choices</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.props.items.map(obj => {
                                    return (
                                    <tr key={obj.id}>
                                        <td>{obj.name}</td>
                                        <td>{obj.middle_name}</td>
                                        
                                        <td onClick={() => this.removeparent(obj.id)} >
                                            <i className="icon-trash"></i>
                                        </td>
                                    </tr>
                                    )})
                                }
                                {this.props.items.length === 0 &&
                                <tr>
                                    <td colSpan='3' className="text-center">
                                        <h4>No data Found</h4>
                                    </td>
                                </tr>
                                }
                                    
                                </tbody>
                            </table>

                            <div className="col-md-12 text-center mb-15">
                                <Pagination
                                    activePage={this.state.activePage}
                                    itemsCountPerPage={10}
                                    totalItemsCount={1}
                                    pageRangeDisplayed={5}
                                    onChange={this.handlePageChange}
                                    />
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
        items: state.items
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        selectItems: selectItems
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Comp);