import React from 'react';
import cn from 'classnames';
import styles from './PlanItem.module.scss';

type PlanItemProps = {
	name: string;
	category?: string;
	pricePerMonth: number;
	selected: boolean;
	onClick: () => void;
};

const PlanItem = (props: PlanItemProps) => {
	const { name, category, pricePerMonth, selected, onClick } = props;

	return (
		<li
			className={cn(styles.PlanItem, selected && styles.Selected, category && styles.WithCategory)}
			onClick={onClick}
		>
			{category && <div className={styles.PlanCategory}>{category}</div>}
			<div className={styles.PlanInfo}>
				<span className={styles.PlanName}>{name}</span>
				<span className={styles.PlanPrice}>{pricePerMonth} USD/Month</span>
			</div>
			<div className={styles.PlanRadio}></div>
		</li>
	);
};

export default PlanItem;
