import * as actionTypes from './actionTypes';
import axios from 'axios';

const API_KEY = `${process.env.REACT_APP_API_KEY_YT}`
const DATA_URL = `${process.env.REACT_APP_DATA_URL}`

const formatDate = publishedDate  => {
    const pub = new Date(publishedDate)
    const now= new Date(Date.now())
    const _MS_PER_DAY= 1000*60*60*24;

    const utc1= Date.UTC(pub.getFullYear(), pub.getMonth()+1, pub.getDate(), pub.getHours(), pub.getMinutes());
    const utc2= Date.UTC(now.getFullYear(), now.getMonth()+1, now.getDate(), now.getHours(), now.getMinutes());

    let pubAmount= Math.floor((utc2-utc1)/ _MS_PER_DAY);

    if(pubAmount >= 0 && pubAmount < 1 ){
      let hoursDif = Math.floor((utc2-utc1)/3600000)
      if (hoursDif>1){
        return hoursDif + ' hours ago'
      }else if(hoursDif === 1){
        return '1 hour ago'
      }else if(hoursDif<1){
        let minutesDif = Math.floor((utc2-utc1)/60000)
        if(minutesDif>1){
        return `${minutesDif} minutes ago`
        }else if(minutesDif===1){
            return '1 minute ago'
        }else if(minutesDif<1){
            return 'just now'
      }
      }  
    }
    else if (pubAmount >= 1 && pubAmount < 7 ){
      return `${pubAmount.toFixed()} days ago`
    }
    else if (pubAmount >= 7 && pubAmount < 14 ){
        return '1 week ago'
    }
    else if (pubAmount >= 14 && pubAmount < 30){
        let a = pubAmount/7
        return `${a.toFixed()} weeks ago`
    }
    else if (pubAmount >= 30 && pubAmount < 60){
        return `1 month ago`
   }
    else if (pubAmount >= 60 && pubAmount < 365){
        let a = pubAmount/30
        return `${a.toFixed()} months ago`
    }
    else if (pubAmount >= 365 && pubAmount < 730){
        return `1 year ago`
    }
    else if (pubAmount >= 730){
        let a = pubAmount/365
        return `${a.toFixed()} years ago`
    }
    return
}

export const formatDuration = duration => {
    let formattedDuration = duration.replace(/\D/g,' ')
            .split(' ')
            .filter(char => char !=='')
            .map(char => char.length< 2 ? '0' + char: char)
            .join(':')
    return formattedDuration
}

export const formatViews = amount => {
    let views= amount
    if (amount.length === 4){
      views = amount.substring(0,1) + 'K '
    } else if (amount.length === 5){
      views = amount.substring(0,2) + 'K '
    } else if (amount.length === 6){
      views = amount.substring(0,3) + 'K '
    } else if (amount.length === 7){
      views = amount.substring(0,3) + 'M '
    } 
    return(views)
}

export const description = description => {
    let desc = description;
    if(desc.length >= 200){
        return(desc.slice(0,200))
    }else{
        return desc
    }
}

export const setMovieList = (payload) => {
    const durationHandler = formatDuration(payload.contentDetails.duration) 
    const publishedDateHandler = formatDate(payload.snippet.publishedAt)  
    const viewsHandler = formatViews(payload.statistics.viewCount)
    return {
        type: actionTypes.SET_MOVIE_LIST,
        payload:{
        Title: payload.snippet.title,
        ChannelTitle: payload.snippet.channelTitle,
        ChannelId: payload.snippet.channelId,
        PublishedAt: publishedDateHandler,
        FormatedDur: durationHandler,
        Duration: payload.contentDetails.duration,
        ViewCount: viewsHandler,
        SourceVC: payload.statistics.viewCount,
        VideoUrl: payload.snippet.thumbnails.medium.url,
        LikeCount:payload.statistics.likeCount,
        DislikeCount: payload.statistics.dislikeCount,
        FavoriteCount:payload.favoriteCount,
        Description: payload.snippet.description,
        DescriptionShorten: description(payload.snippet.description),
        VideoId: payload.id
        }
    }
    
}

export const initMovies = () => {
    return dispatch => { 
            axios.get(DATA_URL)
            .then(res => {
                res.data.forEach(movieTitle => { 
                    dispatch(setMovieList(movieTitle))
                })
            })
            .catch(error => console.log(error))
            }
}

// export const initMovies = () => {
//     let moviesInitialList = [
//         'KMX1mFEmM3E',
//         'UtIOMUQ7nWM',
//         'wwUbI2i_LZM',
//         '_mj72QqsOs4',
//         '9ooYYRLdg_g',
//         'OAR0E72hFyA',
//         'pkdgVYehiTE',
//         'RRJo_TXdqPg',
//     ]

//     return dispatch => { 
//         moviesInitialList.forEach(movieTitle => {
//             axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${movieTitle}&key=${API_KEY}`)
//             .then(res => {
//                 dispatch(setMovieList(res.data.items[0]))})
//                 .catch(error => console.log(error))
//         })
        
//     }
// }

