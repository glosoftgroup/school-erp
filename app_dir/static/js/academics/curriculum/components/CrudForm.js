import React from 'react';
import axios from 'axios';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import classnames from 'classnames';
import LaddaButton, { XL, SLIDE_UP } from 'react-ladda';
import TopicComponent from './Topic';
import TopicListComponent from './TopicList';
import select2 from 'select2';

class CrudForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        visible:false,
        name:"alex",
        topics:[
            {
                id:1,
                name: "Maths",
                period: "02-12-2018 - 02-12-2019",
                subtopics:["Algebra", "Linear Regression", "Probability"],
                objectives:[
                    "Teach basic math",
                    "Show student linear regression calculation correctly",
                    "Combine with permutations & combinations"
                    ],
                expectations:[
                    "The student should be able to understand basic math",
                    "The student should do linear regression correctly",
                    "The student should prophecy mathematically"
                    ]
            },
            {
                id:2,
                name: "English",
                period: "02-12-2018 - 02-12-2019",
                subtopics:["Algebra", "Linear Regression", "Probability"],
                objectives:[
                    "Teach Oral Communication",
                    "Spelling Bee",
                    "Essay Writing"
                    ],
                expectations:[
                    "The student should be able to communicate fluently",
                    "The student should be able to spell correctly",
                    "Should be able to write essays the correct way"
                    ]
            },
            {
                id:3,
                name: "Physics",
                period: "02-12-2018 - 02-12-2019",
                subtopics:["Chemicals", "Flying", "Electronics"],
                objectives:[
                    "Teach Mixing Chemicals",
                    "Show the students how to fly",
                    "Peleka Kenya Power"
                    ],
                expectations:[
                    "Mix masters",
                    "Flying lessons",
                    "Know how Power is generated"
                    ]
            },
        ]
      }

    }
    componentWillMount() {
    }
    componentDidMount(){
        $('#subject').select2({
            width:"100%",
            minimumResultsForSearch: Infinity
        });

        $('#academicyear').select2({
            width:"100%",
            minimumResultsForSearch: Infinity
        });
    }

    slideToggle = () => {
        this.setState({visible:!this.state.visible})
    }


    render() {
        let _this = this;

      return (
        <form encType="multipart/form-data" id="addForm">
              <div className="col-md-12">
                 <div className="col-md-6">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-6">
                                <label className="text-bold">Subject Name:<span className="text-danger">*</span></label>
                                <div className="input-group">
                                    <div className="btn-group bootstrap-selects input-group-btn" id="subjects" style={{width: "100%"}}>
                                        <select name="subject" id="subject"
                                            className="sel">
                                            <option value="">select subject</option>
                                        </select>

                                    </div>

                                    <div className="input-group-btn">
                                        <button type="button" className="btn bg-indigo btn-icon legitRipple modal-trigger edit-btn"

                                                data-ta="#subject_modal_instance"
                                                data-title="Add New Subject"
                                                data-select="#subjects"
                                                data-href="subject/api/create/url"
                                                data-cat="name" data-label="Subject Name:">
                                            <i className="icon-plus-circle2"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-6">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-6">
                                <label className="text-bold">Academic Year:<span className="text-danger">*</span></label>
                                <div className="input-group">
                                    <div className="btn-group bootstrap-selects input-group-btn" id="academicyears" style={{width: "100%"}}>
                                        <select name="academicyear" id="academicyear"
                                            className="sel">
                                            <option value="">select academic year</option>
                                        </select>

                                    </div>

                                    <div className="input-group-btn">
                                        <button type="button" className="btn bg-indigo btn-icon legitRipple modal-trigger edit-btn"

                                                data-ta="#subject_modal_instance"
                                                data-title="Add New Subject"
                                                data-select="#academicyears"
                                                data-href="subject/api/create/url"
                                                data-cat="name" data-label="Subject Name:">
                                            <i className="icon-plus-circle2"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
               <div className="col-md-12">
                       <div className="col-md-12">
                           <a href="javascript:;" id="reveal-topic-btn" className="label border-left-danger label-striped"
                           style={{marginBottom:5}} onClick={this.slideToggle}>
                            Add a Topic
                           </a>
                       </div>
               </div>
               <TopicComponent status={this.state.visible} slideToggle={this.slideToggle}/>

            <TopicListComponent topics={this.state.topics} />
        </form>
              
      );
    }
  }


  export default CrudForm;