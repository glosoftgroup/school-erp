import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import Select2 from 'react-select2-wrapper';
import {fetchClasses} from '../actions/classes'
import {fetchAcademics} from '../actions/academics'
import {fetchHouses} from '../actions/houses'

class Admission extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            buttonText:'submit',
            course:'',
            academic_year:'',
            house:''
        };
    }
  
    componentDidMount() {
        this.props.fetchClasses();
        this.props.fetchAcademics();
        this.props.fetchHouses();
    }

    onSelectChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    format(item){ return item.name; }

      render() {
          return(
              <div className="col-md-8 col-md-offset-2 form-horizontal">
                <div className="form-group">
                    <label className="col-lg-3 control-label">Admission No.:</label>
                    <div className="col-lg-9">
                        <input className="form-control" placeholder="adm no." type="text"/>
                    </div>
                </div>

                <div className="form-group">
                    <label className="col-lg-3 control-label">Class.:</label>
                    <div className="col-lg-9">
                    <Select2
                        data={this.props.courses}
                        onChange={this.onSelectChange}
                        value={ this.state.course }
                        name="course"
                        options={{
                            formatSelection: this.format,
                            formatResult: this.format,
                            placeholder: 'Select class',
                        }}
                    />
                    </div>
                </div>

                 <div className="form-group">
                    <label className="col-lg-3 control-label"> Academic Year.:</label>
                    <div className="col-lg-9">
                    <Select2
                        data={this.props.academics}
                        onChange={this.onSelectChange}
                        value={ this.state.academic_year }
                        name="academic_year"
                        options={{
                            formatSelection: this.format,
                            formatResult: this.format,
                            placeholder: 'Select class',
                        }}
                    />
                    </div>
                </div>

                 <div className="form-group">
                    <label className="col-lg-3 control-label">House.:</label>
                    <div className="col-lg-9">
                    <Select2
                        data={this.props.houses}
                        onChange={this.onSelectChange}
                        value={ this.state.house }
                        name="house"
                        options={{
                            placeholder: 'Select house',
                        }}
                    />
                    </div>
                </div>

                <div className="text-center col-md-12">
                    <button id="add-room-btn" type="submit" className="btn btn-primary legitRipple">
                    {this.state.buttonText}<i className="icon-arrow-right14 position-right"></i>
                    </button>
                </div> 

              </div>
          )
      }
}

function mapStateToProps(state) {
    return {
        student: state.activeStudent,
        courses: state.classes,
        academics: state.academics,
        houses: state.houses              
    }
}


// Get actions and pass them as props to to UserList
function matchDispatchToProps(dispatch){
    return bindActionCreators({
        fetchClasses: fetchClasses,
        fetchAcademics: fetchAcademics,
        fetchHouses: fetchHouses
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Admission)