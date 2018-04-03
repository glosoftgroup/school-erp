import React, { Component } from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classnames from 'classnames';
import api from '../api/Api'
import { selectItems } from '../actions/action-items'
import { toggleStatus } from '../actions/action-form-status'

class Comp extends Component {
    constructor(props){
        super(props);
        this.state  = {
            name:'',
            loading: false,
            buttonText: 'add',
            errors: {},
            server_errror: '',
        }
    }

    onSelectChange = (e) => {
        if(!!this.state.errors[e.target.name]){
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];             
                    
            this.setState({
                [e.target.name]: e.target.value,
                errors:errors
            });
        }else{
            this.setState({
                [e.target.name]: e.target.value
            });
        } 
        
    }

    toggleForm =()=>{
        var toggle;
        if(this.props.toggler.id){
            toggle = false
            console.log(typeof this.props.toggler)
            this.props.toggleStatus(!this.props.toggler.id)
            console.log('toggle is true')
            console.log('toggle to'+ this.props.toggler.id)
        }else{
            toggle = true
            console.log(typeof this.props.toggler.id)
            console.log('toggle is false')
            this.props.toggleStatus(!this.props.toggler.id)
            console.log('toggle to'+ this.props.toggler.id)
        }

        // var status = Object.assign({'id':toggle})
        // this.props.toggleStatus(status)
    }

    handleSubmit = event =>{
        event.preventDefault();  

        // validation
        let errors = {};
        let self = this;
        if(this.state.name === '') errors.name = 'Field required';
        
        this.setState({errors:errors});

        const isValid = Object.keys(errors).length === 0;

        if(isValid){
            this.setState({loading:true, buttonText:''})
            const data = new FormData();
            data.append('name',this.state.name)

            // create admissions
            api.create('/finance/item/api/create/',data)
            .then(function (response) {
                alertUser('Data sent successfully');
                self.setState({
                    loading:false, buttonText:'submit',
                    update_url:response.data.update_url
                })                 
            })
            // .then(data => self.props.saveAdmission(data))
            .catch(function(error){
                console.log(error)
                self.setState({
                    loading:false, buttonText:'submit',
                    server_errror: error
                }) 
            })
             
        }
    }
    render(){
        return (
            <div className="col-md-12">
                <div className="panel panel-flat">
                    <div className="panel-body  search-panel">

                        <div className="col-md-2">
                            <label> &nbsp;</label>
                            <div className="form-group">
                                <button id="toggle-add-form" onClick={this.toggleForm} className="btn btn-primary hvr-glow btn-raised legitRipple waves-effect waves-light">
                                    <i className="icon-plus2 position-left"></i>Add
                                </button>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <label>Search </label>
                            <div className="form-group form-group-material has-feedback">
                                <input className="form-control" placeholder="Search ..." type="text" />
                                <div className="form-control-feedback">
                                <i className="icon-search4 text-size-base"></i>
                                </div>
                            </div>
                        </div>
                       
                        <span  className={classnames('foo', { hidden : this.props.toggler.id })}>
                        <div className="error">
                            {!!this.state.server_errror && <div className="ui alert alert-warning negative message"><p>{this.state.server_errror}</p></div>} 
                            </div>
                            <table className="table table-hover fixed">
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
                                    <td></td>
                                    <td>
                                    <button onClick={this.handleSubmit} className="btn btn-xs btn-primary legitRipple">
                                        {this.state.buttonText} 
                                    </button>  
                                    </td>
                                </tr>
                                </tbody>      
                            </table>
                        </span>

                    </div>
                </div>
                
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        items: state.items,
        toggler: state.toggler
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        selectItems: selectItems,
        toggleStatus: toggleStatus
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Comp);