/* eslint one-var: 0 */
import React from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import Api from '../../../common/Api';
import Alert from '../../../common/Alert';
import Urls from '../constants/Urls';
import { handleSelectInputChange } from '../actions';

class Select extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            data: {},
            selectName: '',
            updateStatus: (window.location.href).includes('update')
        };
    }

    componentDidMount () {
        let self = this,
            name = self.props.name,
            selectId = '#' + name,
            selectUrl = self.props.selectUrl;
        if (self.state.updateStatus) {
            Api.retrieve(Urls.updateUrl()).then(function(response) {
                let data = response.data[name];
                self.state.data = data.id;
                $(selectId).append(
                    new Option(data.name, data.id, true, true)
                ).trigger('change');
            }).catch(function(error) {
                Alert.error(error);
            });
        }
        this.initializeSelect2(selectId, selectUrl);
    }

    initializeSelect2 = (id, url) => {
        let self = this;
        $(id).select2({
            width: '100%',
            formatSelection: function(item) { return item.name; },
            formatResult: function(item) { return item.name; },
            ajax: {
                url: function (params) {
                    return url + '?' + params.term;
                },
                processResults: function (data) {
                    data = data.results;
                    return {
                        results:
                            data.map(function(item) {
                                return {
                                    id: item.id,
                                    text: (id.includes('academicclass')) ? 'class ' + item.class_group : item.name
                                };
                            })
                    };
                }
            },
            debug: true,
            delay: 250
        }).on('change', function (e) {
            self.handleInputChange(e);
        });
    }

    handleInputChange = event => {
        let self = this,
            { name } = self.props,
            value = event.target.value,
            errors = { ...self.props.selectData.errors };
        errors[name] = isEmpty(value) ? 'This field is required' : '';
        self.setState({ selectName: value });
        let data = {
            [name]: value,
            errors
        };
        self.props.handleSelectInputChange(data);
    }

    render () {
        let self = this,
            { errors } = self.props.selectData,
            { name, labelDisplayName } = self.props,
            nameInLower = name ? name.toLowerCase() : 'Null';
        return (
            <div>
                <div className={
                    classnames('form-group ',
                        {'has-error': errors[name]})}>
                    <div className="row">
                        <div className="col-md-12s">
                            <label className="text-bold pl-10">{labelDisplayName}:
                                <span className="text-danger">*</span>
                            </label>
                            <div className="input-groupas">
                                <div className="col-md-12">
                                    <select name={nameInLower} id={nameInLower}
                                        className="sel" value={this.state.selectName}
                                        onChange={this.handleInputChange}>
                                        <option value="">select {name}</option>
                                    </select>
                                </div>
                                {errors[name] &&
                                    <span className="help-block">{errors[name]}</span>}

                                {/* <div className="input-group-btn">
                                    <button type="button" className="btn bg-slate-700 btn-icon legitRipple modal-trigger edit-btn"
                                        data-ta="#subject_modal_instance"
                                        data-title="Add New Subject"
                                        data-select="#academicyears"
                                        data-href="subject/api/create/url"
                                        data-cat="name" data-label="Subject Name:"
                                        onClick={this.showSubjectModal}>
                                        <i className="icon-plus-circle2"></i>
                                    </button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Select.PropTypes = {
    name: PropTypes.string.isRequired,
    labelDisplayName: PropTypes.string.isRequired,
    selectUrl: PropTypes.string.isRequired
};

let mapStateToProps = (state) => {
    return {
        selectData: state.selectData
    };
};

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        handleSelectInputChange: handleSelectInputChange
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Select);
