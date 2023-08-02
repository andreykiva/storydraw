import React from 'react';
import styles from './SearchStories.module.css';
import ExploreStory from '../../../components/ExploreStory/ExploreStory';

const testStories = [
	{
		id: 1,
		userId: '123',
		username: 'andrey.kiva',
		userImage: '',
		story: '',
		description: 'today was a good day',
		tags: ['song', 'story', 'day'],
		likes: 99142,
		views: 1244,
	},
	{
		id: 2,
		userId: '123',
		username: 'andrey.kiva',
		userImage: '',
		story: '',
		description: 'today was a good day',
		tags: ['song', 'story', 'day'],
		likes: 99142,
		views: 1244,
	},
	{
		id: 3,
		userId: '123',
		username: 'andrey.kiva',
		userImage: '',
		story: '',
		description: 'today was a good day',
		tags: ['song', 'story', 'day'],
		likes: 99142,
		views: 1244,
	},
	{
		id: 4,
		userId: '123',
		username: 'andrey.kiva',
		userImage: '',
		story: '',
		description: 'today was a good day',
		tags: ['song', 'story', 'day'],
		likes: 99142,
		views: 1244,
	},
	{
		id: 5,
		userId: '123',
		username: 'andrey.kiva',
		userImage: '',
		story: '',
		description: 'today was a good day',
		tags: ['song', 'story', 'day'],
		likes: 99142,
		views: 1244,
	},
	{
		id: 6,
		userId: '123',
		username: 'andrey.kiva',
		userImage: '',
		story: '',
		description: 'today was a good day',
		tags: ['song', 'story', 'day'],
		likes: 99142,
		views: 1244,
	},
	{
		id: 7,
		userId: '123',
		username: 'andrey.kiva',
		userImage: '',
		story: '',
		description: 'today was a good day',
		tags: ['song', 'story', 'day'],
		likes: 99142,
		views: 1244,
	},
	{
		id: 8,
		userId: '123',
		username: 'andrey.kiva',
		userImage: '',
		story: '',
		description: 'today was a good day',
		tags: ['song', 'story', 'day'],
		likes: 99142,
		views: 1244,
	},
	{
		id: 9,
		userId: '123',
		username: 'andrey.kiva',
		userImage: '',
		story: '',
		description: 'today was a good day',
		tags: ['song', 'story', 'day'],
		likes: 99142,
		views: 1244,
	},
	{
		id: 10,
		userId: '123',
		username: 'andrey.kiva',
		userImage: '',
		story: '',
		description: 'today was a good day',
		tags: ['song', 'story', 'day'],
		likes: 99142,
		views: 1244,
	},
];

const SearchStories = () => {
	return (
		<div className={styles.SearchStories}>
			{testStories.map((story) => (
				<ExploreStory key={story.id} className={styles.SearchStory} {...story} />
			))}
		</div>
	);
};

export default SearchStories;
