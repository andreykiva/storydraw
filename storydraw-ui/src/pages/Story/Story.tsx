import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import styles from './Story.module.scss';
import storyImg from '@/assets/images/preview.jpg';
import closeIcon from '@/assets/icons/close.svg';
import { ReactComponent as ReportIcon } from '@/assets/icons/report.svg';
import SearchBar from '@/components/SearchBar/SearchBar';
import Button from '@/components/ui/buttons/Button/Button';
import StoryInfo from './StoryInfo/StoryInfo';
import Comments from './Comments/Comments';
import { ReactComponent as ArrowIcon } from '@/assets/icons/arrow.svg';
import { selectAuth } from '@/features/auth/authSlice';
import { openReport } from '@/features/report/reportSlice';
import { GET_STORY } from '@/graphql/stories/queries';
import Loader from '@/components/ui/Loader/Loader';
import { selectUser } from '@/features/user/userSlice';

const Story = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector(selectAuth);
	const currentUser = useSelector(selectUser);
	const params = useParams();
	const storyId = params.storyId;

	const [story, setStory] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);

	let isCurrentUser = false;

	if (isLoaded && currentUser.id === story?.user.id) {
		isCurrentUser = true;
	}

	const { loading, error } = useQuery(GET_STORY, {
		variables: {
			getStoryInput: {
				storyId,
			},
			isAuth,
		},
		onCompleted(data) {
			setStory(data.getStory);
			setIsLoaded(true);
		},
	});

	const handleOpenReport = () => {
		dispatch(openReport({ type: 'story', targetId: story?.id }));
	};

	if (error) return <div>Error...</div>;

	if (loading || !isLoaded) return <Loader />;

	if (!story) return <div>Story not found!</div>;

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
					<div className={styles.ReportWrapper}>
						{!isCurrentUser && (
							<Button className={styles.ReportBtn} onClick={handleOpenReport}>
								<ReportIcon className={styles.ReportIcon} />
								<span>Report</span>
							</Button>
						)}
					</div>
				</div>
				<div className={styles.StoryNav}>
					<Link to="/@andrey/story/777" className={styles.StoryNavLink}>
						<ArrowIcon className={styles.NavLinkIcon} />
					</Link>
					<Link to="/@andrey/story/b372d330-baf0-4ed6-ab03-12c6d0ab4274" className={styles.StoryNavLink}>
						<ArrowIcon className={styles.NavLinkIcon} />
					</Link>
				</div>
				<img src={storyImg} alt="Story" className={styles.StoryBlock} />
			</div>
			<div className={styles.StoryPanel}>
				<StoryInfo story={story} isCurrentUser={isCurrentUser} />
				<Comments storyId={storyId} isAuth={isAuth} currentUserId={currentUser.id} />
			</div>
		</div>
	);
};

export default Story;
