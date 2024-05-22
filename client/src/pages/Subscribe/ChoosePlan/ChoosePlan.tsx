import React from 'react';
import styles from './ChoosePlan.module.scss';
import HTag from '@/components/ui/HTag/HTag';
import { SUBSCRIPTION_PLAN } from '@/constants/subscription';
import SubscriptionPlan from './SubscriptionPlan/SubscriptionPlan';

type ChoosePlanProps = {
	currentPlan: SUBSCRIPTION_PLAN;
	onChangePlan: (plan: SUBSCRIPTION_PLAN) => void;
};

const plans = [
	{
		name: '12 months',
		pricePerMonth: 3.33,
		type: SUBSCRIPTION_PLAN.YEARLY,
		descr: 'Most popular',
	},
	{
		name: '1 month',
		pricePerMonth: 6.49,
		type: SUBSCRIPTION_PLAN.MONTHLY,
	},
];

const ChoosePlan = ({ currentPlan, onChangePlan }: ChoosePlanProps) => {
	return (
		<div className={styles.ChoosePlan}>
			<HTag tag="h2" className={styles.ChoosePlanTitle}>
				Choose the plan you use after the 14-day trial
			</HTag>

			<div className={styles.SubscriptionPlansList}>
				{plans.map((plan) => (
					<SubscriptionPlan
						key={plan.name}
						name={plan.name}
						descr={plan.descr}
						pricePerMonth={plan.pricePerMonth}
						selected={plan.type === currentPlan}
						onClick={() => onChangePlan(plan.type)}
					/>
				))}
			</div>

			{currentPlan === SUBSCRIPTION_PLAN.YEARLY && (
				<p className={styles.PlanDescription}>
					14-day free trial, then $39,99 per year ($3,33/month, one-time payment) plus applicable taxes
				</p>
			)}
			{currentPlan === SUBSCRIPTION_PLAN.MONTHLY && (
				<p className={styles.PlanDescription}>7-day free trial, then $6,49 per month plus applicable taxes</p>
			)}
		</div>
	);
};

export default ChoosePlan;
