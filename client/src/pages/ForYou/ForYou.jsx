import React from 'react';
import styles from './ForYou.module.css';
import ForYouStory from './ForYouStory/ForYouStory';

const testStories = [
	{
		id: 1,
		userId: '123',
		username: 'andrey.kiva',
		userTitle: 'hey man',
		userImage: '',
		story: '',
		description: 'today was a good day',
		musicName: "Andre - My life",
		musicId: '123',
		tags: ['song', 'story', 'day'],
		likes: 99142,
		favorites: 419,
		comments: 28,
		share: 10,
	},
	{
		id: 2,
		userId: '234',
		username: 'andrey.kiva',
		userTitle: 'hey man',
		userImage: '',
		story: '',
		description: 'today was a good day',
		musicName: "Andre - My life",
		musicId: '123',
		tags: ['song', 'story', 'day'],
		likes: 99142,
		favorites: 419,
		comments: 28,
		share: 10,
	},
	{
		id: 3,
		userId: '345',
		username: 'andrey.kiva',
		userTitle: 'hey man',
		userImage: '',
		story: '',
		description: 'today was a good day',
		musicName: "Andre - My life",
		musicId: '123',
		tags: ['song', 'story', 'day'],
		likes: 99142,
		favorites: 419,
		comments: 28,
		share: 10,
	},
	{
		id: 4,
		userId: '456',
		username: 'andrey.kiva',
		userTitle: 'hey man',
		userImage: '',
		story: '',
		description: 'today was a good day',
		musicName: "Andre - My life",
		musicId: '123',
		tags: ['song', 'story', 'day'],
		likes: 99142,
		favorites: 419,
		comments: 28,
		share: 10,
	},
	{
		id: 5,
		userId: '567',
		username: 'andrey.kiva',
		userTitle: 'hey man',
		userImage: '',
		story: '',
		description: 'today was a good day',
		musicName: "Andre - My life",
		musicId: '123',
		tags: ['song', 'story', 'day'],
		likes: 99142,
		favorites: 419,
		comments: 28,
		share: 10,
	},
];

const ForYou = () => {
	return <div className={styles.ForYou}>
		{testStories.map((story) => (
			<ForYouStory key={story.id} {...story} />
		))}
	</div>;
};

export default ForYou;
