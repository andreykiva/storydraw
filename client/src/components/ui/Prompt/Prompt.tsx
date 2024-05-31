import React from 'react';
import cn from 'classnames';
import styles from './Prompt.module.scss';
import WrapperWithTriangle from '@/components/ui/WrapperWithTriangle/WrapperWithTriangle';
import { MENU_POSITION } from '@/constants/ui';

type PromptProps = {
	children: React.ReactNode;
	className: string;
	position: MENU_POSITION;
};

const Prompt = ({ children, position, className }: PromptProps) => {
	return (
		<WrapperWithTriangle position={position} className={cn(styles.Prompt, className)}>
			<div className={styles.PromptTriangle}></div>
			<span className={styles.PromptText}>{children}</span>
		</WrapperWithTriangle>
	);
};

export default Prompt;
