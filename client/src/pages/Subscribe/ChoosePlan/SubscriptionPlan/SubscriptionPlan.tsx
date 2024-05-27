import React from 'react';
import cn from 'classnames';
import styles from './SubscriptionPlan.module.scss';
import checkIcon from '@/assets/icons/subscribe/check.svg?url';

type SubscriptionPlanProps = {
	name: string;
	category?: string;
	pricePerMonth: number;
	selected: boolean;
	onClick: () => void;
};

const SubscriptionPlan = (props: SubscriptionPlanProps) => {
	const { name, category, pricePerMonth, selected, onClick } = props;
	return (
		<div
			className={cn(styles.SubscriptionPlan, selected && styles.Selected, category && styles.WithCategory)}
			onClick={onClick}
		>
			{category && <div className={styles.PlanCategory}>{category}</div>}
			<div className={styles.Check}>
				<img src={checkIcon} alt="Selected" className={styles.CheckIcon} />
			</div>
			<div className={styles.PlanMainInfo}>
				<span className={styles.PlanName}>{name}</span>
				<span className={styles.PlanPrice}>{pricePerMonth} USD/Month</span>
			</div>
		</div>
	);
};

export default SubscriptionPlan;
