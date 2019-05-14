import React, { Component } from 'react';
import './watch.scss';
import '../../main.scss';
import IconsContainer from '../../assets/iconsContainer';
import toolBarIcons from '../../assets/iconsPath';

class Comments extends Component {
    constructor(props){
        super(props)
        this.state = {
            inputFocus: false,
            comment: '',
            commentFocus: ''
        }
        this.comment = React.createRef()
    }

    toggleInputFocus = () => {
        this.setState({
            inputFocus: true 
        })
    }

    handleInputChange = (evt) => {
        this.setState({ 
            comment: evt.target.value 
        });
    }

    handleNewCommentSubmit = () => {
        if(this.state.comment.length > 0){
            this.props.onCommentSubmit(this.state.comment, this.props.movieId)
            this.setState({
                inputFocus: false,
                comment: ''
            })
            this.comment.current.value= ''
        }
    }

    handleNewCommentCancel = () => {
            this.setState({
                inputFocus: false,
                comment: ''
            })
            this.comment.current.value= ''
    }
    handleCommentFocus = (commentId) => {
        this.setState({
            commentFocus: commentId
        })
    }

    
    render(){
        
        return(
        <ul>
         <li>
            <div style={{display: 'flex', width: '100%', margin: '15px 0'}} >                              
                <img style={{width:40, height: 40, borderRadius: 40, marginRight: 15}} 
                     src='https://yt3.ggpht.com/-PcciNQlrmUE/AAAAAAAAAAI/AAAAAAAAAAA/D1j1-rfjOpw/s40-c-k-no-mo-rj-c0xffffff/photo.jpg' alt= 'pic'/>
                <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
                    <input onFocus={this.toggleInputFocus} onChange={this.handleInputChange} ref={this.comment} placeholder="Add a public comment..."></input>
                {this.state.inputFocus ?
                    <div style={{display: 'flex', alignSelf: 'flex-end', marginTop: 20}}>                
                        <button 
                            onClick={this.handleNewCommentCancel}
                            style={{display: 'flex',alignItems: 'center', background: 'none', height: 34, fontSize: 16, color: '#757575', borderRadius: 3, border: 'none', padding: '5px 14px'}}>
                        cancel</button>
                        
                        <button style={{display: 'flex',alignItems: 'center', 
                                        background: this.state.comment.length > 0 ? '#065FD4':'#CCCCCC', 
                                        height: 34, fontSize: 16, color: 'white', borderRadius: 3, border: 'none', padding: '5px 14px'
                                    }} 
                        onClick={this.handleNewCommentSubmit}>comment</button>
                    </div>: null}
                </div>
            </div>

        </li>
        {this.props.movieComments.map(item => 
        <li key={item.CommentId} onMouseEnter={() => this.handleCommentFocus(item.CommentId)} onMouseLeave={this.handleCommentFocus}>
            <div style={{display: 'flex', width: '100%', margin: '15px 0'}} key={item.CommentId}>                              
                <img style={{width:40, height: 40, borderRadius: 40, marginRight: 15}} src={item.UserPic} alt= 'pic'/>
                <div style={{width: '90%'}}>
                        <div>{item.AuthorDisplayName}</div>
                        <div dangerouslySetInnerHTML={{ __html: item.Comment}}></div>
                        <div className="commentData" style={{margin: '5px 0'}}>{item.PublishedAt}</div>

                    <div className='usersInteractions'>
                   <div style={{display:'flex', alignItems:'center'}} className={item.ReactionMode ==='like' ? 'selected': null}
                     onClick={() => this.props.reactionHandle('like','comment',item.CommentId)}>
                        <IconsContainer style={{margin: 30}} className={item.ReactionMode ==='like' ? 'commentInteractionActionsSelected':'commentInteractionActions'}
                            path={toolBarIcons.userActionsIcons.likeIcon}/>
                        <p style={{margin:'0 5px'}}>{item.LikeCount > 0 ? item.LikeCount : null }</p>
                   </div>
                   <div style={{display:'flex', alignItems:'center'}} className={item.ReactionMode ==='dislike' ? 'selected': null}
                      onClick={() => this.props.reactionHandle('dislike','comment',item.CommentId)}>   
                        <IconsContainer style={{margin:'0px 1px'}} className={item.ReactionMode ==='dislike' ? 'commentInteractionActionsSelected':'commentInteractionActions'} 
                             path={toolBarIcons.userActionsIcons.dislikeIcon}/>      
                   </div>
                   <p style={{marginLeft: 10}} className="commentData">REPLY</p>
                </div>
                </div>
                {this.state.commentFocus ===  item.CommentId ? <IconsContainer style={{margin:'0px 1px'}} 
                             path={toolBarIcons.editIcon}/> : null}
            </div>


        </li>
        )}
    </ul>
    )}

}


export default Comments