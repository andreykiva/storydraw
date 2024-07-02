import React from 'react';
import cn from 'classnames';
import styles from './WrapperWithTriangle.module.scss';
import { MENU_POSITION } from '@/constants/ui';

type WrapperWithTriangleProps = {
	className?: string;
	children: React.ReactNode;
	position: MENU_POSITION;
};

const WrapperWithTriangle = ({ className, position, children }: WrapperWithTriangleProps) => {
	const positionClassname = position.charAt(0).toUpperCase() + position.slice(1);

	return <div className={cn(styles.WrapperWithTriangle, styles[positionClassname], className)}>{children}</div>;
};

export default WrapperWithTriangle;
