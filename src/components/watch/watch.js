/* eslint-disable jsx-a11y/iframe-has-title */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MoviesList from '../moviesList/moviesList';
import IconsContainer from '../../assets/iconsContainer';
import toolBarIcons from '../../assets/iconsPath';
import Comments from './comments';
import Backdrop from '../UI/Backdrop/Backdrop'
import Spinner from '../UI/Spinner/Spinner'
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import './watch.scss';
import '../../main.scss';


class Watch extends Component{
    constructor(props){
        super(props);
        this.state= {
            descriptionFull: false,
            commentsOrder: 'UnOrederd',
            commentsArr: '',
            loader: false
        }

        
    }

    componentDidMount(){
        this.setData('new')
            this.setState({
                  descriptionFull: false,
                  commentsOrder: 'UnOrederd',
                  commentsArr: '',
                  sortCommentsDropdown: false
            })
         
    }

    componentDidUpdate(prevProps) {
        if(this.props.match.params.id !== prevProps.match.params.id){
           this.setData('refresh');
           this.setState({
                 descriptionFull: false,
                 commentsOrder: 'UnOrederd',
                 commentsArr: '',
                 sortCommentsDropdown: false
           })
        }      
        
    }

    setData(dataMode){
        this.props.initSelectedMovieComments(this.props.match.params.id, dataMode)
        this.props.setWatchMovie(this.props.match.params.id)
        this.props.changeDrawer(false)  
        if(dataMode === 'refresh'){ 
            this.props.clearCommentsList(dataMode)
        }

        this.reorderComments('date')
        console.log(this.state)
    }

    descHandler = () => {
        this.setState({
            descriptionFull: !this.state.descriptionFull
        })
    }
    
    reorderCommentsWinOpen = () => {
        console.log('fdfsf')
        this.setState({
            sortCommentsDropdown: true
        })
    }
    
    reorderCommentsWin = () => {
        return(
            <div style={{boxSizing: 'border-box', Width: 125.781, zIndex: 700 ,position: 'absolute', margin: '70px 100px',background: 'white', padding: '8px 0', boxShadow: '0 7px 30px -13px #626262'}}>
            <ul>
                <li style={{height: 48, width: 150, display: 'flex', justifyContent:'center', alignItems: 'center', background: this.state.commentsOrder === 'liked' ? '#d6d6d6': null}} onClick={() => this.reorderComments('liked')}>Top comments</li>
                <li li style={{height: 48, width: 150, display: 'flex', justifyContent:'center', alignItems: 'center',background: this.state.commentsOrder === 'date' ? '#d6d6d6': null}} onClick={() => this.reorderComments('date')}>Newest first</li> 
            </ul>
            </div>
        )
    }
    reorderCommentsWinClose = () => {
            this.setState({
                sortCommentsDropdown: false
            })

    }
    reorderComments = (type) => {
        let sourceArr = this.props.selectedMovieComments
        this.setState({
            loader: true,
            commentsOrder: type,
            commentsArr: sourceArr,
            sortCommentsDropdown: false,
        })

        if(type === 'date'){
            sourceArr.sort((commentA, commentB) => {
                return (
                    Date.parse(new Date(commentB.PublishdAtSource)) 
                    - Date.parse(new Date(commentA.PublishdAtSource)))
            })
        }else if(type ==='liked'){
            sourceArr.sort((commentA, commentB) => {
                return (commentB.LikeCount - commentA.LikeCount)
            })
        }  
        setTimeout(
            ()=> {
                this.setState({
                    loader: false
                })
            }, 1000
        )  
    }
    
    
    render(){
        const movieId = this.props.match.params.id
        const movie =  this.props.selectedMovieData
        return(
            <div className="mainContainer watchContainer">
                {this.props.drawerMode === true ? <Backdrop style={{background:'rgba(0, 0, 0, 0.5)'}} close = {this.props.changeDrawer}/>: null}
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
                    {this.state.loader? <div style={{ position: 'absolute', display: 'flex', justifyContent: 'center',width: 'inherit', height: '100%', background: 'rgba(250, 250, 250, 0.8)'}}><Spinner/></div>:null}
                    <div>                 
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <h2>{this.props.selectedMovieComments.length} Comments</h2>
                            <div style={{display: 'flex', alignItems: 'center',justifyContent: 'space-between',width: 86, marginLeft: 20}} onClick={this.reorderCommentsWinOpen}> 
                            <IconsContainer path={toolBarIcons.sortIcon}/>
                                            SORT BY
                            </div>
                            {this.state.sortCommentsDropdown === true ? this.reorderCommentsWin() : null}
                            {this.state.sortCommentsDropdown === true ?<Backdrop close = {this.reorderCommentsWinClose}/>: null}
                        </div>

                        <Comments movieComments={
                                    this.state.commentsOrder === 'UnOrederd' ? 
                                    this.props.selectedMovieComments : this.state.commentsArr}   
                                    reactionHandle={this.props.reactionHandler}
                                    movieId={this.props.match.params.id}
                                    onCommentSubmit={this.props.handleCommentSubmit}/>
                                    

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
        selectedMovieData: state.fetchSelectedMovieDataReducer.movieData,
        drawerMode: state.drawerModeReducer.drawerMode
    }
}


const mapDispatchToProps = dispatch => {
    return{
        changeDrawer: (mode) => dispatch(actionCreators.changeDrawerMode(mode)),
        setWatchMovie: (videoID) => dispatch(actionCreators.fetchWatchMovie(videoID)),
        clearCommentsList: () => dispatch(actionCreators.clearCommentsList()),
        initSelectedMovieComments: (videoID, dataMode)=> dispatch(actionCreators.initMovieComments(videoID, dataMode)),
        reactionHandler: (reactionMode,reactiontype,reactionid) => dispatch(actionCreators.reactionHandler(reactionMode,reactiontype,reactionid)),
        handleCommentSubmit: (comment, movieId) => dispatch(actionCreators.handleCommentSubmit(comment, movieId))

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Watch))