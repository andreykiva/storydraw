import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './MessagesBtn.module.css';
import sendImg from '@/assets/icons/send.svg';
import Prompt from '../Prompt/Prompt';

const MessagesBtn = () => {
	return (
		<div className={styles.MessagesBtn}>
			<NavLink
				to="/messages"
				className={(isActive) => styles.MessagesBtnLink + (isActive.isActive ? ` ${styles.Active}` : '')}
			>
				<img src={sendImg} alt="Messages" />
			</NavLink>
			<Prompt text="Messages" className={styles.Prompt} />
		</div>
	);
};

export default MessagesBtn;
