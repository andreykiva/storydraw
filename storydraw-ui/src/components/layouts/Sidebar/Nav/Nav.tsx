import { useSelector } from 'react-redux';
import { ReactComponent as LikeIcon } from '@/assets/icons/like.svg';
import { ReactComponent as PersonIcon } from '@/assets/icons/person.svg';
import { ReactComponent as ExploreIcon } from '@/assets/icons/explore.svg';
import NavItem from './NavItem/NavItem';
import defaultImg from '@/assets/images/default.svg';
import { selectAuth } from '@/features/auth/authSlice';
import { selectUser } from '@/features/user/userSlice';

const Nav = () => {
	const isAuth = useSelector(selectAuth);
	const user = useSelector(selectUser);

	const links = [
		{
			title: 'For You',
			to: '/',
			iconComponent: <LikeIcon />,
		},
		{
			title: 'Following',
			to: '/following',
			iconComponent: <PersonIcon />,
		},
		{
			title: 'Explore',
			to: '/explore',
			iconComponent: <ExploreIcon />,
		},
	];

	if (isAuth && user) {
		links.push({
			title: 'Profile',
			to: `/@${user.username}`,
			iconComponent: <img src={user.imageUrl || defaultImg} alt="Profile" />,
		});
	}

	return (
		<nav>
			<ul>
				{links.map((link) => (
					<NavItem key={link.title} title={link.title} to={link.to} iconComponent={link.iconComponent} />
				))}
			</ul>
		</nav>
	);
};

export default Nav;
