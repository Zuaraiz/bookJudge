import React from 'react';

const Lists = (props) =>{
    console.log('List props: ',props)
    return(
        <ul>
          {props.dp}
        </ul>
    );
}
export default  Lists;

//{props.state.dataSource[0].page}
 // page is : {props.dataSource[0].page}
//working