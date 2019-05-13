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
        case actionTypes.SET_MOVIE_DATA_COMMENTS: 
            return ({
                ...state,
                movieComments: [action.payload, ...state.movieComments]
            })
        case actionTypes.CLEAR_COMMENTS_LIST:
            console.log(action.payload)
            return({
                ...state,
                movieComments: []
            })
        case actionTypes.ADD_COMMENT:
            console.log(action.payload)
            return({
                ...state,
                movieComments: [action.payload, ...state.movieComments]
                // movieComments: state.movieComments
            })
        
        case actionTypes.MOVIE_REACTION_ADJUSMENTS:
            let movieReactionAdj = {...state.movieData}

            if(action.reaction === 'like'){
                if(movieReactionAdj.ReactionMode === action.reaction){
                    movieReactionAdj.ReactionMode = null
                    movieReactionAdj.LikeCount--
                }else if (movieReactionAdj.ReactionMode === null){
                    movieReactionAdj.LikeCount++
                    movieReactionAdj.ReactionMode = action.reaction
                }else if(movieReactionAdj.ReactionMode === 'dislike'){
                    movieReactionAdj.DislikeCount--
                    movieReactionAdj.LikeCount++
                    movieReactionAdj.ReactionMode = action.reaction
                }
            }else if(action.reaction === 'dislike'){
                if(movieReactionAdj.ReactionMode === action.reaction){
                    movieReactionAdj.ReactionMode = null
                    movieReactionAdj.DislikeCount--
                }else if (movieReactionAdj.ReactionMode === null){
                    movieReactionAdj.DislikeCount++
                    movieReactionAdj.ReactionMode = action.reaction
                }else if(movieReactionAdj.ReactionMode === 'like'){
                    movieReactionAdj.DislikeCount++
                    movieReactionAdj.LikeCount--
                    movieReactionAdj.ReactionMode = action.reaction
                }
            }

         return ({
            ...state,
            movieData: movieReactionAdj 
        }) 
        
        
        case actionTypes.COMMENT_REACTION_ADJUSMENTS:
        let commentReactionAdj = state.movieComments.filter(comment => comment.CommentId === action.id)
        let commentIndex = state.movieComments.findIndex(comment => comment.CommentId === action.id)
        console.log(commentIndex)
        console.log(commentReactionAdj)
        let commentReactionAdjRest = [...state.movieComments]

        if(action.reaction === 'like'){
            if(commentReactionAdj[0].ReactionMode === action.reaction){
                commentReactionAdj[0].LikeCount--
                commentReactionAdj[0].ReactionMode = ""
            }else if (commentReactionAdj[0].ReactionMode === null || commentReactionAdj[0].ReactionMode === ""){
                commentReactionAdj[0].LikeCount++
                commentReactionAdj[0].ReactionMode = action.reaction
            }else if(commentReactionAdj[0].ReactionMode === 'dislike'){
                commentReactionAdj[0].DislikeCount--
                commentReactionAdj[0].LikeCount++
                commentReactionAdj[0].ReactionMode = action.reaction
            }
        }else if(action.reaction === 'dislike'){
            if(commentReactionAdj[0].ReactionMode === action.reaction){
                commentReactionAdj[0].ReactionMode = ""
                commentReactionAdj[0].DislikeCount--
            }else if (commentReactionAdj[0].ReactionMode === null || commentReactionAdj[0].ReactionMode === ""){
                commentReactionAdj[0].DislikeCount++
                commentReactionAdj[0].ReactionMode = action.reaction
            }else if(commentReactionAdj[0].ReactionMode === 'like'){
                commentReactionAdj[0].DislikeCount++
                commentReactionAdj[0].LikeCount--
                commentReactionAdj[0].ReactionMode = action.reaction
            }
        }

        commentReactionAdjRest.splice(commentIndex, 1 , commentReactionAdj[0])
        console.log(commentReactionAdjRest)

     return ({
        ...state,
        movieComments: commentReactionAdjRest
    })  

        default: return state
    }
    
}

export default fetchSelectedMovieData;