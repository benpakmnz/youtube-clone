import React ,{ Component } from 'react';
import MoviesList from '../moviesList/moviesList';
import '../../main.scss';
import { withRouter, Route } from 'react-router-dom';
import Watch from '../watch/watch'



class Main extends Component {
        render(){
        console.log(this.props)
        return(
                <div className="mainContainer" 
                        style={{width: this.props.drawerMode ? `calc(100vw - 240px)` : '100vw',
                        padding: this.props.drawerMode ? '1px 128px': '1px 40px'}}>
                                
                                <Route path= {this.props.match.url} exact render={()=> <MoviesList type='home'/>}/>
                                <Route path={this.props.match.url + ":id"} render={()=> <Watch/>}/>
                </div>     
        )}
}



export default withRouter(Main)


