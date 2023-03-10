import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';

import persist from './modules/persist';
import combineReducers from './modules/rootReducer';
import rootSaga from './modules/rootSagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  persist(combineReducers),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export default store;
