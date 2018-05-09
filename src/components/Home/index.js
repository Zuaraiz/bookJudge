import React, {Component} from 'react';
import booksApi from '../App/books.js';
import Lists from '../Lists'
import styles from './styles.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource : [],
      inputValue : ''
    }
      this.GoodReads = this.GoodReads.bind(this);
      //this.mapStateToProps = this.mapStateToProps.bind(this);
      this.handleClick = this.handleClick.bind(this);
      
  }
    
//componentWillMount()
//{
//    
//}
  componentWillReceiveProps(nextProps) {
   
  }
handleClick()
{
    console.log('handler called')
    
      this.GoodReads()
}

GoodReads() {
    var search = "The Hobbit";
    let result = [];
    booksApi.getAllBooks({query: search, page: '1'}).then((books) => {
        console.log('Result: ',books) //status 400
        
        if(books[0])
            {
                if(books[0]["total-results"][0] > 0){
                    result = books[0].results[0].work
                }
            }
        this.setState({dataSource: result})
    })
    debugger;
    console.log(result);

}
//componentDidMount()
//    {
//        console.log('datasrc after' , this.state.dataSource);
//    }

render() {
    console.log("Results", this.state.dataSource)
    //console.log('try :  ', this.state.dataSource[0].results[0].work[0].best_book[0].title)
    const config = { };
    return (
      <section>
        <input />
        <button className={styles.button} label="Find Book" onClick={this.handleClick} />
        <Lists dp= {this.state.dataSource}/>
        <div>   
        </div>
      </section>
    );
  
}
}
export default Home;
  /*<Lists props = {this.state.dataSource}/>
  
  
   query is {this.state.dataSource[0].query}
  
   {this.state.dataSource ? this.state.dataSource[0].query : 'No data available'}
   
   <Lists dp= {this.state.dataSource ? this.state.dataSource[0].query : 'No data available'}/>
   working <Lists dp= {this.state.dataSource[0].page}/>
  */