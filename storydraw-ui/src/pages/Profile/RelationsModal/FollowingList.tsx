import React from 'react';
import { useSelector } from 'react-redux';
import { RelationsUser } from '@/types/Profile';
import RelationsItem from './RelationsItem/RelationsItem';
import NoRelations from './NoRelations/NoRelations';
import personIcon from '@/assets/icons/profile/person.svg';
import lockIcon from '@/assets/icons/profile/lock.svg';
import { selectUser } from '@/features/user/userSlice';

type FollowingListProps = {
	following: RelationsUser[];
	loading: boolean;
	isAuth: boolean;
	username: string;
	isFollowingPrivate: boolean;
};

const FollowingList = ({ following, loading, isAuth, isFollowingPrivate, username }: FollowingListProps) => {
	const currentUser = useSelector(selectUser);

	if (loading) {
		return <div>Loading</div>;
	}

	if (isFollowingPrivate) {
		<NoRelations
			icon={lockIcon}
			title="This account's following list is private"
			text={`${username}'s following list is currently hidden`}
		/>;
	}

	if (following && following.length > 0) {
		return (
			<>
				{following.map((user) => (
					<RelationsItem
						key={user.id}
						user={user}
						isAuth={isAuth}
						isFollowedBy={user.isFollowedBy}
						isFollowing={user.isFollowing}
						isCurrentUser={currentUser.id === user.id}
					/>
				))}
			</>
		);
	}

	return <NoRelations icon={personIcon} title="Following" text="When you have followers that you follow back, you'll see them here" />;
};

export default FollowingList;
