import React from 'react';
import { RelationsUser } from '@/types/Profile';
import RelationsItem from './RelationsItem/RelationsItem';
import NoRelations from './NoRelations/NoRelations';
import personIcon from '@/assets/icons/profile/person.svg?url';

type FollowersListProps = {
	followers: RelationsUser[];
	isFollowersLoaded: boolean;
};

const FollowersList = ({ followers, isFollowersLoaded }: FollowersListProps) => {
	if (!isFollowersLoaded) {
		return <div>Loading</div>;
	}

	if (followers.length > 0) {
		return (
			<>
				{followers.map((follower) => (
					<RelationsItem key={follower.id} user={follower} />
				))}
			</>
		);
	}

	return (
		<NoRelations
			icon={personIcon}
			title="Followers"
			text="When people start following this user, you'll see them here"
		/>
	);
};

export default FollowersList;
