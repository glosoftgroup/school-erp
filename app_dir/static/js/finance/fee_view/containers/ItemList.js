import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import api from '../api/Api';
import { setItems } from '../actions/action-items';
import { addFeeItem } from '../actions/action-fee-item';

class ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount () {
        var self = this;
        api.retrieve('/finance/item/api/list/')
            .then(data => data.data.results)
            .then(function(data) {
                // add new _id field
                data.map((item, index) => {
                    item._id = item.id;
                });
                self.props.setItems(data);
            })
            .catch(function(error) {
                console.log(error);
            });
    }

  addToStructure = (obj) => {
      // var obj = Object.assign([obj])
      obj.compulsory = true;
      this.props.addFeeItem(obj);
  }

  render() {
      return (
          <div>
              <table className="table table-xs table-hover">
                  <thead>
                      <tr className="bg-primary">
                          <th>Name</th>
                          <th></th>
                          <th>Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                      {this.props.items.map(obj => {
                          return (
                              <tr key={obj._id}>
                                  <td>{obj.name}</td>
                                  <td>{obj.mobile}</td>
                                  <td onClick={() => this.addToStructure(obj)} >
                                      <button className="btn btn-sm bg-primary">add</button>
                                  </td>

                              </tr>
                          );
                      })
                      }
                      {this.props.items.length === 0 &&
                <tr>
                    <td colSpan='4' className="text-center">
                        <h4>No data Found</h4>
                    </td>
                </tr>
                      }

                  </tbody>
              </table>
          </div>
      );
  }
}
ItemList.propTypes = {
    addFeeItem: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired
};
function mapStateToProps(state) {
    return {
        items: state.items,
        fee_items: state.fee_items
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        addFeeItem: addFeeItem,
        setItems: setItems
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ItemList);
