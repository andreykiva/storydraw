import React from 'react';
import styles from './SearchAccounts.module.scss';
import SearchAccount from './SearchAccount/SearchAccount';

const testAccoutns = [
	{
		id: '1',
		username: 'andriikiva',
		name: 'hey man',
		followers: 412,
		description: 'my name is andrew',
		image: '',
	},
	{
		id: '2',
		username: 'andriikiva',
		name: 'hey man',
		followers: 412,
		description: 'my name is andrew',
		image: '',
	},
	{
		id: '3',
		username: 'andriikiva',
		name: 'hey man',
		followers: 412,
		description: 'my name is andrew',
		image: '',
	},
	{
		id: '4',
		username: 'andriikiva',
		name: 'hey man',
		followers: 412,
		description: 'my name is andrew',
		image: '',
	},
	{
		id: '5',
		username: 'andriikiva',
		name: 'hey man',
		followers: 412,
		description: 'my name is andrew',
		image: '',
	},
	{
		id: '6',
		username: 'andriikiva',
		name: 'hey man',
		followers: 412,
		description: 'my name is andrew',
		image: '',
	},
	{
		id: '7',
		username: 'andriikiva',
		name: 'hey man',
		followers: 412,
		description: 'my name is andrew',
		image: '',
	},
	{
		id: '8',
		username: 'andriikiva',
		name: 'hey man',
		followers: 412,
		description: 'my name is andrew',
		image: '',
	},
	{
		id: '9',
		username: 'andriikiva',
		name: 'hey man',
		followers: 412,
		description: 'my name is andrew',
		image: '',
	},
	{
		id: '10',
		username: 'andriikiva',
		name: 'hey man',
		followers: 412,
		description: 'my name is andrew',
		image: '',
	},
	{
		id: '11',
		username: 'andriikiva',
		name: 'hey man',
		followers: 412,
		description: 'my name is andrew',
		image: '',
	},
	{
		id: '12',
		username: 'andriikiva',
		name: 'hey man',
		followers: 412,
		description: 'my name is andrew',
		image: '',
	},
	{
		id: '13',
		username: 'andriikiva',
		name: 'hey man',
		followers: 412,
		description: 'my name is andrew',
		image: '',
	},
	{
		id: '14',
		username: 'andriikiva',
		name: 'hey man',
		followers: 412,
		description: 'my name is andrew',
		image: '',
	},
	{
		id: '15',
		username: 'andriikiva',
		name: 'hey man',
		followers: 412,
		description: 'my name is andrew',
		image: '',
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
