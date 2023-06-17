import React from 'react';
import styles from './SearchVideos.module.css';
import ExploreVideo from '../../../components/ExploreVideo/ExploreVideo';

const testVideos = [
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
];

const SearchVideos = () => {
	return (
		<div className={styles.SearchVideos}>
			{testVideos.map((video) => (
				<ExploreVideo key={video.id} className={styles.SearchVideo} {...video} />
			))}
		</div>
	);
};

export default SearchVideos;
