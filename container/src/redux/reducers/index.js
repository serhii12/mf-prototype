import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import exampleReducer from '@core/screens/Example/Example.reducer';

//  Combining all existing reducers
const appReducer = combineReducers({
  exampleReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'SIGN_OUT_SUCCESSFUL') {
    storage.removeItem('persist:root');
  }

  return appReducer(state, action);
};

export default rootReducer;
