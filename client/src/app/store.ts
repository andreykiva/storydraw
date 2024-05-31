import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchReducer from '@/features/search/searchSlice';
import authReducer from '@/features/auth/authSlice';
import notificationsReducer from '@/features/notifications/notificationsSlice';
import chatReducer from '@/features/chat/chatSlice';
import reportReducer from '@/features/report/reportSlice';
import userReducer from '@/features/user/userSlice';
import { searchAPI } from '@/services/search/searchService';

const rootReducer = combineReducers({
	search: searchReducer,
	auth: authReducer,
	notifications: notificationsReducer,
	chat: chatReducer,
	report: reportReducer,
	user: userReducer,
	[searchAPI.reducerPath]: searchAPI.reducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(searchAPI.middleware),
	});
};
