import React from 'react';
import {connect} from 'react-redux';
import {saveImage} from '../actions/image'

class ImagePreview extends React.Component {
    constructor(props) {
      super(props);
      this.state = {avatar:'',imagePreviewUrl: '/static/images/users/default-avatar.png'};
    }

    componentDidMount() {
        if (pk) {
            this.setState({imagePreviewUrl:this.props.student.image})
        }
    }

    // image preview
    _handleImageChange = e =>{
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            avatar: file,
            imagePreviewUrl: reader.result
          });

          this.props.saveImage(this.state)

        }
    
        reader.readAsDataURL(file)
    }
    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.file);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.avatar){
            this.setState({imagePreviewUrl:nextProps.avatar.imagePreviewUrl})
        }else{
            if(nextProps.student.image){
                this.setState({imagePreviewUrl:nextProps.student.image})
            }else{
                this.setState({imagePreviewUrl: '/static/images/users/default-avatar.png'})
            }
        }       
        
    }

    render() {
       
        var divStyle = {
            backgroundImage: 'url(' + this.state.imagePreviewUrl + ')'
        }
        
        
        return (
            <div>
                <div className="avatar-upload">
                    <div className="avatar-edit">
                        <input type='file' id="imageUpload" onChange={this._handleImageChange}  accept=".png, .jpg, .jpeg" />
                        <label htmlFor="imageUpload"></label>
                    </div>
                    <div className="avatar-preview">
                        <div id="imagePreview" style={divStyle}>
                        </div>
                    </div>
                </div>
                <div className="thumbnail caption text-center">
                    {!!this.props.student.first_name &&
                        <h6 className="text-semibold text-center no-margin">
                        {this.props.student.first_name}&nbsp;
                        {this.props.student.middle_name}&nbsp;
                        {this.props.student.last_name}
                        </h6>
                    }                    
                </div>
            
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        student: state.activeStudent,
        avatar: state.avatar
    }
}

export default connect(mapStateToProps, {saveImage})(ImagePreview);