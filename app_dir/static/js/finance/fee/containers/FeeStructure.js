import React, { Component } from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class FeeStructure extends Component {
    render(){
        return (
            <div>
                <div className="">
                    <div className="panel panel-white">
                    <div className="panel-heading">
                        <h6 className="panel-title text-center text-semibold">Fee Structure<a className="heading-elements-toggle"><i className="icon-more"></i></a></h6>
                       
                    </div>                    

                    <div className="table-responsive">
                        <table className="table table-lg">
                            <thead>
                                <tr>
                                    
                                    <th className="col-sm-1">Item</th>
                                    <th className="col-sm-1">Choice</th>
                                    <th className="col-sm-1">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.fee_items.map(obj => {
                                return (
                                <tr key={obj.id}>
                                    <td>{obj.name}</td>                  
                                    <td>{obj.mobile}</td>
                                    <td onClick={() => this.addToStructure(obj)} >
                                        <input type="text" placeholder="amount" className="form-control" />
                                    </td>
                                </tr>
                                )})
                                }
                                {this.props.fee_items.length === 0 &&
                                    <tr>
                                        <td colSpan='4' className="text-center">
                                        <h4>No data Found</h4>
                                        </td>
                                    </tr>
                                }   
                            
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
        fee_items: state.fee_items
    }
}
// Get actions and pass them as props
function matchDispatchToProps(dispatch){
    return bindActionCreators({}, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(FeeStructure);