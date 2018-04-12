import React, { Component } from 'react'
import classnames from 'classnames';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Select2 from 'react-select2-wrapper';
import { Modal, Tooltip, Button, OverlayTrigger } from 'react-bootstrap';
import api from '../api/Api'
import { fetchItems } from '../actions/action-items'
import { toggleStatus } from '../actions/action-form-status'

class EditModal extends Component {
    constructor(props){
        super(props);
        this.state  = {
            name:'',
            itemValues:'1',
            itemValues2:'1',
            loading: false,
            allowEdit: false,
            buttonText: 'add',
            errors: {},
            server_errror: '',
            search: ''
        }
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });

        this.filterContent()
    }

    filterContent=()=>{
        var params = Object.assign({page_size:5})
        if(this.state.search){
            params = Object.assign(params,{'q':this.state.search});
        }
        this.props.fetchItems(params)
    }

    onMultiSelectChange = (e) =>{
        if(!this.props.item.id){
            var value = [];
            var options = e.target.options;
            for (var i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                    value.push(options[i].value);
                }
            }
            this.setState({itemValues: value});
        }
       
        
    }
   
    componentDidUpdate(){
        // var element = document.getElementById("values");
        // console.log(element)
        // console.log(this.props.item)
        // if(this.props.item.id){
        //     var value = [];
        //     var options = this.props.item.values;            

        //     for (var i = 0, l = options.length; i < l; i++) {                
        //         value.push(options[i].name); 
        //         var element = document.getElementById("values");
        //         element.select2({   
        //             width:'100%',
        //             tags: true,
        //             tokenSeparators: [",", " "],}).append('<option value="' +options[i].name
        //                + '">' +options[i].name + '</option>');               
        //     }
        //     this.setState({
        //         name:this.props.item.name,
        //         itemValues: value,
        //         allowEdit:true
        //     })
        //     element.trigger("change");

        // }
            
    }

    componentWillReceiveProps(nextProps){        
        if(nextProps.item.id){
            // var value = [];
            // var options = nextProps.item.values;            

            // for (var i = 0, l = options.length; i < l; i++) {                
            //     value.push(options[i].name); 
            //     var elementdd = document.getElementById("values");
            //     elementdd.select2({   
            //         width:'100%',
            //         tags: true,
            //         tokenSeparators: [",", " "],}).append('<option value="' +options[i].name
            //            + '">' +options[i].name + '</option>');               
            // }
            // this.setState({
            //     name:nextProps.item.name,
            //     itemValues: value,
            //     allowEdit:true
            // })
            // elementdd.trigger("change");
            
            window.scrollTo(0, 0);

       
           
        }else{
            
        }       
        
    }

    handleSubmit = event =>{
        event.preventDefault();  
        
        // validation
        let errors = {};
        let self = this;
        console.log(self.refs.values.el.val())
        if(this.state.name === '') errors.name = 'Field required';
        
        this.setState({errors:errors});

        const isValid = Object.keys(errors).length === 0;

        if(isValid){
            this.setState({loading:true, buttonText:''})
            const data = new FormData();
            data.append('name',this.state.name)
            var choices = this.state.itemValues
            data.append('values',JSON.stringify(this.state.itemValues))
            // var value = []
            // for (var i = 0, l = choices.length; i < l; i++) {
            //     data.append('values',choices[i])
            // }

            if(this.props.item.id){
                // update
                console.log('update me')
                console.log(data)
                console.log(this.props.item)
                api.update(this.props.item.update_url, data)
                .then(function(data){// reload items                
                    self.props.fetchItems(); // close form
                    self.toggleForm();})
                .catch(function(error){console.log(error)})

            }else{
               // create admissions
                api.create('/finance/item/api/create/',data)
                .then(function (response) {
                    // alertUser('Data sent successfully');
                    toast.success("Data sent successfully.", {
                        position: toast.POSITION.TOP_RIGHT
                    });

                    self.setState({
                        loading:false, buttonText:'submit',
                        name:'',
                        update_url:response.data.update_url
                    }) 

                    // close form
                    self.toggleForm();
                    
                    // reload items                
                    self.props.fetchItems()

                }) 
                .catch(function(error){
                    console.log(error)
                    toast.error("Sorry! try adding a unique fee item.", {
                        position: toast.POSITION.TOP_RIGHT
                      });
                    self.setState({
                        loading:false, buttonText:'submit',
                        server_errror: ''
                    }) 
                })
            }      
            
             
        }
    }
  
    render() {
     

      const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;
  
      return (
        <div>         
          <Modal show={this.props.show} onHide={this.props.handleClose}>
            <Modal.Header closeButton className="modal-header bg-primary">
              <Modal.Title>Edit Fee Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
             
             
              <div  className={classnames('col-md-10 mini-form', { showform : this.props.toggler.id })}>
                        <div className="error">
                            {!!this.state.server_errror && <div className="ui alert alert-warning negative message"><p>{this.state.server_errror}</p></div>} 
                            </div>
                            <table className="table table-xs table-hover fixed">
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
                                        <input value={this.state.name} name="name" onChange={()=>{this.onSelectChange}} className="form-control" placeholder="eg. Transport" type="text"/>
                                        
                                        <span className="help-block text-warning">{this.state.errors.name}</span>
                                    </td>            
                                    <td>
                                        {this.selectN()}
                                    <Select2
                                        multiple
                                        onChange={this.onMultiSelectChange}
                                        value={ this.state.itemValues }
                                        ref="values"
                                        id="values"
                                        name="itemValues"
                                        options={{   
                                            width:'100%',
                                            tags: true,
                                            tokenSeparators: [",", " "],                                         
                                            placeholder: 'eg. Full way, half way',
                                        }}
                                    /> 
                                    </td>
                                    <td>
                                        <button onClick={this.handleSubmit} className="btn btn-xs btn-primary legitRipple">
                                            {this.state.buttonText} 
                                        </button>  
                                    </td>
                                </tr>
                                </tbody>      
                            </table>
                        </div>           
  
              
            </Modal.Body>
            <Modal.Footer className="text-center">
              <Button onClick={this.props.handleClose}>Close</Button>
              <Button bsStyle="warning" bsSize="small" onClick={this.props.deleteInstance}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }

function mapStateToProps(state) {
    return {
        item: state.item,
        items: state.items,
        toggler: state.toggler
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        fetchItems: fetchItems,
        toggleStatus: toggleStatus
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(EditModal);