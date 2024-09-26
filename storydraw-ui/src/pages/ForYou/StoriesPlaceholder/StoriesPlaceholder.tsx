import styles from './StoriesPlaceholder.module.scss';
import StoryPlaceholder from './StoryPlaceholder/StoryPlaceholder';

type ShimmerPlaceholderProps = {
	length: number;
};

const StoriesPlaceholder = ({ length }: ShimmerPlaceholderProps) => {
	return (
		<div className={styles.StoriesPlaceholder}>
			{Array.from({ length: length > 0 ? length : 5 }).map((_, index) => (
				<StoryPlaceholder key={index} />
			))}
		</div>
	);
};

export default StoriesPlaceholder;
