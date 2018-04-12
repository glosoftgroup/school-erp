import React, { Component } from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import api from '../api/Api'
import { addFeeItem, deleteFeeItem } from '../actions/action-fee-item'
import ItemChoices from './Choices'
import ItemAmount from './Amount'

class FeeStructure extends Component {
    constructor(props){
        super(props)
        this.state = {
            amount:'',
            total:0,
            errors:false,
            showHideBtn: 'hidden',
            updateJson: {}
        }
    }

    componentWillReceiveProps(nextProps){
        this.getTotal(nextProps.fee_items)

        // ensure you update fee item onces and items are set
        if(Object.keys(nextProps.items).length > 0 && Object.keys(this.state.updateJson).length > 0){            
            this.prepareFeeItem(this.state.updateJson)
            // reset updateJson
            this.setState({updateJson:{}})
            
        }
    }

    prepareFeeItem = (items) =>{
        items.map((value,index)=>{
           // add one fee item at a go
           this.addFeeItem(value) 
        })
    }

    addFeeItem = (obj) =>{
        this.props.items.map((item,index) =>{           
            // add fee item        
            if(item.id === obj.choice.id){
                // append amount
                console.error('found a match')
                var copy = { ...item, amount: obj.amount };
                this.props.addFeeItem(copy)
            }
        })
        //this.props.addFeeItem()
    }
    
    componentDidMount = () => {
        var self = this;
        if(pk){
            // fetch fee structure
            api.retrieve('/finance/fee/api/update/'+pk+'/')
            .then(function(data){
                self.setState({updateJson: data.data.fee_items})
            })
            .catch(function(error){
                console.error(error)
            })
        }
    }    

    getTotal = (items) =>{
        let sum = 0;
        items.forEach((num) => {
            if(num.amount){
                sum += parseInt(num.amount)
                this.setState({errors:false})
            }else{
                this.setState({errors:true})
            }            
        });
        sum = this.formatNumber(sum, 2, '.', ',');
        this.setState({total:sum})
    }

    formatText = (text) => {
        var cleanedText = text.replace(/[0-9]/g, '').replace('[.]','');
        return cleanedText;
    }

    formatNumber = (n, c, d, t) =>{
        var c = isNaN(c = Math.abs(c)) ? 2 : c,
                d = d === undefined ? '.' : d,
                t = t === undefined ? ',' : t,
                s = n < 0 ? '-' : '',
                i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
                j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
    };

    handleSubmit = event =>{
        event.preventDefault(); 

        // validation
        if(this.state.errors){  
            console.log('in errors')          
            toast.error("Make sure fee item amount field is not empty!", {
                position: toast.POSITION.TOP_RIGHT
              });
            return;
        }
        if(this.state.total < 1){
            console.log('total errors')
            console.log(this.state.total)
            toast.error("Make sure fee item amount field is not empty!", {
                position: toast.POSITION.TOP_RIGHT
              });
            return;
        }

        const data = new FormData();

        data.append('term',this.props.term.id)
        data.append('course',this.props.course.id)
        data.append('academic_year', this.props.academic_year.id)
        data.append('amount', this.state.total.replace(',',''))
        data.append('fee_items',JSON.stringify(this.props.fee_items))
        
        api.create('/finance/fee/api/create/',data)
           .then(function (response) {
               
               toast.success("Data send successfully !", {
                position: toast.POSITION.TOP_RIGHT
              });
            })
            .catch(function(error){
                console.log(error)
            })
    }

    getInitialState = () => {
        return {"showHideBtn":"hidden"};
    }

    toggleDeletenav = () => {
        var css = (this.state.showHideBtn === "hidden") ? " animated fadeIn" : "hidden";
        this.setState({"showHideBtn":css});
    }

    deleteFeeItem = (id) => {
        this.props.deleteFeeItem(id)
    }

    render(){
        return (
            <div>
                <ToastContainer />
                <div className="">
                    <div className="panel panel-white">
                    <div className="panel-heading">
                        <h6 className="panel-title text-center text-semibold"> Fee Structure
                        <a className="heading-elements-toggle"><i className="icon-more"></i></a></h6>
                       
                    </div>                    

                    <div className="table-responsive">
                        <table className="table table-sm">
                            <thead>
                                <tr className="bg-primary">                                    
                                    <th className="col-sm-1">Item</th>
                                    <th className="col-sm-1">Choice</th>
                                    <th className="col-sm-1">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.fee_items.map(obj => {
                                return (
                                <tr key={obj.id} onMouseLeave={this.toggleDeletenav} onMouseEnter={this.toggleDeletenav}>
                                    <td>
                                        <span>
                                            <i onClick={()=>{this.deleteFeeItem(obj.id)}} className='icon-cross cursor-pointer text-warning'></i>
                                            &nbsp;{this.formatText(obj.name)}
                                        </span>                                     
                                    </td>                  
                                    <td><ItemChoices instance={obj}/></td>
                                    <td  >
                                        <ItemAmount instance={obj} />
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
                            <tfoot>
                                <tr style={{backgroundColor:"#EEEDED"}}>
                                    <th>
                                        <button onClick={this.handleSubmit} className="btn btn-primary btn-sm">Add</button>
                                    </th>
                                    <th className="text-center text-bold" colSpan={3}>Total: KES {this.state.total}</th>
                                </tr>
                            </tfoot>
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
        academic_year: state.academic_year,
        course: state.course,
        fee_items: state.fee_items,
        items: state.items,
        term: state.term,
        total: state.total
    }
}
// Get actions and pass them as props
function matchDispatchToProps(dispatch){
    return bindActionCreators({
        addFeeItem,
        deleteFeeItem
    }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(FeeStructure);