import React, { Component } from 'react';
import FeeItem from '../containers/FeeItem';
import '../css/styles.scss';
import ItemList from '../containers/ItemList';

class App extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <FeeItem/>
                </div>
                <div className="col-md-6">
                    <ItemList />
                </div>
            </div>
        );
    }
}

export default App;
