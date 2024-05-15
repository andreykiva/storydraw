import { createSlice, createSelector } from '@reduxjs/toolkit';

type AuthState = {
	isAuthOpen: boolean;
	isAuth: boolean;
};

const initialState: AuthState = {
	isAuthOpen: false,
	isAuth: true,
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
			state.isAuth = false;
			state.isAuthOpen = true;
		},
	},
});

export const { openAuthModal, closeAuthModal, login, logout } = authSlice.actions;

export const selectAuthState = (state: { auth: AuthState }) => state.auth;

export const selectAuth = createSelector([selectAuthState], (auth) => auth.isAuth);
export const selectAuthModalStatus = createSelector([selectAuthState], (auth) => auth.isAuthOpen);

export default authSlice.reducer;
