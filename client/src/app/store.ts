import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchReducer from '@/features/search/searchSlice';
import authReducer from '@/features/auth/authSlice';
import notificationsReducer from '@/features/notifications/notificationsSlice';
import messagesReducer from '@/features/messages/messagesSlice';
import reportReducer from '@/features/report/reportSlice';
import { searchAPI } from '@/services/search/searchService';

const rootReducer = combineReducers({
	search: searchReducer,
	auth: authReducer,
	notifications: notificationsReducer,
	messages: messagesReducer,
	report: reportReducer,
	[searchAPI.reducerPath]: searchAPI.reducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(searchAPI.middleware),
	});
};
