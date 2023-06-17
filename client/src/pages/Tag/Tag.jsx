import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './Tag.module.css';
import TagVideo from './TagVideo/TagVideo';

const testTagInfo = {
	views: '123k',
	videos: [
		{
			id: 1,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			video: '',
			description: 'today was a good day',
			tags: ['song', 'video', 'day'],
		},
		{
			id: 2,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			video: '',
			description: 'today was a good day',
			tags: ['song', 'video', 'day'],
		},
		{
			id: 3,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			video: '',
			description: 'today was a good day',
			tags: ['song', 'video', 'day'],
		},
		{
			id: 4,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			video: '',
			description: 'today was a good day',
			tags: ['song', 'video', 'day'],
		},
		{
			id: 5,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			video: '',
			description: 'today was a good day',
			tags: ['song', 'video', 'day'],
		},
		{
			id: 6,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			video: '',
			description: 'today was a good day',
			tags: ['song', 'video', 'day'],
		},
		{
			id: 7,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			video: '',
			description: 'today was a good day',
			tags: ['song', 'video', 'day'],
		},
		{
			id: 8,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			video: '',
			description: 'today was a good day',
			tags: ['song', 'video', 'day'],
		},
		{
			id: 9,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			video: '',
			description: 'today was a good day',
			tags: ['song', 'video', 'day'],
		},
		{
			id: 10,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			video: '',
			description: 'today was a good day',
			tags: ['song', 'video', 'day'],
		},
		{
			id: 11,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			video: '',
			description: 'today was a good day',
			tags: ['song', 'video', 'day'],
		},
		{
			id: 12,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			video: '',
			description: 'today was a good day',
			tags: ['song', 'video', 'day'],
		},
		{
			id: 13,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			video: '',
			description: 'today was a good day',
			tags: ['song', 'video', 'day'],
		},
		{
			id: 14,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			video: '',
			description: 'today was a good day',
			tags: ['song', 'video', 'day'],
		},
		{
			id: 15,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			video: '',
			description: 'today was a good day',
			tags: ['song', 'video', 'day'],
		},
		{
			id: 16,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			video: '',
			description: 'today was a good day',
			tags: ['song', 'video', 'day'],
		},
		{
			id: 17,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			video: '',
			description: 'today was a good day',
			tags: ['song', 'video', 'day'],
		},
		{
			id: 18,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			video: '',
			description: 'today was a good day',
			tags: ['song', 'video', 'day'],
		},
		{
			id: 19,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			video: '',
			description: 'today was a good day',
			tags: ['song', 'video', 'day'],
		},
		{
			id: 20,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			video: '',
			description: 'today was a good day',
			tags: ['song', 'video', 'day'],
		},
	],
};

const Tag = () => {
	let { tag } = useParams();

	return (
		<div className={styles.Tag}>
			<div className={styles.TagHeader}>
				<div className={styles.TagIcon}>#</div>
				<div className={styles.TagInfo}>
					<h3 className={styles.TagTitle}>#{tag}</h3>
					<p className={styles.TagViews}>{testTagInfo.views} views</p>
				</div>
			</div>
			<div className={styles.TagVideos}>
				{testTagInfo.videos.map((video) => (
					<TagVideo key={video.id} {...video} />
				))}
			</div>
		</div>
	);
};

export default Tag;
