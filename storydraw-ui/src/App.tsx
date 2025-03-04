import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '@apollo/client';
import Layout from '@/components/layouts/Layout/Layout';
import ForYou from '@/pages/ForYou/ForYou';
import Following from '@/pages/Following/Following';
import Explore from '@/pages/Explore/Explore';
import Tag from '@/pages/Tag/Tag';
import Search from '@/pages/Search/Search';
import ValidateUser from '@/components/ValidateUser/ValidateUser';
import Profile from '@/pages/Profile/Profile';
import Story from '@/pages/Story/Story';
import Messages from '@/pages/Messages/Messages';
import Settings from '@/pages/Settings/Settings';
import Subscribe from '@/pages/Subscribe/Subscribe';
import Logout from '@/pages/Logout/Logout';
import { selectAuth } from '@/features/auth/authSlice';
import { GET_CURRENT_USER } from './graphql/users/queries';
import { login } from '@/features/auth/authSlice';
import { setUser } from '@/features/user/userSlice';
import Create from './pages/Create/Create';

const App = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector(selectAuth);

	useQuery(GET_CURRENT_USER, {
		onCompleted(data) {
			// setTimeout(() => {
			// 	dispatch(setUser(data.getCurrentUser));
			// 	dispatch(login());
			// }, 3000);
			dispatch(setUser(data.getCurrentUser));
			dispatch(login());
		},
	});

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

					{isAuth && (
						<>
							<Route path="/create" element={<Create />} />
							<Route path="/messages" element={<Messages />} />
							<Route path="/subscribe" element={<Subscribe />} />
							<Route path="/settings" element={<Settings />} />
							<Route path="/logout" element={<Logout />} />
						</>
					)}

					<Route
						path="/:username"
						element={
							<ValidateUser>
								<Profile />
							</ValidateUser>
						}
					/>
					<Route
						path="/:username/story/:storyId"
						element={
							<ValidateUser>
								<Story />
							</ValidateUser>
						}
					/>
					<Route path="/" element={<ForYou />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	);
};

export default App;
