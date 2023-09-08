import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/layouts/Layout/Layout';
import ForYou from '@/pages/ForYou/ForYou';
import Following from '@/pages/Following/Following';
import Explore from '@/pages/Explore/Explore';
import Tag from '@/pages/Tag/Tag';
import Search from '@/pages/Search/Search';
import ValidateUser from '@/components/ValidateUser/ValidateUser';
import Profile from '@/pages/Profile/Profile';
import Story from '@/pages/Story/Story';

const App = () => {
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
					<Route path="/:userId" element={<ValidateUser><Profile /></ValidateUser>} />
					<Route path="/:userId/story/:storyId" element={<ValidateUser><Story /></ValidateUser>} />
					<Route path="/" element={<ForYou />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	);
};

export default App;