import { StoreState } from '@ts/types/storeState.types';

export const isLoggedIn = (state: StoreState) => !!state?.auth?.authInfo;
