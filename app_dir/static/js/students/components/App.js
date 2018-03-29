import React from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames'
import ImagePreview from '../containers/ImagePreview'
import Tabs from './Tabs'
import {selectStep} from '../actions/tab-step'
import 'react-tabs/style/react-tabs.css';
import '../css/styles.scss';
import '../css/avatar.styles.scss'
import '../css/breadcrumbs.scss'

class CrudForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          name: '',
          step:1,
          disable:true
      }; 
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.student.id){
           this.setState({disable:false}) 
        }       
    } 
    
    navigate = (step)=>{
        let tab = Object.assign({'id':step})
        console.log(step)
        this.props.selectStep(tab)
    }

    render(){
        var inputProps = {
            disabled: this.state.disable
        };
        return(
            <div className="row panel panel-default">
                <div className="col-md-2">
                    <ImagePreview/>
                </div>
                <div className="col-md-10">
                    <div className="a">
                        <div className="panel-body">
                            {/* tabs */}
                            <div className="btn-group btn-group-justified">
									<div className="btn-group">
										<button onClick={()=>{this.navigate(1)}} type="button" className={classnames("btn tab-btn custom-tab ", {"active-tab": this.props.step.id == 1} )}>Bio Data</button>
									</div>

									<div className="btn-group">
										<button onClick={()=>{this.navigate(2)}} type="button" className={classnames("btn tab-btn custom-tab ", {"active-tab": this.props.step.id == 2} )}>Academic Admissions</button>
									</div>

									<div className="btn-group">
										<button onClick={()=>{this.navigate(3)}} type="button" className={classnames("btn tab-btn custom-tab ", {"active-tab": this.props.step.id == 3} )}>Parental Details</button>
									</div>
                                    <div className="btn-group">
                                        <button  type="button" className={classnames("btn tab-btn custom-tab ", {"active-tab": this.props.step.id == 4} )}>Financial Details</button>
                                    </div>
                                    <div className="btn-group">
                                        <button type="button" className="btn tab-btn custom-tab">Fee Structure</button>
                                    </div>
								</div>
                            <div className="ilive-preview">
                               <Tabs/>
                               
                               
                            </div>
                            {/* /tabs */}
                        </div>
                    </div>
                </div>
            </div>    

        );
        
    }
        

}

// Get apps state and pass it as props to Bio data
//      > whenever state changes, the UserList will automatically re-render
function mapStateToProps(state) {
    return {
        student: state.activeStudent,
        step: state.step
    }
}

export default connect(mapStateToProps, {selectStep})(CrudForm);
