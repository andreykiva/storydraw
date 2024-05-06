import React from 'react';
import styles from './ToggleSwitch.module.css';

type ToggleSwitchProps = {
	checked: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ToggleSwitch = ({ checked, onChange }: ToggleSwitchProps) => {
	return (
		<label className={styles.ToggleSwitch}>
			<input type="checkbox" className={styles.ToggleSwitchInput} checked={checked} onChange={onChange} />
		</label>
	);
};

export default ToggleSwitch;
