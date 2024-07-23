import React from 'react';
import styles from './SearchAccounts.module.scss';
import SearchAccount from './SearchAccount/SearchAccount';

const testAccoutns = [
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
	{
		id: '4',
		username: 'andriikiva',
		displayName: 'hey man',
		followers: 412,
		bio: 'my name is andrew',
		imageUrl: '',
	},
	{
		id: '5',
		username: 'andriikiva',
		displayName: 'hey man',
		followers: 412,
		bio: 'my name is andrew',
		imageUrl: '',
	},
	{
		id: '6',
		username: 'andriikiva',
		displayName: 'hey man',
		followers: 412,
		bio: 'my name is andrew',
		imageUrl: '',
	},
	{
		id: '7',
		username: 'andriikiva',
		displayName: 'hey man',
		followers: 412,
		bio: 'my name is andrew',
		imageUrl: '',
	},
	{
		id: '8',
		username: 'andriikiva',
		displayName: 'hey man',
		followers: 412,
		bio: 'my name is andrew',
		imageUrl: '',
	},
	{
		id: '9',
		username: 'andriikiva',
		displayName: 'hey man',
		followers: 412,
		bio: 'my name is andrew',
		imageUrl: '',
	},
	{
		id: '10',
		username: 'andriikiva',
		displayName: 'hey man',
		followers: 412,
		bio: 'my name is andrew',
		imageUrl: '',
	},
	{
		id: '11',
		username: 'andriikiva',
		displayName: 'hey man',
		followers: 412,
		bio: 'my name is andrew',
		imageUrl: '',
	},
	{
		id: '12',
		username: 'andriikiva',
		displayName: 'hey man',
		followers: 412,
		bio: 'my name is andrew',
		imageUrl: '',
	},
	{
		id: '13',
		username: 'andriikiva',
		displayName: 'hey man',
		followers: 412,
		bio: 'my name is andrew',
		imageUrl: '',
	},
	{
		id: '14',
		username: 'andriikiva',
		displayName: 'hey man',
		followers: 412,
		bio: 'my name is andrew',
		imageUrl: '',
	},
	{
		id: '15',
		username: 'andriikiva',
		displayName: 'hey man',
		followers: 412,
		bio: 'my name is andrew',
		imageUrl: '',
	},
];

const SearchAccounts = () => {
	return (
		<div className={styles.SearchAccounts}>
			{testAccoutns.map((account) => (
				<SearchAccount key={account.id} {...account} />
			))}
		</div>
	);
};

export default SearchAccounts;
