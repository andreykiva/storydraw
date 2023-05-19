import React from 'react';
import styles from './ForYou.module.css';
import ForYouVideo from '../../components/ForYouVideo/ForYouVideo';

const testVideos = [
	{
		id: 1,
		userId: '123',
		username: 'andrey.kiva',
		userTitle: 'hey man',
		userImage: '',
		video: '',
		description: 'today was a good day',
		musicId: '123',
		tags: ['song', 'video', 'day'],
		likes: 100013,
		comments: 28,
		share: 10,
	},
	{
		id: 2,
		userId: '234',
		username: 'andrey.kiva',
		userTitle: 'hey man',
		userImage: '',
		video: '',
		description: 'today was a good day',
		musicId: '123',
		tags: ['song', 'video', 'day'],
		likes: 100013,
		comments: 28,
		share: 10,
	},
	{
		id: 3,
		userId: '345',
		username: 'andrey.kiva',
		userTitle: 'hey man',
		userImage: '',
		video: '',
		description: 'today was a good day',
		musicId: '123',
		tags: ['song', 'video', 'day'],
		likes: 100013,
		comments: 28,
		share: 10,
	},
	{
		id: 4,
		userId: '456',
		username: 'andrey.kiva',
		userTitle: 'hey man',
		userImage: '',
		video: '',
		description: 'today was a good day',
		musicId: '123',
		tags: ['song', 'video', 'day'],
		likes: 100013,
		comments: 28,
		share: 10,
	},
	{
		id: 5,
		userId: '567',
		username: 'andrey.kiva',
		userTitle: 'hey man',
		userImage: '',
		video: '',
		description: 'today was a good day',
		musicId: '123',
		tags: ['song', 'video', 'day'],
		likes: 100013,
		comments: 28,
		share: 10,
	},
];

const ForYou = () => {
	return <div className={styles.ForYou}>
		{testVideos.map((video) => (
			<ForYouVideo />
		))}
	</div>;
};

export default ForYou;
