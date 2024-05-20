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
import superIcon from '@/assets/icons/super.svg?url';

const enum SUBSCRIBE_STEP {
	COMPARE = 'compare',
	TRIAL = 'trial',
	CHOOSE_PLAN = 'choosePlan',
	PAYMENT = 'payment',
	SUCCESS = 'success',
}

type SubscribeStep = (typeof SUBSCRIBE_STEP)[keyof typeof SUBSCRIBE_STEP];

const Subscribe = () => {
	const navigate = useNavigate();
	const [subscribeStep, setSubscribeStep] = useState<SubscribeStep>(SUBSCRIBE_STEP.COMPARE);

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

	return (
		<div className={styles.Subscribe}>
			<div className={styles.SubscribeHeader}>
				<CloseButton className={styles.CloseBtn} onClick={handleBack} />
				<img src={superIcon} alt="Super" className={styles.SuperIcon} />
			</div>

			{subscribeStep === SUBSCRIBE_STEP.COMPARE && <Compare />}
			{subscribeStep === SUBSCRIBE_STEP.TRIAL && <Trial />}
			{subscribeStep === SUBSCRIBE_STEP.CHOOSE_PLAN && <ChoosePlan />}
			{subscribeStep === SUBSCRIBE_STEP.PAYMENT && <Payment />}
			{subscribeStep === SUBSCRIBE_STEP.SUCCESS && <Success />}

			<Button className={styles.TryBtn} onClick={handleNextStep}>
				Try 14 days for free
			</Button>
		</div>
	);
};

export default Subscribe;
