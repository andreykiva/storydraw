import React from 'react';
import styles from './Prompt.module.css';

type PromptProps = {
	children: string;
	className: string;
	pos?: 'above' | 'below';
};

const Prompt = ({ children, pos = 'below', className }: PromptProps) => {
	return (
		<div className={[styles.Prompt, className, pos === 'above' && styles.Above].join(' ')}>
			<div className={styles.PromptTriangle}></div>
			<span className={styles.PromptText}>{children}</span>
		</div>
	);
};

export default Prompt;
