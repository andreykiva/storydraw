import React from 'react';
import cn from 'classnames';
import styles from './TrialInfoBox.module.scss';
import TrialInfoItem from './TrialInfoItem/TrialInfoItem';
import lockIcon from '@/assets/icons/subscribe/lock.svg?url';
import bellIcon from '@/assets/icons/subscribe/bell.svg?url';
import checkIcon from '@/assets/icons/subscribe/check.svg?url';
import { Plan } from '@/types/Subscription';
import { TRIAL_INFO_SIZE } from '@/constants/subscription';

type TrialInfoBoxProps = {
	currentPlan: Plan;
	size?: TRIAL_INFO_SIZE;
};

const TrialInfoBox = ({ currentPlan, size = TRIAL_INFO_SIZE.LARGE }: TrialInfoBoxProps) => {
	const sizeClass = size === TRIAL_INFO_SIZE.SMALL ? styles.Small : styles.Large;

	return (
		<div className={cn(styles.TrialInfoBox, sizeClass)}>
			<TrialInfoItem
				title="Today"
				descr="Full access to all Super StoryDraw features"
				icon={lockIcon}
				size={size}
			/>
			<TrialInfoItem
				title={`Day ${currentPlan.trialDays - 2}`}
				descr="Reminder about the end of the trial period"
				icon={bellIcon}
				size={size}
			/>
			<TrialInfoItem
				title={`Day ${currentPlan.trialDays}`}
				descr="Charges apply, you can cancel anytime up to 24 hours before this date"
				icon={checkIcon}
				size={size}
			/>
		</div>
	);
};

export default TrialInfoBox;
