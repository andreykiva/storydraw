import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Profile.module.scss';
import defaultImg from '@/assets/images/default.svg?url';
import Button from '@/components/ui/buttons/Button/Button';
import ProfileStory from './ProfileStory/ProfileStory';
import { formatNumber } from '@/utils/formatUtils';
import { openAuthModal } from '@/features/auth/authSlice';
import { selectAuth } from '@/features/auth/authSlice';
import { openReport } from '@/features/report/reportSlice';
import ReportIcon from '@/assets/icons/report.svg';
import BlockIcon from '@/assets/icons/block.svg';
import ButtonWithActionsMenu from '@/components/ButtonWithActionsMenu/ButtonWithActionsMenu';
import { MENU_POSITION } from '@/constants/ui';
import { selectUser } from '@/features/user/userSlice';
import User from '@/types/User';
import editIcon from '@/assets/icons/profile/edit.svg?url';
import EditProfileModal from './EditProfileModal/EditProfileModal';
import RelationsModal from './RelationsModal/RelationsModal';
import { RELATIONS_TYPE } from '@/constants/profile';

const testProfileStories = [
	{
		id: '1',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '2',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '3',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '4',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '5',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '6',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '7',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '8',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '9',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '10',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '11',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '12',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '13',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '14',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '15',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '16',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '17',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '18',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '19',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: '20',
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
];

const testUser = {
	id: '1231u240',
	username: 'somestranger',
	name: 'Hm',
	bio: 'yes. I am.',
	image: `https://lastfm.freetls.fastly.net/i/u/ar0/930705c179074033ef99a50e9456b786.jpg`,
	following: 422,
	followers: 9981,
	likes: 4912,
};

const Profile = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const isAuth = useSelector(selectAuth);
	const currentUser = useSelector(selectUser);
	const username = params.username.slice(1);
	const [user, setUser] = useState<User>(null);
	const [isCurrentUser, setIsCurrentUser] = useState(false);
	const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
	const [isRelationsModalOpen, setIsRelationsModalOpen] = useState(false);
	const [relationsModalView, setRelationsModalView] = useState<RELATIONS_TYPE>(RELATIONS_TYPE.FOLLOWING);

	useEffect(() => {
		if (isAuth && username === currentUser.username) {
			setUser(currentUser);
			setIsCurrentUser(true);
		} else {
			//fetch user
			setUser(testUser);
			setIsCurrentUser(false);
		}
	}, [username, currentUser, isAuth]);

	useEffect(() => {
		setIsRelationsModalOpen(false);
	}, [username]);

	const handleFollow = () => {
		if (!isAuth) {
			dispatch(openAuthModal());
		} else {
			// Login
		}
	};

	const handleOpenReport = () => {
		dispatch(openReport({ type: 'account', targetId: currentUser.id }));
	};

	const handleOpenRelationsModal = (view: RELATIONS_TYPE) => {
		setRelationsModalView(view);
		setIsRelationsModalOpen(true);
	};

	const actions = [
		{
			name: 'Report',
			iconComponent: <ReportIcon />,
			onClick: handleOpenReport,
		},
	];

	if (isAuth && !isCurrentUser) {
		actions.push({
			name: 'Block',
			iconComponent: <BlockIcon />,
			onClick: () => {},
		});
	}

	if (!user) return null;

	return (
		<div className={styles.Profile}>
			<div className={styles.ProfileInfo}>
				<div className={styles.TopInfo}>
					<div className={styles.ProfileImgWr}>
						<img src={user.image || defaultImg} alt="Profile picture" className={styles.ProfileImg} />
					</div>
					<div className={styles.InfoMain}>
						<span className={styles.Username}>{user.username}</span>
						<span className={styles.Name}>{user.name}</span>
						{isCurrentUser ? (
							<Button className={styles.EditProfileBtn} onClick={() => setIsEditProfileModalOpen(true)}>
								<img src={editIcon} alt="Edit" className={styles.EditIcon} />
								Edit profile
							</Button>
						) : (
							<Button className={styles.FollowBtn} onClick={handleFollow}>
								Follow
							</Button>
						)}
					</div>
					{!isCurrentUser && (
						<ButtonWithActionsMenu
							actions={actions}
							menuPosition={MENU_POSITION.BOTTOM_RIGHT}
							buttonClassName={styles.ActionsBtn}
							menuClassName={styles.ActionsMenu}
						/>
					)}
				</div>
				<div className={styles.BottomInfo}>
					<div className={styles.UserStatistics}>
						<div
							className={styles.StatisticsItem}
							onClick={() => handleOpenRelationsModal(RELATIONS_TYPE.FOLLOWING)}
						>
							<span className={styles.ItemValue}>{formatNumber(user.following)}</span> Following
						</div>
						<div
							className={styles.StatisticsItem}
							onClick={() => handleOpenRelationsModal(RELATIONS_TYPE.FOLLOWERS)}
						>
							<span className={styles.ItemValue}>{formatNumber(user.followers)}</span> Followers
						</div>
						<div className={styles.StatisticsItem}>
							<span className={styles.ItemValue}>{formatNumber(user.likes)}</span> Likes
						</div>
					</div>
					<p className={styles.UserBio}>{user.bio || 'No bio yet.'}</p>
				</div>
			</div>
			<div className={styles.ProfileStories}>
				{testProfileStories.map((story) => (
					<ProfileStory key={story.id} {...story} />
				))}
			</div>

			{isEditProfileModalOpen && (
				<EditProfileModal user={user} onClose={() => setIsEditProfileModalOpen(false)} />
			)}

			{isRelationsModalOpen && (
				<RelationsModal
					user={user}
					view={relationsModalView}
					isCurrentUser={isCurrentUser}
					onClose={() => setIsRelationsModalOpen(false)}
					onChangeView={setRelationsModalView}
				/>
			)}
		</div>
	);
};

export default Profile;
