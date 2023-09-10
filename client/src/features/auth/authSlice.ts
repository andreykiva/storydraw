import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isAuthOpen: true,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		closeAuth: (state) => {
			state.isAuthOpen = false;
		},
		openAuth: (state) => {
			state.isAuthOpen = true;
		},
	},
});

export const { openAuth, closeAuth } = authSlice.actions;

export default authSlice.reducer;
