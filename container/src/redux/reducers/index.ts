import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth.reducers';
import { StoreState } from '@ts/types/storeState.types';

//  Combining all existing reducers
const appReducer = combineReducers<StoreState>({
  auth: authReducer
});

const rootReducer = (state: any, action: any): any => {
  if (action.type === 'SIGN_OUT_SUCCESSFUL') {
    storage.removeItem('persist:root');
  }

  return appReducer(state, action);
};

export default rootReducer;
