import React from 'react';
import { connect } from 'react-redux';
import CheckModal from './check-modal';
import { showModal } from '../actions/modal';

export class CheckInOrOutResults extends React.Component{

    constructor(props){
        super(props);
        this.displayError = this.displayError.bind(this);
    }

    displayError(){
        let modalProps = this.props.hasErrored.message;
        let modalType = 'ERROR_CHECK_MODAL';
        this.props.showModal( modalType, modalProps );
    }

    componentDidUpdate(prevProps){
        if (this.props.hasErrored &&
            !prevProps.hasErrored) {
            this.displayError();
        }
    }

    // displayCheck(){
    //     if( this.props.data ){
    //     let modalProps = { 
    //         data: this.props.data,
    //         checkType: this.props.checkType
    //     };
    //     let modalType = 'CHECK_MODAL';
    //     this.props.showModal( modalType, modalProps );
    //     }
    // }

  
    message(){
        let result = this.props.data;
        if( result && result.message ){
            return this.props.data.message;
        } 
        return "";
    }

    render(){

        return(
            <div>
                <p className="loader">{ this.props.isLoading ? "...Loading" : ""}</p>
                <p> { this.message() } </p> 
                
            </div>
        )
    }
}

const mapStateToProps = state => ({
        data: state.check.data,
        hasErrored: state.check.error,
        isLoading: state.check.loading,
})

const mapDispatchToProps = ({
    showModal
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckInOrOutResults);