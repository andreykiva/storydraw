import { createSlice, createSelector } from '@reduxjs/toolkit';
import User from '@/types/User';

type UserState = Pick<User, 'id' | 'username' | 'name' | 'image'>;

// const initialState: UserState = {
// 	id: '',
// 	username: '',
// 	name: '',
// 	image: '',
// };

const initialState: UserState = {
	id: '123',
	username: 'andrii747',
	name: 'Real',
	image: `https://upload.wikimedia.org/wikipedia/en/c/c1/Just_Got_Back_From_
		the_Discomfort%E2%80%94We%27re_Alright.webp`,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		clearUser: () => {
			return { ...initialState };
		},
	},
});

export const { clearUser } = userSlice.actions;

export const selectUserState = (state: { user: UserState }) => state.user;

export const selectUser = createSelector([selectUserState], (user) => user);

export default userSlice.reducer;
