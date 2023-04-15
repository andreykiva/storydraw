import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn/SignIn';

export const App = () => {
	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route path="/signin" element={<SignIn />} />
					<Route path="/" exact element={<SignIn />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
};
