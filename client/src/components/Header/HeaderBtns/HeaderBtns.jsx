import React from 'react';
import styles from './HeaderBtns.module.css';
import createIcon from '../../../assets/icons/create.svg';
import languageIcon from '../../../assets/icons/language.svg';
import helpIcon from '../../../assets/icons/help.svg';
import darkModeIcon from '../../../assets/icons/mode-dark.svg';

const HeaderBtns = () => {
	return (
		<div className={styles.HeaderBtns}>
			<a className={styles.CreateBtn}>
				<img src={createIcon} alt="Create" className={styles.CreateIcon} />
				<span className={styles.CreateText}>Create</span>
			</a>
			<button className={styles.LoginBtn}>
				Login
			</button>
			<button className={styles.MoreBtn}>
				<span className={styles.Dot}></span><span className={styles.Dot}></span><span className={styles.Dot}></span>
				<div className={styles.MoreMenu}>
					<div className={styles.MoreMenuItem}>
						<img src={languageIcon} alt="Language" className={styles.ItemIcon} />
						<span className={styles.ItemText}>English</span>
					</div>
					<a className={styles.MoreMenuItem}>
						<img src={helpIcon} alt="Help" className={styles.ItemIcon} />
						<span className={styles.ItemText}>Help</span>
					</a>
					<div className={styles.MoreMenuItem}>
						<img src={darkModeIcon} alt="Dark Mode" className={styles.ItemIcon} />
						<span className={styles.ItemText}>Dark Mode</span>
					</div>
				</div>
			</button>
		</div>
	);
};

export default HeaderBtns;
