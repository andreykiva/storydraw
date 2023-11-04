import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ActionBtn.module.css';

type ActionBtnProps = {
	children: React.ReactNode;
	promptText: string;
	to: string;
};

const ActionBtn = ({ children, promptText, to }: ActionBtnProps) => {
	return (
		<div className={styles.ActionBtn}>
			<Link to={to} className={styles.ActionLink}>
				{children}
			</Link>
			<div className={styles.Prompt}>
				<div className={styles.PromptTriangle}></div>
				{promptText}
			</div>
		</div>
	);
};

export default ActionBtn;
