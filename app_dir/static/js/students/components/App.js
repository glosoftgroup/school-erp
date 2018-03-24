import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import UserList from '../containers/user-list';
import UserDetails from '../containers/user-detail';
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
          description:'',
          start_date: moment(new Date()).format("YYYY-MM-DD"),
          end_date: moment(new Date()).format("YYYY-MM-DD"),
          startDate:moment(),
          buttonText:'Add'
      };      

    }

    render(){
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
                                        <Tab>Academic Admissions</Tab>
                                        <Tab>Parental Details</Tab>
                                        <Tab>Financial Details</Tab>                                        
                                        <Tab>Emergency Details</Tab>
                                        <Tab>Fee Structure</Tab>
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
                                        <h2> ... </h2>
                                    </TabPanel>                                   
                                    <TabPanel>
                                        <h2> ..... </h2>
                                    </TabPanel>
                                    <TabPanel>
                                        <h2> ...... </h2>
                                    </TabPanel>
                                </Tabs>
                                {/* <h2>User List</h2>
                                <UserList />
                                <hr />
                                <h2>User Details</h2>
                                <UserDetails /> */}
                            </div>
                            {/* /tabs */}
                        </div>
                    </div>
                </div>
            </div>    

        );
        
    }
        

}
    

export default CrudForm;
