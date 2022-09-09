import { Action, ActionTypes, IEvent } from "./types";

export const eventListRequest = (): Action => ({
    type: ActionTypes.FETCH_EVENT_LIST_REQUEST,
})

export const eventListRequestSuccesses = (list: IEvent[]): Action => ({
    type: ActionTypes.FETCH_EVENT_LIST_SUCCESS,
    eventList: list
})

export const eventListRequestFailure = (): Action => ({
    type: ActionTypes.FETCH_EVENT_LIST_FAILURE
})