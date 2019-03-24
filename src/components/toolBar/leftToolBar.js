import React from 'react';
import IconsContainer from '../../assets/iconsContainer';
import toolBarIcons from '../../assets/iconsPath';
import './toolBar.scss';
import Logo from '../../logo';

const leftToolBar = () => {
    return(
        <div style={{display: 'flex', marginRight: 20 , alignItems: 'center'}}>
            <IconsContainer className="icons" path={toolBarIcons.drawerIcon}/>
            <Logo alt="YouTube Home"/>

        </div>
    )
}

export default leftToolBar