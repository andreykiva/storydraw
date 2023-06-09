import React from 'react';
import styles from './SearchTop.module.css';
import SearchAccount from '../SearchAccounts/SearchAccount/SearchAccount';
import ExploreVideo from '../ExploreVideo/ExploreVideo';

const testSearchData = {
	accounts: [
		{
			id: 1,
			username: 'andrey.kiva',
			title: 'hey man',
			followers: 412,
			description: 'my name is andrew',
			image: '',
		},
		{
			id: 2,
			username: 'andrey.kiva',
			title: 'hey man',
			followers: 412,
			description: 'my name is andrew',
			image: '',
		},
		{
			id: 3,
			username: 'andrey.kiva',
			title: 'hey man',
			followers: 412,
			description: 'my name is andrew',
			image: '',
		},
	],
	videos: [
		{
			id: 1,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			video: '',
			description: 'today was a good day',
			tags: ['song', 'video', 'day'],
			likes: 99142,
			views: 1244,
		},
		{
			id: 2,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			video: '',
			description: 'today was a good day',
			tags: ['song', 'video', 'day'],
			likes: 99142,
			views: 1244,
		},
		{
			id: 3,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			video: '',
			description: 'today was a good day',
			tags: ['song', 'video', 'day'],
			likes: 99142,
			views: 1244,
		},
		{
			id: 4,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			video: '',
			description: 'today was a good day',
			tags: ['song', 'video', 'day'],
			likes: 99142,
			views: 1244,
		},
		{
			id: 5,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			video: '',
			description: 'today was a good day',
			tags: ['song', 'video', 'day'],
			likes: 99142,
			views: 1244,
		},
		{
			id: 6,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			video: '',
			description: 'today was a good day',
			tags: ['song', 'video', 'day'],
			likes: 99142,
			views: 1244,
		},
		{
			id: 7,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			video: '',
			description: 'today was a good day',
			tags: ['song', 'video', 'day'],
			likes: 99142,
			views: 1244,
		},
		{
			id: 8,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			video: '',
			description: 'today was a good day',
			tags: ['song', 'video', 'day'],
			likes: 99142,
			views: 1244,
		},
		{
			id: 9,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			video: '',
			description: 'today was a good day',
			tags: ['song', 'video', 'day'],
			likes: 99142,
			views: 1244,
		},
		{
			id: 10,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			video: '',
			description: 'today was a good day',
			tags: ['song', 'video', 'day'],
			likes: 99142,
			views: 1244,
		},
	],
};

const SearchTop = () => {
	return (
		<div className={styles.SearchTop}>
			<h5 className={styles.AccountsTitle}>Accounts</h5>
			<div className={styles.SearchAccounts}>
				{testSearchData.accounts.map((account) => (
					<SearchAccount key={account.id} {...account} />
				))}
			</div>
			<h5 className={styles.VideosTitle}>Videos</h5>
			<div className={styles.SearchVideos}>
				{testSearchData.videos.map((video) => (
					<ExploreVideo key={video.id} className={styles.SearchVideo} {...video} />
				))}
			</div>
		</div>
	);
};

export default SearchTop;
