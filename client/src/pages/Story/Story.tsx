import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Story.module.css';
import storyImg from '@/assets/images/preview.jpg';
import closeIcon from '@/assets/icons/close.svg?url';
import ReportIcon from '@/assets/icons/report.svg';
import SearchBar from '@/components/SearchBar/SearchBar';
import Button from '@/components/ui/buttons/Button/Button';
import StoryInfo from './StoryInfo/StoryInfo';
import Comments from './Comments/Comments';
import ArrowIcon from '@/assets/icons/arrow.svg';
import { openAuthModal } from '@/features/auth/authSlice';
import { selectAuth } from '@/features/auth/authSlice';

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
	musicName: 'Orbital - Halcyon And On And On',
	likes: 723,
	favorites: 213,
	share: 412,
};

const Story = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector(selectAuth);

	const handleLogin = () => {
		if (!isAuth) {
			dispatch(openAuthModal());
		} else {
			// Login
		}
	};

	return (
		<div className={styles.Story}>
			<div className={styles.StoryContent}>
				<img src={storyImg} alt="Background" className={styles.BackgroundImg} />
				<div className={styles.StoryHeader}>
					<div className={styles.Back}>
						<Link to={'/'} className={styles.BackBtn}>
							<img src={closeIcon} alt="Close" className={styles.CloseIcon} />
						</Link>
					</div>
					<SearchBar light={true} />
					<Button className={styles.ReportBtn}>
						<ReportIcon className={styles.ReportIcon} />
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
				<div className={styles.DetailsBottom} onClick={handleLogin}>
					<div className={styles.LoginMessage}>Log in to comment</div>
				</div>
			</div>
		</div>
	);
};

export default Story;
