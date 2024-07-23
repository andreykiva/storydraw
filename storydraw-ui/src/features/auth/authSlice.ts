import { createSlice, createSelector } from '@reduxjs/toolkit';

type AuthState = {
	isAuth: boolean;
	isAuthOpen: boolean;
};

const initialState: AuthState = {
	isAuth: false,
	isAuthOpen: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		openAuthModal: (state) => {
			state.isAuthOpen = true;
		},
		closeAuthModal: (state) => {
			state.isAuthOpen = false;
		},
		login: (state) => {
			state.isAuth = true;
			state.isAuthOpen = false;
		},
		logout: (state) => {
			localStorage.removeItem('access_token');
			localStorage.removeItem('refresh_token');
			state.isAuth = false;
			state.isAuthOpen = true;
		},
		setTokens: (state, action) => {
			localStorage.setItem('access_token', action.payload.access_token);
			localStorage.setItem('refresh_token', action.payload.refresh_token);
		},
	},
});

export const { openAuthModal, closeAuthModal, login, logout, setTokens } = authSlice.actions;

export const selectAuthState = (state: { auth: AuthState }) => state.auth;

export const selectAuth = createSelector([selectAuthState], (auth) => auth.isAuth);
export const selectAuthModalStatus = createSelector([selectAuthState], (auth) => auth.isAuthOpen);

export default authSlice.reducer;
