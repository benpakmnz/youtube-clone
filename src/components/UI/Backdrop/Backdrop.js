import React from 'react';
import './Backdrop.scss';


const Backdrop = (props) => {
    return (
        <div className ='backdrop' style = {props.style}
            onClick= { () => props.close()}/>
    )
} 

export default Backdrop