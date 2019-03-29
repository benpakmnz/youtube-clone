import React from 'react';

import './movieItem.scss'


const MovieItem = () => {
    return(
        <div className="movieItemContainer">
            <img src='https://i.ytimg.com/vi/XEU-3fKA87w/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLApgbJ5IlkzCqBbrBNvSpkxGtDkpQ' alt="איזה יום שמח"/>
            <div className="movieItemInfo">
                <h4>שיר ילדים: איזה יום שמח! גן הצוציקים מארח את רינת גבאי. ערוץ בייבי</h4>
                <p>ערוץ בייבי<br/>
                17M views | 2 years ago</p>
            </div>

        </div>
    )
}


export default MovieItem
