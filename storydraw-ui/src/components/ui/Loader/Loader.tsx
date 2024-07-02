import React from 'react';
import cn from 'classnames';
import styles from './Loader.module.scss';

type LoaderProps = {
	className?: string;
};

const Loader = ({ className }: LoaderProps) => {
	return <div className={cn(styles.Loader, className)}></div>;
};

export default Loader;
