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

      let {status} = this.props

      return (
      <div  className="col-md-12">
      <div className="col-md-12">
            <div className="breadcrumb-line bg-primary">
                <ul className="breadcrumb">
                    {status.year &&
                     (<li key="1"><a href="javascript:;" onClick={() => this.navigate("year")}> Academic Years</a></li>)
                    }

                    {status.class &&
                    [
                      <li key="2"><a href="javascript:;" onClick={() => this.navigate("year")}> Academic Years</a></li>,
                      <li key="3"><a href="javascript:;" onClick={() => this.navigate("class")}> Classes</a></li>]
                    }

                    {status.subject &&
                    [
                      <li key="2"><a href="javascript:;" onClick={() => this.navigate("year")}> Academic Years</a></li>,
                      <li key="3"><a href="javascript:;" onClick={() => this.navigate("class")}> Classes</a></li>,
                      <li key="4"><a href="javascript:;" onClick={() => this.navigate("subject")}> Subject</a></li>]
                    }

                    {status.exam &&
                    [
                      <li key="2"><a href="javascript:;" onClick={() => this.navigate("year")}> Academic Years</a></li>,
                      <li key="3"><a href="javascript:;" onClick={() => this.navigate("class")}> Classes</a></li>,
                      <li key="4"><a href="javascript:;" onClick={() => this.navigate("subject")}> Subject</a></li>,
                      <li key="5"><a href="javascript:;" onClick={() => this.navigate("exam")}> Exam</a></li>]
                    }

                </ul>
                </div>
            </div>
            </div>
      );
    }
  }


  export default BreadCrumb