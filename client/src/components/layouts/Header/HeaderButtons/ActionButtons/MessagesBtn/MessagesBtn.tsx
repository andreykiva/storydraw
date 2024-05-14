import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './MessagesBtn.module.css';
import SendIcon from '@/assets/icons/send.svg';
import Prompt from '@/components/ui/Prompt/Prompt';

const MessagesBtn = () => {
	return (
		<div className={styles.MessagesBtn}>
			<NavLink
				to="/messages"
				className={(isActive) => styles.MessagesLink + (isActive.isActive ? ` ${styles.Active}` : '')}
			>
				<SendIcon className={styles.SendIcon} />
			</NavLink>
			<Prompt position='bottomCenter' className={styles.Prompt}>Messages</Prompt>
		</div>
	);
};

export default MessagesBtn;
