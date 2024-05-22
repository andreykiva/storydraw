import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Subscribe.module.scss';
import Button from '@/components/ui/buttons/Button/Button';
import Compare from './Compare/Compare';
import Trial from './Trial/Trial';
import ChoosePlan from './ChoosePlan/ChoosePlan';
import Payment from './Payment/Payment';
import Success from './Success/Success';
import CloseButton from '@/components/ui/buttons/CloseButton/CloseButton';
import premiumIcon from '@/assets/icons/premium.svg?url';
import { SUBSCRIPTION_PLAN } from '@/constants/subscription';

const enum SUBSCRIBE_STEP {
	COMPARE = 'compare',
	TRIAL = 'trial',
	CHOOSE_PLAN = 'choosePlan',
	PAYMENT = 'payment',
	SUCCESS = 'success',
}

const Subscribe = () => {
	const navigate = useNavigate();
	const [subscribeStep, setSubscribeStep] = useState<SUBSCRIBE_STEP>(SUBSCRIBE_STEP.COMPARE);
	const [subscriptionPlan, setSubscriptionPlan] = useState<SUBSCRIPTION_PLAN>(SUBSCRIPTION_PLAN.YEARLY);

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
			case SUBSCRIBE_STEP.PAYMENT:
				setSubscribeStep(SUBSCRIBE_STEP.SUCCESS);
				break;
			default:
				break;
		}
	};

	let trialDays = 14;

	if (subscriptionPlan === SUBSCRIPTION_PLAN.MONTHLY) {
		trialDays = 7;
	}

	return (
		<div className={styles.Subscribe}>
			<div className={styles.SubscribeHeader}>
				<CloseButton className={styles.CloseBtn} onClick={handleBack} />
				<img src={premiumIcon} alt="Premium" className={styles.PremiumIcon} />
			</div>

			{subscribeStep === SUBSCRIBE_STEP.COMPARE && <Compare />}
			{subscribeStep === SUBSCRIBE_STEP.TRIAL && <Trial />}
			{subscribeStep === SUBSCRIBE_STEP.CHOOSE_PLAN && (
				<ChoosePlan currentPlan={subscriptionPlan} onChangePlan={setSubscriptionPlan} />
			)}
			{subscribeStep === SUBSCRIBE_STEP.PAYMENT && <Payment />}
			{subscribeStep === SUBSCRIBE_STEP.SUCCESS && <Success />}

			{subscribeStep !== SUBSCRIBE_STEP.PAYMENT && (
				<Button className={styles.TryBtn} onClick={handleNextStep}>
					Try {trialDays} days for free
				</Button>
			)}
		</div>
	);
};

export default Subscribe;
