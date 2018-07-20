import React, { Component } from 'react';
import ItemList from '../containers/ItemList';
import ItemForm from '../containers/ItemForm';

class Comp extends Component {
    constructor(props) {
      super(props);
    }

    render() {
        return (
            <div>
                <ItemForm/>
                <ItemList/>
            </div>
        );
    }
}

export default Comp;
