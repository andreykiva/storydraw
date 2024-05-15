import React from 'react';
import styles from './Prompt.module.scss';
import WrapperWithTriangle from '@/components/ui/WrapperWithTriangle/WrapperWithTriangle';
import type { MenuPosition } from '@/types/Positions';

type PromptProps = {
	children: React.ReactNode;
	className: string;
	position: MenuPosition;
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
