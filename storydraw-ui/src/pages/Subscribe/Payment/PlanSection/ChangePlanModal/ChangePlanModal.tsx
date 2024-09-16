import { useState } from 'react';
import styles from './ChangePlanModal.module.scss';
import type { Plan } from '@/types/Subscription';
import HTag from '@/components/ui/HTag/HTag';
import Button from '@/components/ui/buttons/Button/Button';
import ModalOverlay from '@/components/ui/ModalOverlay/ModalOverlay';
import CloseButton from '@/components/ui/buttons/CloseButton/CloseButton';
import PlanItem from './PlanItem/PlanItem';

type ChangePlanModalProps = {
	currentPlan: Plan;
	plans: Plan[];
	onChangePlan: (plan: Plan) => void;
	onClose: () => void;
};

const ChangePlanModal = (props: ChangePlanModalProps) => {
	const { currentPlan, plans, onChangePlan, onClose } = props;
	const [newPlan, setNewPlan] = useState<Plan>(currentPlan);

	const handleChangePlan = () => {
		onChangePlan(newPlan);
		onClose();
	};

	return (
		<ModalOverlay>
			<div className={styles.ChangePlanModal}>
				<CloseButton className={styles.CloseBtn} onClick={onClose} />
				<HTag tag="h3" className={styles.ModalTitle}>
					Change plan
				</HTag>
				<ul className={styles.PlansList}>
					{plans.map((plan) => (
						<PlanItem
							key={plan.type}
							name={plan.name}
							category={plan.category}
							pricePerMonth={plan.pricePerMonth}
							selected={plan.type === newPlan.type}
							onClick={() => setNewPlan(plan)}
						/>
					))}
				</ul>
				<div className={styles.ModalActionButtons}>
					<Button className={styles.CancelBtn} onClick={onClose}>
						Cancel
					</Button>
					<Button className={styles.ChangeBtn} onClick={handleChangePlan}>
						Change
					</Button>
				</div>
			</div>
		</ModalOverlay>
	);
};

export default ChangePlanModal;
