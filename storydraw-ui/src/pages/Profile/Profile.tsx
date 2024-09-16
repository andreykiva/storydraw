import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Profile.module.scss';
import defaultImg from '@/assets/images/default.svg';
import Button from '@/components/ui/buttons/Button/Button';
import { formatNumber } from '@/utils/formatUtils';
import { openAuthModal } from '@/features/auth/authSlice';
import { selectAuth } from '@/features/auth/authSlice';
import { openReport } from '@/features/report/reportSlice';
import { ReactComponent as ReportIcon } from '@/assets/icons/report.svg';
import { ReactComponent as BlockIcon } from '@/assets/icons/block.svg';
import ButtonWithActionsMenu from '@/components/ButtonWithActionsMenu/ButtonWithActionsMenu';
import { MENU_POSITION } from '@/constants/ui';
import { selectUser } from '@/features/user/userSlice';
import editIcon from '@/assets/icons/profile/edit.svg';
import EditProfileModal from './EditProfileModal/EditProfileModal';
import RelationsModal from './RelationsModal/RelationsModal';
import { RELATIONS_TYPE } from '@/constants/profile';
import lockIcon from '@/assets/icons/profile/lock.svg';
import ProfileStories from './ProfileStories/ProfileStories';
import UserMessage from './UserMessage/UserMessage';
import personIcon from '@/assets/icons/profile/person.svg';
import { useQuery } from '@apollo/client';
import { GET_USER_PROFILE } from '@/graphql/users/queries';
import { ProfileUser } from '@/types/Profile';
import Loader from '@/components/ui/Loader/Loader';
import FollowButton from '@/components/ui/buttons/FollowButton/FollowButton';
import useFollow from '@/hooks/interaction/useFollow';

const Profile = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const isAuth = useSelector(selectAuth);
	const currentUser = useSelector(selectUser);
	const username = params.username.slice(1);
	const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
	const [isRelationsModalOpen, setIsRelationsModalOpen] = useState(false);
	const [relationsModalView, setRelationsModalView] = useState<RELATIONS_TYPE>(RELATIONS_TYPE.FOLLOWING);

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
			setUser(data.findOneByUsername);
			setIsLoaded(true);
		},
		onError() {
			setIsLoaded(true);
		},
	});

	const { handleFollow, loading: followLoading } = useFollow({
		isAuth,
		userId: user?.id,
		initIsFollowing: user?.isFollowing,
		followCallback: () => {
			setUser({
				...user,
				isFollowing: true,
				followersCount: user.followersCount + 1,
			});
		},
		unfollowCallback: () => {
			setUser({
				...user,
				isFollowing: false,
				followersCount: user.followersCount - 1,
			});
		},
	});

	useEffect(() => {
		setIsRelationsModalOpen(false);
		setIsLoaded(false);
	}, [username]);

	useEffect(() => {
		if (!user || !currentUser) return;

		if (user.id === currentUser.id) {
			setIsCurrentUser(true);
		} else {
			setIsCurrentUser(false);
		}
	}, [isAuth, currentUser, user, username]);

	const handleOpenReport = () => {
		dispatch(openReport({ type: 'account', targetId: user?.id }));
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

	if (!isLoaded) return <Loader />;

	if (!user && isLoaded)
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
							{user.username}
							{false && <img src={lockIcon} alt="Private" />}
						</span>
						<span className={styles.DisplayName}>{user.displayName}</span>
						{isCurrentUser ? (
							<Button className={styles.EditProfileBtn} onClick={() => setIsEditProfileModalOpen(true)}>
								<img src={editIcon} alt="Edit" className={styles.EditIcon} />
								Edit profile
							</Button>
						) : (
							<FollowButton
								className={styles.FollowBtn}
								isFollowedBy={user.isFollowedBy}
								isFollowing={user.isFollowing}
								onFollow={handleFollow}
								loading={followLoading}
							/>
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
						<div className={styles.StatisticsItem} onClick={() => handleOpenRelationsModal(RELATIONS_TYPE.FOLLOWING)}>
							<span className={styles.ItemValue}>{formatNumber(user.followingCount)}</span> Following
						</div>
						<div className={styles.StatisticsItem} onClick={() => handleOpenRelationsModal(RELATIONS_TYPE.FOLLOWERS)}>
							<span className={styles.ItemValue}>{formatNumber(user.followersCount)}</span> Followers
						</div>
						<div className={styles.StatisticsItem}>
							<span className={styles.ItemValue}>{formatNumber(user.likesCount)}</span> Likes
						</div>
					</div>
					<p className={styles.UserBio}>{user.bio || 'No bio yet.'}</p>
				</div>
			</div>

			<ProfileStories
				userId={user.id}
				username={user.username}
				isCurrentUser={isCurrentUser}
				isPrivate={false}
				isFollowing={user.isFollowing}
				// privacySettings={{}}
			/>

			{isEditProfileModalOpen && (
				<EditProfileModal user={user} udpateUser={setUser} onClose={() => setIsEditProfileModalOpen(false)} />
			)}

			{isRelationsModalOpen && (
				<RelationsModal
					isAuth={isAuth}
					user={user}
					isCurrentUser={isCurrentUser}
					view={relationsModalView}
					onClose={() => setIsRelationsModalOpen(false)}
					onChangeView={setRelationsModalView}
				/>
			)}
		</div>
	);
};

export default Profile;
