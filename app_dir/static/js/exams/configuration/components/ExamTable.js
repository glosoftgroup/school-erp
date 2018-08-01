import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import Api from '../../../common/Api';
import Alert from '../../../common/Alert';
import Urls from '../constants/Urls';

class ExamTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passMarks: 0,
            errors: {}
        };
    }

    dummyHandler = (event) => {
        console.log(event);
    }

    render () {
        return (
            <div className="col-md-12">
                <table className="col-md-12 table-sm table-striped table-hover fixed_header">
                    <thead>
                        <tr className="bg-slate-700 col-md-12">
                            <th className="col-md-3">Exams</th>
                            <th className="col-md-6">Marks</th>
                            <th className="col-md-3"></th>
                        </tr>
                    </thead>
                    <tbody id="tb">
                        <tr className="col-md-12 text-center" style={{display: 'none'}}>
                            <td colSpan="3" className="col-md-3 text-center">
                                <div className="pace-demo">
                                    <div className="theme_xbox">
                                        <div className="pace_progress" data-progress-text="60%" data-progress="60">
                                        </div>
                                        <div className="pace_activity"></div>
                                    </div>
                                </div>
                            </td>
                        </tr>

                        <tr className="col-md-12">
                            <td className="col-md-3">Cat</td>
                            <td className="col-md-6">
                                <div className={classnames('form-group ', {'has-error': this.state.errors['examName'] ? this.state.errors['examName'] : ''})}>
                                    <label>
                                        <input type="text"
                                            className="form-control"
                                            value={this.state.passMarks}
                                            onChange={this.dummyHandler}
                                        />
                                    </label>
                                </div>
                            </td>
                            <td className="col-md-3">
                                <button className="btn bg-slate-700" type="button"
                                    onClick={() => console.log('as')}>
                                    <i className="icon-x"></i>
                                </button>

                            </td>
                        </tr>

                        <tr className="col-md-12">
                            <td className="col-md-3">Cat</td>
                            <td className="col-md-6">
                                <div className={classnames('form-group ', {'has-error': this.state.errors['examName'] ? this.state.errors['examName'] : ''})}>
                                    <label>
                                        <input type="text"
                                            className="form-control"
                                            value={this.state.passMarks}
                                            onChange={this.dummyHandler}
                                        />
                                    </label>
                                </div>
                            </td>
                            <td className="col-md-3">
                                <button className="btn bg-slate-700" type="button"
                                    onClick={() => console.log('as')}>
                                    <i className="icon-x"></i>
                                </button>

                            </td>
                        </tr>

                        <tr className="col-md-12">
                            <td className="col-md-3">Cat</td>
                            <td className="col-md-6">
                                <div className={classnames('form-group ', {'has-error': this.state.errors['examName'] ? this.state.errors['examName'] : ''})}>
                                    <label>
                                        <input type="text"
                                            className="form-control"
                                            value={this.state.passMarks}
                                            onChange={this.dummyHandler}
                                        />
                                    </label>
                                </div>
                            </td>
                            <td className="col-md-3">
                                <button className="btn bg-slate-700" type="button"
                                    onClick={() => console.log('as')}>
                                    <i className="icon-x"></i>
                                </button>

                            </td>
                        </tr>

                        <tr className="col-md-12">
                            <td className="col-md-3">Cat</td>
                            <td className="col-md-6">
                                <div className={classnames('form-group ', {'has-error': this.state.errors['examName'] ? this.state.errors['examName'] : ''})}>
                                    <label>
                                        <input type="text"
                                            className="form-control"
                                            value={this.state.passMarks}
                                            onChange={this.dummyHandler}
                                        />
                                    </label>
                                </div>
                            </td>
                            <td className="col-md-3">
                                <button className="btn bg-slate-700" type="button"
                                    onClick={() => console.log('as')}>
                                    <i className="icon-x"></i>
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

export default connect(mapStateToProps, mapDisplatchToProps)(ExamTable);
