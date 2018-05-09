import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const Lists = (props) =>{
    console.log('List props: ',props)
    if(props.dp.length > 0){
        return(
        <ul>
          {props.dp.filter((i, index) => index < 5).map((listValue) =>{
            return <li>
           <List>
           {listValue.best_book[0].title[0]}
            </List>
            </li>
          })}
        </ul>
    )
    }
    else{
        return(
        <p>No results Found</p>)
    }
    
}
export default  Lists;

//{props.state.dataSource[0].page}
 // page is : {props.dataSource[0].page}
//working