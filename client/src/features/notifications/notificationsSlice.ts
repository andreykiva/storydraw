import { createSlice } from '@reduxjs/toolkit';

type NotificationsState = {
	isNotificationsOpen: boolean;
	notificationsCategory: 'all' | 'likes' | 'comments' | 'mentionsTags' | 'followers';
};

const initialState: NotificationsState = {
	isNotificationsOpen: true,
	notificationsCategory: 'likes',
};

export const notificationsSlice = createSlice({
	name: 'notifications',
	initialState,
	reducers: {
		openNotificationsModal: (state) => {
			state.isNotificationsOpen = true;
		},
		closeNotificationsModal: (state) => {
			state.isNotificationsOpen = false;
		},
		changeNotificationsCategory: (state, action) => {
			state.notificationsCategory = action.payload;
		},
	},
});

export const { openNotificationsModal, closeNotificationsModal, changeNotificationsCategory } =
	notificationsSlice.actions;

export const selectNotificationsModalStatus = (state: { notifications: NotificationsState }) =>
	state.notifications.isNotificationsOpen;
export const selectNotificationsCategory = (state: { notifications: NotificationsState }) =>
	state.notifications.notificationsCategory;

export default notificationsSlice.reducer;
