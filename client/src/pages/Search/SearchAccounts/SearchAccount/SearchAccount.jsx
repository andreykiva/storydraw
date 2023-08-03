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
				<h6 className={styles.Username}>{username}</h6>
				<div className={styles.AdditInfo}>
					<span className={styles.Title}>{title}</span>
					<div className={styles.Dot}></div>
					<p className={styles.Followers}>{formatNumber(followers)} Followers</p>
				</div>
				<p className={styles.Descr}>{description}</p>
			</div>
		</Link>
	);
};

export default SearchAccount;