export const setSelectedMovieData = (payload) => {
    const durationHandler = formatDuration(payload.contentDetails.duration) 
    const publishedDateHandler = new Date(payload.snippet.publishedAt).toString().split(' ')
    const viewsHandler = formatViews(payload.statistics.viewCount)
    return {
        type: actionTypes.SET_SELECTED_MOVIE_INFO,
        payload:{
            Title: payload.snippet.title,
            ChannelTitle: payload.snippet.channelTitle,
            ChannelId: payload.snippet.channelId,
            PublishedAt: `${publishedDateHandler[1]} ${publishedDateHandler[2]}, ${publishedDateHandler[3]}`,
            FormatedDur: durationHandler,
            Duration: payload.contentDetails.duration,
            ViewCount: viewsHandler,
            SourceVC: payload.statistics.viewCount,
            VideoUrl: payload.snippet.thumbnails.medium.url,
            LikeCount:Number(payload.statistics.likeCount),
            DislikeCount: Number(payload.statistics.dislikeCount),
            FavoriteCount:Number(payload.favoriteCount),
            CommentsCount: payload.statistics.commentCount,
            Description: payload.snippet.description,
            DescriptionShorten: description(payload.snippet.description),
            VideoIdEmbedUrl: `https://www.youtube.com/embed/${payload.id}`,
            VideoIdId: payload.id,
            ReactionMode: null
            }
    }
}

export const fetchWatchMovie = (payload) => {
    return dispatch => { 
            axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${payload}&key=${API_KEY}`)
            .then(res => {
                dispatch(setSelectedMovieData(res.data.items[0]))
                dispatch(initChannelData(res.data.items[0].snippet.channelId))})
            .catch(error => console.log(error))  
    }
}

export const setChannelData = (payload) => {
    return {
        type: actionTypes.SET_CHANNEL_DATA,
        payload: {
             Thumbnail: payload.snippet.thumbnails.default.url,
             Title:payload.snippet.title,
            }
    }
}

export const initChannelData = (ChannelID) => {
    return dispatch => { 
        axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${ChannelID}&key=${API_KEY}`)
             .then(res => {
                 dispatch(setChannelData(res.data.items[0]))})
                .catch(error => console.log(error))       
    }
}

export const setSelectedMovieComments = (payload) => {
    const pubdate = formatDate(payload.snippet.topLevelComment.snippet.publishedAt)

    return {
        type: actionTypes.SET_MOVIE_COMMENTS,
        payload:{
            CommentId:payload.id,
            Comment: payload.snippet.topLevelComment.snippet.textDisplay,
            UserPic: payload.snippet.topLevelComment.snippet.authorProfileImageUrl.replace('s28','s40'),
            AuthorDisplayName: payload.snippet.topLevelComment.snippet.authorDisplayName,
            LikeCount: payload.snippet.topLevelComment.snippet.likeCount,
            DislikeCount: payload.snippet.topLevelComment.snippet.dislikeCount? payload.snippet.topLevelComment.snippet.dislikeCount : 0 ,
            ReactionMode: null,
            PublishdAtSource: payload.snippet.topLevelComment.snippet.publishedAt,
            PublishedAt: pubdate
        }
        
    }
}

export const setSelectedMovieDataComments = (payload) => {
    return {
        type: actionTypes.SET_MOVIE_DATA_COMMENTS,
        payload    
    }
}

export const clearCommentsList = (dataMode) => {
    return {
    type: actionTypes.CLEAR_COMMENTS_LIST,
    payload: dataMode
    }
}

export const initMovieComments = (movieId) => {
    return dispatch => {   
        axios.all([
            axios.get(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${movieId}&key=${API_KEY}`),
            axios.get(`https://yt-clone-e7862.firebaseio.com/comments/${movieId}.json`)
        ])
        .then(axios.spread((res1, res2) => {
            res1.data.items.map(comment => 
                dispatch(setSelectedMovieComments(comment)))
            Object.values(res2.data).map(comment =>
                dispatch(setSelectedMovieDataComments(comment)))
            }))
            .catch(error => console.log(error))
    }
}

export const reactionHandler = (reactionMode,reactiontype,reactionid) => {
        if (reactiontype === 'movie'){ 
        return {
            type: actionTypes.MOVIE_REACTION_ADJUSMENTS,
            reaction: reactionMode
        }
        }else if (reactiontype === 'comment'){
            return{
            type: actionTypes.COMMENT_REACTION_ADJUSMENTS,
            reaction: reactionMode,
            id:reactionid
        }
}
}

export const handleCommentSubmit = (comment,movieId) => {
    const time = new Date(Date.now()).toISOString()
    const timeConverted = formatDate(time)
    const commentPayload = {
        AuthorDisplayName:'Benny Pakman',
        Comment: comment,
        CommentId: comment,
        DislikeCount: 0,
        LikeCount: 0,
        PublishedAt: timeConverted,
        ReactionMode: "",
        UserPic: 'https://yt3.ggpht.com/-PcciNQlrmUE/AAAAAAAAAAI/AAAAAAAAAAA/D1j1-rfjOpw/s88-c-k-no-mo-rj-c0xffffff/photo.jpg',
      }
      axios.post(`https://yt-clone-e7862.firebaseio.com/comments/${movieId}.json`,commentPayload)

      return (
        {
        type: actionTypes.ADD_COMMENT,
        payload: commentPayload
        }
    )
}

