import React from 'react';
import styles from './Suggested.module.css';
import SuggestedItem from './SuggestedItem/SuggestedItem';
import HTag from '@/components/ui/HTag/HTag';

const testSuggested = [
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

const Suggested = () => {
	return (
		<div className={styles.Suggested}>
			<HTag tag="h5" className={styles.SuggestedTitle}>
				Suggested accounts
			</HTag>
			<ul className={styles.SuggestedList}>
				{testSuggested.map((item) => (
					<SuggestedItem key={item.id} image={item.image} username={item.username} title={item.title} />
				))}
			</ul>
		</div>
	);
};

export default Suggested;
