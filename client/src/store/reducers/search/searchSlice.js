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

export const { openSearch, changeSearchValue } = searchSlice.actions;

export default searchSlice.reducer;
