import styles from './PaymentMethodSelection.module.scss';
import Radio from '@/components/ui/inputs/Radio/Radio';
import { PAYMENT_METHOD } from '@/constants/subscription';
import visaIcon from '@/assets/icons/subscribe/visa.png';
import masterCardIcon from '@/assets/icons/subscribe/master-card.png';
import discoverIcon from '@/assets/icons/subscribe/discover.png';
import americanExpressIcon from '@/assets/icons/subscribe/american-express.png';

type PaymentMethodSelectionProps = {
	paymentMethod: PAYMENT_METHOD;
	savedCard: number;
	changePaymentMethod: (method: PAYMENT_METHOD) => void;
};

const PaymentMethodSelection = ({ paymentMethod, savedCard, changePaymentMethod }: PaymentMethodSelectionProps) => {
	return (
		<div className={styles.PaymentMethodSelection}>
			<Radio
				id={PAYMENT_METHOD.SAVED_CARD}
				name="paymentMethod"
				checked={paymentMethod === PAYMENT_METHOD.SAVED_CARD}
				onChange={() => changePaymentMethod(PAYMENT_METHOD.SAVED_CARD)}
			>
				Visa card ending in <strong>{savedCard}</strong>
			</Radio>
			<Radio
				id={PAYMENT_METHOD.ANOTHER_CARD}
				name="paymentMethod"
				checked={paymentMethod === PAYMENT_METHOD.ANOTHER_CARD}
				onChange={() => changePaymentMethod(PAYMENT_METHOD.ANOTHER_CARD)}
			>
				<div className={styles.AnotherCard}>
					<span>Use another card</span>
					<div className={styles.CardsIcons}>
						<img src={visaIcon} alt="Visa" />
						<img src={masterCardIcon} alt="Master Card" />
						<img src={discoverIcon} alt="Discover" />
						<img src={americanExpressIcon} alt="American Express" />
					</div>
				</div>
			</Radio>
		</div>
	);
};

export default PaymentMethodSelection;
