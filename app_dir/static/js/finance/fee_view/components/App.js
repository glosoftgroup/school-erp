import React, { Component } from 'react';
import FeeStructure from '../containers/FeeStructure';
import '../css/styles.scss';

class App extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <FeeStructure />
                </div>
            </div>
        );
    }
}

export default App;
