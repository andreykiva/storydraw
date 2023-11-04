import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './HeaderButtons.module.css';
import createIcon from '@/assets/icons/create.svg';
import MoreBtn from './MoreBtn/MoreBtn';
import Button from '@/components/ui/buttons/Button/Button';
import { openAuthModal } from '@/features/auth/authSlice';
import { selectAuth } from '@/features/auth/authSlice';
import ActionButtons from './ActionButtons/ActionButtons';

const HeaderButtons = () => {
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
		<div className={styles.HeaderButtons}>
			<Button className={styles.CreateBtn} onClick={handleCreate}>
				<img src={createIcon} alt="Create" className={styles.CreateIcon} />
				<span className={styles.CreateText}>Create</span>
			</Button>
			{isAuth ? (
				<ActionButtons />
			) : (
				<Button className={styles.LoginBtn} onClick={handleLogin}>
					Log in
				</Button>
			)}
			<MoreBtn isAuth={isAuth} />
		</div>
	);
};

export default HeaderButtons;
