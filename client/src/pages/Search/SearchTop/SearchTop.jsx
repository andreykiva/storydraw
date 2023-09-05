import React from 'react';
import styles from './SearchTop.module.css';
import SearchAccount from '../SearchAccounts/SearchAccount/SearchAccount';
import ExploreStory from '../../../components/ExploreStory/ExploreStory';
import HTag from '../../../components/ui/HTag/HTag';

const testSearchData = {
	accounts: [
		{
			id: 1,
			username: 'andrey.kiva',
			title: 'hey man',
			followers: 412,
			description: 'my name is andrew',
			image: '',
		},
		{
			id: 2,
			username: 'andrey.kiva',
			title: 'hey man',
			followers: 412,
			description: 'my name is andrew',
			image: '',
		},
		{
			id: 3,
			username: 'andrey.kiva',
			title: 'hey man',
			followers: 412,
			description: 'my name is andrew',
			image: '',
		},
	],
	stories: [
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
