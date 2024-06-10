import React from 'react';
import { RelationsUser } from '@/types/Profile';
import RelationsItem from './RelationsItem/RelationsItem';
import NoRelations from './NoRelations/NoRelations';
import personIcon from '@/assets/icons/profile/person.svg?url';
import lockIcon from '@/assets/icons/profile/lock.svg?url';

type FollowingListProps = {
	following: RelationsUser[];
	isFollowingLoaded: boolean;
	isFollowingPrivate: boolean;
	username: string;
};

const FollowingList = ({ following, isFollowingLoaded, isFollowingPrivate, username }: FollowingListProps) => {
	if (!isFollowingLoaded) {
		return <div>Loading</div>;
	}

	if (isFollowingPrivate) {
		<NoRelations
			icon={lockIcon}
			title="This account's following list is private"
			text={`${username}'s following list is currently hidden`}
		/>;
	}

	if (following.length > 0) {
		return (
			<>
				{following.map((follow) => (
					<RelationsItem key={follow.id} user={follow} />
				))}
			</>
		);
	}

	return (
		<NoRelations
			icon={personIcon}
			title="Following"
			text="When you have followers that you follow back, you'll see them here"
		/>
	);
};

export default FollowingList;
