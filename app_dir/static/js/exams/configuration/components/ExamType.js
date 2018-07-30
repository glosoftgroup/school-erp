import React from 'react';
import isEmpty from 'lodash/isEmpty';
import Validator from 'validator';
import classnames from 'classnames';
import { PropTypes } from 'prop-types';
import { Button } from 'react-bootstrap';

class ExamType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            total: '0'
        };
    }

    componentWillMount () {
    }

    handleInputChange = (event) => {
        this.props.handleInputChange(event);
        const name = event.target.name;
        let value = event.target.value;
        let total = this.state.total;
        let errors = { ...this.state.errors };
        
        if (isEmpty(value)) {
            errors[name] = 'This field is required';
        } else if (!isEmpty(value) && !Validator.isFloat(value)) {
            errors[name] = 'Only numbers required';
        } else {
            errors[name] = '';
        }

        try {
            total = (this.state.total - parseFloat(this.state[name])) + parseFloat(value);
            this.setState({
                [name]: value,
                errors: errors,
                total: total
            });
        } catch (error) {}
    }
    onKeyDown = (event) => {
        this.props.onKeyDown(event);
    }

    renderExamTypeRows () {
        let {exam, index, type} = this.props;
        let examName = type + '_' + exam;
        let typeInCamel = type ? (type[0]).toUpperCase() + type.substr(1) : 'None';
        return (
            <tr key={index}>
                <td>{typeInCamel} {index + 1}</td>
                <td>
                    <div className={classnames('form-group ', {'has-error': this.state.errors[examName] ? this.state.errors[examName] : ''})}>
                        <label>
                            <input type="text"
                                className="form-control"
                                name={examName}
                                ref={examName}
                                value={this.state[examName] ? this.state[examName] : ''}
                                onChange={this.handleInputChange}
                                onKeyDown={this.onKeyDown}
                            />
                        </label>
                        {this.state.errors[examName] && <span className="help-block">{this.state.errors[examName] }</span>}
                    </div>
                </td>
                <td>
                    <Button className="btn bg-slate-700" type="button"
                        onClick={() => this.showDeleteTopic(exam, {typeInCamel} + (index + 1), type)}>
                        <i className="icon-x"></i>
                    </Button>

                </td>
            </tr>
        );
    }

    render() {
        return (this.renderExamTypeRows());
    }
}

ExamType.propTypes = {
    index: PropTypes.number,
    exam: PropTypes.number,
    type: PropTypes.string,
    handleInputChange: PropTypes.func,
    onKeyDown: PropTypes.func
};

export default ExamType;
