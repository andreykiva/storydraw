import { useSelector } from 'react-redux';
import { RelationsUser } from '@/types/Profile';
import RelationsItem from './RelationsItem/RelationsItem';
import NoRelations from './NoRelations/NoRelations';
import personIcon from '@/assets/icons/profile/person.svg';
import { selectUser } from '@/features/user/userSlice';

type FollowersListProps = {
	followers: RelationsUser[];
	loading: boolean;
	isAuth: boolean;
};

const FollowersList = ({ followers, loading, isAuth }: FollowersListProps) => {
	const currentUser = useSelector(selectUser);

	if (loading) {
		return <div>Loading</div>;
	}

	if (followers.length > 0) {
		return (
			<>
				{followers.map((user) => (
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

	return <NoRelations icon={personIcon} title="Followers" text="When people start following this user, you'll see them here" />;
};

export default FollowersList;
