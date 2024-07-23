import React from 'react';
import styles from './SearchTop.module.scss';
import SearchAccount from '@/pages/Search/SearchAccounts/SearchAccount/SearchAccount';
import ExploreStory from '@/components/ExploreStory/ExploreStory';
import HTag from '@/components/ui/HTag/HTag';

const testSearchData = {
	accounts: [
		{
			id: '1',
			username: 'andriikiva',
			displayName: 'hey man',
			followers: 412,
			bio: 'my name is andrew',
			imageUrl: '',
		},
		{
			id: '2',
			username: 'andriikiva',
			displayName: 'hey man',
			followers: 412,
			bio: 'my name is andrew',
			imageUrl: '',
		},
		{
			id: '3',
			username: 'andriikiva',
			displayName: 'hey man',
			followers: 412,
			bio: 'my name is andrew',
			imageUrl: '',
		},
	],
	stories: [
		{
			id: '1',
			story: '',
			description: 'today was a good day',
			tags: ['song', 'story', 'day'],
			likes: 99142,
			views: 1244,
			user: {
				id: '4',
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
				id: '4',
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
				id: '4',
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
				id: '4',
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
				id: '4',
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
				id: '4',
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
				id: '4',
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
				id: '4',
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
				id: '4',
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
				id: '4',
				username: 'andriikiva',
				imageUrl: '',
			},
		},
	],
};

const SearchTop = () => {
	return (
		<div className={styles.SearchTop}>
			<HTag tag="h4" className={styles.Title}>
				Accounts
			</HTag>
			<div className={styles.SearchAccounts}>
				{testSearchData.accounts.map((account) => (
					<SearchAccount key={account.id} {...account} />
				))}
			</div>
			<HTag tag="h4" className={styles.Title}>
				Stories
			</HTag>
			<div className={styles.SearchStories}>
				{testSearchData.stories.map((story) => (
					<ExploreStory key={story.id} className={styles.SearchStory} {...story} />
				))}
			</div>
		</div>
	);
};

export default SearchTop;
