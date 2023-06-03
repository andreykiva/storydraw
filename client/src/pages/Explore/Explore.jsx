import React from 'react';
import styles from './Explore.module.css';
import drawnImg from '../../assets/icons/brush.svg';
import pixelImg from '../../assets/icons/pixelated.svg';
import frameImg from '../../assets/icons/movie-roll.svg';
import lengthyImg from '../../assets/icons/movie.svg';
import ExploreVideo from '../../components/ExploreVideo/ExploreVideo';

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
			<div className={styles.ExploreVideos}>
				{testVideos.map((video) => (
					<ExploreVideo key={video.id} {...video} />
				))}
			</div>
		</div>
	);
};

export default Explore;
