import React from 'react';
import MovieItem from '../movieItem/movieItem';

import './moviesList.scss'


const MoviesList = () => {
    return(
        <div className="movieListContainer">
                <MovieItem/>
                <MovieItem/>
                <MovieItem/>
                <MovieItem/>

        </div>
    )
}


export default MoviesList
