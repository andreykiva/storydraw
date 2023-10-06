import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './HeaderBtns.module.css';
import createIcon from '@/assets/icons/create.svg';
import MoreBtn from './MoreBtn/MoreBtn';
import Button from '@/components/ui/buttons/Button/Button';
import { openAuthModal } from '@/features/auth/authSlice';
import { selectAuth } from '@/features/auth/authSlice';

const HeaderBtns = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector(selectAuth);

	const handleLogin = () => {
		if (!isAuth) {
			dispatch(openAuthModal());
		} else {
			// Login
		}
	};

	const handleCreate = () => {
		if (!isAuth) {
			dispatch(openAuthModal());
		} else {
			// create
		}
	};

	return (
		<div className={styles.HeaderBtns}>
			<Button className={styles.CreateBtn} onClick={handleCreate}>
				<img src={createIcon} alt="Create" className={styles.CreateIcon} />
				<span className={styles.CreateText}>Create</span>
			</Button>
			{!isAuth && (
				<Button className={styles.LoginBtn} onClick={handleLogin}>
					Log in
				</Button>
			)}
			<MoreBtn />
		</div>
	);
};

export default HeaderBtns;
