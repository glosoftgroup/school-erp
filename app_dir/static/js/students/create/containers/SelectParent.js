import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Select2 from 'react-select2-wrapper';
import {selectParent, addParent} from '../actions/parents'
import api from '../api/Api'

class Comp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {          
          parent:'', errors:{}, server_errror:''
        };
    }

    componentDidMount() {
        
    }

    componentWillReceiveProps(nextProps){
        console.warn(nextProps.parents)
    }

    onChange = (e) => {        
        this.setState({
            [e.target.name]: e.target.value
        }); 
        
        api.retrieve('/parent/api/update/'+e.target.value) 
        .then(data => this.props.addParent(data.data))
        .catch((error) =>{ console.log(error) })
        
    }
   
    handleSubmit =(event)=> {
        event.preventDefault();          
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
                
                <div className="col-md-8 col-md-offset-2">
                    <div className="form-group">
                    <Select2 
                    onChange = {this.onChange}
                    name = 'parent'
                    value = {this.state.parent}
                    options={ _options}/>
                    </div>
                </div>
                
                
                   
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