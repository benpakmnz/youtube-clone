import React from 'react';

import './movieItem.scss';



const MovieItem = (props) => (
        
        <div className="movieItemContainer">
         <div style={{color:'white',background: '#0000008c', padding: '2px 5px',position: 'absolute', top: 96, right: 3, fontSize: 12, fontWeight: 'bold' }}>{props.duration}</div>              
            <img src= {props.img} alt={props.title}/>
            <div className="movieItemInfo">
                <h4 style= {{paddingRight: 15, marginBottom: 5}}>{props.title}</h4>
                <p style={{fontSize: 13, fontWeight:400}}>{props.channel}<br/>
                {props.views}views | {props.published}</p>
            </div>
        </div>

        
    )



export default MovieItem


//clock
//  M12 3.67c-4.58 0-8.33 3.75-8.33 8.33s3.75 8.33 8.33 8.33 8.33-3.75 8.33-8.33S16.58 3.67 12 3.67zm3.5 11.83l-4.33-2.67v-5h1.25v4.34l3.75 2.25-.67 1.08z

// 3dots
// M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z