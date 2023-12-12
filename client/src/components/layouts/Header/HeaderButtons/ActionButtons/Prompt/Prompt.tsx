import React from 'react';
import styles from './Prompt.module.css';

type PromptProps = {
	text: string;
	className: string;
};

const Prompt = ({ text, className }: PromptProps) => {
	return (
		<div className={[styles.Prompt, className].join(' ')}>
			<div className={styles.PromptTriangle}></div>
			{text}
		</div>
	);
};

export default Prompt;
