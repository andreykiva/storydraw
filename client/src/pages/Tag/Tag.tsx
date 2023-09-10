import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './Tag.module.css';
import TagStory from './TagStory/TagStory';
import { formatNumber } from '@/utils/numberUtils';

const testTagInfo = {
	views: 23123123,
	stories: [
		{
			id: 1,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			story: '',
			description: 'today was a good day',
			tags: ['song', 'story', 'day'],
		},
		{
			id: 2,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			story: '',
			description: 'today was a good day',
			tags: ['song', 'story', 'day'],
		},
		{
			id: 3,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			story: '',
			description: 'today was a good day',
			tags: ['song', 'story', 'day'],
		},
		{
			id: 4,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			story: '',
			description: 'today was a good day',
			tags: ['song', 'story', 'day'],
		},
		{
			id: 5,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			story: '',
			description: 'today was a good day',
			tags: ['song', 'story', 'day'],
		},
		{
			id: 6,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			story: '',
			description: 'today was a good day',
			tags: ['song', 'story', 'day'],
		},
		{
			id: 7,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			story: '',
			description: 'today was a good day',
			tags: ['song', 'story', 'day'],
		},
		{
			id: 8,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			story: '',
			description: 'today was a good day',
			tags: ['song', 'story', 'day'],
		},
		{
			id: 9,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			story: '',
			description: 'today was a good day',
			tags: ['song', 'story', 'day'],
		},
		{
			id: 10,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			story: '',
			description: 'today was a good day',
			tags: ['song', 'story', 'day'],
		},
		{
			id: 11,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			story: '',
			description: 'today was a good day',
			tags: ['song', 'story', 'day'],
		},
		{
			id: 12,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			story: '',
			description: 'today was a good day',
			tags: ['song', 'story', 'day'],
		},
		{
			id: 13,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			story: '',
			description: 'today was a good day',
			tags: ['song', 'story', 'day'],
		},
		{
			id: 14,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			story: '',
			description: 'today was a good day',
			tags: ['song', 'story', 'day'],
		},
		{
			id: 15,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			story: '',
			description: 'today was a good day',
			tags: ['song', 'story', 'day'],
		},
		{
			id: 16,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			story: '',
			description: 'today was a good day',
			tags: ['song', 'story', 'day'],
		},
		{
			id: 17,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			story: '',
			description: 'today was a good day',
			tags: ['song', 'story', 'day'],
		},
		{
			id: 18,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			story: '',
			description: 'today was a good day',
			tags: ['song', 'story', 'day'],
		},
		{
			id: 19,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			story: '',
			description: 'today was a good day',
			tags: ['song', 'story', 'day'],
		},
		{
			id: 20,
			userId: '123',
			username: 'andrey.kiva',
			userImage: '',
			story: '',
			description: 'today was a good day',
			tags: ['song', 'story', 'day'],
		},
	],
};

const Tag = () => {
	const { tag } = useParams();

	return (
		<div className={styles.Tag}>
			<div className={styles.TagHeader}>
				<div className={styles.TagIcon}>#</div>
				<div className={styles.TagInfo}>
					<span className={styles.TagTitle}>#{tag}</span>
					<p className={styles.TagViews}>{formatNumber(testTagInfo.views)} views</p>
				</div>
			</div>
			<div className={styles.TagStories}>
				{testTagInfo.stories.map((story) => (
					<TagStory key={story.id} {...story} />
				))}
			</div>
		</div>
	);
};

export default Tag;
