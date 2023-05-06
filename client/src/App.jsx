import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn/SignIn';
import Layout from './hoc/Layout/Layout';
import ForYou from './pages/ForYou/ForYou';
import Following from './pages/Following/Following';
import Explore from './pages/Explore/Explore';

export const App = () => {
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route path="/following" element={<Following />} />
					<Route path="/explore" element={<Explore />} />
					<Route path="/" exact element={<ForYou />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	);
};
