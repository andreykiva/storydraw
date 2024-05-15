import React from 'react';
import styles from './WrapperWithTriangle.module.scss';
import type { MenuPosition } from '@/types/Positions';

type WrapperWithTriangleProps = {
	className?: string;
	children: React.ReactNode;
	position: MenuPosition;
};

const WrapperWithTriangle = ({ className, position, children }: WrapperWithTriangleProps) => {
	const positionClassname = position.charAt(0).toUpperCase() + position.slice(1);

	return (
		<div className={[styles.WrapperWithTriangle, styles[positionClassname], className].join(' ')}>{children}</div>
	);
};

export default WrapperWithTriangle;
