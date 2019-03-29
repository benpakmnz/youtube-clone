import * as actionTypes from './actionTypes';


export const changeDrawerMode = (payload) => {
    return{
        type: actionTypes.CHANGE_DRAWER_MODE,
        payload
    }
    

}