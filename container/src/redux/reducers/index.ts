import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import exampleReducer from './example.reducer';
import { StoreState } from '@ts/shared/storeState.types';

//  Combining all existing reducers
const appReducer = combineReducers<StoreState>({
  exampleReducer
});

const rootReducer = (state: any, action: any): any => {
  if (action.type === 'SIGN_OUT_SUCCESSFUL') {
    storage.removeItem('persist:root');
  }

  return appReducer(state, action);
};

export default rootReducer;
