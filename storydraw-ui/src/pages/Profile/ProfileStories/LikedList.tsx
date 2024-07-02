import React from 'react';
import ProfileStory from './ProfileStory/ProfileStory';
import UserMessage from '@/pages/Profile/UserMessage/UserMessage';
import personIcon from '@/assets/icons/profile/person.svg?url';
import lockIcon from '@/assets/icons/profile/lock.svg?url';
import type { ProfileStory as ProfileStoryType } from '@/types/Profile';

type LikedListProps = {
	liked: ProfileStoryType[];
	username: string;
	isCurrentUser: boolean;
	isPrivate: boolean;
	isLikedLoaded: boolean;
};

const LikedList = (props: LikedListProps) => {
	const { liked, username, isCurrentUser, isPrivate, isLikedLoaded } = props;

	if (isPrivate && !isCurrentUser) {
		return (
			<UserMessage
				icon={lockIcon}
				title="This user's liked stories are private"
				text={`Stories liked by ${username} are currently hidden`}
			/>
		);
	}

	if (!isLikedLoaded) {
		return <div>Loading</div>;
	}

	if (liked.length > 0) {
		return (
			<>
				{liked.map((story) => (
					<ProfileStory key={story.id} {...story} />
				))}
			</>
		);
	}

	//no content (me)
	if (isCurrentUser) {
		return (
			<UserMessage
				icon={personIcon}
				title="No liked stories yet"
				text="Stories you liked will appear here"
			/>
		);
	}

	//no content (user)
	return (
		<UserMessage
			icon={personIcon}
			title="No content"
			text="This user has not liked any stories"
		/>
	);
};

export default LikedList;
