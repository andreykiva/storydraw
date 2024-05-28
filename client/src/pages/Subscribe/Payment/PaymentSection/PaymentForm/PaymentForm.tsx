import React from 'react';
import styles from './PaymentForm.module.scss';
import type { Plan } from '@/types/Subscription';
import { PAYMENT_METHOD } from '@/constants/subscription';
import Button from '@/components/ui/buttons/Button/Button';
import CardNumberInput from '@/components/ui/inputs/CardNumberInput/CardNumberInput';
import { PAYMENT_FIELD } from '@/constants/subscription';
import usePaymentForm from '@/hooks/forms/usePaymentForm';

type PaymentFormProps = {
	paymentMethod: PAYMENT_METHOD;
	currentPlan: Plan;
};

const PaymentForm = ({ paymentMethod, currentPlan }: PaymentFormProps) => {
	const { formData, formErrors, handleChangeCardNumber, handleKeyDown, handleFocusInput, handleBlurInput } =
		usePaymentForm();

	return (
		<form className={styles.PaymentForm}>
			{paymentMethod === PAYMENT_METHOD.ANOTHER_CARD && (
				<>
					<div className=""></div>
					<label htmlFor={PAYMENT_FIELD.CARD_NUMBER}>Card number</label>
					<CardNumberInput
						name={PAYMENT_FIELD.CARD_NUMBER}
						id={PAYMENT_FIELD.CARD_NUMBER}
						value={formData[PAYMENT_FIELD.CARD_NUMBER]}
						error={formErrors[PAYMENT_FIELD.CARD_NUMBER]}
						onChange={handleChangeCardNumber}
						onKeyDown={handleKeyDown}
						onFocus={() => handleFocusInput(PAYMENT_FIELD.CARD_NUMBER)}
						onBlur={() => handleBlurInput(PAYMENT_FIELD.CARD_NUMBER)}
						required
					/>
					<p className={styles.PaymentDescr}>
						By providing your card information, you authorize StoryDraw to charge your card for this and
						future payments according to StoryDraw's terms and conditions.
					</p>
				</>
			)}

			<Button className={styles.TryBtn} type="submit">
				Try {currentPlan.trialDays} days for free
			</Button>
		</form>
	);
};

export default PaymentForm;
