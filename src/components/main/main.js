import React ,{ Component } from 'react';
import MoviesList from '../moviesList/moviesList';
import '../../main.scss';


class Main extends Component {
        render(){
        console.log('13:23')

        return(
                <div className="mainContainer" 
                        style={{width: this.props.drawerMode ? `calc(100vw - 240px)` : '100vw',
                        padding: this.props.drawerMode ? '1px 128px': '1px 40px'}}>
                                
                                <MoviesList type='home'/>
                                
                </div>     
        )}
}



export default Main


