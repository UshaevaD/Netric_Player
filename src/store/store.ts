import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import { rootSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
    eventReducer: reducer
})

export const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch