import React, { Component } from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Select2 from 'react-select2-wrapper';
import { updateFeeItem } from '../actions/action-fee-item'

export class ItemChoices extends Component {
  constructor(props){
    super(props);
    this.state = {
      choices: [],
      choice:''
    }
  }
  componentDidMount = () => {
    this.setState({choices:this.props.instance.values})
  }

  handleInputChange = event =>{
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    var val = Object.assign({'choice':value, id: this.props.instance.id})
    var instance = Object.assign(this.props.instance)  
    instance.choice = val;
    // console.log(instance)
    this.props.updateFeeItem(instance)
  }

  
  
  render() {
    return (
      <div>
       <Select2
        onChange={this.handleInputChange}
        data={this.state.choices}
        value= {this.state.choice}
        name="choice"
        options={{
          width: '100%',
          placeholder: 'search by tags',
        }}
      />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}
// Get actions and pass them as props
function matchDispatchToProps(dispatch){
  return bindActionCreators({
    updateFeeItem: updateFeeItem
  }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(ItemChoices)
