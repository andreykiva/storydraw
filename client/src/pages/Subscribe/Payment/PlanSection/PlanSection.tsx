import React, { useState } from 'react';
import cn from 'classnames';
import styles from './PlanSection.module.scss';
import { Plan } from '@/types/Subscription';
import TrialInfoBox from '@/pages/Subscribe/TrialInfoBox/TrialInfoBox';
import { TRIAL_INFO_SIZE } from '@/constants/subscription';
import ChangePlanModal from './ChangePlanModal/ChangePlanModal';

type PlanSectionProps = {
	currentPlan: Plan;
	plans: Plan[];
	onChangePlan: (plan: Plan) => void;
};

const PlanSection = ({ currentPlan, plans, onChangePlan }: PlanSectionProps) => {
	const [isChangePlanModalOpen, setIsChangePlanModalOpen] = useState(true);

	let planDescription = `${currentPlan.pricePerMonth} USD per month`;

	if (currentPlan.pricePerYear) {
		planDescription = `${currentPlan.pricePerYear} USD/year
		 (${currentPlan.pricePerMonth} USD/month)`;
	}

	return (
		<div className={styles.PlanSection}>
			<div className={styles.SectionItem}>
				<div className={styles.SectionItemTitle}>Selected plan:</div>
				<div className={styles.SectionItemInfo}>
					<span className={styles.InfoValue}>plan for {currentPlan.name}</span>
					<div className={styles.ViewAllPlansBtn} onClick={() => setIsChangePlanModalOpen(true)}>
						View all plans
					</div>
				</div>
			</div>
			<div className={styles.SectionItem}>
				<div className={styles.SectionItemTitle}>Payment:</div>
				<div className={styles.SectionItemInfo}>
					<span className={styles.InfoValue}>0 USD today</span>
					<p className={styles.InfoDescr}>
						{planDescription}, paid after {currentPlan.trialDays} days trial
					</p>
				</div>
			</div>
			<div className={cn(styles.SectionItem, styles.WithTrialInfo)}>
				<div className={styles.SectionItemTitle}>How trial works:</div>
				<TrialInfoBox currentPlan={currentPlan} size={TRIAL_INFO_SIZE.SMALL} />
			</div>
			{isChangePlanModalOpen && (
				<ChangePlanModal
					currentPlan={currentPlan}
					plans={plans}
					onChangePlan={onChangePlan}
					onClose={() => setIsChangePlanModalOpen(false)}
				/>
			)}
		</div>
	);
};

export default PlanSection;
