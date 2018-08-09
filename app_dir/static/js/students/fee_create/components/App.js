import React, { Component } from 'react';
import FeeItem from '../containers/FeeItem';
// import FeeStructure from '../containers/FeeStructure';

class App extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <FeeItem/>
                </div>
                <div className="col-md-6">
                    {/* <FeeStructure /> */}
                </div>
            </div>
        );
    }
}

export default App;
