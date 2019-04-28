import React from 'react';
import MoviesList from '../moviesList/moviesList';
import '../../main.scss';
import { Route } from 'react-router-dom';
import Watch from '../watch/watch'



const Main = (props) => (       
        <div className="mainContainer" 
                style={{width: props.drawerMode ? `calc(100vw - 240px)` : '100vw',
                        padding: props.drawerMode ? '1px 128px': '1px 40px'}}>
                          
                          <Route path="/" exact render={()=> <MoviesList type='home'/>}/>
                          <Route path="/watch/:id" render={()=> <Watch/>}/>
        </div>

        
    )



export default Main


