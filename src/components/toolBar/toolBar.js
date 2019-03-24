import React from 'react';
import IconsContainer from '../../assets/iconsContainer';
import toolBarIcons from '../../assets/iconsPath';
import LeftToolBar from './leftToolBar';
import SearchField from './searchField';
import DropDownMenuContainer from '../dropDownMenu/dropDownMenuContainer'
import './toolBar.scss';


    const ToolBar = () => {

    function renderRightside(){
    return(
    Object.values(toolBarIcons.rightToolBar).map((icon, index) => <IconsContainer onClick="" className="icons" path={icon} key={index}/>)
    )}   

    return(
        <div className ="toolbarContainer">
           <LeftToolBar/>
           <SearchField/>
           <div style={{width: 251, display:'flex', alignItems:'center'}}>
                {renderRightside()}
                <img className="user-icon" src="https://yt3.ggpht.com/-PcciNQlrmUE/AAAAAAAAAAI/AAAAAAAAAAA/D1j1-rfjOpw/s88-c-k-no-mo-rj-c0xffffff/photo.jpg" alt="YouTube Home"/>
            </div>
            {/* <DropDownMenuContainer/> */}
        </div>

    )
}

export default ToolBar;