import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './StoryContent.module.scss';
import storyImg from '@/assets/images/preview.jpg';
import closeIcon from '@/assets/icons/close.svg';
import { ReactComponent as ReportIcon } from '@/assets/icons/report.svg';
import SearchBar from '@/components/SearchBar/SearchBar';
import Button from '@/components/ui/buttons/Button/Button';
import { ReactComponent as ArrowIcon } from '@/assets/icons/arrow.svg';
import { openReport } from '@/features/report/reportSlice';
import StoryPlaceholder from './StoryContentPlaceholder/StoryContentPlaceholder';

type StoryContentProps = {
	isCurrentUser: boolean;
	storyId: string;
	isLoaded: boolean;
};

const StoryContent = ({ isCurrentUser, storyId, isLoaded }: StoryContentProps) => {
	const dispatch = useDispatch();

	const handleOpenReport = () => {
		dispatch(openReport({ type: 'story', targetId: storyId }));
	};

	if (!isLoaded) return <StoryPlaceholder />;

	return (
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
			<img src={storyImg} alt="Story" className={styles.StoryInner} />
		</div>
	);
};

export default StoryContent;
