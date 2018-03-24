import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import Select2 from 'react-select2-wrapper';
import {fetchClasses} from '../actions/classes'
import {fetchAcademics} from '../actions/academics'
import {fetchHouses} from '../actions/houses'
import admissionsApi from '../api/Api'
import {apiFetchAdmission, saveAdmission, updateAdmission} from '../actions/admissions'

class Admission extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            buttonText:'submit',
            adm_no: '',
            course:'',
            academic_year:'',
            house:'',
            create_url: createOfficialDetailsUrl,
            update_url: false,
            errors: {},
            server_errror:false
        };
    }
  
    componentDidMount() { 
        // fetch select dropdown data  
        this.props.fetchClasses();
        this.props.fetchAcademics();
        this.props.fetchHouses();
        
        // only fetch admission details if instance is selected
        if(this.props.student.id){
            admissionsApi.retrieve(getOfficialDetailsUrl) 
            .then(data => this.props.apiFetchAdmission(data.data.results))
            .catch((error) =>{ console.log(error) })
        }
    }

    componentWillReceiveProps(nextProps){        
        if(nextProps.admission[0]){
            this.setState({
                course: nextProps.admission[0].course,
                adm_no: nextProps.admission[0].adm_no,
                academic_year: nextProps.admission[0].academic_year,
                house: nextProps.admission[0].house,
                update_url: nextProps.admission[0].update_url
            })
        }        
    }

    onSelectChange = (e) => {
        if(!!this.state.errors[e.target.name]){
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];             
                    
            this.setState({
                [e.target.name]: e.target.value,
                errors:errors
            });
        }else{
            this.setState({
                [e.target.name]: e.target.value
            });
        } 
        
    }

    handleSubmit = event =>{
        event.preventDefault();  

        // validation
        let errors = {};
        let self = this;
        if(this.state.adm_no === '') errors.adm_no = 'Field required';
        if(this.state.academic_year === '') errors.academic_year = 'Field required';
        if(this.state.course === '') errors.course = 'Field required';

        this.setState({errors:errors});

        const isValid = Object.keys(errors).length === 0;

        if(isValid){
            this.setState({loading:true, buttonText:'loading ..'})
            const data = new FormData(event.target);
            if(this.props.student.id){
                data.append('student',this.props.student.id)
            } 
            
            if(this.state.update_url){
                // update admissions
                admissionsApi.update(this.state.update_url,data)                 
                .then(function (response) {
                    alertUser('Data sent successfully');
                    console.log('response....')
                    console.warn(response)
                    self.setState({
                        loading:false, buttonText:'submit',
                        update_url:response.data.update_url
                    })                   
                    return response;
                })
                .then(data => self.props.updateAdmission(data))
                .catch(function(error){
                    console.log(error)
                }) 
            }else{
                // create admissions
                admissionsApi.create(this.state.create_url,data)
                .then(function (response) {
                    alertUser('Data sent successfully');
                    self.setState({
                        loading:false, buttonText:'submit',
                        update_url:response.data.update_url
                    })                   
                    return response;
                })
                .then(data => self.props.saveAdmission(data))
                .catch(function(error){
                    console.log(error)
                })
            }
        }
              
        
    }

    format(item){ return item.name; }

      render() {
          return(
            <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
            <div className="col-md-12">
                  {!!this.state.server_errror && <div className="ui alert alert-warning negative message"><p>{this.state.server_errror}</p></div>} 
            </div>
              <div className="col-md-8 col-md-offset-2 form-horizontal">
                <div className="form-group">
                    <label className="col-lg-3 control-label">Admission No.:</label>
                    <div className="col-lg-9">
                        <input value={this.state.adm_no} name="adm_no" onChange={this.onSelectChange} className="form-control" placeholder="adm no." type="text"/>
                        <span className="help-block text-warning">{this.state.errors.adm_no}</span>
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
                    <span className="help-block text-warning">{this.state.errors.course}</span>
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
                    <span className="help-block text-warning">{this.state.errors.academic_year}</span>
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
            </form>
          )
      }
}

// Get apps state and pass it as props
function mapStateToProps(state) {
    return {
        academics: state.academics,
        admission: state.admission,
        courses: state.classes,        
        houses: state.houses,
        student: state.activeStudent                     
    }
}


// Get actions and pass them as props
function matchDispatchToProps(dispatch){
    return bindActionCreators({
        fetchClasses: fetchClasses,
        fetchAcademics: fetchAcademics,
        fetchHouses: fetchHouses,
        apiFetchAdmission: apiFetchAdmission,
        saveAdmission: saveAdmission,
        updateAdmission: updateAdmission
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Admission)