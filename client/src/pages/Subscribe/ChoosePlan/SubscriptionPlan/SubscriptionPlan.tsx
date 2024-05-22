import React from 'react';
import cn from 'classnames';
import styles from './SubscriptionPlan.module.scss';
import checkIcon from '@/assets/icons/subscribe/check.svg?url';

type SubscriptionPlanProps = {
	name: string;
	descr?: string;
	pricePerMonth: number;
	selected: boolean;
	onClick: () => void;
};

const SubscriptionPlan = (props: SubscriptionPlanProps) => {
	const { name, descr, pricePerMonth, selected, onClick } = props;
	return (
		<div
			className={cn(styles.SubscriptionPlan, selected && styles.Selected, descr && styles.WithDescr)}
			onClick={onClick}
		>
			{descr && <div className={styles.PlanDescr}>{descr}</div>}
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
