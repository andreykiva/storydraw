import StoryPlaceholder from './StoryPlaceholder/StoryPlaceholder';

type StoriesPlaceholderProps = {
	length: number;
};

const StoriesPlaceholder = ({ length }: StoriesPlaceholderProps) => {
	return (
		<>
			{Array.from({ length: length > 0 ? length : 8 }).map((_, index) => (
				<StoryPlaceholder key={index} />
			))}
		</>
	);
};

export default StoriesPlaceholder;
