import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export class List extends React.Component{
 

    ItemDetails(item){
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

    ItemDescription(data){
        return(
            data.map((item) => (
                    <tr key={ item.id } data-id={item.id} onClick={ this.openItemModal }>
                        <td>{ item.name }</td>
                        <td>{ this.itemDetails( item )}</td>
                        <td>
                            <button>Delete</button>
                            <button>Edit</button>
                    </td>
                    </tr>
                    
                ))
        )
    }

    findUpperCase( aString ){
        let index = [];
        // Find uppercase letter's index
        for (let x = 0; x < aString.length; x += 1) {
            if (aString.charAt(x) >= 'A' && aString.charAt(x) <= 'Z') {
                index.push(x);
            }
        }
        return index;
    }

    addSpace( aString ){
        let idxArray = this.findUpperCase(aString);
        if( idxArray.length > 0 ){
            let startIdx = 0;
            let spacedString = [];
            for( let x=0; x<=idxArray.length; x+=1 ){
                if( x === idxArray.length ){
                    spacedString.push(aString.substring(startIdx))
                } else {
                    spacedString.push(aString.substring(startIdx, idxArray[x]));
                    startIdx = idxArray[x];
                }
            }
            return spacedString.join(" ");
        }
        return aString;
    }

    generateRow(name, item){
        let list = [];
        let options = {
            item: ['barcode', 'product', 'category', 'manufacturer', 'model', 'serialNumber', 'isCheckedOut'],
            product: ['name', 'model', 'manufacturer', 'category', 'consummable'],
            category: ['name'],
            manufacturer: ['name'],
            department: ['departmentName'],
            user: ['email', 'employeeId', 'accessLevel'],
            employee: ['firstName', 'lastName', 'employeeId', 'department', ],
        }

        Object.keys(item).forEach( key => {
            if( options[name].includes(key) ){
                let tagField = this.addSpace(key);
                list.push(<li key={ key }>{ tagField }: { item[key] }</li>);
            }
        })
        return list;
    }


    // Determine what kind of list (item, product, category,
    // employee, user) will be generated,
    generateDescription(){
        let name = this.props.match.params.name;
        let data = this.props.data;
      
        return(
            data.map((item, key) => (
                    <tr key={ key } data-id={item.id} onClick={ this.openItemModal }>
                        <td>{ this.generateRow( name, item )}</td>
                        <td>
                            <button>More</button>
                        </td>
                    </tr>
                ))
        )
    }


    render(){

        return(
            <table>
                <tbody>
                    { this.generateDescription() }
                </tbody>
            </table>
        )
    }
}

const mapStateToProps = state => ({
        data: state.search.data,
        hasErrored: state.search.error,
        isLoading: state.search.loading
})

export default withRouter(connect( mapStateToProps )( List ));