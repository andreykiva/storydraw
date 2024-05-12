import React from 'react';
import styles from './Following.module.css';
import Follow from './Follow/Follow';

const testFollowing = [
	{
		id: '1',
		username: 'andriikiva',
		title: 'hey man',
		image: '',
		preview: '',
	},
	{
		id: '2',
		username: 'andriikiva',
		title: 'hey man',
		image: '',
		preview: '',
	},
	{
		id: '3',
		username: 'andriikiva',
		title: 'hey man',
		image: '',
		preview: '',
	},
	{
		id: '4',
		username: 'andriikiva',
		title: 'hey man',
		image: '',
		preview: '',
	},
	{
		id: '5',
		username: 'andriikiva',
		title: 'hey man',
		image: '',
		preview: '',
	},
	{
		id: '6',
		username: 'andriikiva',
		title: 'hey man',
		image: '',
		preview: '',
	},
	{
		id: '7',
		username: 'andriikiva',
		title: 'hey man',
		image: '',
		preview: '',
	},
	{
		id: '8',
		username: 'andriikiva',
		title: 'hey man',
		image: '',
		preview: '',
	},
	{
		id: '9',
		username: 'andriikiva',
		title: 'hey man',
		image: '',
		preview: '',
	},
	{
		id: '10',
		username: 'andriikiva',
		title: 'hey man',
		image: '',
		preview: '',
	},
	{
		id: '11',
		username: 'andriikiva',
		title: 'hey man',
		image: '',
		preview: '',
	},
	{
		id: '12',
		username: 'andriikiva',
		title: 'hey man',
		image: '',
		preview: '',
	},
];

const Following = () => {
	return (
		<div className={styles.Following}>
			<div className={styles.FollowingList}>
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
		</div>
	);
};

export default Following;
