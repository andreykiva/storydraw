import React from 'react';
import styles from './ActionButtons.module.css';
import MessagesBtn from './MessagesBtn/MessagesBtn';
import InboxBtn from './InboxBtn/InboxBtn';

const ActionButtons = () => {
	return (
		<div className={styles.ActionButtons}>
			<MessagesBtn />
			<InboxBtn />
		</div>
	);
};

export default ActionButtons;
