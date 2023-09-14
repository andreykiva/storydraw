import React from 'react';
import styles from './HeaderBtns.module.css';
import createIcon from '@/assets/icons/create.svg';
import MoreBtn from './MoreBtn/MoreBtn';
import Button from '@/components/ui/buttons/Button/Button';

const HeaderBtns = () => {
	return (
		<div className={styles.HeaderBtns}>
			<Button className={styles.CreateBtn}>
				<img src={createIcon} alt="Create" className={styles.CreateIcon} />
				<span className={styles.CreateText}>Create</span>
			</Button>
			<Button className={styles.LoginBtn}>Log in</Button>
			<MoreBtn />
		</div>
	);
};

export default HeaderBtns;
