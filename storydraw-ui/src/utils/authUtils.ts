import { Dispatch } from 'redux';
import { login, setTokens } from '@/features/auth/authSlice';
import { setUser, UserState } from '@/features/user/userSlice';

export const setupUserAndTokens = (dispatch: Dispatch, access_token: string, refresh_token: string, user: UserState) => {
	dispatch(setTokens({ access_token, refresh_token }));
	dispatch(setUser(user));
};

export const setupCreateUsername = (dispatch: Dispatch, user: UserState) => {
	dispatch(setUser(user));
	dispatch(login());
};
