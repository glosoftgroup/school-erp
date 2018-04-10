import React, { Component } from 'react'

class FeeStructure extends Component {
    render(){
        return (
            <div>
                <div className="">
                    <div className="panel panel-white">
                    <div className="panel-heading">
                        <h6 className="panel-title">Fee Structure<a className="heading-elements-toggle"><i className="icon-more"></i></a></h6>
                       
                    </div>

                    

                    <div className="table-responsive">
                        <table className="table table-lg">
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th className="col-sm-1">Rate</th>
                                    <th className="col-sm-1">Hours</th>
                                    <th className="col-sm-1">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <h6 className="no-margin">Create UI design model</h6>
                                        <span className="text-muted">One morning, when Gregor Samsa woke from troubled.</span>
                                    </td>
                                    <td>$70</td>
                                    <td>57</td>
                                    <td><span className="text-semibold">$3,990</span></td>
                                </tr>
                                <tr>
                                    <td>
                                        <h6 className="no-margin">Support tickets list doesn't support commas</h6>
                                        <span className="text-muted">I'd have gone up to the boss and told him just what i think.</span>
                                    </td>
                                    <td>$70</td>
                                    <td>12</td>
                                    <td><span className="text-semibold">$840</span></td>
                                </tr>
                                <tr>
                                    <td>
                                        <h6 className="no-margin">Fix website issues on mobile</h6>
                                        <span className="text-muted">I am so happy, my dear friend, so absorbed in the exquisite.</span>
                                    </td>
                                    <td>$70</td>
                                    <td>31</td>
                                    <td><span className="text-semibold">$2,170</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    
                    </div>
                </div>
            </div>
        );
    }
}

export default FeeStructure;