import React, { Component } from 'react';
import Filter from '../containers/ItemFilter';
import ItemList from '../containers/ItemList';
import '../css/styles.scss';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
    }

    render() {
        return (
            <div>
                <Filter/>
                <ItemList />
            </div>
        );
    }
}

export default App;
