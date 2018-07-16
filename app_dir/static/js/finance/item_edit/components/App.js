import React, { Component } from 'react';
import ItemForm from '../containers/ItemForm';
// import Test from '../containers/PopupForm';
import '../css/styles.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {/* <Test /> */}
        <ItemForm />
      </div>
    );
  }
}

export default App;
