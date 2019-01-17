import React from 'react';
import { connect } from 'react-redux';

export class List extends React.Component{
    constructor(){
        super();
        this.state = { data: ''};
    }

    itemDescription(item){
        let list = [];
        Object.keys(item).forEach(( attribute ) => {
       
            if( attribute === "model" ){ 
                return(
                list.push(<li> { item[attribute] } </li>)
                )
            } else if( attribute === "category" ||
                        attribute === "manufacturer" ) {
                return(
                list.push(<li> { item[attribute].name } </li>)
                )
            } else if( attribute === "location"){
                return(
                list.push(<li> { item[attribute].warehouse } </li>)
                )
            } 
        })
        return(
            <ul>{ list }</ul>
        )
    }

   

    render(){
        return(
            <table>
                <tbody>
                { this.props.data.map((item) => (
                    <tr key={ item.id } data-id={item.id} onClick={ this.openItemModal }>
                        <td>{ item.name }</td>
                        <td>{ this.itemDescription( item )}</td>
                        <td>
                            <button>Delete</button>
                            <button>Edit</button>
                    </td>
                    </tr>
                    
                ))}
                </tbody>
            </table>
        )
    }
}

const mapStateToProps = state => {
    console.log("List items: ", state.search.data);
    return {
        data: state.search.data,
        hasErrored: state.search.error,
        isLoading: state.search.loading
    }
}

export default connect( mapStateToProps )( List );