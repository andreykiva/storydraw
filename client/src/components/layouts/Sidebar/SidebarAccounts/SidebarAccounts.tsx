import React, { useEffect, useState } from 'react';
import styles from './SidebarAccounts.module.css';
import SidebarAccount from './SidebarAccount/SidebarAccount';
import HTag from '@/components/ui/HTag/HTag';

const testSuggestedAccounts = [
	{
		id: '1',
		username: 'andrey.kiva',
		title: 'hey man',
		image: '',
	},
	{
		id: '2',
		username: 'andrey.kiva',
		title: 'hey man',
		image: '',
	},
	{
		id: '3',
		username: 'andrey.kiva',
		title: 'hey man',
		image: '',
	},
	{
		id: '4',
		username: 'andrey.kiva',
		title: 'hey man',
		image: '',
	},
	{
		id: '5',
		username: 'andrey.kiva',
		title: 'hey man',
		image: '',
	},
];

const testFollowingAccoutns = [
	{
		id: '1',
		username: 'andrey.kiva',
		title: 'meow',
		image: '',
	},
	{
		id: '2',
		username: 'andrey.kiva',
		title: 'hey man',
		image: '',
	},
	{
		id: '3',
		username: 'andrey.kiva',
		title: 'hey man',
		image: '',
	},
	{
		id: '4',
		username: 'andrey.kiva',
		title: 'hey man',
		image: '',
	},
	{
		id: '5',
		username: 'andrey.kiva',
		title: 'hey man',
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
						<SidebarAccount key={item.id} image={item.image} username={item.username} title={item.title} />
					))}
				</ul>
			)}
		</div>
	);
};

export default SidebarAccounts;
