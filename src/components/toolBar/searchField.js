import React from 'react';
import IconsContainer from '../../assets/iconsContainer';
import toolBarIcons from '../../assets/iconsPath';
import './toolBar.scss';

const SearchField = () => {
    return(
        <div className ="searchField">
           <input style={{height: 31, padding: 2, boxSizing: 'border-box', width: '50vw',
           maxWidth: 515, border: 'solid #d3d3d3 1px',borderRadius: '0 2px 2px 0' }} placeholder="Search"></input>
           <button>
            <IconsContainer className="searchIcon"  path={toolBarIcons.searchIcon}/>
          </button>
        </div>

    )
}

export default SearchField;