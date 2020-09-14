import * as actionName from '@/redux/types';

export function rootReducer(state, action){
    let prevState;
    switch(action.type){
        case actionName.RESIZE_TABLE:
            prevState = state.colState || {};
            prevState[action.data.id] = action.data.value;
            return {...state, colState: prevState};
        default:
            return state;
    }
    
}