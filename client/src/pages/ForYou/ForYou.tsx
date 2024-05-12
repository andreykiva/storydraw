import React from 'react';
import styles from './ForYou.module.css';
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
			id: '123',
			username: 'andriikiva',
			title: 'hey man',
			image: '',
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
			id: '123',
			username: 'andriikiva',
			title: 'hey man',
			image: '',
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
			id: '123',
			username: 'andriikiva',
			title: 'hey man',
			image: '',
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
			id: '123',
			username: 'andriikiva',
			title: 'hey man',
			image: '',
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
			id: '123',
			username: 'andriikiva',
			title: 'hey man',
			image: '',
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
