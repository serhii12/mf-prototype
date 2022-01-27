import { Dispatch } from 'redux';
import restClient from '@core/utils/restClient';
import {
  AuthInfoInterface,
  LoginCredentialTypes,
  LoginUserActions,
  LogoutUserActions
} from '@ts/types/auth.types';
import { AuthActionTypes } from '@ts/enums/auth.enum';
import { AxiosResponse } from 'axios';
import messagingService from '@core/utils/messagingService';
import { MessageTypes } from '@ts/enums/messagingService.enum';

export const requestUserLogin =
  (formValues: LoginCredentialTypes) =>
  async (dispatch: Dispatch<LoginUserActions>): Promise<AxiosResponse> => {
    dispatch({ type: AuthActionTypes.START_LOGIN_USER });

    try {
      const userData = await restClient.post<AuthInfoInterface>(
        '/api/gourban-staging2/sign-in-email',
        formValues
      );
      dispatch({ type: AuthActionTypes.LOGIN_USER_SUCCESSFUL, payload: userData?.data });
      messagingService.sendMessageToRemotes({
        type: MessageTypes.USER_CHANGE,
        data: userData?.data
      });

      return userData;
    } catch (e) {
      dispatch({ type: AuthActionTypes.LOGIN_USER_FAILED, error: e.message });
      throw new Error(e);
    }
  };

export const requestSignOut = () => (dispatch: Dispatch<LogoutUserActions>) => {
  dispatch({ type: AuthActionTypes.START_LOGOUT_USER });
};
