import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formatNumber from '../../../common/NumberFormatter';

export class FeeItem extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired
    }
    render() {
        return (
            <tr>
                {this.props.data.compulsory &&
                <td>{this.props.data.name}</td>}
                {this.props.data.compulsory &&
                this.props.data.terms.map((obj, index) => {
                    return <td className="text-right" key={index}>
                        {!obj.amount && <span className="">--</span>}
                        {!!obj.amount && <span className="">{formatNumber(obj.amount, 2, '.', ',')}</span>}
                    </td>;
                })}
            </tr>
        );
    }
}

export default FeeItem;
