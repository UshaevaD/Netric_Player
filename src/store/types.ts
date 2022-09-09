export enum ActionTypes {
    FETCH_EVENT_LIST_REQUEST = 'FETCH_EVENT_LIST_REQUEST',
    FETCH_EVENT_LIST_SUCCESS = 'FETCH_EVENT_LIST_SUCCESS',
    FETCH_EVENT_LIST_FAILURE = 'FETCH_EVENT_LIST_FAILURE'
}

export interface IBlock {
    left: number
    top: number
    width: number
    height: number
}

export interface IEvent {
    id: number
    timestamp: number
    duration: number
    zone: IBlock
}

export interface IState {
    eventList: Array<IEvent>
}

export type Action =
    | { type: ActionTypes.FETCH_EVENT_LIST_REQUEST }
    | { type: ActionTypes.FETCH_EVENT_LIST_SUCCESS, eventList: IEvent[] }
    | { type: ActionTypes.FETCH_EVENT_LIST_FAILURE }