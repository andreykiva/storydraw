import React from 'react';
import styles from './ForYou.module.scss';
import ForYouStory from './ForYouStory/ForYouStory';

const testStories = [
	{
		id: '1',
		story: '',
		description: 'today was a good day',
		musicName: 'Orbital - Halcyon And On And On',
		musicId: '123',
		tags: ['song', 'story', 'day'],
		likes: 99142,
		favorites: 419,
		comments: 28,
		share: 10,
		user: {
			id: '1',
			username: 'andriikiva',
			displayName: 'hey man',
			imageUrl: '',
		},
	},
	{
		id: '2',
		story: '',
		description: 'today was a good day',
		musicName: 'Orbital - Halcyon And On And On',
		musicId: '123',
		tags: ['song', 'story', 'day'],
		likes: 99142,
		favorites: 419,
		comments: 28,
		share: 10,
		user: {
			id: '1',
			username: 'andriikiva',
			displayName: 'hey man',
			imageUrl: '',
		},
	},
	{
		id: '3',
		story: '',
		description: 'today was a good day',
		musicName: 'Orbital - Halcyon And On And On',
		musicId: '123',
		tags: ['song', 'story', 'day'],
		likes: 99142,
		favorites: 419,
		comments: 28,
		share: 10,
		user: {
			id: '1',
			username: 'andriikiva',
			displayName: 'hey man',
			imageUrl: '',
		},
	},
	{
		id: '4',
		story: '',
		description: 'today was a good day',
		musicName: 'Orbital - Halcyon And On And On',
		musicId: '123',
		tags: ['song', 'story', 'day'],
		likes: 99142,
		favorites: 419,
		comments: 28,
		share: 10,
		user: {
			id: '1',
			username: 'andriikiva',
			displayName: 'hey man',
			imageUrl: '',
		},
	},
	{
		id: '5',
		story: '',
		description: 'today was a good day',
		musicName: 'Orbital - Halcyon And On And On',
		musicId: '123',
		tags: ['song', 'story', 'day'],
		likes: 99142,
		favorites: 419,
		comments: 28,
		share: 10,
		user: {
			id: '1',
			username: 'andriikiva',
			displayName: 'hey man',
			imageUrl: '',
		},
	},
];

const ForYou = () => {
	return (
		<div className={styles.ForYou}>
			{testStories.map((story) => (
				<ForYouStory key={story.id} {...story} />
			))}
		</div>
	);
};

export default ForYou;
