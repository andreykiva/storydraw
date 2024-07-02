import React from 'react';
import styles from './Trial.module.scss';
import HTag from '@/components/ui/HTag/HTag';
import TrialInfoBox from '@/pages/Subscribe/TrialInfoBox/TrialInfoBox';
import { Plan } from '@/types/Subscription';

type TrialProps = {
	currentPlan: Plan;
};

const Trial = ({ currentPlan }: TrialProps) => {
	return (
		<div className={styles.Trial}>
			<HTag tag="h2" className={styles.TrialTitle}>
				We will send you a reminder <br /> <span>2 days</span> before the review ends
			</HTag>
			<div className={styles.TrialInfo}>
				<TrialInfoBox currentPlan={currentPlan} />
			</div>
		</div>
	);
};

export default Trial;
