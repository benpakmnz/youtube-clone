import React, { Component } from 'react';
import MovieItem from '../movieItem/movieItem';
import { connect } from 'react-redux';


import './moviesList.scss'


class MoviesList extends Component{
    


    render(){
        const renderMovieList = 
            
            this.props.moviesList.map(movieItem => {
                const thumbTitle = 
                movieItem.items[0].snippet.title.length > 50 ? `
                ${movieItem.items[0].snippet.title.slice(0, 47)} ...` : movieItem.items[0].snippet.title
                
                const thumbChannel = 
                movieItem.items[0].snippet.channelTitle.length > 35 ? `
                ${movieItem.items[0].snippet.channelTitle.slice(0, 30)} ...` : movieItem.items[0].snippet.channelTitle

                let pub= new Date(movieItem.items[0].snippet.publishedAt)
                let now= new Date(Date.now())
                const _MS_PER_DAY= 1000*60*60*24;
                function dateDiffInDays(a,b){
                    const utc1= Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
                    const utc2= Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
                    return Math.floor((utc2-utc1)/ _MS_PER_DAY)
                }
                
                const publishedClac = dateDiffInDays(pub, now) + 'days'
                console.log(movieItem.items[0].contentDetails.duration)


                function convert_time(duration) {
                    var a = duration.match(/\d+/g);              
                
                    if (duration.indexOf('M') >= 0 && duration.indexOf('H') === -1 && duration.indexOf('S') === -1) {
                        a = [0, a[0], 0];
                    }
                
                    if (duration.indexOf('H') >= 0 && duration.indexOf('M') === -1) {
                        a = [a[0], 0, a[1]];
                    }
                
                    if (duration.indexOf('H') >= 0 && duration.indexOf('M') === -1 && duration.indexOf('S') === -1) {
                        a = [a[0], 0, 0];
                    }
                
                    duration = 0;
                
                    if (a.length === 3) {
                        duration = duration + parseInt(a[0]) * 3600;
                        duration = duration + parseInt(a[1]) * 60;
                        duration = duration + parseInt(a[2]);
                    }
                
                    if (a.length === 2) {
                        duration = duration + parseInt(a[0]) * 60;
                        duration = duration + parseInt(a[1]);
                    }
                
                    if (a.length === 1) {
                        duration = duration + parseInt(a[0]);
                    }
                
                    return parseFloat(duration/60).toFixed(2)
                }
 
                
                return(
                    <MovieItem title={thumbTitle} 
                               img={movieItem.items[0].snippet.thumbnails.medium.url}
                               channel={thumbChannel}
                               published={publishedClac}
                               views={movieItem.items[0].statistics.viewCount}
                               duration={convert_time(movieItem.items[0].contentDetails.duration)}/>
                )
            })
        
            return(
            <div>
            <h2 style={{margin: '25px 0'}}>Recommended</h2>
            <div className="movieListContainer">
            {renderMovieList}
                
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
