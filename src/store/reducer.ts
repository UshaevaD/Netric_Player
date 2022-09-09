import { Action, IState, ActionTypes } from './types';

const initialState: IState = {
    eventList: []
}

export default function reducer(
    state: IState = initialState, 
    action: Action
): IState  {
    switch(action.type) {
        case ActionTypes.FETCH_EVENT_LIST_REQUEST:
            return state

        case ActionTypes.FETCH_EVENT_LIST_SUCCESS:
            return { 
                ...state, 
                eventList: action.eventList.sort((a, b) => a.timestamp - b.timestamp)
            }

        case ActionTypes.FETCH_EVENT_LIST_FAILURE:
            return state

        default: 
            return state;
    }
}