import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isOpen: false,
	value: ''
};

export const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		search: (state, action) => {
			state.isOpen = false;
			state.value = action.payload;
			console.log("Грузим видео " + action.payload);
		},
		closeSearch: (state) => {
			state.isOpen = false;
		},
		changeSearchValue: (state, action) => {
			if (action.payload.trim()) {
				state.value = action.payload;
				state.isOpen = true;
			} else {
				state.value = '';
				state.isOpen = false;
			}
		}
	},

});

export const { closeSearch, loadSearchPage, search, changeSearchValue } = searchSlice.actions;

export default searchSlice.reducer;
