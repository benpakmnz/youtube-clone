import React from 'react';

const IconsContainer = (props) => {
    return (
      <li className={props.className}>
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path d={props.path}/>
      </svg>
      </li>
    )
  }


  export default IconsContainer