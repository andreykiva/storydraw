import React from 'react';
import styles from './ModalOverlay.module.css';

type ModalOverlayProps = {
	children: React.ReactNode;
};

const ModalOverlay = ({ children }: ModalOverlayProps) => {
	return <div className={styles.ModalOverlay}>{children}</div>;
};

export default ModalOverlay;
