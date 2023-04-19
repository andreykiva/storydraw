import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchReducer from './reducers/search/searchSlice';
import { searchAPI } from '../services/search/searchService';

const rootReducer = combineReducers({
	search: searchReducer,
	[searchAPI.reducerPath]: searchAPI.reducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(searchAPI.middleware),
	});
};
