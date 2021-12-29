import { AuthActionTypes } from '@ts/enums/auth.enum';

export interface LoginCredentialTypes {
  email: string;
  password: string;
}

export interface LoginUserRequest {
  type: AuthActionTypes.START_LOGIN_USER;
}

export interface LoginUserSuccessInterface {
  type: AuthActionTypes.LOGIN_USER_SUCCESSFUL;
  payload: any;
}

export interface LoginUserFailedInterface {
  type: AuthActionTypes.LOGIN_USER_FAILED;
  error: any;
}

export interface AuthInfoInterface {
  accessToken: string;
  accessTokenExpireDate: Date;
  mfaRequired: boolean;
  mfaStatus: string;
  refreshToken: string;
  refreshTokenExpireDate: Date;
  uuid: string;
}

export interface AuthReducerInterface {
  authInfo: AuthInfoInterface;
  userData: any;
  loader: boolean;
}

export type LoginUserActions =
  | LoginUserSuccessInterface
  | LoginUserFailedInterface
  | LoginUserRequest;
