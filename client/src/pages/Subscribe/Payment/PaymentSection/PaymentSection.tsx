import React from 'react';
import styles from './PaymentSection.module.scss';
import Button from '@/components/ui/buttons/Button/Button';
import type { Plan } from '@/types/Subscription';

type PaymentSectionProps = {
	currentPlan: Plan;
};

const PaymentSection = ({ currentPlan }: PaymentSectionProps) => {
	return (
		<div className={styles.PaymentSection}>
			<div className={styles.SectionTitle}>Payment information</div>
			<Button className={styles.TryBtn}>Try {currentPlan.trialDays} days for free</Button>
		</div>
	);
};

export default PaymentSection;
