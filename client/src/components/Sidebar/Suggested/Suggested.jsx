import React from 'react';
import styles from './Suggested.module.css';
import defaultImg from '../../../assets/icons/default.svg';

const testSuggested = [
	{
		id: 1,
		username: 'andrey.kiva',
		status: 'hey man',
		image: '',
	},
	{
		id: 2,
		username: 'andrey.kiva',
		status: 'hey man',
		image: '',
	},
	{
		id: 3,
		username: 'andrey.kiva',
		status: 'hey man',
		image: '',
	},
	{
		id: 4,
		username: 'andrey.kiva',
		status: 'hey man',
		image: '',
	},
	{
		id: 5,
		username: 'andrey.kiva',
		status: 'hey man',
		image: '',
	},
];

const Suggested = () => {
	return (
		<div className={styles.Suggested}>
			<h6 className={styles.SuggestedTitle}>Suggested accounts</h6>
			<ul className={styles.SuggestedList}>
				{testSuggested.map((item) => (
					<li className={styles.SuggestedItem} key={item.id}>
						<img src={item.image || defaultImg} alt="Profile picture" className={styles.ItemImg} />
						<div className={styles.ItemInfo}>
							<div className={styles.ItemUsername}>{item.username}</div>
							<div className={styles.ItemStatus}>{item.status}</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Suggested;
