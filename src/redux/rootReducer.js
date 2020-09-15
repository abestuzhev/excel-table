import * as actionName from '@/redux/types';

export function rootReducer(state, action){
    let prevState;
    switch(action.type){
        case actionName.RESIZE_TABLE:
            const field = action.data.type === 'col' ? 'colState' : 'rowState';
            prevState = state[field] || {};
            prevState[action.data.id] = action.data.value;
            return {...state, [field]: prevState};
        default:
            return state;
    }
    
}