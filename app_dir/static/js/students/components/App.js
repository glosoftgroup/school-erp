import React from 'react';
import {connect} from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import BioData from '../containers/BioData';
import ImagePreview from '../containers/ImagePreview'
import Admission from '../containers/Admission'
import Parent from '../containers/Parents'
import 'react-tabs/style/react-tabs.css';
import './styles.scss';
import './avatar.styles.scss'

class CrudForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          name: '',
          disable:true
      }; 
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.student.id){
           this.setState({disable:false}) 
        }       
        
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
                            <div className="ilive-preview">
                                <Tabs>
                                    <TabList>
                                        <Tab>Bio Data</Tab>
                                        <Tab {...inputProps}>Academic Admissions</Tab>
                                        <Tab {...inputProps}>Parental Details</Tab>
                                        <Tab disabled >Financial Details</Tab>
                                        <Tab disabled >Fee Structure</Tab>
                                    </TabList>

                                    <TabPanel>
                                       <BioData/>
                                    </TabPanel>
                                    <TabPanel>
                                        <Admission/>
                                    </TabPanel>
                                    <TabPanel>
                                       <Parent/>
                                    </TabPanel>                                                                       
                                    <TabPanel>
                                        <h2> ..... </h2>
                                    </TabPanel>
                                    <TabPanel>
                                        <h2> ...... </h2>
                                    </TabPanel>
                                </Tabs>
                               
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
        student: state.activeStudent
    }
}

export default connect(mapStateToProps)(CrudForm);
