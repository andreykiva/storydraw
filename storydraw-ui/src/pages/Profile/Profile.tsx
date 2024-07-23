import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Profile.module.scss';
import defaultImg from '@/assets/images/default.svg?url';
import Button from '@/components/ui/buttons/Button/Button';
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
import { RELATIONS_TYPE, PROFILE_STORIES_TYPE } from '@/constants/profile';
import lockIcon from '@/assets/icons/profile/lock.svg?url';
import ProfileStories from './ProfileStories/ProfileStories';
import UserMessage from './UserMessage/UserMessage';
import personIcon from '@/assets/icons/profile/person.svg?url';

type FollowStatus = {
	isFollowedByYou: boolean;
	isFollowedYou: boolean;
};

type PrivacySettings = Record<PROFILE_STORIES_TYPE, boolean>;

type UserProfileResponse = {
	user: User;
	followStatus: FollowStatus;
	privacySettings: PrivacySettings;
};

const testUserProfileResponse: UserProfileResponse = {
	user: {
		id: '1234',
		username: 'somestranger',
		displayName: 'Hm',
		bio: 'yes. I am.',
		imageUrl: `https://lastfm.freetls.fastly.net/i/u/ar0/930705c179074033ef99a50e9456b786.jpg`,
		following: 422,
		followers: 9981,
		likes: 4912,
		isPrivate: true,
	},
	followStatus: {
		isFollowedByYou: true,
		isFollowedYou: true,
	},
	privacySettings: {
		[PROFILE_STORIES_TYPE.STORIES]: false,
		[PROFILE_STORIES_TYPE.FAVORITES]: true,
		[PROFILE_STORIES_TYPE.LIKED]: true,
	},
};

const testMyProfileResponse: UserProfileResponse = {
	user: {
		id: '123',
		username: 'andrii747',
		displayName: 'Real',
		imageUrl: `https://upload.wikimedia.org/wikipedia/en/c/c1/Just_Got_Back_From_
		the_Discomfort%E2%80%94We%27re_Alright.webp`,
		bio: 'no. I`m not.',
		following: 422,
		followers: 9981,
		likes: 4912,
		isPrivate: true,
	},
	followStatus: null,
	privacySettings: {
		[PROFILE_STORIES_TYPE.STORIES]: false,
		[PROFILE_STORIES_TYPE.FAVORITES]: false,
		[PROFILE_STORIES_TYPE.LIKED]: true,
	},
};

const Profile = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const isAuth = useSelector(selectAuth);
	const currentUser = useSelector(selectUser);
	const username = params.username.slice(1);
	const [user, setUser] = useState<User>(null);
	const [followStatus, setFollowStatus] = useState<FollowStatus>(null);
	const [privacySettings, setPrivacySettings] = useState<PrivacySettings>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isCurrentUser, setIsCurrentUser] = useState(false);
	const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
	const [isRelationsModalOpen, setIsRelationsModalOpen] = useState(false);
	const [relationsModalView, setRelationsModalView] = useState<RELATIONS_TYPE>(RELATIONS_TYPE.FOLLOWING);

	useEffect(() => {
		setIsLoading(true);
		if (isAuth && username === currentUser.username) {
			setUser(testMyProfileResponse.user);
			setFollowStatus(testMyProfileResponse.followStatus);
			setPrivacySettings(testMyProfileResponse.privacySettings);
			setIsCurrentUser(true);
		} else {
			//fetch user
			setUser(testUserProfileResponse.user);
			setFollowStatus(testUserProfileResponse.followStatus);
			setPrivacySettings(testUserProfileResponse.privacySettings);
			setIsCurrentUser(false);
		}
		setIsLoading(false);
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
		if (isAuth) {
			setRelationsModalView(view);
			setIsRelationsModalOpen(true);
		} else {
			dispatch(openAuthModal());
		}
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

	if (isLoading) return <div>Loading...</div>;
	if (!user)
		return (
			<UserMessage
				icon={personIcon}
				title="Couldn`t find this account"
				text="Looking for stories? Try browsing our trending creators, hashtags, and sounds."
			/>
		);

	return (
		<div className={styles.Profile}>
			<div className={styles.ProfileInfo}>
				<div className={styles.TopInfo}>
					<div className={styles.ProfileImgWr}>
						<img src={user.imageUrl || defaultImg} alt="Profile picture" className={styles.ProfileImg} />
					</div>
					<div className={styles.InfoMain}>
						<span className={styles.Username}>
							{user.username} {user.isPrivate && <img src={lockIcon} alt="Private" />}
						</span>
						<span className={styles.DisplayName}>{user.displayName}</span>
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

			<ProfileStories
				username={user.username}
				isCurrentUser={isCurrentUser}
				isPrivate={user.isPrivate}
				isFollowedByYou={followStatus?.isFollowedByYou}
				privacySettings={privacySettings}
			/>

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
