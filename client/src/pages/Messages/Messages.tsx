import React from 'react';
import styles from './Messages.module.scss';
import MenuPanel from './MenuPanel/MenuPanel';
import ChatPanel from './ChatPanel/ChatPanel';

const Messages = () => {
	return (
		<div className={styles.Messages}>
			<MenuPanel />
			<ChatPanel />
		</div>
	);
};

export default Messages;
