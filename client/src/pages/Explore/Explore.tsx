import React from 'react';
import styles from './Explore.module.css';
import drawnImg from '@/assets/icons/brush.svg';
import pixelImg from '@/assets/icons/pixelated.svg';
import frameImg from '@/assets/icons/movie-roll.svg';
import lengthyImg from '@/assets/icons/movie.svg';
import ExploreStory from '@/components/ExploreStory/ExploreStory';

const exploreCategories = [
	{
		name: 'Drawn',
		icon: drawnImg,
	},
	{
		name: 'Pixel',
		icon: pixelImg,
	},
	{
		name: 'Frame',
		icon: frameImg,
	},
	{
		name: 'Lengthy',
		icon: lengthyImg,
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
			username: 'andrey.kiva',
			image: '',
		}
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
			username: 'andrey.kiva',
			image: '',
		}
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
			username: 'andrey.kiva',
			image: '',
		}
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
			username: 'andrey.kiva',
			image: '',
		}
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
			username: 'andrey.kiva',
			image: '',
		}
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
			username: 'andrey.kiva',
			image: '',
		}
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
			username: 'andrey.kiva',
			image: '',
		}
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
			username: 'andrey.kiva',
			image: '',
		}
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
			username: 'andrey.kiva',
			image: '',
		}
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
			username: 'andrey.kiva',
			image: '',
		}
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
