import React from 'react';
import styles from './Checkbox.module.css';
import CheckIcon from '../../icons/CheckIcon';

type CheckboxProps = {
	children: React.ReactNode;
	checked: boolean;
	onChange: () => void;
};

const Checkbox = ({ children, checked, onChange }: CheckboxProps) => {
	return (
		<label className={styles.CheckboxLabel}>
			{children}
			<input type="checkbox" checked={checked} className={styles.Checkbox} onChange={onChange} />
			<span className={styles.Checkmark}>
				<CheckIcon className={styles.CheckIcon} />
			</span>
		</label>
	);
};

export default Checkbox;
