import React from 'react';
import styles from './HeaderBtns.module.css';
import createIcon from '../../../../assets/icons/create.svg';
import MoreBtn from './MoreBtn/MoreBtn';
import Button from '../../../UI/Button/Button';

const HeaderBtns = () => {
	return (
		<div className={styles.HeaderBtns}>
			<a className={styles.CreateBtn}>
				<img src={createIcon} alt="Create" className={styles.CreateIcon} />
				<span className={styles.CreateText}>Create</span>
			</a>
			<Button className={styles.LoginBtn}>Log in</Button>
			<MoreBtn />
		</div>
	);
};

export default HeaderBtns;
