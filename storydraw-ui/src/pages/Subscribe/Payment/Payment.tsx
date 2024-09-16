import styles from './Payment.module.scss';
import type { Plan } from '@/types/Subscription';
import PlanSection from './PlanSection/PlanSection';
import PaymentSection from './PaymentSection/PaymentSection';

type PaymentProps = {
	currentPlan: Plan;
	plans: Plan[];
	onChangePlan: (plan: Plan) => void;
};

const Payment = ({ currentPlan, plans, onChangePlan }: PaymentProps) => {
	return (
		<div className={styles.Payment}>
			<div className={styles.PaymentPanel}>
				<PlanSection currentPlan={currentPlan} plans={plans} onChangePlan={onChangePlan} />
				<PaymentSection currentPlan={currentPlan} />
			</div>
			<p className={styles.PaymentDescr}>
				<strong>Regular payments, cancellation at any time</strong>
				<br />
				After the free trial ends, you will be automatically charged for the subscription for the period and
				price you selected, unless canceled at least 24 hours before the trial ends. You can cancel your
				subscription at any time in the settings. <strong>Terms and conditions</strong>
			</p>
		</div>
	);
};

export default Payment;
