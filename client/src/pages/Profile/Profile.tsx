import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Profile.module.css';
import defaultImg from '@/assets/images/default.svg?url';
import Button from '@/components/ui/buttons/Button/Button';
import ProfileStory from './ProfileStory/ProfileStory';
import { formatNumber } from '@/utils/numberUtils';
import { openAuthModal } from '@/features/auth/authSlice';
import { selectAuth } from '@/features/auth/authSlice';
import { openReport } from '@/features/report/reportSlice';
import ReportIcon from '@/assets/icons/report.svg';
import BlockIcon from '@/assets/icons/block.svg';
import ButtonWithActionsMenu from '@/components/ButtonWithActionsMenu/ButtonWithActionsMenu';

const testProfileInfo = {
	id: '123',
	username: 'andriikiva',
	title: 'hey man',
	description: 'today was a good day',
	image: '',
	following: 123,
	followers: 421,
	likes: 131,
};

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

const Profile = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector(selectAuth);
	const { id, username, title, description, image, following, followers, likes } = testProfileInfo;

	const handleFollow = () => {
		if (!isAuth) {
			dispatch(openAuthModal());
		} else {
			// Login
		}
	};

	const handleOpenReport = () => {
		dispatch(openReport({ type: 'account', targetId: id }));
	};

	const actions = [
		{
			name: 'Report',
			iconComponent: <ReportIcon />,
			onClick: handleOpenReport,
		},
		{
			name: 'Block',
			iconComponent: <BlockIcon />,
			onClick: () => {},
		},
	];

	return (
		<div className={styles.Profile}>
			<div className={styles.ProfileInfo}>
				<div className={styles.TopInfo}>
					<div className={styles.ProfileImgWr}>
						<img src={image || defaultImg} alt="Profile picture" className={styles.ProfileImg} />
					</div>
					<div className={styles.InfoMain}>
						<span className={styles.Username}>{username}</span>
						<span className={styles.UserTitle}>{title}</span>
						<Button className={styles.FollowBtn} onClick={handleFollow}>
							Follow
						</Button>
					</div>
					<ButtonWithActionsMenu actions={actions} menuPos="right" className={styles.ButtonWithActionsMenu} />
				</div>
				<div className={styles.BottomInfo}>
					<div className={styles.UserStatistics}>
						<div className={styles.StatisticsItem}>
							<span className={styles.ItemValue}>{formatNumber(following)}</span> Following
						</div>
						<div className={styles.StatisticsItem}>
							<span className={styles.ItemValue}>{formatNumber(followers)}</span> Followers
						</div>
						<div className={styles.StatisticsItem}>
							<span className={styles.ItemValue}>{formatNumber(likes)}</span> Likes
						</div>
					</div>
					<p className={styles.UserDescr}>{description || 'No bio yet.'}</p>
				</div>
			</div>
			<div className={styles.ProfileStories}>
				{testProfileStories.map((story) => (
					<ProfileStory key={story.id} {...story} />
				))}
			</div>
		</div>
	);
};

export default Profile;
