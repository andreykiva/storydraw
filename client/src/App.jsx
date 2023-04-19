import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn/SignIn';
import Layout from './hoc/Layout/Layout'

export const App = () => {
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					{/* <Route path="/signin" element={<SignIn />} />
					<Route path="/" exact element={<SignIn />} />
					<Route path="*" element={<Navigate to="/" />} /> */}
				</Routes>
			</Layout>
		</BrowserRouter>
	);
};
