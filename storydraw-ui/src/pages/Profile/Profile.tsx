import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import styles from './Profile.module.scss';
import { selectAuth } from '@/features/auth/authSlice';
import { selectUser } from '@/features/user/userSlice';
import ProfileStories from './ProfileStories/ProfileStories';
import UserMessage from './UserMessage/UserMessage';
import personIcon from '@/assets/icons/profile/person.svg';
import { GET_USER_PROFILE } from '@/graphql/users/queries';
import { ProfileUser } from '@/types/Profile';
import ProfileInfoPlaceholder from './ProfileInfo/ProfileInfoPlaceholder/ProfileInfoPlaceholder';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import ProfileStoriesPlaceholder from './ProfileStories/ProfileStoriesPlaceholder/ProfileStoriesPlaceholder';

const Profile = () => {
	const params = useParams();
	const isAuth = useSelector(selectAuth);
	const currentUser = useSelector(selectUser);
	const username = params.username.slice(1);
	const [user, setUser] = useState<ProfileUser>(null);
	const [isCurrentUser, setIsCurrentUser] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);

	useQuery(GET_USER_PROFILE, {
		variables: {
			usernameInput: {
				username,
			},
			isAuth,
			isCurrentUser,
		},
		onCompleted(data) {
			setUser(data.getUserByUsername);
			setIsLoaded(true);
		},
		onError() {
			setIsLoaded(true);
		},
	});

	useEffect(() => {
		setIsLoaded(false);
		setUser(null);
	}, [username]);

	useEffect(() => {
		if (!user || !currentUser) return;

		if (user.id === currentUser.id) {
			setIsCurrentUser(true);
		} else {
			setIsCurrentUser(false);
		}
	}, [isAuth, currentUser, user, username]);

	if (!user && isLoaded)
		return (
			<UserMessage
				icon={personIcon}
				title="Couldn`t find this account"
				text="Looking for stories? Try browsing our trending creators, hashtags, and sounds."
			/>
		);

	return (
		<div className={styles.Profile} id='profileContainer'>
			{isLoaded ? (
				<>
					<ProfileInfo isAuth={isAuth} user={user} setUser={setUser} isCurrentUser={isCurrentUser} />
					<ProfileStories
						userId={user.id}
						username={user.username}
						isCurrentUser={isCurrentUser}
						isPrivate={false}
						isFollowing={user.isFollowing}
						// privacySettings={{}}
					/>
				</>
			) : (
				<>
					<ProfileInfoPlaceholder />
					<ProfileStoriesPlaceholder length={8} />
				</>
			)}
		</div>
	);
};

export default Profile;
