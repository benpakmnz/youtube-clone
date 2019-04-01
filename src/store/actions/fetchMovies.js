import * as actionTypes from './actionTypes';
import axios from 'axios';


const API_KEY = `${process.env.REACT_APP_API_KEY_YT}`
console.log('key '+ API_KEY)

export const setMovieList = (payload) => {
    return {
        type: actionTypes.SET_MOVIE_LIST,
        payload
        }
    }



export const initMovies = () => {
    let moviesInitialList = [
        '22GGe2QNenk',
        'jV1sjm9Lz_Q',
        't0VB_0YDZ1w',
        'tT088stKYmI',
        'JPJjwHAIny4',
        'nI8n20UpaBY',
        '4g9mJjJ9WU0',
        '22GGe2QNenk',
        'jV1sjm9Lz_Q',
        't0VB_0YDZ1w',
        'tT088stKYmI',
        'JPJjwHAIny4',
        'nI8n20UpaBY',
        '4g9mJjJ9WU0',
        'GC_4lBFZl_Y',
        'mF-tVjXbO8Y',
        'T2KbMeS9lLQ',
        'BMUiFMZr7vk',
        'W4brAobC2Hc',
        'ZpU3mEaK0_w',
        'KMX1mFEmM3E',
        'UtIOMUQ7nWM',
        'wwUbI2i_LZM',
        '_mj72QqsOs4',
        '9ooYYRLdg_g',
        'OAR0E72hFyA',
        'pkdgVYehiTE',
        'RRJo_TXdqPg'
    ]

    return dispatch => { 
        moviesInitialList.forEach(movieTitle => {
            axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${movieTitle}&key=${API_KEY}`)
            .then(res => {
                dispatch(setMovieList(res.data))})
                .catch(error => console.log(error))
        })
        
    }
}
