import { createSlice, createSelector } from '@reduxjs/toolkit';

type MessagesState = {
	activeChatmateId: string | null;
};

const initialState: MessagesState = {
	activeChatmateId: '123',
};

export const messagesSlice = createSlice({
	name: 'messages',
	initialState,
	reducers: {
		setActiveChatmateId: (state, action) => {
			state.activeChatmateId = action.payload;
		},
	},
});

export const { setActiveChatmateId } = messagesSlice.actions;

export const selectMessagesState = (state: { messages: MessagesState }) => state.messages;

export const selectActiveChatmateId = createSelector([selectMessagesState], (messages) => messages.activeChatmateId);

export default messagesSlice.reducer;
