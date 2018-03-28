import React from 'react'
import api from '../api/Api'
import moment from 'moment';
import {selectStudents, toggleStatus} from '../actions/students'
import {connect} from 'react-redux';
import Toggle from 'react-toggle'
import Loader from 'react-loaders'
import { ToastContainer, toast } from 'react-toastify';
import "react-toggle/style.css" 
import 'loaders.css/src/animations/line-scale.scss'

class Comp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            status: true,
            loading: false,
            date:'',
            buttonText: 'Submit'
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.date.date.date){
            console.log(nextProps.date)
            this.setState({date:nextProps.date.date})
        }     
        
    }

    formatDate = (date) =>{
        return moment(date).format('LL')
    }

    notify = () => toast("Data sent successfully !");

    handleInputChange = event =>{
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
    }

    toggleStatus = (obj) =>{        
        let status = 1
        console.log(obj.status)
        status = (obj.status === undefined || obj.status === 1) ? 0 : 1        
        let payload = Object.assign({}, obj, {"status":status})
        console.log(payload)
        this.props.toggleStatus(payload)
    }

    handleSubmit = (e) =>{
        e.preventDefault(); 
        var self = this;
        
        // button loading
        self.setState({loading:true, buttonText: ''})
        // create attendace foreact student
        let attended = 1
        let count = 0
        let objLength = this.props.students.length
        this.props.students.map(obj => {
            attended = (obj.status === undefined || obj.status === 1) ? 1: 0

            count += 1
            // append filter data
            let data = new FormData();
            data.append('course',this.props.course.id)
            data.append('academic_year',this.props.academic_year.id)
            data.append('date',this.props.date.date)
            data.append('student', obj.id);
            data.append('attended', attended)                        
            
            api.create('/attendance/api/create/', data)
            .then(function(data){
                console.log(data)
                self.notify()
            })
            .catch(function(error){
                 console.error(error)
                 toast.error("Sorry!! You can only check attendance once per day!", {
                    position: toast.POSITION.TOP_RIGHT
                  });
            })
            if(count >= objLength){
               self.setState({loading:false, buttonText: 'submit'})
            }
        })

        
    }

    render(){
        var self = this;
        return(
            <div>
                <ToastContainer />
                <table className="panel panel-body table table-xs table-hover">
                <thead>
                    <tr className="bg-primary">
                        <th>Adm No.</th>
                        <th>First Name</th>
                        <th>Middle Name</th>
                        <th>Last Name</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.students.map(obj => {
                    return (
                    <tr key={obj.id}>
                        <td>{obj.adm_no}</td>
                        <td>{obj.first_name}</td>
                        <td>{obj.middle_name}</td>
                        <td>{obj.last_name}</td>
                        <td>{this.formatDate(self.props.date.date)}</td>
                        <td  >                        
                            <Toggle
                                defaultChecked={this.state.status}
                                onChange={function(e) {
                                            console.log(e.target.value);
                                            self.toggleStatus(obj)
                                            e.target.value = 'no'                                           
                                        }
                                    }
                                name='status'
                                value='yes' />                          
                        </td>
                    </tr>
                    )})
                }
                {this.props.students.length === 0 &&
                    <tr>
                        <td colSpan='4' className="text-center">
                        <h4>No data Found</h4>
                        </td>
                    </tr>
                }
                    
                </tbody>
            </table>
            <div className="col-md-12 text-center">
            {this.props.students.length !== 0 &&                     
            <button onClick={this.handleSubmit} id="add-room-btn" type="submit" className="btn btn-sm btn-primary legitRipple">
               {!!this.state.loading && <Loader type="line-scale"  /> }{this.state.buttonText}
            </button>
            }
            </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        students: state.students,
        academic_year: state.academic_year,
        date: state.date,
        course: state.course
    }
}

export default connect(mapStateToProps, {toggleStatus, selectStudents})(Comp);