import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import combinedReducers from '@core/redux/reducers';
import thunk from 'redux-thunk';

/**
 |--------------------------------------------------
 | Put reducers to local storage
 |--------------------------------------------------
 */
const reducer = persistReducer({ key: 'state', storage, whitelist: ['auth'] }, combinedReducers);

//  Preparing middleware for store
let middleware = null;
if (process.env.NODE_ENV === 'development') {
  middleware = composeWithDevTools(applyMiddleware(createLogger(), thunk));
} else {
  middleware = composeWithDevTools(applyMiddleware(thunk));
}

//  Prepare store for Provider
const store = createStore(reducer, middleware);

//  Prepare persistor for persistStore
const persistor = persistStore(store);

//  Exporting store and persistor for providers in index
export { store, persistor };
