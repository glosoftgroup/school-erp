import React from 'react';
import select2 from 'select2';
import 'select2/dist/css/select2.css';


class BreadCrumb extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        };
    }


    navigate = (status) =>{
        this.props.callBack(null, status)
    }


    render() {
      const {status} = this.props

      return (
            <div className="breadcrumb-line bg-primary">
                <ul className="breadcrumb">
                    {status.yearStatus ?
                     (<li className="active"><a href="javascript:;" onClick={() => this.navigate("yearStatus")}><i className="icon-home2 position-left"></i> Academic Years</a></li>) : null
                    }
                    {status.classStatus ?
                    <div>
                      <li><a href="javascript:;" onClick={() => this.navigate("yearStatus")}><i className="icon-home2 position-left"></i> Academic Years</a></li>
                      <li className="active"><a href="javascript:;" onClick={() => this.navigate("classStatus")}><i className="icon-home2 position-left"></i> Classes</a></li></div> : null
                    }
                    {status.subjectStatus ?(<div>
                      <li><a href="javascript:;" onClick={() =>this.navigate("yearStatus")}><i className="icon-home2 position-left"></i> Academic Years</a></li>
                      <li><a href="javascript:;" onClick={() =>this.navigate("classStatus")}><i className="icon-home2 position-left"></i> Classes</a></li>
                      <li className="active"><a href="javascript:;" onClick={() =>this.navigate("subjectStatus")}><i className="icon-home2 position-left"></i> Subjects</a></li></div>) : null
                    }
                    {status.examStatus ?(<div>
                      <li><a href="javascript:;" onClick={() =>this.navigate("yearStatus")}><i className="icon-home2 position-left"></i> Academic Years</a></li>
                      <li><a href="javascript:;" onClick={() =>this.navigate("classStatus")}><i className="icon-home2 position-left"></i> Classes</a></li>
                      <li><a href="javascript:;" onClick={() =>this.navigate("subjectStatus")}><i className="icon-home2 position-left"></i> SUbjects</a></li>
                      <li className="active"><a href="javascript:;" onClick={() =>this.navigate("examStatus")}><i className="icon-home2 position-left"></i> Exams</a></li></div>) : null
                    }

                </ul>
            </div>
      );
    }
  }


  export default BreadCrumb