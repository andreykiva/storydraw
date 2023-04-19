import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isOpen: false,
	value: ''
};

export const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		openSearch: (state) => {
			state.isOpen = true;
		},
		changeSearchValue: (state, action) => {
			state.value = action.payload;
		}
	},

});

export const { openSearch, changeSearchValue } = searchSlice.actions;

export default searchSlice.reducer;
