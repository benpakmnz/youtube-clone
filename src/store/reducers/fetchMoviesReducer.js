import * as actionTypes from '../actions/actionTypes';

const initialState = { 
    movieDataList:[],
};

const fetchMoviesReducer = (state= initialState, action) => {
    switch(action.type){
        case actionTypes.SET_MOVIE_LIST:
            return ({
                ...state,
                movieDataList: [action.payload, ...state.movieDataList]
            })
       
        default: return state
    }
    
}

export default fetchMoviesReducer;