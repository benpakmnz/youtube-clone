import React from 'react';
import './watch.scss';
import '../../main.scss';
import IconsContainer from '../../assets/iconsContainer';
import toolBarIcons from '../../assets/iconsPath';

const Comments = (props) => ( 
    <ul>{props.movieComments.map(item => 
        <li key={item.CommentId}>
            <div style={{display: 'flex', width: '100%', margin: '15px 0'}} key={item.CommentId}>                              
                <img style={{width:40, height: 40, borderRadius: 40, marginRight: 15}} src={item.UserPic} alt= 'pic'/>
                <div style={{width: '90%'}}>
                        <div>{item.AuthorDisplayName}</div>
                        <div dangerouslySetInnerHTML={{ __html: item.Comment}}></div>
                        <div className="commentData" style={{margin: '5px 0'}}>{item.PublishedAt}</div>

                    <div className='usersInteractions'>
                   <div style={{display:'flex', alignItems:'center'}} className={item.ReactionMode ==='like' ? 'selected': null}
                     onClick={() => props.reactionHandle('like','comment',item.CommentId)}>
                        <IconsContainer style={{margin: 30}} className={item.ReactionMode ==='like' ? 'commentInteractionActionsSelected':'commentInteractionActions'}
                            path={toolBarIcons.userActionsIcons.likeIcon}/>
                        <p style={{margin:'0 5px'}}>{item.LikeCount > 0 ? item.LikeCount : null }</p>
                   </div>
                   <div style={{display:'flex', alignItems:'center'}} className={item.ReactionMode ==='dislike' ? 'selected': null}
                      onClick={() => props.reactionHandle('dislike','comment',item.CommentId)}>   
                        <IconsContainer style={{margin:'0px 1px'}} className={item.ReactionMode ==='dislike' ? 'commentInteractionActionsSelected':'commentInteractionActions'} 
                             path={toolBarIcons.userActionsIcons.dislikeIcon}/>      
                   </div>
                   <p style={{marginLeft: 10}} className="commentData">REPLY</p>
                </div>
                </div>
            </div>
        </li>
        )}
    </ul>
    )


export default Comments