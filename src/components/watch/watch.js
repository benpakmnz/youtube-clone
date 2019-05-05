/* eslint-disable jsx-a11y/iframe-has-title */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MoviesList from '../moviesList/moviesList';
import IconsContainer from '../../assets/iconsContainer';
import toolBarIcons from '../../assets/iconsPath';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import './watch.scss';
import '../../main.scss';


class Watch extends Component{
    constructor(props){
        super(props);
        this.state= {
            descriptionFull: false,
        }
    }

    componentDidMount(){
        console.log(this.props)
        this.setData()
    }

    componentDidUpdate(prevProps) {
        if(this.props.match.params.id !== prevProps.match.params.id){
           this.setData();
        }      
        
    }

    setData(){
        this.props.setWatchMovie(this.props.match.params.id)
        this.props.changeDrawer(false)        
        this.props.initSelectedMovieComments(this.props.match.params.id)
    }
 
    descHandler = () => {
        this.setState({
            descriptionFull: !this.state.descriptionFull
        })
    }

    // reorderComments = (commentsArr) => {
    //     let reorderdComments = []
    //     commentsArr.forEach(element => {
    //         let parsedDate = Date.parse(new Date(element.PublishdAtSource))
    //         parsedDate >= Date.parse(new Date(reorderdComments.indexOf(reorderdComments.length-1).PublishdAtSource))?
    //         reorderdComments.push(element) : reorderdComments.unshift(element)
    //     })
    //     console.log(reorderdComments)
    //     this.commentsArr = reorderdComments
    // }
    
    
    render(){
        // let commentsArr = this.props.selectedMovieComments
        const movie =  this.props.selectedMovieData
        

        return(
            
            <div className="mainContainer watchContainer">

                <div className= "mainWatch">
                    <iframe className= 'player' width='100%' src={movie.VideoIdEmbedUrl} frameBorder="0" 
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen>
                    </iframe>
                    <div className="movieHeader">  
                        <div className= 'movieTitle'>{movie.Title}</div>
                        <div className= 'movieInfo'>
                            <div className= 'viewsCounter'>{Number(movie.SourceVC).toLocaleString()} views </div>
                            <div className='usersInteractions'>
                                <div style={{display:'flex', alignItems:'center'}} 
                                     className={movie.ReactionMode ==='like' ? 'selected': null}
                                     onClick={() => this.props.reactionHandler('like','movie')}>
                                        <IconsContainer 
                                            className={movie.ReactionMode ==='like' ? 'interactionActionsSelected':'interactionActions' }
                                            path={toolBarIcons.userActionsIcons.likeIcon}/>
                                        {movie.LikeCount}
                                </div>
                                <div style={{display:'flex', alignItems:'center'}} 
                                     className={movie.ReactionMode ==='dislike' ? 'selected': null}
                                     onClick={() => this.props.reactionHandler('dislike','movie')}>   
                                        <IconsContainer 
                                            className={movie.ReactionMode ==='dislike' ? 'interactionActionsSelected':'interactionActions' } 
                                            path={toolBarIcons.userActionsIcons.dislikeIcon}/>
                                        {movie.DislikeCount}
                                </div>
                                <IconsContainer className='interactionActions'
                                                path={toolBarIcons.userActionsIcons.shareIcon}/>
                                SHARE
                                <IconsContainer className='interactionActions' 
                                                path={toolBarIcons.userActionsIcons.saveIcon}/>
                                SAVE
                            </div>
                        </div>
                    </div>
                    <div style={{display: 'flex', alignItems: 'top', width: '100%', margin: '30px 0', borderBottom: 'rgba(0, 0, 0, 0.1) 1px solid'}}>
                        <img src={this.props.movieChannel.Thumbnail}
                            style={{width:48, height: 48, borderRadius: 48, marginRight: 15}} alt= 'channelProfilePic'/>
                        <div>
                            <p style={{marginTop: 0}}>
                            <span style={{fontWeight: 'bold'}}>{this.props.movieChannel.Title}</span>
                            <br/>
                            Published on {movie.PublishedAt}</p>

                        {this.state.descriptionFull? 
                            movie.Description: movie.DescriptionShorten}
                            <p onClick={this.descHandler}>{this.state.descriptionFull?'SHOW LESS': 'SHOW MORE'}</p>                   
                        </div>
                    </div>

                    <div>
                        <h2>{this.props.selectedMovieComments.length} Comments</h2>
                        
                        <ul>{this.props.selectedMovieComments.map(item => 
                                <li><div style={{display: 'flex', width: '100%', margin: '15px 0'}} 
                                    key={item.CommentId}>                              
                                    <img style={{width:40, height: 40, borderRadius: 40, marginRight: 15}} 
                                        src={item.UserPic} alt= 'pic'/>
                                    <div style={{width: '90%'}}>
                                        <div>{item.AuthorDisplayName}</div>
                                        <div dangerouslySetInnerHTML={{ __html: item.Comment}}></div>
                                        <div className="commentData" style={{margin: '5px 0'}}>{item.PublishedAt}</div>
                                    

                                    <div className='usersInteractions'>
                                        <div style={{display:'flex', alignItems:'center'}} 
                                            className={item.ReactionMode ==='like' ? 'selected': null}
                                            onClick={() => this.props.reactionHandler('like','comment',item.CommentId)}>
                                                <IconsContainer style={{margin: 30}}
                                                    className={item.ReactionMode ==='like' ? 'commentInteractionActionsSelected':'commentInteractionActions'}
                                                    path={toolBarIcons.userActionsIcons.likeIcon}/>
                                                <p style={{margin:'0 5px'}}>{item.LikeCount > 0 ? item.LikeCount : null }</p>
                                                
                                        </div>
                                        <div style={{display:'flex', alignItems:'center'}} 
                                            className={item.ReactionMode ==='dislike' ? 'selected': null}
                                            onClick={() => this.props.reactionHandler('dislike','comment',item.CommentId)}>   
                                                <IconsContainer 
                                                    style={{margin:'0px 1px'}}
                                                    className={item.ReactionMode ==='dislike' ? 'commentInteractionActionsSelected':'commentInteractionActions'} 
                                                    path={toolBarIcons.userActionsIcons.dislikeIcon}/>
                                                    
                                        </div>
                                        <p style={{marginLeft: 10}} className="commentData">REPLY</p>
                                    </div>
                                    </div>
                                    </div></li>
                        )}
                    </ul>
                    </div>
                </div>
                <div className= "upNextVideos">
                      <MoviesList type='watch'/>   
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    
    return{
        moviesList: state.fetchMoviesReducer.movieDataList,
        watchMovie: state.fetchMoviesReducer.watchMovieData,
        movieChannel: state.fetchSelectedMovieDataReducer.movieChannel,
        selectedMovieComments: state.fetchSelectedMovieDataReducer.movieComments,
        selectedMovieData: state.fetchSelectedMovieDataReducer.movieData
    }
}


const mapDispatchToProps = dispatch => {
    return{
        changeDrawer: (mode) => dispatch(actionCreators.changeDrawerMode(mode)),
        setWatchMovie: (videoID) => dispatch(actionCreators.fetchWatchMovie(videoID)),
        initSelectedMovieComments: (videoID)=> dispatch(actionCreators.initMovieComments(videoID)),
        reactionHandler: (reactionMode,reactiontype,reactionid) => dispatch(actionCreators.reactionHandler(reactionMode,reactiontype,reactionid))

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Watch))