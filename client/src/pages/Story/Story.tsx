import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Story.module.css';
import storyImg from '@/assets/images/preview.jpg';
import closeImg from '@/assets/icons/close.svg';
import reportImg from '@/assets/icons/report.svg';
import SearchBar from '@/components/SearchBar/SearchBar';
import Button from '@/components/ui/buttons/Button/Button';
import StoryInfo from './StoryInfo/StoryInfo';
import Comments from './Comments/Comments';
import ArrowIcon from '@/components/ui/icons/ArrowIcon';

const testStoryInfo = {
	user: {
		id: '123',
		username: 'andrey.kiva',
		title: 'hey man',
		image: '',
	},
	id: '123123',
	description: 'I wanna be a bee',
	date: '06-23',
	musicId: '41',
	musicName: 'Andre - My life',
	likes: 723,
	favorites: 213,
	share: 412,
};

const Story = () => {
	return (
		<div className={styles.Story}>
			<div className={styles.StoryContent}>
				<img src={storyImg} alt="Background" className={styles.BackgroundImg} />
				<div className={styles.StoryHeader}>
					<div className={styles.Back}>
						<Link to={'/'} className={styles.BackBtn}>
							<img src={closeImg} alt="Close" className={styles.CloseIcon} />
						</Link>
					</div>
					<SearchBar light={true} />
					<Button className={styles.ReportBtn}>
						<img src={reportImg} alt="Report" className={styles.ReportIcon} />
						<span>Report</span>
					</Button>
				</div>
				<div className={styles.StoryNav}>
					<Link to="/@andrey/story/777" className={styles.StoryNavLink}>
						<ArrowIcon className={styles.NavLinkIcon} />
					</Link>
					<Link to="/@andrey/story/888" className={styles.StoryNavLink}>
						<ArrowIcon className={styles.NavLinkIcon} />
					</Link>
				</div>
				<img src={storyImg} alt="Story" className={styles.ActiveStory} />
			</div>
			<div className={styles.StoryDetails}>
				<div className={styles.DetailsTop}>
					<StoryInfo {...testStoryInfo} />
					<div className={styles.Underline}></div>
					<Comments />
				</div>
				<div className={styles.DetailsBottom}>
					<div className={styles.LoginMessage}>Log in to comment</div>
				</div>
			</div>
		</div>
	);
};

export default Story;
