import React from 'react';
import styles from './SearchStories.module.scss';
import ExploreStory from '@/components/ExploreStory/ExploreStory';

const testStories = [
	{
		id: '1',
		story: '',
		description: 'today was a good day',
		tags: ['song', 'story', 'day'],
		likes: 99142,
		views: 1244,
		user: {
			id: '1',
			username: 'andriikiva',
			imageUrl: '',
		},
	},
	{
		id: '2',
		story: '',
		description: 'today was a good day',
		tags: ['song', 'story', 'day'],
		likes: 99142,
		views: 1244,
		user: {
			id: '1',
			username: 'andriikiva',
			imageUrl: '',
		},
	},
	{
		id: '3',
		story: '',
		description: 'today was a good day',
		tags: ['song', 'story', 'day'],
		likes: 99142,
		views: 1244,
		user: {
			id: '1',
			username: 'andriikiva',
			imageUrl: '',
		},
	},
	{
		id: '4',
		story: '',
		description: 'today was a good day',
		tags: ['song', 'story', 'day'],
		likes: 99142,
		views: 1244,
		user: {
			id: '1',
			username: 'andriikiva',
			imageUrl: '',
		},
	},
	{
		id: '5',
		story: '',
		description: 'today was a good day',
		tags: ['song', 'story', 'day'],
		likes: 99142,
		views: 1244,
		user: {
			id: '1',
			username: 'andriikiva',
			imageUrl: '',
		},
	},
	{
		id: '6',
		story: '',
		description: 'today was a good day',
		tags: ['song', 'story', 'day'],
		likes: 99142,
		views: 1244,
		user: {
			id: '1',
			username: 'andriikiva',
			imageUrl: '',
		},
	},
	{
		id: '7',
		story: '',
		description: 'today was a good day',
		tags: ['song', 'story', 'day'],
		likes: 99142,
		views: 1244,
		user: {
			id: '1',
			username: 'andriikiva',
			imageUrl: '',
		},
	},
	{
		id: '8',
		story: '',
		description: 'today was a good day',
		tags: ['song', 'story', 'day'],
		likes: 99142,
		views: 1244,
		user: {
			id: '1',
			username: 'andriikiva',
			imageUrl: '',
		},
	},
	{
		id: '9',
		story: '',
		description: 'today was a good day',
		tags: ['song', 'story', 'day'],
		likes: 99142,
		views: 1244,
		user: {
			id: '1',
			username: 'andriikiva',
			imageUrl: '',
		},
	},
	{
		id: '10',
		story: '',
		description: 'today was a good day',
		tags: ['song', 'story', 'day'],
		likes: 99142,
		views: 1244,
		user: {
			id: '1',
			username: 'andriikiva',
			imageUrl: '',
		},
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
