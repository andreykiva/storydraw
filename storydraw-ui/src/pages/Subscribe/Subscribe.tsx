import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Subscribe.module.scss';
import Button from '@/components/ui/buttons/Button/Button';
import Compare from './Compare/Compare';
import Trial from './Trial/Trial';
import ChoosePlan from './ChoosePlan/ChoosePlan';
import Payment from './Payment/Payment';
import CloseButton from '@/components/ui/buttons/CloseButton/CloseButton';
import premiumIcon from '@/assets/icons/premium.svg';
import type { Plan } from '@/types/Subscription';
import { SUBSCRIPTION_PLAN } from '@/constants/subscription';

const enum SUBSCRIBE_STEP {
	COMPARE = 'compare',
	TRIAL = 'trial',
	CHOOSE_PLAN = 'choosePlan',
	PAYMENT = 'payment',
}

const testPlans: Plan[] = [
	{
		name: '12 months',
		pricePerMonth: 3.33,
		pricePerYear: 39.99,
		trialDays: 14,
		type: SUBSCRIPTION_PLAN.YEARLY,
		category: 'Most popular',
	},
	{
		name: '1 month',
		pricePerMonth: 6.49,
		trialDays: 7,
		type: SUBSCRIPTION_PLAN.MONTHLY,
	},
];

const Subscribe = () => {
	const navigate = useNavigate();
	const [subscribeStep, setSubscribeStep] = useState<SUBSCRIBE_STEP>(SUBSCRIBE_STEP.COMPARE);
	const [subscriptionPlan, setSubscriptionPlan] = useState<Plan>(testPlans[0]);

	const handleBack = () => {
		navigate(-1);
	};

	const handleNextStep = () => {
		switch (subscribeStep) {
			case SUBSCRIBE_STEP.COMPARE:
				setSubscribeStep(SUBSCRIBE_STEP.TRIAL);
				break;
			case SUBSCRIBE_STEP.TRIAL:
				setSubscribeStep(SUBSCRIBE_STEP.CHOOSE_PLAN);
				break;
			case SUBSCRIBE_STEP.CHOOSE_PLAN:
				setSubscribeStep(SUBSCRIBE_STEP.PAYMENT);
				break;
			default:
				break;
		}
	};

	return (
		<div className={styles.Subscribe}>
			<div className={styles.SubscribeHeader}>
				<CloseButton className={styles.CloseBtn} onClick={handleBack} />
				<img src={premiumIcon} alt="Premium" className={styles.PremiumIcon} />
			</div>

			{subscribeStep === SUBSCRIBE_STEP.COMPARE && <Compare />}
			{subscribeStep === SUBSCRIBE_STEP.TRIAL && <Trial currentPlan={subscriptionPlan} />}
			{subscribeStep === SUBSCRIBE_STEP.CHOOSE_PLAN && (
				<ChoosePlan currentPlan={subscriptionPlan} onChangePlan={setSubscriptionPlan} plans={testPlans} />
			)}
			{subscribeStep === SUBSCRIBE_STEP.PAYMENT && (
				<Payment currentPlan={subscriptionPlan} onChangePlan={setSubscriptionPlan} plans={testPlans} />
			)}
			{subscribeStep !== SUBSCRIBE_STEP.PAYMENT && (
				<Button className={styles.TryBtn} onClick={handleNextStep}>
					Try {subscriptionPlan.trialDays} days for free
				</Button>
			)}
		</div>
	);
};

export default Subscribe;
