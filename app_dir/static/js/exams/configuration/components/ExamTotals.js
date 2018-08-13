import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import classnames from 'classnames';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import Api from '../../../common/Api';
import Alert from '../../../common/Alert';
import Urls from '../constants/Urls';

class ExamTotals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalMarks: 0,
            passMarks: 0,
            percentage: false
        };
    }

    checkboxToggle = () => {
        this.setState({percentage: !this.state.percentage});
    }

    dummyHandler = (event) => {
        console.log(event);
    }

    render () {
        return (
            <div>
                <div className="col-md-12 checkbox">
                    <label>
                        <input type="checkbox" className="styled"
                            name="percentage"
                            checked={this.state.percentage}
                            value={this.state.percentage}
                            onClick={this.checkboxToggle}/>
                            use percentage calculations for students marks (%)
                    </label>
                </div>
                <table className="col-md-12 table-xs table-striped" style={{border: '1px solid #ddd'}}>
                    <tbody>
                        <tr>
                            <td>Total Marks</td>
                            <td colSpan="2">
                                <input type="text" className="form-control"
                                    name="total"
                                    value={this.state.totalMarks}
                                    onChange={this.dummyHandler}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Pass Marks</td>
                            <td colSpan="2">
                                <input type="text" className="form-control"
                                    name="pass"
                                    value={this.state.passMarks}
                                    onChange={this.dummyHandler}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="3">
                                <button type="button" className="btn bg-teal pull-right"
                                    onClick={this.dummyHandler}>
                                    Save
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {};
};

let mapDisplatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDisplatchToProps)(ExamTotals);
