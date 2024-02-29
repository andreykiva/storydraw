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
		setAuth: (state, action) => {
			state.isAuth = action.payload;
		},
	},
});

export const { openAuthModal, closeAuthModal, setAuth } = authSlice.actions;

export const selectAuthState = (state: { auth: AuthState }) => state.auth;

export const selectAuth = createSelector([selectAuthState], (auth) => auth.isAuth);
export const selectAuthModalStatus = createSelector([selectAuthState], (auth) => auth.isAuthOpen);

export default authSlice.reducer;
