import React from 'react';
import styles from './Profile.module.css';
import defaultImg from '../../assets/icons/default.svg';
import Button from '../../UI/Button/Button';
import ProfileVideo from './ProfileVideo/ProfileVideo';

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

const testProfileVideos = [
	{
		id: 1,
		video: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: 2,
		video: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: 3,
		video: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: 4,
		video: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: 5,
		video: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: 6,
		video: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: 7,
		video: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: 8,
		video: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: 9,
		video: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: 10,
		video: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: 11,
		video: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: 12,
		video: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: 13,
		video: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: 14,
		video: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: 15,
		video: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: 16,
		video: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: 17,
		video: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: 18,
		video: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: 19,
		video: '',
		description: 'yo yo yo',
		tags: ['music', 'song'],
		views: 1412,
	},
	{
		id: 20,
		video: '',
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
							<span className={styles.ItemValue}>{following}</span> Following
						</div>
						<div className={styles.StatisticsItem}>
							<span className={styles.ItemValue}>{followers}</span> Followers
						</div>
						<div className={styles.StatisticsItem}>
							<span className={styles.ItemValue}>{likes}</span> Likes
						</div>
					</div>
					<p className={styles.UserDescr}>{description || 'No bio yet.'}</p>
				</div>
			</div>
			<div className={styles.ProfileVideos}>
				{testProfileVideos.map((video) => (
					<ProfileVideo key={video.id} {...video } />
				))}
			</div>
		</div>
	);
};

export default Profile;
