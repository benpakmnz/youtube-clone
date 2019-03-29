import React from 'react';
import IconsContainer from '../../assets/iconsContainer';
import toolBarIcons from '../../assets/iconsPath';
import './toolBar.scss';

const SearchField = () => {
    return(
        <div className ="searchField">
           <input placeholder="Search"></input>
           <button>
            <IconsContainer className="searchIcon"  path={toolBarIcons.searchIcon}/>
          </button>
        </div>

    )
}

export default SearchField;