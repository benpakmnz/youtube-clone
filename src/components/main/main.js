import React from 'react';
import MoviesList from '../moviesList/moviesList';
import '../../main.scss';



const Main = (props) => (       
        <div className="mainContainer" 
                style={{width: props.drawerMode ? `calc(100vw - 240px)` : '100vw',
                        padding: props.drawerMode ? '1px 128px': '1px 40px'}}>
                          <MoviesList type='home'/>
        </div>

        
    )



export default Main