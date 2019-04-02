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
                    let pubAmount= Math.floor((utc2-utc1)/ _MS_PER_DAY)
                    let published = '';
                    if (pubAmount >= 7 && pubAmount < 14 ){
                        published = '1 week ago'
                    }
                    else if (pubAmount >= 14 && pubAmount < 30){
                        let a = pubAmount/7
                        published = `${a.toFixed()} weeks ago`
                    }
                        else if (pubAmount >= 30 && pubAmount < 60){
                        published = `1 month ago`
                    }
                        else if (pubAmount >= 60 && pubAmount < 365){
                        let a = pubAmount/30
                        published = `${a.toFixed()} months ago`
                    }
                        else if (pubAmount >= 365 && pubAmount < 730){
                        published = `1 year ago`
                    }
                        else if (pubAmount >= 730){
                        let a = pubAmount/365
                        published = `${a.toFixed()} years ago`
                    }
                    
                        return published
                    }
                
                
                const publishedClac = dateDiffInDays(pub, now)

                function convert_time(duration) {
                    let timer= duration.replace(/\D/g,' ')
                                    .split(' ')
                                    .filter(char => char !== "")
                                    .map(char => char.length <2 ? '0'+ char: char)
                                    .join(':')
                    return timer
                }

                let viewsCalc = (amount) => {
                    let views= amount
                    if (amount.length === 4){
                      views = amount.substring(0,1) + 'K '
                    } else if (amount.length === 5){
                      views = amount.substring(0,2) + 'K '
                    } else if (amount.length === 6){
                      views = amount.substring(0,3) + 'K '
                    } else if (amount.length === 7){
                      views = amount.substring(0,3) + 'M '
                    } return(views)
                }
 
                
                return(
                    <MovieItem title={thumbTitle} 
                               img={movieItem.items[0].snippet.thumbnails.medium.url}
                               channel={thumbChannel}
                               published={publishedClac}
                               views={viewsCalc(movieItem.items[0].statistics.viewCount)}
                               duration={convert_time(movieItem.items[0].contentDetails.duration)}/>
                )
            })
        
            return(
            <div style={{maxWidth: 1284}}>
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
