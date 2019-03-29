import React from 'react';
import LeftToolBar from './leftToolBar';
import SearchField from './searchField';
import RightToolBar from './rightToolBar'

import './toolBar.scss';


const ToolBar = () => {
    return(
        <div className ="toolbarContainer">
           <LeftToolBar/>
           <SearchField/>
           <RightToolBar/>
        </div>
    )
}           


export default ToolBar;