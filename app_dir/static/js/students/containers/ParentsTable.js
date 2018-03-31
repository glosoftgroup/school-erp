import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {selectParent, parentDeleted} from '../actions/parents'
import { saveStudent } from '../actions/actions';
import {selectStep} from '../actions/tab-step'
import api from '../api/Api'

class Comp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            buttonText:'Submit',
            loading: false
        }
    }

    removeparent = (id) =>{
        console.log(id)
        this.props.parentDeleted(id)
    }

    handleSubmit =(event)=> {
        event.preventDefault(); 
        
        var self = this;
        this.setState({loading:true, buttonText:'loading ..'})
        const data = new FormData(); 
        // add parents        
        if(this.props.parents){            
            // data.append('parents',JSON.parse([11,10]))
            // var arr = [12, 10];
            const arr = new Array();
            this.props.parents.map(item => {
                arr.push(item.id)             
            })
            for (var i = 0; i < arr.length; i++) {
                data.append('parents', arr[i]);
            }
        }
        
        api.update(updateUrl,data)
        .then(function (response) {
            alertUser('Data sent successfully');
            self.setState({
                loading:false, buttonText:'submit'
            })             
        })
        .catch(function(error){
            console.error(error)
            return error
        })
    }

    tabNavigator =(back)=>{
        var num;
        if(back){
            num = this.props.step.id -= 1
        }else{
            num = this.props.step.id += 1
        }
        var back = Object.assign({'id':num})
        this.props.selectStep(back)
    }

    render(){
        return (
            <div>
                <table className="table table-xxs table-hover">
                    <thead>
                        <tr className="bg-primary">
                            <th>First Name</th>
                            <th>Middle Name</th>
                            <th>Last Name</th>
                            <th>Mobile</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.parents.map(obj => {
                        return (
                        <tr key={obj.id}>
                            <td>{obj.first_name}</td>
                            <td>{obj.middle_name}</td>
                            <td>{obj.last_name}</td>
                            <td>{obj.mobile}</td>
                            <td onClick={() => this.removeparent(obj.id)} >
                                <i className="icon-trash"></i>
                            </td>
                        </tr>
                        )})
                    }
                    {this.props.parents.length === 0 &&
                     <tr>
                         <td colSpan='4' className="text-center">
                            <h4>No data Found</h4>
                         </td>
                     </tr>
                    }
                        
                    </tbody>
                </table>
                <div className="row">
                <div className="col-md-6 text-left">
                    <button onClick={()=>this.tabNavigator(true)} id="add-room-btn" type="submit" className="btn btn-primary legitRipple">
                        <i className="con-arrow-left7 position-left"></i>Back
                    </button>      
                    
                </div>
                <div className="col-md-6 text-right">

                {this.props.parents.length !== 0 &&
                 (() => {
                    switch (this.props.editable.editable) {
                        case true:   return <button onClick={this.handleSubmit} id="add-room-btn" type="submit" className="btn btn-sm btn-primary legitRipple">
                                            {this.state.buttonText}<i className="icon-arrow-right14 position-right"></i>
                                        </button>;
                        default:      return "";
                    }
                })()}                    
                
                
                </div>
                
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        editable:state.editable,
        student: state.activeStudent,
        parents: state.parents,
        step: state.step
    }
}

// Get actions and pass them as props to to UserList
function matchDispatchToProps(dispatch){
    return bindActionCreators({
        selectParent:selectParent,
        parentDeleted: parentDeleted,
        saveStudent: saveStudent,
        selectStep: selectStep
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Comp);