import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSearch = createAsyncThunk('search/fetchAll', async (str, thunkAPI) => {
	try {
		console.log(str);
		const response = await axios.get(`http://localhost:5000/search`);
		return response.data;
	} catch (e) {
		return thunkAPI.rejectWithValue('Не удалось совершить поиск');
	}
});
