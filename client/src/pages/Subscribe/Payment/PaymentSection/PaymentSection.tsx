import React, { useState, useEffect } from 'react';
import styles from './PaymentSection.module.scss';
import type { Plan } from '@/types/Subscription';
import { PAYMENT_METHOD } from '@/constants/subscription';
import PaymentMethodSelection from './PaymentMethodSelection/PaymentMethodSelection';
import PaymentForm from './PaymentForm/PaymentForm';

type PaymentSectionProps = {
	currentPlan: Plan;
};

const PaymentSection = ({ currentPlan }: PaymentSectionProps) => {
	const testSavedCard = 9873;
	const [paymentMethod, setPaymentMethod] = useState<PAYMENT_METHOD>(PAYMENT_METHOD.ANOTHER_CARD);

	useEffect(() => {
		if (testSavedCard) {
			// setPaymentMethod(PAYMENT_METHOD.SAVED_CARD);
		}
	}, []);

	return (
		<div className={styles.PaymentSection}>
			<div className={styles.SectionHeader}>
				<div className={styles.SectionTitle}>Payment information</div>
				{testSavedCard && (
					<PaymentMethodSelection
						paymentMethod={paymentMethod}
						changePaymentMethod={setPaymentMethod}
						savedCard={testSavedCard}
					/>
				)}
			</div>
			<PaymentForm paymentMethod={paymentMethod} currentPlan={currentPlan} />
		</div>
	);
};

export default PaymentSection;
