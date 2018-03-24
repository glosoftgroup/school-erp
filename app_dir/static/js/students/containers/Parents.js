import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Select2 from 'react-select2-wrapper';
import {selectParent, addParent} from '../actions/parents'
import api from '../api/Api'
import ParentsTable from './ParentsTable'

class Comp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          first_name:'',
          last_name:'',
          middle_name:'',
          mobile:'',
          description:'',
          email:'',
          buttonText:'submit',
          loading: false,
          parent:'', errors:{}, server_errror:''
        };
    }

    componentDidMount() {
        
    }

    componentWillReceiveProps(nextProps){
        console.warn(nextProps.parents)
    }

    onChange = (e) => {
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
   
    handleSubmit =(event)=> {
        event.preventDefault();

        // validate
        let errors = {};
        let self = this;
        if(this.state.first_name === '') errors.first_name = 'Field required';
        if(this.state.middle_name === '') errors.middle_name = 'Field required';
        if(this.state.last_name === '') errors.last_name = 'Field required';
        if(this.state.mobile === '') errors.mobile = 'Field required'

        this.setState({errors:errors});

        const isValid = Object.keys(errors).length === 0;

        if(isValid){
            // add parent
            this.setState({loading:true, buttonText:'loading ..'})
            const data = new FormData(event.target);

            // create admissions
            api.create('/parent/api/create/',data)
            .then(function (response) {
                alertUser('Data sent successfully');
                self.setState({
                    loading:false, buttonText:'submit'
                })                   
                self.props.addParent(response.data)
            })
            .catch(function(error){
                self.setState({
                    errors:error.response.data,
                    loading:false, buttonText:'submit'
                })
                return error
            })
        }
        
    }    

    render() {
        var _options =    {
            placeholder: 'Select Parent',
            allowClear: false,
            dropdownAutoWidth:true,
            formatSelection: function(item){return item.name},
            formatResult: function(item){return item.name},
            ajax: {
                url: function (params) {
                  return '/parent/api/list'+'?' + params.term;
                },
                processResults: function (data) {
                  // Tranforms the top-level key of the response object from 'items' to 'results'
                  data = data.results;
                  return {
                        results :
                            data.map(function(item) {                    
                                return {
                                    id : item.id,
                                    text : item.name
                                };
                            }
                    )};
                }
              },
              debug: true,
              delay: 250,
          }      
        
        return (
            <div>
                <div className="hidden">
                <Select2 
                onChange = {this.onChange}
                name = 'parent'
                value = {this.state.parent}
                options={ _options}/>
                </div>

                {/* add new parent */}
                <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
                    <div className="col-md-12">
                    {!!this.state.server_errror && <div className="ui alert alert-warning negative message"><p>{this.state.server_errror}</p></div>} 
                    </div>
                    <div className="col-md-6"> 
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-4">
                                <label className="text-bold">First Name:<span className="text-danger">*</span></label>
                                <input value={this.state.first_name} onChange={this.onChange} required className="form-control" name="first_name" id="first_name" placeholder="First name" type="text"/>
                                <span className="help-block text-warning">{this.state.errors.first_name}</span>
                            </div>
                            <div className="col-md-4">
                                <label className="text-bold">Middle Name:<span className="text-danger">*</span></label>
                                <input value={this.state.middle_name} onChange={this.onChange} required className="form-control" name="middle_name" id="name" placeholder="Middle name" type="text"/>
                                <span className="help-block text-warning">{this.state.errors.middle_name}</span>
                            </div>
                            <div className="col-md-4">
                                <label className="text-bold">Last Name:<span className="text-danger">*</span></label>
                                <input value={this.state.last_name} onChange={this.onChange} required className="form-control" name="last_name" id="last_name" placeholder="Last name" type="text"/>
                                <span className="help-block text-warning">{this.state.errors.last_name}</span>
                            </div>                        
                        </div>
                    </div>
                    <div className="form-group">

                        <div className="row">
                            <div className="col-md-4">
                                <label className="text-bold">Mobile:<span className="text-danger">*</span></label>
                                <input value={this.state.mobile} onChange={this.onChange} required className="form-control" name="mobile" id="mobile" placeholder="Mobile No." type="text"/>
                                <span className="help-block text-warning">{this.state.errors.mobile}</span>
                            </div>

                            <div className="col-md-4">
                                <label className="text-bold">Email:</label>
                                <input value={this.state.email} onChange={this.onChange}  className="form-control" name="email" id="email" placeholder="email@example.com" type="text"/>
                                <span className="help-block text-warning">{this.state.errors.email}</span>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-md-6">                
                        <div className="form-group">
                            <label className="text-bold"> Description:</label>
                            <textarea value={this.state.description} onChange={this.onChange} rows="5" cols="5" className="form-control" id="description" name="description" placeholder="Enter room description here" />
                            
                            <span className="help-block text-warning"></span>
                        </div>
                    </div>
                    <div className="text-right col-md-12">
                        <button id="add-room-btn" type="submit" className="btn btn-primary legitRipple">
                        {this.state.buttonText}<i className="icon-arrow-right14 position-right"></i>
                        </button>
                    </div> 
                </form>

                {/* list parents */}
                <ParentsTable/>
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
        selectParent:selectParent,
        addParent: addParent
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Comp);