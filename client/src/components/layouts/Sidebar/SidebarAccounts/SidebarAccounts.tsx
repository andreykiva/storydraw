import React, { useEffect, useState } from 'react';
import styles from './SidebarAccounts.module.scss';
import SidebarAccount from './SidebarAccount/SidebarAccount';
import HTag from '@/components/ui/HTag/HTag';

const testSuggestedAccounts = [
	{
		id: '1',
		username: 'andrii747',
		name: 'Real',
		image: `https://upload.wikimedia.org/wikipedia/en/c/c1/Just_Got_Back_From_
		the_Discomfort%E2%80%94We%27re_Alright.webp`,
	},
	{
		id: '2',
		username: 'andriikiva',
		name: 'hey man',
		image: '',
	},
	{
		id: '3',
		username: 'andriikiva',
		name: 'hey man',
		image: '',
	},
	{
		id: '4',
		username: 'andriikiva',
		name: 'hey man',
		image: '',
	},
	{
		id: '5',
		username: 'andriikiva',
		name: 'hey man',
		image: '',
	},
];

const testFollowingAccoutns = [
	{
		id: '1',
		username: 'andrii747',
		name: 'Real',
		image: `https://upload.wikimedia.org/wikipedia/en/c/c1/Just_Got_Back_From_
		the_Discomfort%E2%80%94We%27re_Alright.webp`,
	},
	{
		id: '2',
		username: 'andriikiva',
		name: 'hey man',
		image: '',
	},
	{
		id: '3',
		username: 'andriikiva',
		name: 'hey man',
		image: '',
	},
	{
		id: '4',
		username: 'andriikiva',
		name: 'hey man',
		image: '',
	},
	{
		id: '5',
		username: 'andriikiva',
		name: 'hey man',
		image: '',
	},
];

type SidebarAccountsProps = {
	isAuth: boolean;
};

const SidebarAccounts = ({ isAuth }: SidebarAccountsProps) => {
	const [accounts, setAccounts] = useState([]);

	useEffect(() => {
		if (isAuth) {
			setAccounts(testFollowingAccoutns);
		} else {
			setAccounts(testSuggestedAccounts);
		}
	}, [isAuth]);

	return (
		<div className={styles.SidebarAccounts}>
			<HTag tag="h5" className={styles.AccountsTitle}>
				{isAuth ? 'Following accounts' : 'Suggested accounts'}
			</HTag>
			{accounts.length === 0 && isAuth ? (
				<p className={styles.EmptyMessage}>Accounts you follow will appear here</p>
			) : (
				<ul className={styles.AccountsList}>
					{accounts.map((item) => (
						<SidebarAccount key={item.id} image={item.image} username={item.username} name={item.name} />
					))}
				</ul>
			)}
		</div>
	);
};

export default SidebarAccounts;
