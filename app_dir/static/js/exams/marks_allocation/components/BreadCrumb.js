import React from 'react';
import visibilityStatus from '../reducers/visibilityStatus';


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

      let { status, term, academicYear, classTaught, teacher, subject } = this.props
      const v = visibilityStatus()
      console.log("bread "+v.status.year)

      teacher = teacher == null ? 'Teachers ': teacher.name
      academicYear = academicYear == null ? 'Academic Years ': teacher+' ('+academicYear.year.name+')'
      classTaught = classTaught == null ? 'Classes ': classTaught.name
      subject = subject == null ? 'Subject ': subject.name

      return (
      <div  className="col-md-12 pt-15">
      <div className="col-md-12">
            <div className="breadcrumb-line bg-primary">
                <ul className="breadcrumb">
                    {status.year &&
                     (<li key="1"><a href="javascript:;" onClick={() => this.navigate("year")}> {academicYear}</a></li>)
                    }

                    {status.class &&
                    [
                      <li key="2"><a href="javascript:;" onClick={() => this.navigate("year")}> {academicYear}</a></li>,
                      <li key="3"><a href="javascript:;" onClick={() => this.navigate("class")}> {term.name} </a></li>]
                    }

                    {status.subject &&
                    [
                      <li key="2"><a href="javascript:;" onClick={() => this.navigate("year")}> {academicYear}</a></li>,
                      <li key="3"><a href="javascript:;" onClick={() => this.navigate("class")}> {term.name}</a></li>,
                      <li key="4"><a href="javascript:;" onClick={() => this.navigate("subject")}> {classTaught} </a></li>]
                    }

                    {status.exam &&
                    [
                      <li key="2"><a href="javascript:;" onClick={() => this.navigate("year")}>  {academicYear}</a></li>,
                      <li key="3"><a href="javascript:;" onClick={() => this.navigate("class")}> {term.name}</a></li>,
                      <li key="4"><a href="javascript:;" onClick={() => this.navigate("subject")}> {classTaught}</a></li>,
                      <li key="5"><a href="javascript:;" onClick={() => this.navigate("exam")}> {subject}</a></li>]
                    }

                </ul>
                </div>
            </div>
            </div>
      );
    }
  }


  export default BreadCrumb