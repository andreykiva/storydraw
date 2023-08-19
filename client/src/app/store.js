import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchReducer from '../features/search/searchSlice';
import authReducer from '../features/auth/authSlice';
import { searchAPI } from '../services/search/searchService';

const rootReducer = combineReducers({
	search: searchReducer,
	auth: authReducer,
	[searchAPI.reducerPath]: searchAPI.reducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(searchAPI.middleware),
	});
};
