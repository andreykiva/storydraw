import React from 'react';
import styles from './Explore.module.css';
import drawnImg from '../../assets/icons/brush.svg';
import pixelImg from '../../assets/icons/pixelated.svg';
import frameImg from '../../assets/icons/movie-roll.svg';
import lengthyImg from '../../assets/icons/movie.svg';
import ExploreStory from '../../components/ExploreStory/ExploreStory';

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
