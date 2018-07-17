import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import api from '../api/Api';
import { selectTerm } from '../actions/action-term';
import { selectCourse } from '../actions/course';
import { selectAcademicYear } from '../actions/academic-year';
import { addFeeItem, deleteFeeItem } from '../actions/action-fee-item';
import ItemChoices from './Choices';
import ItemAmount from './Amount';
import Compulsory from './Compulsory';
import '../css/styles.scss';

class FeeStructure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      name: '',
      total: 0,
      errors: false,
      buttonText: 'submit',
      loading: false,
      showHideBtn: 'hidden',
      updateJson: {},
      loadingText: 'loading....'
    };
  }

  componentWillReceiveProps(nextProps) {
    this.getTotal(nextProps.fee_items);

    // ensure you update fee item onces and items are set
    setTimeout(() => {
      if (this.state.updateJson !== 'undefined') {
        if (Object.keys(nextProps.items).length > 0 && Object.keys(this.state.updateJson).length > 0) {
          this.prepareFeeItem(nextProps.items, this.state.updateJson);
          // reset updateJson
          this.setState({updateJson: {}});
        }
      }
      setTimeout(() => {
        this.setState({loadingText: 'No data Found'});
      }, 1000);
    }, 2000);
  }

    prepareFeeItem = (allItems, items) => {
      items.map((value, index) => {
        // add one fee item at a go
        this.addFeeItem(allItems, value);
      });
    }

    addFeeItem = (allItems, obj) => {
      allItems.map((item, index) => {
        // add fee item
        if (item.id === obj.choice.id) {
          // append amount
          var copy = { ...item, amount: obj.amount, compulsory: obj.compulsory };
          if (obj.choice.choice) {
            copy = {
              ...copy,
              value: obj.choice.choice
            };
          }
          this.props.addFeeItem(copy);
        }
      });
      // this.props.addFeeItem()
    }

    componentDidMount = () => {
      var self = this;
      if (pk) {
        // fetch fee structure and set payloads
        api.retrieve('/finance/fee/api/update/' + pk + '/')
          .then(function(data) {
            self.setState({name: data.data.name});
            // set academic_year
            var payload = {id: data.data.academic_year};
            self.props.selectAcademicYear(payload);

            // set term
            payload = {id: data.data.term};
            self.props.selectTerm(payload);

            // set course
            payload = {id: data.data.course};
            self.props.selectCourse(payload);

            self.setState({updateJson: data.data.fee_items});
          })
          .catch(function(error) {
            console.error(error);
          });
      }
    }

    getTotal = (items) => {
      let sum = 0;
      items.forEach((num) => {
        if (num.amount) {
          sum += parseInt(num.amount);
          this.setState({errors: false});
        } else {
          this.setState({errors: true});
        }
      });
      sum = this.formatNumber(sum, 2, '.', ',');
      this.setState({total: sum});
    }

    formatText = (text) => {
      var cleanedText = text.replace(/[0-9]/g, '').replace('[.]', '');
      return cleanedText;
    }

    formatNumber = (n, c, d, t) => {
      c = isNaN(c = Math.abs(c)) ? 2 : c;
      d = d === undefined ? '.' : d;
      t = t === undefined ? ',' : t;
      var s = n < 0 ? '-' : '';
      var j;
      var i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c)));
      j = (j = i.length) > 3 ? j % 3 : 0;
      return s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
    };

    handleSubmit = event => {
      event.preventDefault();

      // validation
      if (this.state.errors) {
        toast.error('Make sure fee item amount field is not empty!', {
          position: toast.POSITION.TOP_RIGHT
        });
        return;
      }
      if (this.state.total < 1) {
        toast.error('Make sure fee item amount field is not empty!', {
          position: toast.POSITION.TOP_RIGHT
        });
        return;
      }

      const data = new FormData();

      data.append('term', this.props.term.id);
      data.append('course', this.props.course.id);
      data.append('academic_year', this.props.academic_year.id);
      data.append('amount', this.state.total.replace(',', ''));

      if (pk) {
        data.append('values', JSON.stringify(this.props.fee_items));
        api.update('/finance/fee/api/update/' + pk + '/', data)
          .then(function (response) {
            toast.success('Data send successfully !', {
              position: toast.POSITION.TOP_RIGHT
            });
            window.location.href = '/finance/fee/';
          })
          .catch(function(error) {
            console.error(error);
            toast.error(' Fee structure already exist!', {
              position: toast.POSITION.TOP_RIGHT
            });
          });
      } else {
        data.append('fee_items', JSON.stringify(this.props.fee_items));

        api.create('/finance/fee/api/create/', data)
          .then(function (response) {
            toast.success('Data send successfully !', {
              position: toast.POSITION.TOP_RIGHT
            });
            window.location.href = '/finance/fee/';
          })
          .catch(function(error) {
            console.error(error);
            toast.error(' Fee structure already exist!', {
              position: toast.POSITION.TOP_RIGHT
            });
          });
      }
    }

    getInitialState = () => {
      return {'showHideBtn': 'hidden'};
    }

    toggleDeletenav = () => {
      var css = (this.state.showHideBtn === 'hidden') ? ' animated fadeIn' : 'hidden';
      this.setState({'showHideBtn': css});
    }

    deleteFeeItem = (id) => {
      this.props.deleteFeeItem(id);
    }

    render() {
      return (
        <div>
          <ToastContainer />
          <div className="">
            <div className="panel panel-white">
              <div className="panel-heading">
                <h6 className="panel-title text-center text-semibold"> {this.state.name}&nbsp;Fee Structure
                  <a className="heading-elements-toggle"><i className="icon-more"></i></a></h6>

              </div>

              <div className="table-responsive">
                <table className="table table-sm">
                  <thead>
                    <tr className="bg-primary">
                      <th className="col-sm-1">Item</th>
                      <th className="col-sm-1">Compulsory</th>
                      <th className="col-sm-1">Choice</th>
                      <th className="col-sm-1">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.fee_items.map(obj => {
                      return (
                        <tr key={obj.id} onMouseLeave={this.toggleDeletenav} onMouseEnter={this.toggleDeletenav}>
                          <td>
                            <span>
                              <i onClick={() => { this.deleteFeeItem(obj.id); }} className='icon-cross cursor-pointer text-warning'></i>
                                            &nbsp;{this.formatText(obj.name)}
                            </span>
                          </td>
                          <td><Compulsory instance={obj}/></td>
                          <td><ItemChoices instance={obj}/></td>
                          <td >
                            <ItemAmount instance={obj} />
                          </td>
                        </tr>
                      );
                    })
                    }
                    {this.props.fee_items.length === 0 &&
                      <tr>
                        <td colSpan='4' className="text-center">
                          <h4>{this.state.loadingText}</h4>
                        </td>
                      </tr>
                    }

                  </tbody>
                  <tfoot>
                    <tr style={{backgroundColor: '#EEEDED'}}>
                      <th>
                        <button onClick={this.handleSubmit} className="btn btn-primary btn-sm">{this.state.buttonText}</button>
                      </th>
                      <th className="text-center text-bold" colSpan={3}>Total: KES {this.state.total}</th>
                    </tr>
                  </tfoot>
                </table>
              </div>

            </div>
          </div>
        </div>
      );
    }
}
FeeStructure.propTypes = {
  items: PropTypes.array.isRequired,
  fee_items: PropTypes.array.isRequired,
  deleteFeeItem: PropTypes.func.isRequired,
  course: PropTypes.object,
  term: PropTypes.object,
  academic_year: PropTypes.object,
  addFeeItem: PropTypes.func.isRequired,
  selectAcademicYear: PropTypes.func
};
function mapStateToProps(state) {
  return {
    academic_year: state.academic_year,
    course: state.course,
    fee_items: state.fee_items,
    items: state.items,
    term: state.term,
    total: state.total
  };
}
// Get actions and pass them as props
function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    addFeeItem,
    deleteFeeItem,
    selectAcademicYear,
    selectTerm,
    selectCourse
  }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(FeeStructure);
