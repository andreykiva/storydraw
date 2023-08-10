import React from 'react';
import styles from './MoreBtn.module.css';
import languageIcon from '../../../../../assets/icons/language.svg';
import helpIcon from '../../../../../assets/icons/help.svg';
import darkModeIcon from '../../../../../assets/icons/mode-dark.svg';
import moreIcon from '../../../../../assets/icons/more.svg';

const MoreBtn = () => {
	return (
		<button className={styles.MoreBtn}>
			<img src={moreIcon} alt="More" className={styles.MoreDots} />
			<div className={styles.MoreMenu}>
				<div className={styles.MenuTriangle}></div>
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
	);
};

export default MoreBtn;
