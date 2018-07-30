import React, { Component } from 'react';
import Filter from './Filter';
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
            </div>
        );
    }
}

export default App;
