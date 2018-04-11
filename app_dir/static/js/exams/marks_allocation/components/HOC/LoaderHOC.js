import React, {Component} from 'react';
import { connect } from 'react-redux';
import './LoaderHOC.css';

const LoaderHOC = (WrappedComponent) => {
    class LoaderHOC extends Component{
        
        render(){        
            const { loading } = this.props;
            
            if(loading) { 
                return  <div className="col-md-12 text-center pt-15">
                            Loading ...
                        </div>;
            }
        
            return (
                <WrappedComponent {...this.props} />
            ); 

        }
    }

    const mapStateToProps = state => ({
        loading:state.see.loading
    })

    return connect(mapStateToProps)(LoaderHOC);
}

export default LoaderHOC;


