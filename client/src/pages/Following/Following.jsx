import React from 'react';
import styles from './Following.module.css';
import Follow from '../../components/Follow/Follow';

const testFollowing = [
	{
		id: 1,
		username: 'andrey.kiva',
		title: 'hey man',
		image: '',
		preview: '',
	},
	{
		id: 2,
		username: 'andrey.kiva',
		title: 'hey man',
		image: '',
		preview: '',
	},
	{
		id: 3,
		username: 'andrey.kiva',
		title: 'hey man',
		image: '',
		preview: '',
	},
	{
		id: 4,
		username: 'andrey.kiva',
		title: 'hey man',
		image: '',
		preview: '',
	},
	{
		id: 5,
		username: 'andrey.kiva',
		title: 'hey man',
		image: '',
		preview: '',
	},
	{
		id: 6,
		username: 'andrey.kiva',
		title: 'hey man',
		image: '',
		preview: '',
	},
	{
		id: 7,
		username: 'andrey.kiva',
		title: 'hey man',
		image: '',
		preview: '',
	},
	{
		id: 8,
		username: 'andrey.kiva',
		title: 'hey man',
		image: '',
		preview: '',
	},
	{
		id: 9,
		username: 'andrey.kiva',
		title: 'hey man',
		image: '',
		preview: '',
	},
	{
		id: 10,
		username: 'andrey.kiva',
		title: 'hey man',
		image: '',
		preview: '',
	},
	{
		id: 11,
		username: 'andrey.kiva',
		title: 'hey man',
		image: '',
		preview: '',
	},
	{
		id: 12,
		username: 'andrey.kiva',
		title: 'hey man',
		image: '',
		preview: '',
	},
];

const Following = () => {
	return (
		<div className={styles.Following}>
			{testFollowing.map((item) => (
				<Follow
					key={item.id}
					username={item.username}
					title={item.title}
					image={item.image}
					preview={item.preview}
				/>
			))}
		</div>
	);
};

export default Following;
