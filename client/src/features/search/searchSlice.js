import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isSearchOpen: false,
};

export const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		search: (state, action) => {
			state.isSearchOpen = false;
			console.log('Грузим видео ' + action.payload);
		},
		closeSearch: (state) => {
			state.isSearchOpen = false;
		},
		openSearch: (state) => {
			state.isSearchOpen = true;
		},
	},
});

export const { openSearch, closeSearch, search } = searchSlice.actions;

export default searchSlice.reducer;
