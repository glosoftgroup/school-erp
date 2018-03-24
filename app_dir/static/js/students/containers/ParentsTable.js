import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {selectParent} from '../actions/parents'
import api from '../api/Api'
class Comp extends React.Component{

    render(){
        return (
            <div>
                <table className="table table-xxs">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Middle Name</th>
                            <th>Last Name</th>
                            <th>Mobile</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.parents.map(obj => {
                        return (
                        <tr>
                            <td>{obj.first_name}</td>
                            <td>{obj.middle_name}</td>
                            <td>{obj.last_name}</td>
                            <td>{obj.mobile_name}</td>
                        </tr>
                        )})
                    }
                        <tr>
                            <td>2</td>
                            <td>Victoria</td>
                            <td>Baker</td>
                            <td>@Vicky</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>James</td>
                            <td>Alexander</td>
                            <td>@Alex</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Franklin</td>
                            <td>Morrison</td>
                            <td>@Frank</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        student: state.activeStudent,
        parents: state.parents
    }
}

// Get actions and pass them as props to to UserList
function matchDispatchToProps(dispatch){
    return bindActionCreators({
        selectParent:selectParent
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Comp);