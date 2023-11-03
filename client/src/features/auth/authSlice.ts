import { createSlice } from '@reduxjs/toolkit';

type AuthState = {
	isAuthOpen: boolean;
	isAuth: boolean;
};

const initialState: AuthState = {
	isAuthOpen: false,
	isAuth: false,
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

export const selectAuth = (state: { auth: AuthState }) => state.auth.isAuth;
export const selectAuthModalStatus = (state: { auth: AuthState }) => state.auth.isAuthOpen;

export default authSlice.reducer;
