import React from 'react';
import styles from './ChoosePlan.module.scss';
import HTag from '@/components/ui/HTag/HTag';
import SubscriptionPlan from './SubscriptionPlan/SubscriptionPlan';
import type { Plan } from '@/types/Subscription';

type ChoosePlanProps = {
	currentPlan: Plan;
	plans: Plan[];
	onChangePlan: (plan: Plan) => void;
};

const ChoosePlan = ({ currentPlan, plans, onChangePlan }: ChoosePlanProps) => {
	let planDescription = `$${currentPlan.pricePerMonth} per month`;

	if (currentPlan.pricePerYear) {
		planDescription = `$${currentPlan.pricePerYear} per year
		 ($${currentPlan.pricePerMonth}/month, one-time payment)`;
	}

	return (
		<div className={styles.ChoosePlan}>
			<HTag tag="h2" className={styles.ChoosePlanTitle}>
				Choose the plan you use after the 14-day trial
			</HTag>
			<div className={styles.SubscriptionPlansList}>
				{plans.map((plan) => (
					<SubscriptionPlan
						key={plan.type}
						name={plan.name}
						category={plan.category}
						pricePerMonth={plan.pricePerMonth}
						selected={plan.type === currentPlan.type}
						onClick={() => onChangePlan(plan)}
					/>
				))}
			</div>
			<p className={styles.PlanDescription}>
				{currentPlan.trialDays}-day free trial, then {planDescription} plus applicable taxes
			</p>
		</div>
	);
};

export default ChoosePlan;
