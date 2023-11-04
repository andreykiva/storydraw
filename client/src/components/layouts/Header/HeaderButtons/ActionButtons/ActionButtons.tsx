import React from 'react';
import styles from './ActionButtons.module.css';
import ActionBtn from './ActionBtn/ActionBtn';
import sendImg from '@/assets/icons/send.svg';
import chatImg from '@/assets/icons/chat.svg';

const ActionButtons = () => {
	return (
		<div className={styles.ActionButtons}>
			<ActionBtn promptText="Messages" to="/">
				<img src={sendImg} alt="Messages" />
			</ActionBtn>
			<ActionBtn promptText="Inbox" to="/">
				<img src={chatImg} alt="Inbox" />
			</ActionBtn>
		</div>
	);
};

export default ActionButtons;
