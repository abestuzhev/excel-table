import * as actionName from '@/redux/actions';

export function rootReducer(state, action = {}){
    switch(action){
        case actionName.RESIZE_TABLE:
            break;
        default: return state;
    }
    
}