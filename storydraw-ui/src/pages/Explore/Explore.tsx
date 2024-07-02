import React from 'react';
import styles from './Explore.module.scss';
import drawnIcon from '@/assets/icons/brush.svg?url';
import pixelIcon from '@/assets/icons/pixelated.svg?url';
import frameIcon from '@/assets/icons/movie-roll.svg?url';
import lengthyIcon from '@/assets/icons/movie.svg?url';
import ExploreStory from '@/components/ExploreStory/ExploreStory';

const exploreCategories = [
	{
		name: 'Drawn',
		icon: drawnIcon,
	},
	{
		name: 'Pixel',
		icon: pixelIcon,
	},
	{
		name: 'Frame',
		icon: frameIcon,
	},
	{
		name: 'Lengthy',
		icon: lengthyIcon,
	},
];

const testStories = [
	{
		id: '1',
		story: '',
		description: 'today was a good day',
		tags: ['song', 'story', 'day'],
		likes: 99142,
		views: 1244,
		user: {
			id: '123',
			username: 'andriikiva',
			image: '',
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
			id: '123',
			username: 'andriikiva',
			image: '',
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
			id: '123',
			username: 'andriikiva',
			image: '',
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
			id: '123',
			username: 'andriikiva',
			image: '',
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
			id: '123',
			username: 'andriikiva',
			image: '',
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
			id: '123',
			username: 'andriikiva',
			image: '',
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
			id: '123',
			username: 'andriikiva',
			image: '',
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
			id: '123',
			username: 'andriikiva',
			image: '',
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
			id: '123',
			username: 'andriikiva',
			image: '',
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
			id: '123',
			username: 'andriikiva',
			image: '',
		},
	},
];

const Explore = () => {
	return (
		<div className={styles.Explore}>
			<div className={styles.ExploreCategories}>
				{exploreCategories.map((category) => (
					<div className={styles.ExploreCategory} key={category.name}>
						<img src={category.icon} alt={category.name} className={styles.CategoryIcon} />
						<span>{category.name}</span>
					</div>
				))}
			</div>
			<div className={styles.ExploreStories}>
				{testStories.map((story) => (
					<ExploreStory key={story.id} {...story} />
				))}
			</div>
		</div>
	);
};

export default Explore;
