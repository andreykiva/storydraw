import { createSlice, createSelector } from '@reduxjs/toolkit';

type NotificationsState = {
	isNotificationsOpen: boolean;
	notificationsCategory: 'all' | 'likes' | 'comments' | 'mentionsTags' | 'followers';
};

const initialState: NotificationsState = {
	isNotificationsOpen: false,
	notificationsCategory: 'all',
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

export const selectNotificationsState = (state: { notifications: NotificationsState }) => state.notifications;

export const selectNotificationsModalStatus = createSelector(
	[selectNotificationsState],
	(notifications) => notifications.isNotificationsOpen,
);

export const selectNotificationsCategory = createSelector(
	[selectNotificationsState],
	(notifications) => notifications.notificationsCategory,
);

export default notificationsSlice.reducer;
