import React from 'react';
import styles from './Profile.module.css';
import defaultImg from '../../assets/icons/default.svg';
import Button from '../../components/UI/Button/Button';
import ProfileStory from './ProfileStory/ProfileStory';
import { formatNumber } from '../../utils/numberUtils';

const testProfileInfo = {
	userId: 123,
	username: 'andrey.kiva',
	title: 'hey man',
	description: 'today was a good day',
	image: '',
	following: 123,
	followers: 421,
	likes: 131,
};

const testProfileStories = [
	{
		id: 1,
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: 2,
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: 3,
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: 4,
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: 5,
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: 6,
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: 7,
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: 8,
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: 9,
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: 10,
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: 11,
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: 12,
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: 13,
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: 14,
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: 15,
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: 16,
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: 17,
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: 18,
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: 19,
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: 20,
		story: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
];

const Profile = () => {
	const { userId, username, title, description, image, following, followers, likes } = testProfileInfo;

	return (
		<div className={styles.Profile}>
			<div className={styles.ProfileInfo}>
				<div className={styles.TopInfo}>
					<div className={styles.ProfileImgWr}>
						<img src={image || defaultImg} alt="Profile picture" className={styles.ProfileImg} />
					</div>
					<div className={styles.InfoMain}>
						<h3 className={styles.Username}>{username}</h3>
						<span className={styles.UserTitle}>{title}</span>
						<Button className={styles.FollowBtn}>Follow</Button>
					</div>
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
					<ProfileStory key={story.id} {...story } />
				))}
			</div>
		</div>
	);
};

export default Profile;
