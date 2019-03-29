import React, { Component } from 'react';
import IconsContainer from '../../assets/iconsContainer';
import toolBarIcons from '../../assets/iconsPath';
import Backdrop from '../UI/Backdrop/Backdrop'
import * as list from '../../assets/dropdownLists';

import './toolBar.scss';


class RightToolBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            listId: ''
        }
    }

    listOpen = (id) => {
        this.setState({
            listId: id
        })
    }

    dropdownClose = () => {
        this.setState({
            listId: ''
        })
    }
       
          
    render(){    
        let dropdownListRender = () => {
            switch (this.state.listId){
             case 'appsIcon': 
             return (
                      <div className="dropdown-list" style={{width: 215}}>Apps
                        {list.youTubeAppsList.map(section => 
                            <li style={{display: "flex", alignItems: "center"}}>
                            <IconsContainer className="icons" 
                                path={section.icon} /> {section.linkTitle}
                            </li>)}
                     </div>
             )
         
             case 'messagesIcon': 
             return <div style={{alignSelf: 'flex-end'}} className="dropdown-list">
                        Messages
                    </div>
         
             case 'notificationsIcon': 
             return <div style={{alignSelf: 'flex-end'}} className="dropdown-list">
                        Notifications
                    </div>
             
             case 'uploadIcon': 
             return (
                 <div className="dropdown-list">
                        Create a video or post
                        {list.createVideoList.map(section => 
                        <li style={{display: "flex", alignItems: "center"}} >
                        <IconsContainer className="icons" 
                            path={section.icon} /> {section.linkTitle}
                        </li>)}
                 </div>
         
             ) 
         
             case 'user': 
             return (
                 <div style={{alignSelf: 'flex-end'}} className="dropdown-list">
                        User data
                        {list.userMenuList.map(section => 
                        <li style={{display: "flex", alignItems: "center"}}>
                        <IconsContainer className="icons" 
                            path={section.icon} /> {section.linkTitle}
                        </li>)}
                 </div>
         
             ) 
             default: return null
            }}

        return(
            
            <div style={{width: 251, display:'flex', alignItems:'center'}}>
            {this.state.listId !== '' ? <Backdrop close = {this.dropdownClose}/> : null}
                 {toolBarIcons.rightToolBar.map(icon => 
                    <div className = "dropdownContainer" key={Object.keys(icon)} onClick={() => 
                        this.listOpen(Object.keys(icon).toString())}>
                        <IconsContainer className="icons" path={Object.values(icon)}/>
                        {this.state.listId === Object.keys(icon).toString() ? dropdownListRender(): null}
                    </div>
                )}
            
                <div className="dropdownContainer" onClick={() => this.listOpen('user')}>
                    <img className="user-icon" 
                            src="https://yt3.ggpht.com/-PcciNQlrmUE/AAAAAAAAAAI/AAAAAAAAAAA/D1j1-rfjOpw/s88-c-k-no-mo-rj-c0xffffff/photo.jpg" 
                            alt="YouTube Home"/>
                            {this.state.listId === 'user' ? dropdownListRender(): null}
                </div>
            </div>
            )
    }
}


    export default RightToolBar






