import StoriesPlaceholder from '../StoriesPlaceholder/StoriesPlaceholder';
import styles from './ProfileStoriesPlaceholder.module.scss';

type ProfileStoriesPlaceholderProps = {
	length: number;
};

const ProfileStoriesPlaceholder = ({ length }: ProfileStoriesPlaceholderProps) => {
	return (
		<div className={styles.ProfileStoriesPlaceholder}>
			<div className={styles.StoriesViewsMenu}></div>
			<StoriesPlaceholder length={length} />
		</div>
	);
};

export default ProfileStoriesPlaceholder;
