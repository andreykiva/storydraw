import React from 'react';
import { RelationsUser } from '@/types/Profile';
import RelationsItem from './RelationsItem/RelationsItem';
import NoRelations from './NoRelations/NoRelations';
import personIcon from '@/assets/icons/profile/person.svg?url';

type FriendsListProps = {
	friends: RelationsUser[];
	isFriendsLoaded: boolean;
};

const FriendsList = ({ friends, isFriendsLoaded }: FriendsListProps) => {
	if (!isFriendsLoaded) {
		return <div>Loading</div>;
	}

	if (friends.length > 0) {
		return (
			<>
				{friends.map((friend) => (
					<RelationsItem key={friend.id} user={friend} />
				))}
			</>
		);
	}

	return (
		<NoRelations
			icon={personIcon}
			title="Friends"
			text="When you have followers that you follow back, you'll see them here"
		/>
	);
};

export default FriendsList;
