import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SearchAccount.module.css';
import defaultImg from '../../../../assets/icons/default.svg';
import { formatNumber } from '../../../../utils/numberUtils';

const SearchAccount = (props) => {
	const { image, username, title, description, followers } = props;

	return (
		<Link to={`/@${username}`} className={styles.SearchAccount}>
			<div className={styles.AccountImgWr}>
				<img src={image || defaultImg} alt="Profile picture" className={styles.AccountImg} />
			</div>
			<div className={styles.AccountInfo}>
				<span className={styles.Username}>{username}</span>
				<div className={styles.InfoBottom}>
					<span className={styles.Title}>{title}</span>
					<div className={styles.Dot}></div>
					<p className={styles.FollowersInfo}><span className={styles.Followers}>{formatNumber(followers)}</span> Followers</p>
				</div>
				<p className={styles.Descr}>{description}</p>
			</div>
		</Link>
	);
};

export default SearchAccount;
