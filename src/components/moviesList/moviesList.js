import React, { Component } from 'react';
import MovieItem from '../movieItem/movieItem';
import { connect } from 'react-redux';


import './moviesList.scss'


class MoviesList extends Component{
    
    titleShorten = (title, length, slice) => {
        return title.length > length ? `${title.slice(0, slice)} ...` : title
    }  

    render(){                
            return(
            <div style={{maxWidth: 1284, margin:'auto'}}>
            <h2 style={{margin: '25px 0'}}>Recommended</h2>
            <div className="movieListContainer">
                        {this.props.moviesList.map(movieItem => 
                            <MovieItem 
                               title={this.titleShorten(movieItem.Title, 50 , 47)} 
                               img={movieItem.VideoUrl}
                               channel={this.titleShorten(movieItem.ChannelTitle, 35 , 30)}
                               published={movieItem.PublishedAt}
                               views={movieItem.ViewCount}
                               duration={movieItem.FormatedDur}
                               type={this.props.type}
                               key={movieItem.VideoId}
                               videoId={movieItem.VideoId}
                               channelId={movieItem.ChannelId}/>  
                                                            
                        )}               
            </div>
            <hr/>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        moviesList: state.fetchMoviesReducer.movieDataList 

    }
}

export default connect(mapStateToProps)(MoviesList)
