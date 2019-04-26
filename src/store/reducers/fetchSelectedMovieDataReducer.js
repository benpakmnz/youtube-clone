import * as actionTypes from '../actions/actionTypes';

const initialState = { 
    movieData: [],
    movieComments: [],
    movieChannel:[]
};

const fetchSelectedMovieData = (state= initialState, action) => {
    switch(action.type){
        case actionTypes.SET_SELECTED_MOVIE_INFO:
            return ({
                ...state,
                movieData: action.payload
            })
        case actionTypes.SET_CHANNEL_DATA:
            return({
                ...state,
                movieChannel: action.payload
            })
        case actionTypes.SET_MOVIE_COMMENTS:
            return ({
                ...state,
                movieComments: [action.payload, ...state.movieComments]
            })    
        case actionTypes.REACTION_ADJUSMENTS:
            const reactionAdj = {...state.movieData}
            if(action.payload === 'like'){
                if(reactionAdj.ReactionMode === action.payload){
                    reactionAdj.ReactionMode = null
                    reactionAdj.LikeCount--
                }else if (reactionAdj.ReactionMode === null){
                    reactionAdj.LikeCount++
                    reactionAdj.ReactionMode = action.payload
                }else if(reactionAdj.ReactionMode === 'dislike'){
                    reactionAdj.DislikeCount--
                    reactionAdj.LikeCount++
                    reactionAdj.ReactionMode = action.payload
                }
            }else if(action.payload === 'dislike'){
                if(reactionAdj.ReactionMode === action.payload){
                    reactionAdj.ReactionMode = null
                    reactionAdj.DislikeCount--
                }else if (reactionAdj.ReactionMode === null){
                    reactionAdj.DislikeCount++
                    reactionAdj.ReactionMode = action.payload
                }else if(reactionAdj.ReactionMode === 'like'){
                    reactionAdj.DislikeCount++
                    reactionAdj.LikeCount--
                    reactionAdj.ReactionMode = action.payload
                }
            }

         return ({
            ...state,
            movieData: reactionAdj 
        })    

        default: return state
    }
    
}

export default fetchSelectedMovieData;