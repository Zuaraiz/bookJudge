import React from 'react';

const Lists = (props) =>{
    console.log('List props: ',props)
    if(props.dp.length > 0){
        return(
        <ul>
          {props.dp.filter((i, index) => index < 5).map((listValue) =>{
            return <li>{listValue.best_book[0].title[0]}</li>;
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