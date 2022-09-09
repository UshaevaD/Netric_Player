import axios from 'axios';
import { takeEvery, put, call, all, SagaReturnType } from 'redux-saga/effects';
import { eventListRequestSuccesses, eventListRequestFailure } from './actions';
import { ActionTypes, IEvent } from './types';
import { events_url } from '../config';

type fetchResponse = SagaReturnType<typeof eventListFetchAPI>

export const eventListFetchAPI = () => axios.get<IEvent[]>(events_url)

export function* eventListWorker() {
  try {
    const response: fetchResponse = yield call(eventListFetchAPI)
    yield put(eventListRequestSuccesses(response.data))
  } catch (error) {
    yield put(eventListRequestFailure())
    console.log('error ', error)
  }
}

export function* eventListWatcher() {
  yield takeEvery(ActionTypes.FETCH_EVENT_LIST_REQUEST, eventListWorker)
}

export function* rootSaga() {
  yield all([eventListWatcher()])
}

