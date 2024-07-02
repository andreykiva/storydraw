import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './Tag.module.scss';
import TagStory from './TagStory/TagStory';
import { formatNumber } from '@/utils/formatUtils';

const testTagInfo = {
	views: 23123123,
	stories: [
		{
			id: '1',
			story: '',
			description: 'today was a good day',
			tags: ['song', 'story', 'day'],
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
			user: {
				id: '123',
				username: 'andriikiva',
				image: '',
			},
		},
		{
			id: '11',
			story: '',
			description: 'today was a good day',
			tags: ['song', 'story', 'day'],
			user: {
				id: '123',
				username: 'andriikiva',
				image: '',
			},
		},
		{
			id: '12',
			story: '',
			description: 'today was a good day',
			tags: ['song', 'story', 'day'],
			user: {
				id: '123',
				username: 'andriikiva',
				image: '',
			},
		},
		{
			id: '13',
			story: '',
			description: 'today was a good day',
			tags: ['song', 'story', 'day'],
			user: {
				id: '123',
				username: 'andriikiva',
				image: '',
			},
		},
		{
			id: '14',
			story: '',
			description: 'today was a good day',
			tags: ['song', 'story', 'day'],
			user: {
				id: '123',
				username: 'andriikiva',
				image: '',
			},
		},
		{
			id: '15',
			story: '',
			description: 'today was a good day',
			tags: ['song', 'story', 'day'],
			user: {
				id: '123',
				username: 'andriikiva',
				image: '',
			},
		},
		{
			id: '16',
			story: '',
			description: 'today was a good day',
			tags: ['song', 'story', 'day'],
			user: {
				id: '123',
				username: 'andriikiva',
				image: '',
			},
		},
		{
			id: '17',
			story: '',
			description: 'today was a good day',
			tags: ['song', 'story', 'day'],
			user: {
				id: '123',
				username: 'andriikiva',
				image: '',
			},
		},
		{
			id: '18',
			story: '',
			description: 'today was a good day',
			tags: ['song', 'story', 'day'],
			user: {
				id: '123',
				username: 'andriikiva',
				image: '',
			},
		},
		{
			id: '19',
			story: '',
			description: 'today was a good day',
			tags: ['song', 'story', 'day'],
			user: {
				id: '123',
				username: 'andriikiva',
				image: '',
			},
		},
		{
			id: '20',
			story: '',
			description: 'today was a good day',
			tags: ['song', 'story', 'day'],
			user: {
				id: '123',
				username: 'andriikiva',
				image: '',
			},
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
