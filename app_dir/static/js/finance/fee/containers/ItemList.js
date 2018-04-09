import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import api from '../api/Api'
import {setItems} from '../actions/action-items'
import { addFeeItem } from '../actions/action-fee-item'

class ItemList extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }
   
    componentDidMount (){
        var self = this;
        api.retrieve('/finance/item/api/list/')    
        .then(function(data){
            self.props.setItems(data.data.results)
        })
        .catch(function(error){
            console.log(error)
        })
  }
  
  addToStructure = (obj) =>{
    // console.log(obj)
    this.props.addFeeItem(obj)
  }
  

  render() {
    return (
      <div>
        <table className="table table-xs table-hover">
            <thead>
                <tr className="bg-primary">
                    <th>Name</th>
                    <th></th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {this.props.items.map(obj => {
                return (
                <tr key={obj.id}>
                    <td>{obj.name}</td>                  
                    <td>{obj.mobile}</td>
                    <td onClick={() => this.addToStructure(obj)} >
                        <button className="btn btn-sm bg-primary">add</button>
                    </td>
                </tr>
                )})
            }
            {this.props.items.length === 0 &&
                <tr>
                    <td colSpan='4' className="text-center">
                    <h4>No data Found</h4>
                    </td>
                </tr>
            }
                
            </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps(state) {
    return {
        items: state.items
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        addFeeItem: addFeeItem,
        setItems: setItems
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ItemList)
