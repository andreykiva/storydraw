import React from 'react';
import styles from './Radio.module.scss';

type RadioProps = {
	children: React.ReactNode;
	id: string;
	name: string;
	checked: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Radio = ({ children, id, name, checked, onChange }: RadioProps) => {
	return (
		<div className={styles.Radio}>
			<input
				type="radio"
				id={id}
				name={name}
				className={styles.RadioInput}
				checked={checked}
				onChange={onChange}
			/>
			<label htmlFor={id} className={styles.RadioLabel}>
				{children}
			</label>
		</div>
	);
};

export default Radio;
