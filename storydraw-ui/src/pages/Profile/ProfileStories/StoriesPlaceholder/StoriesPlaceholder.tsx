import profileSharedStyles from '@/pages/Profile/ProfileSharedStyles.module.scss';
import StoryPlaceholder from './StoryPlaceholder/StoryPlaceholder';

type StoriesPlaceholderProps = {
	length: number;
};

const StoriesPlaceholder = ({ length }: StoriesPlaceholderProps) => {
	return (
		<div className={profileSharedStyles.StoriesList}>
			{Array.from({ length: length > 0 ? length : 8 }).map((_, index) => (
				<StoryPlaceholder key={index} />
			))}
		</div>
	);
};

export default StoriesPlaceholder;
