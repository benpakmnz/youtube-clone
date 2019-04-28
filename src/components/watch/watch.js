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

    render(){
        const movie =  this.props.selectedMovieData
        let embedUrl= `https://www.youtube.com/embed/${this.props.match.params.id}`

        return(
            
            <div className="mainContainer watchContainer">

                <div className= "mainWatch">
                    <iframe className= 'player' width='100%' src={embedUrl} frameBorder="0" 
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
                                     onClick={() => this.props.reactionHandler('like')}>
                                        <IconsContainer 
                                            className={movie.ReactionMode ==='like' ? 'interactionActionsSelected':'interactionActions' }
                                            path={toolBarIcons.userActionsIcons.likeIcon}/>
                                        {movie.LikeCount}
                                </div>
                                <div style={{display:'flex', alignItems:'center'}} 
                                     className={movie.ReactionMode ==='dislike' ? 'selected': null}
                                     onClick={() => this.props.reactionHandler('dislike')}>   
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
                        <h2>{movie.CommentsCount} Comments</h2>
                        {this.props.selectedMovieComments.map(item => 
                                <div style={{display: 'flex', width: '100%', margin: '30px 0'}} 
                                    key={item.CommentId}>                              
                                    <img style={{width:40, height: 40, borderRadius: 40, marginRight: 15}} 
                                        src={item.UserPic} alt= 'pic'/>
                                    <div style={{width: '90%'}}>
                                        <div>{item.AuthorDisplayName} {item.PublishedAt}</div>
                                        <div dangerouslySetInnerHTML={{ __html: item.Comment}}></div>
                                    </div>
                                    <hr/>
                                </div>
                        )}
                    
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
        reactionHandler: (rectionType) => dispatch(actionCreators.reactionHandler(rectionType))

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Watch))