import React from 'react';
import { SUBSCRIPTION_PLAN } from '@/constants/subscription';

type ChoosePlanProps = {
	currentPlan: string;
	onChangePlan: (plan: SUBSCRIPTION_PLAN) => void;
};

const ChoosePlan = ({ currentPlan, onChangePlan }: ChoosePlanProps) => {
	return (
		<div>
			<div onClick={() => onChangePlan(SUBSCRIPTION_PLAN.MONTHLY)}>MONTHLY</div>
			<div onClick={() => onChangePlan(SUBSCRIPTION_PLAN.YEARLY)}>YEARLY</div>
			<span>{currentPlan}</span>
		</div>
	);
};

export default ChoosePlan;
