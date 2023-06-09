import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import ForYou from './pages/ForYou/ForYou';
import Following from './pages/Following/Following';
import Explore from './pages/Explore/Explore';
import Tag from './pages/Tag/Tag';
import Search from './pages/Search/Search';

export const App = () => {
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route path="/tag/:tag" element={<Tag />} />
					<Route path="/following" element={<Following />} />
					<Route path="/explore" element={<Explore />} />
					<Route path="/search" element={<Search />}>
						<Route path=":type" element={<Search />} />
					</Route>
					<Route path="/" exact element={<ForYou />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	);
};
