import React from 'react';
import styles from './Prompt.module.css';

type PromptProps = {
	children: React.ReactNode;
	className: string;
	pos?: 'top' | 'bottom';
};

const Prompt = ({ children, pos = 'bottom', className }: PromptProps) => {
	return (
		<div className={[styles.Prompt, className, pos === 'bottom' && styles.Bottom].join(' ')}>
			<div className={styles.PromptTriangle}></div>
			<span className={styles.PromptText}>{children}</span>
		</div>
	);
};

export default Prompt;
