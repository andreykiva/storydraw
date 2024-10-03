import { useNavigate } from 'react-router-dom';
import styles from './ProfileStory.module.scss';
import previewImg from '@/assets/images/preview.jpg';
import viewsIcon from '@/assets/icons/views.svg';
import { formatNumber } from '@/utils/formatUtils';
import type { Story } from '@/types/Story';
import { wrapMentions } from '@/utils/textUtils';

type ProfileStoryProps = {
	story: Pick<Story, 'id' | 'description'>;
};

const ProfileStory = ({ story }: ProfileStoryProps) => {
	const { id, description } = story;
	const navigate = useNavigate();

	return (
		<div className={styles.ProfileStory}>
			<div className={styles.ProfileStoryContent} onClick={() => navigate(`story/${id}`)}>
				<img src={previewImg} alt="Story" className={styles.Story} />
				<div className={styles.ViewsInfo}>
					<img src={viewsIcon} alt="Views" className={styles.ViewsIcon} />
					<span className={styles.Views}>{formatNumber(0)}</span>
				</div>
			</div>
			<p className={styles.InfoDescr}>
				{wrapMentions(description, styles.Mention)}
				{/* #{tags.join(' #')} */}
			</p>
		</div>
	);
};

export default ProfileStory;
