import { createSlice, createSelector } from '@reduxjs/toolkit';

type ChatState = {
	activeChatmateId: string;
};

const initialState: ChatState = {
	activeChatmateId: '111',
};

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		setActiveChatmateId: (state, action) => {
			state.activeChatmateId = action.payload;
		},
	},
});

export const { setActiveChatmateId } = chatSlice.actions;

export const selectChatState = (state: { chat: ChatState }) => state.chat;

export const selectActiveChatmateId = createSelector([selectChatState], (chat) => chat.activeChatmateId);

export default chatSlice.reducer;
