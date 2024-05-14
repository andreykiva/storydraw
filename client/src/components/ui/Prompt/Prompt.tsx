import React from 'react';
import styles from './Prompt.module.css';
import WrapperWithTriangle from '../WrapperWithTriangle/WrapperWithTriangle';

type PromptProps = {
	children: React.ReactNode;
	className: string;
	position:
		| 'topLeft'
		| 'topCenter'
		| 'topRight'
		| 'bottomLeft'
		| 'bottomCenter'
		| 'bottomRight'
		| 'leftTop'
		| 'leftCenter'
		| 'leftBottom'
		| 'rightTop'
		| 'rightCenter'
		| 'rightBottom';
};

const Prompt = ({ children, position, className }: PromptProps) => {
	return (
		<WrapperWithTriangle position={position} className={[styles.Prompt, className].join(' ')}>
			<div className={styles.PromptTriangle}></div>
			<span className={styles.PromptText}>{children}</span>
		</WrapperWithTriangle>
	);
};

export default Prompt;
