import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Select2 from 'react-select2-wrapper';
import {selectParent, addParent} from '../actions/parents'
import api from '../api/Api'
import ParentFrom from './ParentForm'
import ParentsTable from './ParentsTable'
import SelectParent from './SelectParent'

class Comp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {          
          errors:{}, server_errror:''
        };
    }

    componentDidMount() {
        
    }

    componentWillReceiveProps(nextProps){
        // console.warn(nextProps.parents)
    } 

    render() {
        return (
            <div>
                <Tabs>
                    <TabList>
                        <Tab>
                        {(() => {
                            switch (this.props.editable.editable) {
                                case true:   return "New Parent";
                                default:      return "";
                            }
                        })()}
                            
                        </Tab>
                        <Tab>
                            {(() => {
                                switch (this.props.editable.editable) {
                                    case true:   return " Old Parent";
                                    default:      return "";
                                }
                            })()}
                           
                        </Tab>                        
                    </TabList>

                    <TabPanel>
                        {/* add new parent */}
                        {(() => {
                            switch (this.props.editable.editable) {
                                case true:   return <ParentFrom/>;
                                default:      return "";
                            }
                        })()}
                        
                    </TabPanel>
                    <TabPanel>
                        {(() => {
                            switch (this.props.editable.editable) {
                                case true:   return <SelectParent/>;
                                default:      return "";
                            }
                        })()}
                        
                    </TabPanel>
                </Tabs>                

                {/* list parents */}
                <ParentsTable/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        editable: state.editable,
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