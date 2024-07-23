import { Dispatch } from 'redux';
import { login, setTokens } from '@/features/auth/authSlice';
import { setUser, UserState } from '@/features/user/userSlice';

export const setupUserLogin = (dispatch: Dispatch, access_token: string, refresh_token: string, user: UserState) => {
	dispatch(setTokens({ access_token, refresh_token }));
	dispatch(setUser(user));
	dispatch(login());
};

export const setupCreateUsername = (dispatch: Dispatch, user: UserState) => {
	dispatch(setUser(user));
	dispatch(login());
};
