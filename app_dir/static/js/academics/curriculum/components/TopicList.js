import React from 'react';
import axios from 'axios';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import classnames from 'classnames';
import LaddaButton, { XL, SLIDE_UP } from 'react-ladda';
import select2 from 'select2';


class TopicListComponent extends React.Component {
    constructor(props) {
      super(props);
    }

    componentWillMount() {

    }
    componentDidMount(){
    }

    showTopicDetails = (topic) => {
        console.log(topic.name);
    }


    render() {
      const { topics } = this.props;
      let _this = this;
      return (
           <div className="col-md-12">
              <div className="col-md-12">
                <table className="table room-striped room-hover dataroom-header-footer" style={{border:"1px solid #ddd"}}>
                        <thead>
                          <tr className="bg-primary">
                            <th>Topic</th>
                            <th>Compeletion Period</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody id="tb">
                        <tr className="text-center" style={{display:"none"}}>
                            <td colSpan="3" className="text-center">
                                <div className="pace-demo">
                                    <div className="theme_xbox">
                                        <div className="pace_progress" data-progress-text="60%" data-progress="60">
                                        </div>
                                        <div className="pace_activity"></div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Maths</td>
                            <td>02/03/2018 - 02/09/2019</td>
                            <td>edit and delete</td>
                        </tr>

                        {
                            topics.map(topic => {
                                return (
                                    <tr key={topic.name}>
                                        <td>{topic.name}</td>
                                        <td>{topic.period}</td>
                                        <td>
                                            <button className="btn btn-primary"
                                                onClick={_this.showTopicDetails(topic)}>
                                                edit({topic.id})
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                        </tbody>
                   </table>
                </div>
            </div>
      );
    }
  }


  export default TopicListComponent;