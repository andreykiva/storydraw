import { createSlice, createSelector } from '@reduxjs/toolkit';
import User from '@/types/User';

type UserState = User;

// const initialState: UserState = {
// 	id: '',
// 	username: '',
// 	name: '',
// 	description: '',
// 	image: '',
// 	following: null,
// 	followers: null,
// 	likes: null,
// };

const initialState: UserState = {
	id: '123',
	username: 'andrii747',
	name: 'Real',
	description: `no. I'm not.`,
	image: `https://upload.wikimedia.org/wikipedia/en/c/c1/Just_Got_Back_From_
		the_Discomfort%E2%80%94We%27re_Alright.webp`,
	following: 3123,
	followers: 123,
	likes: 321,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
});

// export const { openAuthModal, closeAuthModal, login, logout } = userSlice.actions;

export const selectUserState = (state: { user: UserState }) => state.user;

export const selectUser = createSelector([selectUserState], (user) => user);
// export const selectAuthModalStatus = createSelector([selectAuthState], (auth) => auth.isAuthOpen);

export default userSlice.reducer;
