import { AuthActionTypes } from '@ts/enums/auth.enum';
import { AuthReducerInterface, LoginUserActions } from '@ts/types/auth.types';

const initialState: AuthReducerInterface = {
  authInfo: null,
  userData: null,
  loader: false
};

export default (
  state: AuthReducerInterface = initialState,
  action: LoginUserActions
): AuthReducerInterface => {
  switch (action.type) {
    case AuthActionTypes.START_LOGIN_USER: {
      return {
        ...state,
        loader: true
      };
    }

    case AuthActionTypes.LOGIN_USER_SUCCESSFUL: {
      return {
        ...state,
        authInfo: action.payload,
        loader: false
      };
    }

    default:
      return state;
  }
};
