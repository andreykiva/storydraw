import { createSlice, createSelector } from '@reduxjs/toolkit';
import { User } from '@/__generated__/schema-types';

export type UserState = Pick<User, 'id' | 'username' | 'displayName' | 'imageUrl'>;

const initialState: UserState = {
	id: '',
	username: '',
	displayName: '',
	imageUrl: '',
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		clearUser: () => {
			return { ...initialState };
		},
		setUser: (state, action) => {
			state.id = action.payload.id;
			state.username = action.payload.username;
			state.displayName = action.payload.displayName;
			state.imageUrl = action.payload.imageUrl;
		},
	},
});

export const { clearUser, setUser } = userSlice.actions;

export const selectUserState = (state: { user: UserState }) => state.user;

export const selectUser = createSelector([selectUserState], (user) => user);

export default userSlice.reducer;
