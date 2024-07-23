import React from 'react';
import styles from './Following.module.scss';
import Follow from './Follow/Follow';

const testFollowing = [
	{
		id: 1,
		username: 'andriikiva',
		displayName: 'hey man',
		imageUrl: '',
		preview: '',
	},
	{
		id: 2,
		username: 'andriikiva',
		displayName: 'hey man',
		imageUrl: '',
		preview: '',
	},
	{
		id: 3,
		username: 'andriikiva',
		displayName: 'hey man',
		imageUrl: '',
		preview: '',
	},
	{
		id: 4,
		username: 'andriikiva',
		displayName: 'hey man',
		imageUrl: '',
		preview: '',
	},
	{
		id: 5,
		username: 'andriikiva',
		displayName: 'hey man',
		imageUrl: '',
		preview: '',
	},
	{
		id: 6,
		username: 'andriikiva',
		displayName: 'hey man',
		imageUrl: '',
		preview: '',
	},
	{
		id: 7,
		username: 'andriikiva',
		displayName: 'hey man',
		imageUrl: '',
		preview: '',
	},
	{
		id: 8,
		username: 'andriikiva',
		displayName: 'hey man',
		imageUrl: '',
		preview: '',
	},
	{
		id: 9,
		username: 'andriikiva',
		displayName: 'hey man',
		imageUrl: '',
		preview: '',
	},
	{
		id: 10,
		username: 'andriikiva',
		displayName: 'hey man',
		imageUrl: '',
		preview: '',
	},
	{
		id: 11,
		username: 'andriikiva',
		displayName: 'hey man',
		imageUrl: '',
		preview: '',
	},
	{
		id: 12,
		username: 'andriikiva',
		displayName: 'hey man',
		imageUrl: '',
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
						displayName={item.displayName}
						imageUrl={item.imageUrl}
						preview={item.preview}
					/>
				))}
			</div>
		</div>
	);
};

export default Following;
