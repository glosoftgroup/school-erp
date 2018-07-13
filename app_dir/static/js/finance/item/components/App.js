import React, { Component } from 'react';
import Filter from './Filter';
// import Test from '../containers/TestSelect';
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
        <Filter />
      </div>
    );
  }
}

export default App;
