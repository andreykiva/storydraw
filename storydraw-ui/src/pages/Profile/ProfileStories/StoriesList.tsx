import ProfileStory from './ProfileStory/ProfileStory';
import UserMessage from '@/pages/Profile/UserMessage/UserMessage';
import personIcon from '@/assets/icons/profile/person.svg';
import lockIcon from '@/assets/icons/profile/lock.svg';
import type { ProfileStory as ProfileStoryType } from '@/types/Profile';
import StoriesPlaceholder from './StoriesPlaceholder/StoriesPlaceholder';

type StoriesListProps = {
	stories: ProfileStoryType[];
	username: string;
	isCurrentUser: boolean;
	isPrivate: boolean;
	loading: boolean;
};

const StoriesList = (props: StoriesListProps) => {
	const { stories, username, isCurrentUser, isPrivate, loading } = props;

	if (isPrivate && !isCurrentUser) {
		return (
			<UserMessage
				icon={lockIcon}
				title="This user's stories are private"
				text={`Stories published by ${username} are currently hidden`}
			/>
		);
	}

	if (loading) {
		return <StoriesPlaceholder length={8} />;
	}

	if (stories && stories.length > 0) {
		return (
			<>
				{stories.map((story) => (
					<ProfileStory key={story.id} {...story} />
				))}
			</>
		);
	}

	//no content (me)
	if (isCurrentUser) {
		return <UserMessage icon={personIcon} title="Upload your first story" text="Your stories will appear here" />;
	}

	//no content (user)
	return <UserMessage icon={personIcon} title="No content" text="This user has not published any stories" />;
};

export default StoriesList;
