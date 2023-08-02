import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Video.module.css';
import videoImg from '../../assets/images/preview.jpg';
import closeImg from '../../assets/icons/close.svg';
import reportImg from '../../assets/icons/report.svg';
import SearchBar from '../../components/SearchBar/SearchBar';
import Button from '../../UI/Button/Button';
import VideoInfo from './VideoInfo/VideoInfo';
import Comments from './Comments/Comments';
import ArrowIcon from '../../UI/icons/ArrowIcon';

const testVideoInfo = {
	user: {
		userId: 123,
		username: 'andrey.kiva',
		title: 'hey man',
		image: '',
	},
	id: 123123,
	description: 'I wanna be a bee',
	date: '06-23',
	musicId: 41,
	musicName: 'Andre - My life',
	likes: 723,
	comments: 412,
	favorites: 213,
};

const Video = () => {
	return (
		<div className={styles.Video}>
			<div className={styles.VideoContent}>
				<img src={videoImg} alt="Background" className={styles.BackgroundImg} />
				<div className={styles.VideoHeader}>
					<div className={styles.Back}>
						<Link to={-1} className={styles.BackBtn}>
							<img src={closeImg} alt="Close" className={styles.CloseIcon} />
						</Link>
					</div>
					<SearchBar className={styles.SearchBar} light />
					<Button className={styles.ReportBtn}>
						<img src={reportImg} alt="Report" className={styles.ReportIcon} />
						<span>Report</span>
					</Button>
				</div>
				<div className={styles.VideoNav}>
					<Link to="/@andrey/video/777" className={styles.VideoNavLink}>
						<ArrowIcon className={styles.NavLinkIcon} />
					</Link>
					<Link to="/@andrey/video/888" className={styles.VideoNavLink}>
						<ArrowIcon className={styles.NavLinkIcon} />
					</Link>
				</div>
				<img src={videoImg} alt="Video" className={styles.ActiveVideo} />
			</div>
			<div className={styles.VideoDetails}>
				<div className={styles.DetailsTop}>
					<VideoInfo {...testVideoInfo} />
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

export default Video;
