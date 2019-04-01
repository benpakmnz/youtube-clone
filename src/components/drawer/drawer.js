import React, { Component } from 'react';
import {drawerListTop, drawerListPersonal, drawerListSubscriptions, drawerListMore, drawerListSettings }   from '../../assets/drawerLists';
import IconsContainer from '../../assets/iconsContainer';
// import { connect } from 'react-redux';

import './drawer.scss';


class Drawer extends Component {
    constructor(props){
        super(props)
        this.state = {
            activated: 'Home'
        }
    
    }

    renderList = (listType, title) => {
        return(
            <section className='drawer'>
                {title ? <div className="h3 sectionTitle">{title}</div> : null}
                <ul>
                    {listType.map(item =>
                        <li style={{display: 'flex', alignItems: 'center', background: this.state.activated === item.linkTitle ? '#d6d6d6': null}} key={item.linkTitle}>
                            <IconsContainer className= {this.state.activated === item.linkTitle ? 'iconsActivated': "icons"} path={item.icon} />
                        {item.linkTitle}
                        </li>
                    )}
                </ul>
                <hr/>
            </section>   
            )      
    }

    render(){
    return(
    <div className="drawerContainer" >
         {this.renderList(drawerListTop)}         
         {this.renderList(drawerListPersonal)}       
         {this.renderList(drawerListSubscriptions, 'SUBSCRIPTIONS')}        
         {this.renderList(drawerListMore, 'MORE FROM YOUTUBE')}        
         {this.renderList(drawerListSettings)}
         <div className="links">
            <p>About Press Copyright Contact us Creators Advertise Developers</p>
            <p>Terms Privacy Policy & Safety Test new features</p>                        
            <p>© 2019 YouTube, LLC</p>
        </div>

    </div>

    )
    }
}


export default Drawer