import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { fetchData } from '../actions/fetch-data';
import MyAccount from './my-account-page';

class MyAccountPage extends React.Component{

    componentDidMount(){
        let employeeId = this.props.employee.employeeId;
        this.props.dispatch(fetchData(employeeId, "myAccount"))
    }

    render(){
        let data = this.props.data;
        console.log(data)
        return(
            <div>
               { data && data.length > 0 ? <MyAccount data={data} />
                     : <p>...Loading</p>
                }     
            </div>
        )
    }
}

const mapDispatchToProps = ({
    fetchData: fetchData,
});

const  mapStateToProps = state => ({
    data: state.search.data,
    employee: state.auth.currentUser.employee,
})

export default connect( mapStateToProps, mapDispatchToProps )( MyAccountPage );