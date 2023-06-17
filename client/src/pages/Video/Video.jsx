import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Video.module.css';
import videoImg from '../../assets/images/preview.jpg';
import closeImg from '../../assets/icons/close.svg';
import reportImg from '../../assets/icons/report.svg';
import arrowImg from '../../assets/icons/arrow.svg';
import SearchBar from '../../components/SearchBar/SearchBar';
import Button from '../../UI/Button/Button';

const testVideoInfo = {};
const testComments = [];

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
						<Link to='/@andrey/video/777' className={styles.VideoNavLink} >
							<img src={arrowImg} alt='Prev' className={styles.NavLinkIcon} />
						</Link>
						<Link to='/@andrey/video/888' className={styles.VideoNavLink}>
							<img src={arrowImg} alt='Next' className={styles.NavLinkIcon} />
						</Link>
				</div>
				<img src={videoImg} alt="Video" className={styles.ActiveVideo} />
			</div>
			<div className={styles.VideoInfo}></div>
		</div>
	);
};

export default Video;
