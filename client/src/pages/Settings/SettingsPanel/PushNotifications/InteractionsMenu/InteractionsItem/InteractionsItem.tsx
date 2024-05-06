import React from 'react';
import settingsSharedStyles from '@/pages/Settings/SettingsSharedStyles.module.css';
import ToggleSwitch from '@/components/ui/inputs/ToggleSwitch/ToggleSwitch';

type InteractionsItemProps = {
	title: string;
	checked: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InteractionsItem = ({ title, checked, onChange }: InteractionsItemProps) => {
	return (
		<div className={settingsSharedStyles.SettingsItem}>
			<span className={settingsSharedStyles.SettingsItemTitle}>{title}</span>
			<ToggleSwitch checked={checked} onChange={onChange} />
		</div>
	);
};

export default InteractionsItem;
