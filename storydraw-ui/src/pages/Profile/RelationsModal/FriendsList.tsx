import React from 'react';
import { useSelector } from 'react-redux';
import { RelationsUser } from '@/types/Profile';
import RelationsItem from './RelationsItem/RelationsItem';
import NoRelations from './NoRelations/NoRelations';
import personIcon from '@/assets/icons/profile/person.svg';
import { selectUser } from '@/features/user/userSlice';

type FriendsListProps = {
	friends: RelationsUser[];
	loading: boolean;
	isAuth: boolean;
};

const FriendsList = ({ friends, loading, isAuth }: FriendsListProps) => {
	const currentUser = useSelector(selectUser);

	if (loading) {
		return <div>Loading</div>;
	}

	if (friends.length > 0) {
		return (
			<>
				{friends.map((user) => (
					<RelationsItem
						key={user.id}
						user={user}
						isAuth={isAuth}
						isFollowedBy={true}
						isFollowing={true}
						isCurrentUser={currentUser.id === user.id}
					/>
				))}
			</>
		);
	}

	return <NoRelations icon={personIcon} title="Friends" text="When you have followers that you follow back, you'll see them here" />;
};

export default FriendsList;
