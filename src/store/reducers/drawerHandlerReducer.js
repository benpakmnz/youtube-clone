import * as actionTypes from '../actions/actionTypes';

const initialState = { 
    drawerMode: true
};

const drawerMode = (state= initialState, action) => {
    switch(action.type){
        case actionTypes.CHANGE_DRAWER_MODE:
            return ({
                ...state,
                drawerMode: action.payload ? action.payload : !state.drawerMode
            })
       
        default: return state
    }
    
}

export default drawerMode;